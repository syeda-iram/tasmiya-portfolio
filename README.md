# Tasmiya's Portfolio — with Supabase Contact Form

A modern, dark-themed one-page portfolio for **Syeda Tasmiya Iram**, built with
HTML/CSS/JS and deployed on Vercel. The contact form is backed by a Supabase
PostgreSQL table via a secure serverless function — the secret keys never reach
the browser.

🔗 **Live site:** https://tasmiya-portfolio-cc8o.vercel.app  
📁 **GitHub:** https://github.com/syeda-iram/tasmiya-portfolio

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JS (single file) |
| Serverless API | Vercel Functions (`api/contact.js`) |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

---

## Project Structure

```
tasmiya-portfolio/
├── index.html          # Full portfolio (HTML + CSS + JS in one file)
├── api/
│   └── contact.js      # Serverless function — validates & saves to Supabase
├── schema.sql          # Run once in Supabase SQL Editor to create the table
├── package.json        # Dependencies (@supabase/supabase-js)
├── .env.example        # Template — copy to .env for local development
└── .gitignore          # Keeps .env and node_modules out of Git
```

---

## How It Works

1. Visitor fills out the contact form on the page
2. JS sends a `POST` request to `/api/contact`
3. The serverless function validates the input and calls Supabase
4. The message is saved in the `messages` table (Row Level Security ON)
5. Only the server-side function can read/write the table — never the browser

---

## Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Vercel CLI](https://vercel.com/cli): `npm install -g vercel`
- A Supabase project (free tier works)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/syeda-iram/tasmiya-portfolio.git
cd tasmiya-portfolio

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env
```

Open `.env` and fill in your Supabase credentials:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ Use the **service_role** key (not the anon key). Keep it secret — never commit `.env` to Git.

### Run Locally

```bash
vercel dev
```

Opens at `http://localhost:3000`. Both the static site and `/api/contact`
function work exactly like production.

---

## Supabase Setup

1. Go to [supabase.com](https://supabase.com) → create a free project
2. Open **SQL Editor → New query**
3. Paste the contents of `schema.sql` and click **Run**
   - Creates the `messages` table with Row Level Security enabled
   - Only the service role key (server-side) can insert rows
4. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

To view contact form submissions: **Supabase → Table Editor → messages**

---

## Deployment (Vercel)

This project is already deployed. To deploy your own fork:

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo
3. Add Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**

Vercel auto-detects `index.html` as static content and `api/contact.js` as a
serverless function — no extra configuration needed.

---

## Security Notes

- `.env` is in `.gitignore` — secrets never reach GitHub
- Supabase Row Level Security is **ON** with no public policies
- The browser never communicates with Supabase directly
- Input is validated server-side (length limits + email format check)
