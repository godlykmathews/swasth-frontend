from __future__ import annotations

from typing import Any, Dict, List, Optional

from pydantic import BaseModel, EmailStr, Field


JsonDict = Dict[str, Any]


class RegistrationIn(BaseModel):
    full_name: str = Field(min_length=2)
    email: EmailStr
    phone: str = Field(min_length=5)
    date_of_birth: str


class ProfileIn(BaseModel):
    full_name: Optional[str] = None
    location: Optional[str] = None
    profile: JsonDict = Field(default_factory=dict)
    family_members: List[JsonDict] = Field(default_factory=list)
    trusted_contacts: List[JsonDict] = Field(default_factory=list)


class DigitalAssetsIn(BaseModel):
    digital_assets: JsonDict = Field(default_factory=dict)


class InsurancePropertyIn(BaseModel):
    insurance_policies: List[JsonDict] = Field(default_factory=list)
    property_records: List[JsonDict] = Field(default_factory=list)
    documents: List[str] = Field(default_factory=list)


class FinalWishesIn(BaseModel):
    final_wishes: JsonDict = Field(default_factory=dict)
    documents: List[str] = Field(default_factory=list)


class MemoryVaultIn(BaseModel):
    memory_vault: JsonDict = Field(default_factory=dict)


class ActivationIn(BaseModel):
    activation_code: str
    requested_by: str = "Family executor"


class DeathDeclarationIn(BaseModel):
    activation_code: str
    declarant_name: str = Field(min_length=2)
    declarant_email: EmailStr
    date_of_death: str
    place_of_death: Optional[str] = None
    confirmation_note: str = ""


class LegacyPlanOut(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    date_of_birth: str
    activation_code: str
    status: str
    location: str
    profile: JsonDict
    family_members: List[JsonDict]
    trusted_contacts: List[JsonDict]
    digital_assets: JsonDict
    insurance_policies: List[JsonDict]
    property_records: List[JsonDict]
    documents: List[str]
    final_wishes: JsonDict
    memory_vault: JsonDict
    executor_logs: List[JsonDict]
