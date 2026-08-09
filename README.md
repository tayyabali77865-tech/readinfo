# ReadInfo PK – Auto News Website

A fully automated, SEO-optimized news website that pulls content from **readinfo.org.pk** and auto-updates every hour via Vercel ISR (Incremental Static Regeneration).

## 🚀 Features

- ✅ Auto-scrapes readinfo.org.pk via WordPress REST API
- ✅ Individual SEO page for every article (`/news/[slug]`)
- ✅ Full SEO: title, meta description, Open Graph, Twitter Card, JSON-LD schema
- ✅ Dynamic sitemap.xml for Google indexing
- ✅ robots.txt
- ✅ Auto-updates every **1 hour** (Vercel ISR + Cron)
- ✅ Premium dark news portal design
- ✅ Share buttons (WhatsApp, Facebook, Twitter)
- ✅ Breadcrumb navigation
- ✅ Related articles sidebar

## 📁 Project Structure

```
readinfo/
├── lib/api.js              # WordPress REST API fetcher
├── pages/
│   ├── index.js            # Homepage (ISR: 1hr)
│   ├── news/[slug].js      # Article pages (ISR: 1hr)
│   ├── sitemap.xml.js      # Dynamic sitemap
│   ├── robots.txt.js       # robots.txt
│   ├── 404.js              # Custom 404
│   └── api/revalidate.js   # Cron trigger endpoint
├── styles/globals.css      # Premium dark CSS
├── vercel.json             # Cron job config
└── next.config.js          # Image domains
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

1. **GitHub pe push karein:**
   ```bash
   git init
   git add .
   git commit -m "Initial ReadInfo website"
   git remote add origin https://github.com/YOUR_USERNAME/readinfo.git
   git push -u origin main
   ```

2. **Vercel par deploy karein:**
   - [vercel.com](https://vercel.com) pe login karein
   - "New Project" → GitHub repo select karein
   - Environment variable add karein:
     - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
     - `REVALIDATE_SECRET` = any random string (optional security)
   - Deploy!

## ⚙️ Auto-Update Kaise Kaam Karta Hai?

1. **ISR (Incremental Static Regeneration):** Har page `revalidate: 3600` ke saath set hai
2. **Vercel Cron:** `vercel.json` mein cron job hai jo har ghante `/api/revalidate` call karta hai
3. **New article:** Jab koi naya article readinfo.org.pk pe aata hai, 1 ghante mein yeh website pe automatically aa jata hai

## 🔍 SEO Files

- **Sitemap:** `/sitemap.xml` — sab articles ka list Google ke liye
- **robots.txt:** `/robots.txt` — crawlers guide karta hai
