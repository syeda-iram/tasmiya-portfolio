# Tasmiya's Portfolio — with Supabase Contact Form

Static one-page portfolio (`index.html`) plus a Vercel serverless function
(`api/contact.js`) that saves contact-form messages into a Supabase table.

The Supabase keys never touch the browser — the form calls `/api/contact`,
and only that server-side function talks to Supabase using the secret
service role key. This is why you need environment variables + Vercel.

---

## 1. Supabase setup

1. Go to https://supabase.com → create a free project.
2. Once it's ready, open **SQL Editor** → **New query**.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
   This creates a `messages` table with Row Level Security locked down
   (only your server can read/write it).
4. Go to **Settings → API** and copy two values:
   - **Project URL** → this is your `SUPABASE_URL`
   - **service_role key** (under "Project API keys", NOT the `anon` key)
     → this is your `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ The service role key is secret — never put it in `index.html` or
   commit it to GitHub. It only goes in environment variables.

## 2. Local setup

```bash
# install dependencies
npm install

# create your real .env file from the example
cp .env.example .env
```

Open `.env` and paste in your real `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY`.

To run it locally with the serverless function working, install the
Vercel CLI once and use `vercel dev` (plain `index.html` double-click
won't run `/api/contact.js`, since that needs a Node server):

```bash
npm install -g vercel
vercel dev
```

This starts a local server (usually `http://localhost:3000`) where both
the site and the `/api/contact` function work exactly like production.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio with Supabase contact form"
git branch -M main
git remote add origin https://github.com/syeda-iram/YOUR-REPO-NAME.git
git push -u origin main
```

`.env` is in `.gitignore`, so your real keys will **not** be pushed — only
`.env.example` (the blank template) goes to GitHub. This is intentional.

## 4. Deploy on Vercel

1. Go to https://vercel.com → **Add New Project** → import this GitHub repo.
2. Before deploying, open **Environment Variables** and add:
   - `SUPABASE_URL` → your project URL
   - `SUPABASE_SERVICE_ROLE_KEY` → your service role key
3. Click **Deploy**. Vercel auto-detects `index.html` as static content
   and `api/contact.js` as a serverless function — no extra config needed.

Once live, your contact form will save every message straight into the
`messages` table in Supabase. You can view submissions anytime in
**Supabase → Table Editor → messages**.

## Project structure

```
portfolio/
├── index.html            # the site (all HTML/CSS/JS in one file)
├── api/
│   └── contact.js        # serverless function → inserts into Supabase
├── supabase/
│   └── schema.sql         # run once in Supabase SQL Editor
├── package.json
├── .env.example           # template — copy to .env locally
└── .gitignore              # keeps .env and node_modules out of git
```
