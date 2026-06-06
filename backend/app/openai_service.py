from __future__ import annotations

from typing import Any, Dict
import json

import httpx

from .config import get_settings
from .notification_service import fallback_email


JsonDict = Dict[str, Any]


def generate_estate_email(plan: JsonDict, target: JsonDict, declaration: JsonDict) -> JsonDict:
    settings = get_settings()
    if not settings.openai_configured:
        return fallback_email(plan, target, declaration)

    prompt = {
        "task": "Write a concise, respectful estate notification email.",
        "rules": [
            "Return only valid JSON with subject and body keys.",
            "Do not invent account numbers, policy numbers, or legal facts.",
            "Do not include passwords or credentials.",
            "Tone should be formal, sad, practical, and suitable after a death.",
            "The email should be safe for executor review and should not claim legal authority beyond the declaration data.",
        ],
        "person": {
            "full_name": plan.get("full_name"),
            "date_of_birth": plan.get("date_of_birth"),
            "location": plan.get("location"),
        },
        "death_declaration": declaration,
        "recipient": target,
    }

    try:
        response = httpx.post(
            "https://api.openai.com/v1/responses",
            headers={
                "Authorization": f"Bearer {settings.openai_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": settings.openai_model,
                "input": json.dumps(prompt),
                "temperature": 0.2,
            },
            timeout=20,
        )
        response.raise_for_status()
        data = response.json()
        content = data.get("output_text", "")
        parsed = json.loads(content)
        return {
            "subject": parsed["subject"],
            "body": parsed["body"],
            "provider": f"openai:{settings.openai_model}",
        }
    except Exception:
        return fallback_email(plan, target, declaration)
