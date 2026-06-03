# 🎯 BizHunt

Hunt local businesses with **no website** — your untapped lead goldmine.

Filters by location, category, and star rating. Uses Google Maps Places API to find businesses, filters out any with a website, then uses Claude AI to look up their Instagram and Facebook handles.

---

## Project Structure

```
bizhunt/
├── api/
│   ├── places.js        ← Vercel serverless: proxies Google Maps (key stays server-side)
│   └── claude.js        ← Vercel serverless: proxies Anthropic API (key stays server-side)
├── public/
│   ├── index.html       ← App HTML
│   ├── styles.css       ← All styles
│   └── main.js          ← All frontend logic
├── .env.example         ← Template for your env vars
├── .gitignore
└── vercel.json          ← Vercel routing config
```

---

## Deploy to Vercel (5 minutes)

### Step 1 — Get your API keys

**Google Maps API key:**
1. Go to https://console.cloud.google.com
2. Create a project (or use an existing one)
3. Go to **APIs & Services → Enable APIs**
4. Enable **Places API** (the original one, not "Places API (New)")
5. Go to **APIs & Services → Credentials → Create Credentials → API Key**
6. Copy the key

**Anthropic API key:**
1. Go to https://console.anthropic.com/settings/api-keys
2. Click **Create Key**
3. Copy the key

---

### Step 2 — Push to GitHub

```bash
# If you don't have git set up:
git init
git add .
git commit -m "initial commit"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/bizhunt.git
git push -u origin main
```

---

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com and sign in (free account works)
2. Click **Add New → Project**
3. Import your GitHub repo
4. Click **Deploy** — Vercel auto-detects the config from `vercel.json`

---

### Step 4 — Add Environment Variables

After deploy, go to your project in Vercel:

1. Click **Settings → Environment Variables**
2. Add these two variables:

| Name | Value |
|------|-------|
| `GOOGLE_MAPS_API_KEY` | `AIza...your key...` |
| `ANTHROPIC_API_KEY` | `sk-ant-...your key...` |

3. Click **Save**
4. Go to **Deployments → Redeploy** (so the new env vars take effect)

---

### Step 5 — Done! 🎉

Your BizHunt is live at `https://your-project.vercel.app`

---

## Local Development

```bash
# Install Vercel CLI
npm i -g vercel

# Copy env template
cp .env.example .env.local
# Edit .env.local and add your actual keys

# Run locally (serves both static files and serverless functions)
vercel dev
```

App will run at http://localhost:3000

---

## How It Works

1. User picks location (country → city → area), categories, and min star rating
2. Frontend calls `/api/places` for each selected category
3. Vercel serverless function proxies the request to Google Maps using the server-side key
4. For each result with no website, frontend calls `/api/claude`
5. Claude serverless function asks the AI to find Instagram/Facebook handles
6. Results appear in a table with links to Google Maps reviews, Instagram, and Facebook
7. User can export everything to CSV

---

## Security

- ✅ API keys are **never** in the frontend code or browser
- ✅ Keys live in Vercel environment variables (server-side only)
- ✅ All Google Maps and Anthropic calls go through `/api/*` serverless proxies
- ✅ `.env.local` is gitignored — never committed

---

## Costs

- **Google Maps Places API**: $17 per 1,000 Text Search calls + $17 per 1,000 Place Details calls. Google gives $200/month free credit — enough for hundreds of hunts.
- **Anthropic Claude**: ~$0.003 per business enriched (Sonnet pricing). A hunt of 50 businesses ≈ $0.15.
- **Vercel**: Free tier covers unlimited personal projects.
