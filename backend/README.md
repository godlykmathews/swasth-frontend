# AFTERLIFE AI Backend

FastAPI backend backed by Supabase Postgres.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Put the Supabase project values and database password in `backend/.env`:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-publishable-key
SUPABASE_DB_PASSWORD=your-database-password
DATABASE_URL=postgresql://...
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
EMAIL_DELIVERY_ENABLED=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=work.gkm@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM_EMAIL=work.gkm@gmail.com
SMTP_FROM_NAME=AFTERLIFE AI Executor
SMTP_TEST_RECIPIENT=godlykmathews2@gmail.com
SMTP_FORCE_TEST_RECIPIENT=true
```

`SUPABASE_DB_HOST` can be left blank. The backend derives `db.<project-ref>.supabase.co` from `SUPABASE_URL`.
If that direct host does not resolve on your network/project, paste the Supabase dashboard pooler connection string into `DATABASE_URL`.

When `DATABASE_URL` is not set and the direct database host is unavailable, FastAPI still starts. `/health` will show `schema_ready: false` and include the startup error.

## Real Email Delivery

Real email is opt-in. For Gmail, turn on 2-Step Verification for `work.gkm@gmail.com`, create a Google App Password, then put that App Password in `SMTP_PASSWORD`.

For hackathon testing, keep `SMTP_FORCE_TEST_RECIPIENT=true`. The backend will generate a separate email for Netflix, Facebook, insurance, and every other saved service, but deliver all of them to `SMTP_TEST_RECIPIENT` instead of real company inboxes.

Set `EMAIL_DELIVERY_ENABLED=true` only after the SMTP values are filled in.

## Run

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API will auto-create the `legacy_plans` and `executor_activations` tables when `AUTO_MIGRATE=true`.

## Key Endpoints

- `GET /health`
- `POST /api/register`
- `GET /api/activation-code?email=mathews.joseph@example.com`
- `GET /api/profile/{legacy_id}`
- `PUT /api/profile/{legacy_id}`
- `GET /api/digital-assets/{legacy_id}`
- `PUT /api/digital-assets/{legacy_id}`
- `GET /api/insurance-property/{legacy_id}`
- `PUT /api/insurance-property/{legacy_id}`
- `GET /api/will-final-wishes/{legacy_id}`
- `PUT /api/will-final-wishes/{legacy_id}`
- `GET /api/memory-vault/{legacy_id}`
- `PUT /api/memory-vault/{legacy_id}`
- `GET /api/executor/{legacy_id}`
- `POST /api/executor/activate`
- `POST /api/death/declare`
- `GET /api/notifications/{legacy_id}`
- `POST /api/uploads/{legacy_id}` multipart upload with `file` and `category`
- `GET /api/uploads/{legacy_id}?category=memory-photo`
