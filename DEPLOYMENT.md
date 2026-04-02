# 🚀 DEPLOYMENT GUIDE

## Step-by-Step: GitHub + Vercel Deployment

---

## 1️⃣ SETUP GITHUB REPOSITORY

### Initialize Git

```bash
cd easeyourneeds

# Initialize git (jika belum)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Ease Your Needs SaaS"
```

### Create GitHub Repository

```bash
# 1. Buka https://github.com/new
# 2. Repository name: easeyourneeds
# 3. Visibility: Private (recommended)
# 4. Click "Create repository"
```

### Push to GitHub

```bash
# Add remote (ganti USERNAME dengan GitHub username kamu)
git remote add origin https://github.com/USERNAME/easeyourneeds.git

# Rename branch to main
git branch -M main

# Push
git push -u origin main
```

---

## 2️⃣ SETUP VERCEL

### Login ke Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login
```

### Import Project di Vercel Dashboard

```
1. Buka https://vercel.com/dashboard
2. Click "Add New Project"
3. Import Git Repository → Pilih "easeyourneeds"
4. Configure Project:
   - Framework Preset: Next.js (auto-detect)
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Click "Deploy"
```

---

## 3️⃣ SETUP ENVIRONMENT VARIABLES

### Di Vercel Dashboard

```
1. Project Settings → Environment Variables
2. Add variables berikut:

# Database (Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[YOUR_KEY]

# Authentication
NEXTAUTH_SECRET=[GENERATE_RANDOM_32_CHARS]
NEXTAUTH_URL=https://easeyourneeds.vercel.app

# Cloudflare R2
R2_ACCOUNT_ID=[YOUR_ACCOUNT_ID]
R2_ACCESS_KEY_ID=[YOUR_ACCESS_KEY]
R2_SECRET_ACCESS_KEY=[YOUR_SECRET_KEY]
R2_BUCKET_NAME=easeyourneeds-recordings
R2_PUBLIC_URL=https://[BUCKET].[ACCOUNT_ID].r2.cloudflarestorage.com

# Zoom API
ZOOM_ACCOUNT_ID=[YOUR_ACCOUNT_ID]
ZOOM_CLIENT_ID=[YOUR_CLIENT_ID]
ZOOM_CLIENT_SECRET=[YOUR_SECRET]

# Xendit Payment
XENDIT_API_KEY=xnd_development_[YOUR_KEY]
XENDIT_CALLBACK_TOKEN=[YOUR_TOKEN]

# WhatsApp (Fonnte/Watzap)
WHATSAPP_API_KEY=[YOUR_KEY]

# Email (Resend)
RESEND_API_KEY=re_[YOUR_KEY]

# Cron Jobs
CRON_SECRET=[YOUR_SECRET]

3. Click "Save"
```

### Generate NEXTAUTH_SECRET

```bash
# OpenSSL
openssl rand -base64 32

# Atau Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 4️⃣ SETUP DATABASE (SUPABASE)

### Create Supabase Project

```
1. Buka https://supabase.com
2. Click "New Project"
3. Project name: easeyourneeds
4. Database password: [SAVE THIS!]
5. Region: Singapore (closest to Indonesia)
6. Click "Create new project"
```

### Run Migrations

```bash
# Dapatkan DATABASE_URL dari Supabase:
# Project Settings → Database → Connection string → URI

# Run migrations
psql $DATABASE_URL -f migrations/001_initial_schema.sql

# Seed data (optional - untuk testing)
psql $DATABASE_URL -f migrations/002_seed_data.sql
```

### Verify Database

```bash
# Check tables created
psql $DATABASE_URL -c "\dt"

# Should show 15 tables
```

---

## 5️⃣ SETUP CLOUDFLARE R2

### Create R2 Bucket

```
1. Login ke https://dash.cloudflare.com
2. R2 Storage → Create Bucket
3. Bucket name: easeyourneeds-recordings
4. Region: Singapore (closest to Indonesia)
5. Click "Create bucket"
```

### Create API Token

```
1. R2 → API Tokens → Create API Token
2. Permissions: Object Read & Write
3. Select bucket: easeyourneeds-recordings
4. Click "Create API Token"
5. Save:
   - Access Key ID
   - Secret Access Key
   - Account ID
```

---

## 6️⃣ SETUP ZOOM API

### Create Zoom App

```
1. Buka https://marketplace.zoom.us/develop/
2. Create → Server-to-Server OAuth App
3. App Name: Ease Your Needs
4. Redirect URL: https://easeyourneeds.vercel.app
5. Save credentials:
   - Account ID
   - Client ID
   - Client Secret
```

