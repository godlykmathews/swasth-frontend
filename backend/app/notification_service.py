from __future__ import annotations

from typing import Any, Dict, List


JsonDict = Dict[str, Any]

DUMMY_RECIPIENTS = {
    "netflix": "account-closure.netflix@example.invalid",
    "spotify": "account-closure.spotify@example.invalid",
    "youtube premium": "support.youtube@example.invalid",
    "amazon prime": "account-closure.amazon@example.invalid",
    "adobe creative cloud": "account-closure.adobe@example.invalid",
    "facebook": "memorialization.facebook@example.invalid",
    "instagram": "memorialization.instagram@example.invalid",
    "linkedin": "memorialization.linkedin@example.invalid",
    "x": "legacy-support.x@example.invalid",
    "tiktok": "memorialization.tiktok@example.invalid",
    "paypal": "estate.paypal@example.invalid",
    "wise": "estate.wise@example.invalid",
    "stripe": "estate.stripe@example.invalid",
    "insurance": "claims.insurance@example.invalid",
}


def dummy_email_for(service_name: str, service_type: str) -> str:
    normalized = service_name.strip().lower()
    return DUMMY_RECIPIENTS.get(normalized) or DUMMY_RECIPIENTS.get(service_type, f"{normalized.replace(' ', '-')}.estate@example.invalid")


def build_notification_targets(plan: JsonDict) -> List[JsonDict]:
    assets = plan.get("digital_assets") or {}
    targets: List[JsonDict] = []

    for service in assets.get("subscriptions", []):
        targets.append(
            {
                "service_type": "subscription",
                "service_name": service,
                "recipient_email": dummy_email_for(service, "subscription"),
                "requested_action": "Cancel recurring subscription and preserve records for estate review.",
            }
        )

    for service in assets.get("socialAccounts", []):
        targets.append(
            {
                "service_type": "social",
                "service_name": service,
                "recipient_email": dummy_email_for(service, "social"),
                "requested_action": "Memorialize or close the social profile according to platform policy.",
            }
        )

    for service in assets.get("financialAccounts", []):
        targets.append(
            {
                "service_type": "financial",
                "service_name": service,
                "recipient_email": dummy_email_for(service, "financial"),
                "requested_action": "Freeze account activity and provide estate claims instructions.",
            }
        )

    for policy in plan.get("insurance_policies") or []:
        service_name = policy.get("title", "Insurance Provider")
        targets.append(
            {
                "service_type": "insurance",
                "service_name": service_name,
                "recipient_email": dummy_email_for(service_name, "insurance"),
                "policy": policy,
                "requested_action": "Begin claim guidance and confirm required documentation.",
            }
        )

    return targets


def fallback_email(plan: JsonDict, target: JsonDict, declaration: JsonDict) -> JsonDict:
    full_name = plan.get("full_name", "the account holder")
    date_of_death = declaration.get("date_of_death")
    service = target["service_name"]
    subject = f"Estate notice for {full_name} - {service}"
    body = (
        f"To {service} Estate Support,\n\n"
        f"This is a formal estate notification regarding {full_name}. "
        f"The family has reported that {full_name} died on {date_of_death}. "
        f"Please review the account or policy associated with this person and advise the executor "
        f"on the next steps required by your process.\n\n"
        f"Requested action: {target['requested_action']}\n\n"
        "This message was prepared by AFTERLIFE AI for executor review and estate follow-up. "
        "No sensitive account credentials are included in this email.\n\n"
        "Regards,\n"
        f"{declaration.get('declarant_name')}\n"
        f"{declaration.get('declarant_email')}"
    )
    return {"subject": subject, "body": body, "provider": "template"}
