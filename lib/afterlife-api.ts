export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

export const DEMO_LEGACY_ID = "00000000-0000-4000-8000-000000000001";

export type RegistrationPayload = {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
};

export type ExecutorResponse = {
  legacy_id: string;
  status: string;
  full_name: string;
  location: string;
  stats: {
    profileCompletion: string;
    trustedContacts: number;
    assets: number;
    subscriptions: number;
    insurancePolicies: number;
    propertyRecords: number;
  };
  timeline: string[];
  logs: Array<{ time: string; event: string }>;
  summary: {
    subscriptions: string[];
    insurance: string[];
    properties: string[];
  };
};

export type LegacySetupPayload = RegistrationPayload & {
  location: string;
  address: string;
  nationality: string;
  blood_group: string;
  declarant_email: string;
  trusted_contacts: Array<{
    name: string;
    role: string;
    email: string;
    phone: string;
  }>;
  subscriptions: string[];
  social_accounts: string[];
  financial_accounts: string[];
  insurance_policies: Array<{
    title: string;
    policy: string;
    note: string;
  }>;
  final_message: string;
};

export type NotificationRecord = {
  id: string;
  service_type: string;
  service_name: string;
  recipient_email: string;
  subject: string;
  body: string;
  status: string;
  provider: string;
  sent_at?: string | null;
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function saveLegacySession(legacyId: string, activationCode: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("afterlife_legacy_id", legacyId);
  window.localStorage.setItem("afterlife_activation_code", activationCode);
}

export function getLegacyId() {
  if (typeof window === "undefined") {
    return DEMO_LEGACY_ID;
  }

  return window.localStorage.getItem("afterlife_legacy_id") || DEMO_LEGACY_ID;
}

export function getActivationCode(fallback = "AFTR-8XJ2-92LM") {
  if (typeof window === "undefined") {
    return fallback;
  }

  return window.localStorage.getItem("afterlife_activation_code") || fallback;
}

export function registerLegacy(payload: RegistrationPayload) {
  return requestJson<{
    legacy_id: string;
    activation_code: string;
    plan: Record<string, unknown>;
  }>("/api/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function fetchActivationCode(email = "mathews.joseph@example.com") {
  return requestJson<{
    legacy_id: string;
    full_name: string;
    activation_code: string;
  }>(`/api/activation-code?email=${encodeURIComponent(email)}`);
}

export function fetchExecutor(legacyId: string) {
  return requestJson<ExecutorResponse>(`/api/executor/${legacyId}`);
}

export function updateProfile(
  legacyId: string,
  payload: {
    full_name?: string;
    location?: string;
    profile?: Record<string, unknown>;
    family_members?: Array<Record<string, unknown>>;
    trusted_contacts?: Array<Record<string, unknown>>;
  }
) {
  return requestJson<{ plan: Record<string, unknown> }>(`/api/profile/${legacyId}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function activateExecutor(activationCode: string, requestedBy = "Family executor") {
  return requestJson<{
    legacy_id: string;
    status: string;
    logs: Array<{ time: string; event: string }>;
  }>("/api/executor/activate", {
    method: "POST",
    body: JSON.stringify({
      activation_code: activationCode,
      requested_by: requestedBy
    })
  });
}

export async function createCompleteLegacyPlan(payload: LegacySetupPayload) {
  const registration = await registerLegacy({
    full_name: payload.full_name,
    email: payload.email,
    phone: payload.phone,
    date_of_birth: payload.date_of_birth
  });

  const legacyId = registration.legacy_id;
  await updateProfile(legacyId, {
    full_name: payload.full_name,
    location: payload.location,
    profile: {
      address: payload.address,
      nationality: payload.nationality,
      bloodGroup: payload.blood_group,
      declarantEmail: payload.declarant_email,
      photoUrl: "/images/legacy-portrait.png"
    },
    family_members: [],
    trusted_contacts: payload.trusted_contacts
  });

  await requestJson<{ plan: Record<string, unknown> }>(`/api/digital-assets/${legacyId}`, {
    method: "PUT",
    body: JSON.stringify({
      digital_assets: {
        subscriptions: payload.subscriptions,
        socialAccounts: payload.social_accounts,
        financialAccounts: payload.financial_accounts
      }
    })
  });

  await requestJson<{ plan: Record<string, unknown> }>(`/api/insurance-property/${legacyId}`, {
    method: "PUT",
    body: JSON.stringify({
      insurance_policies: payload.insurance_policies,
      property_records: [],
      documents: []
    })
  });

  await requestJson<{ plan: Record<string, unknown> }>(`/api/will-final-wishes/${legacyId}`, {
    method: "PUT",
    body: JSON.stringify({
      final_wishes: {
        finalMessage: payload.final_message,
        funeralPreferences: "",
        burialInstructions: "",
        specialRequests: ""
      },
      documents: []
    })
  });

  saveLegacySession(legacyId, registration.activation_code);
  return registration;
}

export function declareDeath(payload: {
  activation_code: string;
  declarant_name: string;
  declarant_email: string;
  date_of_death: string;
  place_of_death?: string;
  confirmation_note?: string;
}) {
  return requestJson<{
    legacy_id: string;
    status: string;
    notifications: NotificationRecord[];
    logs: Array<{ time: string; event: string }>;
  }>("/api/death/declare", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function fetchNotifications(legacyId: string) {
  return requestJson<{ legacy_id: string; notifications: NotificationRecord[] }>(
    `/api/notifications/${legacyId}`
  );
}
