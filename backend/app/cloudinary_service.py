from __future__ import annotations

from typing import Any, Dict
import re

import cloudinary
import cloudinary.uploader
from fastapi import UploadFile

from .config import get_settings


def configure_cloudinary() -> None:
    settings = get_settings()
    if settings.cloudinary_url:
        cloudinary.config(cloudinary_url=settings.cloudinary_url, secure=True)
        return

    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True,
    )


def safe_folder_part(value: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip().lower())
    return cleaned.strip("-") or "general"


async def upload_asset(
    *,
    file: UploadFile,
    legacy_id: str,
    category: str,
) -> Dict[str, Any]:
    settings = get_settings()
    if not settings.cloudinary_configured:
        raise RuntimeError("Cloudinary is not configured")

    configure_cloudinary()
    await file.seek(0)
    folder = f"afterlife-ai/{safe_folder_part(legacy_id)}/{safe_folder_part(category)}"
    result = cloudinary.uploader.upload(
        file.file,
        folder=folder,
        resource_type="auto",
        use_filename=True,
        unique_filename=True,
        overwrite=False,
    )

    return {
        "category": category,
        "original_filename": file.filename,
        "public_id": result.get("public_id"),
        "secure_url": result.get("secure_url"),
        "resource_type": result.get("resource_type"),
        "format": result.get("format"),
        "bytes": result.get("bytes"),
        "width": result.get("width"),
        "height": result.get("height"),
    }
