# DNS Research: Connecting a Custom Domain to Vercel

**Project:** Tasmiya Portfolio — DevOps Internship 2026  
**Submitted by:** Syeda Tasmiya Iram  
**Note:** I do not currently own a custom domain, so this document researches and explains the process of connecting one, including all required DNS records.

---

## What is DNS?

**DNS (Domain Name System)** is the internet's phone book. When you type `tasmiya.dev` in a browser, DNS translates that human-readable name into an IP address (like `76.76.21.21`) so the browser knows which server to contact.

Without DNS records, your domain has no idea where to point traffic.

---

## DNS Records Required to Connect a Domain to Vercel

### 1. A Record (Address Record)

An **A record** maps your root/apex domain (e.g. `tasmiya.dev`) to an **IPv4 address**.

| Field | Value |
|-------|-------|
| **Type** | A |
| **Name / Host** | `@` (represents the root domain) |
| **Value / Points to** | `76.76.21.21` *(Vercel's IP)* |
| **TTL** | 3600 (or Auto) |

**Purpose:** When someone visits `https://tasmiya.dev`, this record tells DNS to route the request to Vercel's servers.

---

### 2. CNAME Record (Canonical Name Record)

A **CNAME record** maps a subdomain (e.g. `www.tasmiya.dev`) to another domain name instead of an IP address.

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Name / Host** | `www` |
| **Value / Points to** | `cname.vercel-dns.com` |
| **TTL** | 3600 (or Auto) |

**Purpose:** When someone visits `https://www.tasmiya.dev`, this record redirects them to Vercel's CNAME endpoint, which then serves the correct project.

> ⚠️ You cannot use a CNAME on the root/apex domain (`@`) — that's why an A record is needed for the root.

---

### 3. TXT Record (Text Record)

A **TXT record** stores arbitrary text, commonly used for **domain ownership verification**.

| Field | Value |
|-------|-------|
| **Type** | TXT |
| **Name / Host** | `@` or `_vercel` |
| **Value** | `vc-domain-verify=tasmiya-portfolio,abc123xyz` *(Vercel generates this)* |
| **TTL** | 3600 |

**Purpose:** Vercel uses TXT records to verify that you own the domain before connecting it. Without this, anyone could claim your domain.

---

## Step-by-Step: How to Connect a Domain to Vercel

### Step 1 — Add Domain in Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) → open your project
2. Click **Settings → Domains**
3. Type your domain (e.g. `tasmiya.dev`) and click **Add**
4. Vercel will show you the exact DNS records to add

![Vercel Domains Settings](https://vercel.com/docs-proxy/static/docs/concepts/projects/domains/add-domain.png)

---

### Step 2 — Log into Your Domain Registrar

Go to where you bought your domain (Namecheap, GoDaddy, Cloudflare, etc.) and find the **DNS Management** or **Advanced DNS** section.

---

### Step 3 — Add the DNS Records

Add the three records exactly as Vercel specifies:

```
Type    Host    Value                       TTL
----    ----    -----                       ---
A       @       76.76.21.21                 Auto
CNAME   www     cname.vercel-dns.com        Auto
TXT     @       vc-domain-verify=...        Auto
```

---

### Step 4 — Wait for DNS Propagation

DNS changes can take **5 minutes to 48 hours** to propagate worldwide. You can check propagation status at:
- [dnschecker.org](https://dnschecker.org)
- [whatsmydns.net](https://www.whatsmydns.net)

---

### Step 5 — Vercel Issues SSL Certificate Automatically

Once DNS propagation is complete, Vercel automatically:
- ✅ Detects the DNS records
- ✅ Issues a free **SSL/TLS certificate** via Let's Encrypt
- ✅ Marks the domain as **Valid Configuration**
- ✅ Your site is now live at `https://tasmiya.dev`

---

## DNS Record Summary Table

| Record | Host | Points To | Purpose |
|--------|------|-----------|---------|
| **A** | `@` | `76.76.21.21` | Root domain → Vercel IP |
| **CNAME** | `www` | `cname.vercel-dns.com` | www subdomain → Vercel |
| **TXT** | `@` | `vc-domain-verify=...` | Domain ownership verification |

---

## What Vercel's Domain Settings Page Looks Like

After adding DNS records correctly, the Vercel dashboard shows:

```
Domain                  Status
──────────────────────────────────────────────
tasmiya.dev             ✅ Valid Configuration
www.tasmiya.dev         ✅ Valid Configuration
```

If records are missing or wrong, it shows:
```
tasmiya.dev             ❌ Invalid Configuration
                        Missing A record for 76.76.21.21
```

---

## Why You Should Never Skip TXT Verification

Without TXT record verification:
- Anyone could point **their** project to **your** domain
- Vercel blocks domain connections without verified ownership
- It's a security layer to prevent domain hijacking

---

## Free Domain Options (For Future Reference)

If you want a free domain to practice with:

| Provider | Free Domain | Notes |
|----------|------------|-------|
| [Freenom](https://freenom.com) | `.tk`, `.ml`, `.ga`, `.cf` | Free for 12 months |
| [js.org](https://js.org) | `yourname.js.org` | For JS projects, via GitHub |
| GitHub Pages | `username.github.io` | Subdomain, no DNS needed |
| Vercel | `project.vercel.app` | Auto-provided on deploy ✅ |

---

## Current Deployment

Since no custom domain is owned, the portfolio is currently live at the Vercel-provided URL:

**🔗 https://tasmiya-portfolio-cc8o.vercel.app**

This URL is fully functional, HTTPS-secured, and globally accessible — identical to a custom domain in every technical way except the URL name.
