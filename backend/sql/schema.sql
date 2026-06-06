create extension if not exists pgcrypto;

create table if not exists legacy_plans (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null unique,
    phone text not null,
    date_of_birth date not null,
    activation_code text not null unique,
    status text not null default 'Draft',
    location text not null default 'Kerala, India',
    profile jsonb not null default '{}'::jsonb,
    family_members jsonb not null default '[]'::jsonb,
    trusted_contacts jsonb not null default '[]'::jsonb,
    digital_assets jsonb not null default '{}'::jsonb,
    insurance_policies jsonb not null default '[]'::jsonb,
    property_records jsonb not null default '[]'::jsonb,
    documents jsonb not null default '[]'::jsonb,
    final_wishes jsonb not null default '{}'::jsonb,
    memory_vault jsonb not null default '{}'::jsonb,
    executor_logs jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists executor_activations (
    id uuid primary key default gen_random_uuid(),
    legacy_plan_id uuid not null references legacy_plans(id) on delete cascade,
    activation_code text not null,
    requested_by text not null,
    status text not null default 'verified',
    created_at timestamptz not null default now()
);

create index if not exists idx_legacy_plans_activation_code on legacy_plans (activation_code);
create index if not exists idx_legacy_plans_email on legacy_plans (email);

create table if not exists cloudinary_assets (
    id uuid primary key default gen_random_uuid(),
    legacy_plan_id uuid not null references legacy_plans(id) on delete cascade,
    category text not null,
    original_filename text,
    public_id text not null,
    secure_url text not null,
    resource_type text,
    format text,
    bytes integer,
    width integer,
    height integer,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_cloudinary_assets_plan
on cloudinary_assets (legacy_plan_id, category);

create table if not exists death_declarations (
    id uuid primary key default gen_random_uuid(),
    legacy_plan_id uuid not null references legacy_plans(id) on delete cascade,
    activation_code text not null,
    declarant_name text not null,
    declarant_email text not null,
    date_of_death date not null,
    place_of_death text,
    confirmation_note text,
    created_at timestamptz not null default now()
);

create table if not exists outbound_notifications (
    id uuid primary key default gen_random_uuid(),
    legacy_plan_id uuid not null references legacy_plans(id) on delete cascade,
    death_declaration_id uuid references death_declarations(id) on delete set null,
    service_type text not null,
    service_name text not null,
    recipient_email text not null,
    subject text not null,
    body text not null,
    status text not null default 'sent_dummy',
    provider text not null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    sent_at timestamptz
);

create index if not exists idx_outbound_notifications_plan
on outbound_notifications (legacy_plan_id, created_at desc);
