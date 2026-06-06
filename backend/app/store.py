from __future__ import annotations

from typing import Any, Dict, List, Optional
import secrets
import string

import httpx

from .config import get_settings
from .demo_data import DEMO_LEGACY_ID, DEMO_PLAN, now_iso


JsonDict = Dict[str, Any]


def generate_activation_code() -> str:
    alphabet = string.ascii_uppercase + string.digits
    chunks = ["AFTR"]
    chunks.extend("".join(secrets.choice(alphabet) for _ in range(4)) for _ in range(2))
    return "-".join(chunks)


class SupabaseStore:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.rest_base = f"{self.settings.supabase_url.rstrip('/')}/rest/v1"

    def _headers(self, *, returning: bool = False) -> Dict[str, str]:
        if not self.settings.supabase_publishable_key:
            raise RuntimeError("SUPABASE_KEY is not configured")

        headers = {
            "apikey": self.settings.supabase_publishable_key,
            "Authorization": f"Bearer {self.settings.supabase_publishable_key}",
            "Content-Type": "application/json",
        }
        if returning:
            headers["Prefer"] = "return=representation"
        return headers

    def _request(
        self,
        method: str,
        table: str,
        *,
        params: Optional[JsonDict] = None,
        json_body: Any = None,
        returning: bool = False,
    ) -> Any:
        response = httpx.request(
            method,
            f"{self.rest_base}/{table}",
            headers=self._headers(returning=returning),
            params=params,
            json=json_body,
            timeout=20,
        )
        if response.status_code >= 400:
            raise RuntimeError(f"Supabase REST {response.status_code}: {response.text}")
        if not response.text:
            return None
        return response.json()

    def ensure_schema(self) -> None:
        # Schema is created by running backend/sql/schema.sql in Supabase SQL editor.
        # REST mode cannot create tables, but it avoids the broken direct Postgres DNS path.
        return None

    def seed_demo(self) -> JsonDict:
        existing = self.get_plan_or_none(DEMO_LEGACY_ID)
        if existing:
            return existing

        rows = self._request(
            "POST",
            "legacy_plans",
            json_body=DEMO_PLAN,
            returning=True,
        )
        return rows[0]

    def get_plan_or_none(self, legacy_id: str) -> Optional[JsonDict]:
        rows = self._request(
            "GET",
            "legacy_plans",
            params={"select": "*", "id": f"eq.{legacy_id}", "limit": "1"},
        )
        return rows[0] if rows else None

    def get_plan(self, legacy_id: str) -> JsonDict:
        plan = self.get_plan_or_none(legacy_id)
        if not plan:
            raise KeyError("Legacy plan not found")
        return plan

    def get_plan_by_email(self, email: str) -> Optional[JsonDict]:
        rows = self._request(
            "GET",
            "legacy_plans",
            params={"select": "*", "email": f"eq.{email}", "limit": "1"},
        )
        return rows[0] if rows else None

    def get_plan_by_activation_code(self, activation_code: str) -> Optional[JsonDict]:
        rows = self._request(
            "GET",
            "legacy_plans",
            params={"select": "*", "activation_code": f"eq.{activation_code}", "limit": "1"},
        )
        return rows[0] if rows else None

    def register(self, payload: JsonDict) -> JsonDict:
        existing = self.get_plan_by_email(payload["email"])
        if existing:
            return existing

        rows = self._request(
            "POST",
            "legacy_plans",
            json_body={
                "full_name": payload["full_name"],
                "email": payload["email"],
                "phone": payload["phone"],
                "date_of_birth": payload["date_of_birth"],
                "activation_code": generate_activation_code(),
                "status": "Draft",
                "location": "Kerala, India",
                "profile": {"photoUrl": "/images/legacy-portrait.png"},
                "family_members": [],
                "trusted_contacts": [],
                "digital_assets": {},
                "insurance_policies": [],
                "property_records": [],
                "documents": [],
                "final_wishes": {},
                "memory_vault": {},
                "executor_logs": [],
            },
            returning=True,
        )
        return rows[0]

    def update_plan(self, legacy_id: str, fields: JsonDict) -> JsonDict:
        allowed = {
            "full_name",
            "location",
            "profile",
            "family_members",
            "trusted_contacts",
            "digital_assets",
            "insurance_policies",
            "property_records",
            "documents",
            "final_wishes",
            "memory_vault",
            "executor_logs",
            "status",
        }
        body = {key: value for key, value in fields.items() if key in allowed}
        if not body:
            return self.get_plan(legacy_id)

        rows = self._request(
            "PATCH",
            "legacy_plans",
            params={"id": f"eq.{legacy_id}"},
            json_body=body,
            returning=True,
        )
        if not rows:
            raise KeyError("Legacy plan not found")
        return rows[0]

    def activate_executor(self, activation_code: str, requested_by: str) -> JsonDict:
        plan = self.get_plan_by_activation_code(activation_code)
        if not plan:
            raise KeyError("Activation code not found")

        logs = list(plan.get("executor_logs") or [])
        logs.append(
            {
                "time": now_iso(),
                "event": f"Executor activation verified for {requested_by}",
            }
        )

        self._request(
            "POST",
            "executor_activations",
            json_body={
                "legacy_plan_id": plan["id"],
                "activation_code": activation_code,
                "requested_by": requested_by,
                "status": "verified",
            },
            returning=True,
        )
        return self.update_plan(plan["id"], {"status": "Active", "executor_logs": logs})

    def save_cloudinary_asset(self, legacy_id: str, asset: JsonDict) -> JsonDict:
        self.get_plan(legacy_id)
        rows = self._request(
            "POST",
            "cloudinary_assets",
            json_body={
                "legacy_plan_id": legacy_id,
                "category": asset.get("category", "general"),
                "original_filename": asset.get("original_filename"),
                "public_id": asset["public_id"],
                "secure_url": asset["secure_url"],
                "resource_type": asset.get("resource_type"),
                "format": asset.get("format"),
                "bytes": asset.get("bytes"),
                "width": asset.get("width"),
                "height": asset.get("height"),
                "metadata": asset,
            },
            returning=True,
        )
        return rows[0]

    def list_cloudinary_assets(self, legacy_id: str, category: Optional[str] = None) -> List[JsonDict]:
        self.get_plan(legacy_id)
        params: JsonDict = {
            "select": "*",
            "legacy_plan_id": f"eq.{legacy_id}",
            "order": "created_at.desc",
        }
        if category:
            params["category"] = f"eq.{category}"
        return self._request("GET", "cloudinary_assets", params=params)

    def declare_death(self, plan: JsonDict, declaration: JsonDict, notifications: List[JsonDict]) -> JsonDict:
        logs = list(plan.get("executor_logs") or [])
        logs.append(
            {
                "time": now_iso(),
                "event": f"Death confirmed by {declaration['declarant_name']}; notifications prepared.",
            }
        )

        declaration_rows = self._request(
            "POST",
            "death_declarations",
            json_body={
                "legacy_plan_id": plan["id"],
                "activation_code": declaration["activation_code"],
                "declarant_name": declaration["declarant_name"],
                "declarant_email": declaration["declarant_email"],
                "date_of_death": declaration["date_of_death"],
                "place_of_death": declaration.get("place_of_death"),
                "confirmation_note": declaration.get("confirmation_note", ""),
            },
            returning=True,
        )
        declaration_row = declaration_rows[0]

        saved_notifications = []
        for notification in notifications:
            rows = self._request(
                "POST",
                "outbound_notifications",
                json_body={
                    "legacy_plan_id": plan["id"],
                    "death_declaration_id": declaration_row["id"],
                    "service_type": notification["service_type"],
                    "service_name": notification["service_name"],
                    "recipient_email": notification["recipient_email"],
                    "subject": notification["subject"],
                    "body": notification["body"],
                    "status": notification.get("status", "prepared_only"),
                    "provider": notification["provider"],
                    "metadata": notification,
                    "sent_at": notification.get("sent_at"),
                },
                returning=True,
            )
            saved_notifications.append(rows[0])

        updated_plan = self.update_plan(
            plan["id"],
            {"status": "Deceased", "executor_logs": logs},
        )
        return {
            "plan": updated_plan,
            "declaration": declaration_row,
            "notifications": saved_notifications,
        }

    def list_outbound_notifications(self, legacy_id: str) -> List[JsonDict]:
        self.get_plan(legacy_id)
        return self._request(
            "GET",
            "outbound_notifications",
            params={
                "select": "*",
                "legacy_plan_id": f"eq.{legacy_id}",
                "order": "created_at.desc",
            },
        )


store = SupabaseStore()
