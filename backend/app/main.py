from __future__ import annotations

from typing import Any, Dict, Optional

import logging
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from psycopg import OperationalError

from .cloudinary_service import upload_asset
from .config import get_settings
from .email_service import send_estate_email
from .models import (
    ActivationIn,
    DeathDeclarationIn,
    DigitalAssetsIn,
    FinalWishesIn,
    InsurancePropertyIn,
    MemoryVaultIn,
    ProfileIn,
    RegistrationIn,
)
from .notification_service import build_notification_targets
from .openai_service import generate_estate_email
from .store import store

settings = get_settings()
logger = logging.getLogger("afterlife-ai")
startup_state: Dict[str, Any] = {
    "schema_ready": False,
    "startup_error": None,
}

app = FastAPI(
    title="AFTERLIFE AI Backend",
    description="FastAPI + Supabase backend for the AFTERLIFE AI hackathon prototype.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RuntimeError)
async def runtime_exception_handler(request: Request, error: RuntimeError) -> JSONResponse:
    return JSONResponse(
        status_code=503,
        content={"detail": f"Service unavailable: {error}"},
    )


@app.exception_handler(OperationalError)
async def operational_exception_handler(request: Request, error: OperationalError) -> JSONResponse:
    return JSONResponse(
        status_code=503,
        content={"detail": f"Database unavailable: {error}"},
    )


@app.on_event("startup")
def startup() -> None:
    if settings.auto_migrate and settings.database_configured:
        try:
            store.ensure_schema()
            store.seed_demo()
            startup_state["schema_ready"] = True
            startup_state["startup_error"] = None
        except (RuntimeError, OperationalError) as error:
            startup_state["schema_ready"] = False
            startup_state["startup_error"] = str(error)
            logger.warning("Database startup migration skipped: %s", error)
    elif not settings.database_configured:
        startup_state["schema_ready"] = False
        startup_state["startup_error"] = "Database is not configured"


def not_found(error: Exception) -> HTTPException:
    return HTTPException(status_code=404, detail=str(error))


def database_error(error: Exception) -> HTTPException:
    return HTTPException(
        status_code=503,
        detail=f"Database unavailable: {error}",
    )


@app.get("/")
def root() -> Dict[str, str]:
    return {"name": "AFTERLIFE AI Backend", "status": "online"}


@app.get("/health")
def health() -> Dict[str, Any]:
    return {
        "status": "ok",
        "supabase_url": settings.supabase_url,
        "database_configured": settings.database_configured,
        "database_host": settings.db_host,
        "uses_database_url": bool(settings.database_url),
        "schema_ready": startup_state["schema_ready"],
        "startup_error": startup_state["startup_error"],
        "cloudinary_configured": settings.cloudinary_configured,
        "openai_configured": settings.openai_configured,
        "email_delivery_enabled": settings.email_delivery_enabled,
        "email_configured": settings.email_configured,
        "smtp_host": settings.smtp_host,
        "smtp_force_test_recipient": settings.smtp_force_test_recipient,
        "smtp_test_recipient": settings.smtp_test_recipient,
        "auto_migrate": settings.auto_migrate,
    }


@app.post("/api/register")
def register(payload: RegistrationIn) -> Dict[str, Any]:
    try:
        plan = store.register(payload.model_dump())
        return {"legacy_id": plan["id"], "activation_code": plan["activation_code"], "plan": plan}
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.get("/api/demo")
def demo() -> Dict[str, Any]:
    try:
        return {"plan": store.seed_demo()}
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.get("/api/activation-code")
def activation_code(email: str = "mathews.joseph@example.com") -> Dict[str, Any]:
    try:
        plan = store.get_plan_by_email(email)
    except (RuntimeError, OperationalError) as error:
        raise database_error(error) from error
    if not plan:
        raise HTTPException(status_code=404, detail="Legacy plan not found for that email")
    return {
        "legacy_id": plan["id"],
        "full_name": plan["full_name"],
        "activation_code": plan["activation_code"],
    }


@app.get("/api/profile/{legacy_id}")
def get_profile(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {
        "legacy_id": plan["id"],
        "full_name": plan["full_name"],
        "location": plan["location"],
        "profile": plan["profile"],
        "family_members": plan["family_members"],
        "trusted_contacts": plan["trusted_contacts"],
    }


@app.put("/api/profile/{legacy_id}")
def update_profile(legacy_id: str, payload: ProfileIn) -> Dict[str, Any]:
    try:
        plan = store.update_plan(legacy_id, payload.model_dump(exclude_unset=True))
    except KeyError as error:
        raise not_found(error) from error
    return {"plan": plan}


@app.get("/api/digital-assets/{legacy_id}")
def get_digital_assets(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {"legacy_id": plan["id"], "digital_assets": plan["digital_assets"]}


@app.put("/api/digital-assets/{legacy_id}")
def update_digital_assets(legacy_id: str, payload: DigitalAssetsIn) -> Dict[str, Any]:
    try:
        plan = store.update_plan(legacy_id, payload.model_dump())
    except KeyError as error:
        raise not_found(error) from error
    return {"plan": plan}


@app.get("/api/insurance-property/{legacy_id}")
def get_insurance_property(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {
        "legacy_id": plan["id"],
        "insurance_policies": plan["insurance_policies"],
        "property_records": plan["property_records"],
        "documents": plan["documents"],
    }


@app.put("/api/insurance-property/{legacy_id}")
def update_insurance_property(legacy_id: str, payload: InsurancePropertyIn) -> Dict[str, Any]:
    try:
        plan = store.update_plan(legacy_id, payload.model_dump())
    except KeyError as error:
        raise not_found(error) from error
    return {"plan": plan}


@app.get("/api/will-final-wishes/{legacy_id}")
def get_will_final_wishes(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {
        "legacy_id": plan["id"],
        "final_wishes": plan["final_wishes"],
        "documents": plan["documents"],
    }


@app.put("/api/will-final-wishes/{legacy_id}")
def update_will_final_wishes(legacy_id: str, payload: FinalWishesIn) -> Dict[str, Any]:
    try:
        plan = store.update_plan(legacy_id, payload.model_dump())
    except KeyError as error:
        raise not_found(error) from error
    return {"plan": plan}


@app.get("/api/memory-vault/{legacy_id}")
def get_memory_vault(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {"legacy_id": plan["id"], "memory_vault": plan["memory_vault"]}


@app.put("/api/memory-vault/{legacy_id}")
def update_memory_vault(legacy_id: str, payload: MemoryVaultIn) -> Dict[str, Any]:
    try:
        plan = store.update_plan(legacy_id, payload.model_dump())
    except KeyError as error:
        raise not_found(error) from error
    return {"plan": plan}


@app.get("/api/executor/{legacy_id}")
def get_executor(legacy_id: str) -> Dict[str, Any]:
    try:
        plan = store.get_plan(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    assets = plan.get("digital_assets") or {}
    stats = {
        "profileCompletion": "100%",
        "trustedContacts": len(plan.get("trusted_contacts") or []),
        "assets": sum(len(value) for value in assets.values() if isinstance(value, list)),
        "subscriptions": len(assets.get("subscriptions") or []),
        "insurancePolicies": len(plan.get("insurance_policies") or []),
        "propertyRecords": len(plan.get("property_records") or []),
    }
    return {
        "legacy_id": plan["id"],
        "status": plan["status"],
        "full_name": plan["full_name"],
        "location": plan["location"],
        "stats": stats,
        "timeline": [
            "Legacy Profile Completed",
            "Family Contacts Added",
            "Digital Assets Recorded",
            "Insurance Documents Stored",
            "Will Uploaded",
            "Memory Vault Created",
        ],
        "logs": plan["executor_logs"],
        "summary": {
            "subscriptions": assets.get("subscriptions", []),
            "insurance": [policy.get("title") for policy in plan.get("insurance_policies", [])],
            "properties": [record.get("title") for record in plan.get("property_records", [])],
        },
    }


@app.post("/api/executor/activate")
def activate_executor(payload: ActivationIn) -> Dict[str, Any]:
    try:
        plan = store.activate_executor(payload.activation_code, payload.requested_by)
    except KeyError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    return {"legacy_id": plan["id"], "status": plan["status"], "logs": plan["executor_logs"]}


@app.post("/api/death/declare")
def declare_death(payload: DeathDeclarationIn) -> Dict[str, Any]:
    declaration = payload.model_dump()
    try:
        plan = store.get_plan_by_activation_code(payload.activation_code)
    except (RuntimeError, OperationalError) as error:
        raise database_error(error) from error
    if not plan:
        raise HTTPException(status_code=404, detail="Activation code not found")

    targets = build_notification_targets(plan)
    notifications = []
    for target in targets:
        email = generate_estate_email(plan, target, declaration)
        delivery = send_estate_email(
            target=target,
            subject=email["subject"],
            body=email["body"],
            declarant_email=declaration["declarant_email"],
        )
        notifications.append(
            {
                **target,
                "intended_recipient_email": target["recipient_email"],
                "recipient_email": delivery["recipient_email"],
                "subject": email["subject"],
                "body": email["body"],
                "provider": f"{email['provider']}+{delivery['provider']}",
                "content_provider": email["provider"],
                "delivery_provider": delivery["provider"],
                "status": delivery["status"],
                "sent_at": delivery["sent_at"],
                "delivery_error": delivery["error"],
            }
        )

    try:
        result = store.declare_death(plan, declaration, notifications)
    except (RuntimeError, OperationalError) as error:
        raise database_error(error) from error
    return {
        "legacy_id": result["plan"]["id"],
        "status": result["plan"]["status"],
        "declaration": result["declaration"],
        "notifications": result["notifications"],
        "logs": result["plan"]["executor_logs"],
    }


@app.get("/api/notifications/{legacy_id}")
def get_notifications(legacy_id: str) -> Dict[str, Any]:
    try:
        notifications = store.list_outbound_notifications(legacy_id)
    except KeyError as error:
        raise not_found(error) from error
    return {"legacy_id": legacy_id, "notifications": notifications}


@app.post("/api/uploads/{legacy_id}")
async def upload_cloudinary_asset(
    legacy_id: str,
    category: str = Form("general"),
    file: UploadFile = File(...),
) -> Dict[str, Any]:
    try:
        store.get_plan(legacy_id)
        uploaded = await upload_asset(file=file, legacy_id=legacy_id, category=category)
        saved = store.save_cloudinary_asset(legacy_id, uploaded)
    except KeyError as error:
        raise not_found(error) from error
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
    return {"asset": saved}


@app.get("/api/uploads/{legacy_id}")
def list_cloudinary_assets(legacy_id: str, category: Optional[str] = None) -> Dict[str, Any]:
    try:
        assets = store.list_cloudinary_assets(legacy_id, category)
    except KeyError as error:
        raise not_found(error) from error
    return {"legacy_id": legacy_id, "assets": assets}