### Subscribe Events

```
1. App → Event Subscriptions
2. Subscribe:
   - meeting.ended
   - recording.completed
3. Webhook URL: https://easeyourneeds.vercel.app/api/webhooks/zoom
```

---

## 7️⃣ DEPLOY TO PRODUCTION

### Push to Main Branch

```bash
# Make changes
git add .
git commit -m "Feature: Add booking system"
git push origin main
```

### Vercel Auto-Deploy

```
Vercel akan auto-deploy setiap push ke main branch:
1. Push → Vercel detect changes
2. Build (~60 detik)
3. Deploy to production
4. Preview URL: https://easeyourneeds.vercel.app
```

### Check Deployment Status

```
1. Vercel Dashboard → Project → Deployments
2. Check build logs
3. If failed → View logs → Fix errors → Push again
```

---

## 8️⃣ SETUP CUSTOM DOMAIN (Optional)

### Add Domain di Vercel

```
1. Project Settings → Domains
2. Add domain: easeyourneeds.com
3. Verify DNS records
4. Auto SSL certificate
```

### Update NEXTAUTH_URL

```
1. Project Settings → Environment Variables
2. Update NEXTAUTH_URL: https://easeyourneeds.com
3. Redeploy
```

---

## 9️⃣ SETUP WEBHOOKS

### Xendit Webhook

```
1. Xendit Dashboard → Settings → Webhooks
2. Add webhook URL:
   https://easeyourneeds.vercel.app/api/webhooks/xendit
3. Events: Payment status changed
4. Callback token: Set di .env
```

### Zoom Webhook

```
1. Zoom App → Event Subscriptions
2. Webhook URL:
   https://easeyourneeds.vercel.app/api/webhooks/zoom
3. Events: meeting.ended, recording.completed
```

---

## 🔟 MONITORING & MAINTENANCE

### Vercel Analytics

```
1. Project → Analytics
2. View:
   - Page views
   - Performance
   - Web Vitals
```

### Error Monitoring (Sentry)

```bash
# Install Sentry
npm install @sentry/nextjs

# Setup
npx @sentry/wizard@latest -i nextjs

# Add SENTRY_DSN to Vercel env vars
```

### Database Backups (Supabase)

```
Supabase auto-backup:
- Daily backups (7 days retention)
- Point-in-time recovery

Manual backup:
pg_dump $DATABASE_URL > backup.sql
```

---

## 📋 DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All dependencies installed
- [ ] `.env.local` configured
- [ ] Database migrations run
- [ ] Build passes locally (`npm run build`)
- [ ] No TypeScript errors

### GitHub Setup

- [ ] Repository created
- [ ] Code pushed to main
- [ ] `.gitignore` correct (no .env!)

### Vercel Setup

- [ ] Project imported from GitHub
- [ ] All environment variables set
- [ ] Build command configured
- [ ] Auto-deploy enabled

### Database (Supabase)

- [ ] Project created
- [ ] Migrations applied
- [ ] Connection string in Vercel
- [ ] Tables verified

### Storage (Cloudflare R2)

- [ ] Bucket created
- [ ] API token generated
- [ ] Credentials in Vercel

### Third-Party Services

- [ ] Zoom App created
- [ ] Xendit API key set
- [ ] WhatsApp API configured
- [ ] Resend API key set

### Webhooks

- [ ] Xendit webhook configured
- [ ] Zoom webhook configured
- [ ] Webhook endpoints tested

### Post-Deployment

- [ ] Homepage loads
- [ ] Register works
- [ ] Login works
- [ ] Booking flow tested
- [ ] Webhooks received

---

## 🐛 TROUBLESHOOTING

### Build Failed

```bash
# Check locally
npm run build

# Common issues:
# - TypeScript errors
# - Missing environment variables
# - Import path errors
```

### Database Connection Error

```bash
# Check DATABASE_URL format
postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Webhook Not Working

```
1. Check HTTPS URL (required)
2. Verify signature/token
3. Check Vercel logs
4. Test with webhook.site
```

### 404 on Routes

```
1. Check middleware.ts
2. Verify file structure (app/(auth)/signin/page.tsx)
3. Clear .next cache: rm -rf .next
```

---

## 📞 SUPPORT

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase logs
3. Review error messages
4. Search documentation

---

**Last Updated:** 3 April 2026
**Version:** 1.0.0
