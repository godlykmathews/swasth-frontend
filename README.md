# AFTERLIFE AI

A full-stack hackathon prototype for a digital estate workflow, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, FastAPI, Supabase Postgres, Cloudinary uploads, and optional OpenAI-generated notification drafts.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` or the port printed by Next.js.

## FastAPI Backend

The backend lives in `backend/` and uses Supabase Postgres.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_DB_PASSWORD`, `CLOUDINARY_URL`, and optionally `OPENAI_API_KEY` in `backend/.env`, then run:

```bash
npm run backend:dev
```

The frontend reads `NEXT_PUBLIC_API_URL`, defaulting to `http://127.0.0.1:8000`.

If `db.<project-ref>.supabase.co` does not resolve, copy the Supabase dashboard's database pooler URI into `DATABASE_URL` in `backend/.env`.

To send real email during the executor flow, configure Gmail SMTP in `backend/.env`:

```bash
EMAIL_DELIVERY_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=work.gkm@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM_EMAIL=work.gkm@gmail.com
SMTP_TEST_RECIPIENT=godlykmathews2@gmail.com
SMTP_FORCE_TEST_RECIPIENT=true
```

Use a Google App Password for `SMTP_PASSWORD`; a normal Gmail password will not work.

## Workflow

- `/` quiet entry page
- `/setup` create the legacy record in Supabase
- `/activation-code` display the generated family activation code
- `/executor` enter the code, mark the person deceased, and generate separate service notification emails for subscriptions, social accounts, financial accounts, and insurance policies

Older concept pages are still present for reference, but the primary flow is `/`, `/setup`, `/activation-code`, and `/executor`.

## Included Assets

Generated project assets live in `public/images`:

- `legacy-portrait.png`
- `sky-garden.png`
- `memory-album.png`
