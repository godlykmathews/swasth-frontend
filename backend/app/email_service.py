from __future__ import annotations

from datetime import datetime, timezone
from email.message import EmailMessage
from email.utils import formataddr
import smtplib
import ssl
from typing import Any, Dict

from .config import get_settings


JsonDict = Dict[str, Any]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _recipient_for(target: JsonDict) -> str:
    settings = get_settings()
    if settings.smtp_force_test_recipient and settings.smtp_test_recipient:
        return settings.smtp_test_recipient
    return target["recipient_email"]


def send_estate_email(target: JsonDict, subject: str, body: str, declarant_email: str) -> JsonDict:
    settings = get_settings()
    recipient = _recipient_for(target)
    delivery_provider = f"smtp:{settings.smtp_host}"

    if not settings.email_delivery_enabled:
        return {
            "status": "prepared_only",
            "provider": "email_disabled",
            "recipient_email": recipient,
            "sent_at": None,
            "error": None,
        }

    if not settings.email_configured:
        return {
            "status": "prepared_only",
            "provider": "smtp_unconfigured",
            "recipient_email": recipient,
            "sent_at": None,
            "error": "SMTP credentials are not configured.",
        }

    message = EmailMessage()
    message["From"] = formataddr((settings.smtp_from_name, settings.smtp_from_email))
    message["To"] = recipient
    message["Reply-To"] = declarant_email
    message["Subject"] = subject

    final_body = body
    if recipient != target["recipient_email"]:
        final_body = (
            "AFTERLIFE AI TEST DELIVERY\n"
            f"Original service recipient: {target['recipient_email']}\n"
            f"Service: {target['service_name']}\n\n"
            f"{body}"
        )
    message.set_content(final_body)

    try:
        if settings.smtp_port == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, context=context, timeout=20) as smtp:
                smtp.login(settings.smtp_username, settings.smtp_password)
                smtp.send_message(message)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as smtp:
                smtp.ehlo()
                smtp.starttls(context=ssl.create_default_context())
                smtp.ehlo()
                smtp.login(settings.smtp_username, settings.smtp_password)
                smtp.send_message(message)
    except Exception as error:
        return {
            "status": "email_failed",
            "provider": delivery_provider,
            "recipient_email": recipient,
            "sent_at": None,
            "error": str(error),
        }

    return {
        "status": "sent_email",
        "provider": delivery_provider,
        "recipient_email": recipient,
        "sent_at": now_iso(),
        "error": None,
    }
