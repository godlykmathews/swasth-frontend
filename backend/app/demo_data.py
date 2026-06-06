from __future__ import annotations

from datetime import datetime, timezone


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


DEMO_LEGACY_ID = "00000000-0000-4000-8000-000000000001"

DEMO_PLAN = {
    "id": DEMO_LEGACY_ID,
    "full_name": "Mathews Joseph",
    "email": "mathews.joseph@example.com",
    "phone": "+91 94470 42000",
    "date_of_birth": "1958-05-14",
    "activation_code": "AFTR-8XJ2-92LM",
    "status": "Active",
    "location": "Kerala, India",
    "profile": {
        "address": "Vazhakkala, Kochi, Kerala",
        "nationality": "Indian",
        "bloodGroup": "O+",
        "photoUrl": "/images/legacy-portrait.png",
    },
    "family_members": [
        {"relationship": "Father", "name": "Joseph Mathews", "email": "joseph.family@example.com", "phone": "+91 94470 11001"},
        {"relationship": "Mother", "name": "Mary Joseph", "email": "mary.family@example.com", "phone": "+91 94470 11002"},
        {"relationship": "Spouse", "name": "Anita Mathews", "email": "anita.family@example.com", "phone": "+91 94470 11003"},
        {"relationship": "Children", "name": "Sarah Mathews", "email": "sarah.family@example.com", "phone": "+91 94470 11004"},
        {"relationship": "Siblings", "name": "John Mathews", "email": "john.family@example.com", "phone": "+91 94470 11005"},
    ],
    "trusted_contacts": [
        {"name": "John Smith", "role": "Brother", "email": "john.smith@example.com", "phone": "+91 94470 21001"},
        {"name": "Sarah Smith", "role": "Daughter", "email": "sarah.smith@example.com", "phone": "+91 94470 21002"},
        {"name": "Michael Smith", "role": "Lawyer", "email": "michael.smith@example.com", "phone": "+91 94470 21003"},
    ],
    "digital_assets": {
        "subscriptions": ["Netflix", "Spotify", "YouTube Premium", "Amazon Prime", "Adobe Creative Cloud"],
        "socialAccounts": ["Facebook", "Instagram", "LinkedIn", "X", "TikTok"],
        "financialAccounts": ["PayPal", "Wise", "Stripe"],
    },
    "insurance_policies": [
        {"title": "LIC Life Insurance", "policy": "LIC123456", "note": "Nominee and claim contact recorded"},
        {"title": "Health Insurance", "policy": "HLTH778811", "note": "Hospital card and renewal notes stored"},
    ],
    "property_records": [
        {"title": "House in Kerala", "detail": "Family residence with deed preview attached"},
        {"title": "Apartment in Kochi", "detail": "Joint ownership papers and tax receipt stored"},
        {"title": "Farmland", "detail": "Survey document and heir instructions attached"},
    ],
    "documents": ["Property Documents", "Insurance Documents", "Ownership Certificates", "Will.pdf", "Legal Documents"],
    "final_wishes": {
        "finalMessage": "If you are reading this, know that I loved each of you deeply.",
        "funeralPreferences": "A peaceful service with family hymns, framed photographs, and jasmine flowers.",
        "burialInstructions": "Follow the family tradition in Kerala, with close relatives present before the service.",
        "specialRequests": "Serve tea after the ceremony and share the family vacation album with the grandchildren.",
    },
    "memory_vault": {
        "uploads": ["Family Photos", "Videos", "Voice Notes"],
        "timeline": [
            {"year": "2010", "title": "Family Vacation", "copy": "A monsoon train ride, tea at Munnar, and one perfect family photograph."},
            {"year": "2015", "title": "Wedding Anniversary", "copy": "Forty years celebrated with jasmine flowers and handwritten blessings."},
            {"year": "2020", "title": "Grandchildren", "copy": "Voice notes, birthday videos, and the stories they asked to hear again."},
        ],
    },
    "executor_logs": [
        {"time": "10:01", "event": "Legacy Profile Verified"},
        {"time": "10:02", "event": "Family Contacts Validated"},
        {"time": "10:03", "event": "Assets Catalogued"},
        {"time": "10:04", "event": "Insurance Records Indexed"},
        {"time": "10:05", "event": "Executor Ready"},
    ],
}
