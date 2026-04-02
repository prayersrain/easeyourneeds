# 🚀 GIT PUSH & DEPLOYMENT GUIDE

## Step-by-Step untuk Push ke GitHub

---

## 1️⃣ CEK FILE YANG AKAN DI-COMMIT

```bash
cd "C:\Users\Zan\easeyourneeds - Copy - Copy\easeyourneeds"

# Lihat status file
git status
```

**Yang akan di-commit:**
- ✅ Semua code (app/, src/, migrations/)
- ✅ Configuration files (package.json, tsconfig.json, dll)
- ✅ Documentation (README.md, DEPLOYMENT.md, dll)

**Yang TIDAK akan di-commit (sudah di .gitignore):**
- ❌ `.env.local` (credentials kamu aman!)
- ❌ `node_modules/`
- ❌ `.next/`

---

## 2️⃣ GIT INIT & COMMIT

```bash
# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Ease Your Needs SaaS Platform

- Next.js 14 with App Router
- Password-based authentication (NextAuth.js)
- Supabase PostgreSQL database
- Cloudflare R2 storage
- Meeting Reports (5 pages: Summary, Participants, Polls, Chat, Recording)
- Dashboard with sidebar
- 17 database tables
- Complete documentation"
```

---

## 3️⃣ BUAT REPOSITORY DI GITHUB

```
1. Buka https://github.com/new
2. Repository name: easeyourneeds
3. Description: Automated Event & Booking Management SaaS
4. Visibility: Private (recommended) atau Public
5. JANGAN centang "Add README" (kita sudah punya)
6. Click "Create repository"
```

---

## 4️⃣ PUSH KE GITHUB

```bash
# Connect ke GitHub remote
# Ganti YOUR_USERNAME dengan username GitHub kamu
git remote add origin https://github.com/YOUR_USERNAME/easeyourneeds.git

# Rename branch ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Jika sukses, output:**
```
Enumerating objects: XXX, done.
Counting objects: 100% (XXX/XXX), done.
Writing objects: 100% (XXX/XXX), done.
Total XXX (delta XX), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (XX/XX), done.
To https://github.com/YOUR_USERNAME/easeyourneeds.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 5️⃣ DEPLOY KE VERCEL

### Option A: Via Vercel Dashboard (Recommended)

```
1. Buka https://vercel.com
2. Login dengan GitHub
3. Click "Add New Project"
4. Import Git Repository → Pilih "easeyourneeds"
5. Configure Project:
   - Framework Preset: Next.js (auto-detect)
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
6. Click "Deploy"
7. Tunggu ~60 detik
```

### Set Environment Variables di Vercel

```
1. Project Settings → Environment Variables
2. Add semua variables dari .env.local:
   - DATABASE_URL
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - XENDIT_API_KEY
   - ZOOM_* credentials
   - WHATSAPP_API_KEY
   - RESEND_API_KEY
   - R2_* credentials
   - dll
3. Click "Save"
4. Redeploy (Settings → Deployments → Redeploy)
```

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompt:
# - Set up and deploy? Y
# - Which scope? (pilih akun kamu)
# - Link to existing project? N
# - Project name? easeyourneeds
# - Directory? ./
# - Override settings? N
```

---

## 6️⃣ RUN DATABASE MIGRATION

```bash
# Run migration ke Supabase
psql "postgresql://postgres:vgn6LIZDk2a4WBN7@db.anczgzanagrqegiweclh.supabase.co:5432/postgres" \
  -f migrations/001_initial_schema.sql

# Run seed data (optional)
psql "postgresql://postgres:vgn6LIZDk2a4WBN7@db.anczgzanagrqegiweclh.supabase.co:5432/postgres" \
  -f migrations/002_seed_data.sql
```

**Verify tables created:**
```bash
psql "postgresql://postgres:vgn6LIZDk2a4WBN7@db.anczgzanagrqegiweclh.supabase.co:5432/postgres" \
  -c "\dt"
```

Should show 17 tables!

---

## 7️⃣ SETUP CLOUDFLARE R2 BUCKET

```
1. Login ke https://dash.cloudflare.com
2. R2 Storage → Create Bucket
3. Bucket name: easeyourneeds-recordings
4. Region: Singapore (atau closest)
5. Click "Create bucket"

Credentials sudah di .env.local:
- Account ID: c9e7e65559f429dcc7c4eafe1dfd4504
- Access Key ID: b15c41759827ba4fe9f57ebfc493ea80
- Secret Access Key: [sudah di .env.local]
```

---

## 8️⃣ TEST DEPLOYMENT

### Test di Local
```bash
npm run dev
# Open http://localhost:3000
```

### Test di Vercel Preview
```
Buka: https://easeyourneeds.vercel.app
atau
https://easeyourneeds-git-main-username.vercel.app
```

### Testing Checklist
- [ ] Homepage loads
- [ ] Register page works
- [ ] Login works
- [ ] Dashboard accessible
- [ ] Reports pages load (5 pages)
- [ ] No console errors

---

## 🔄 DAILY WORKFLOW

### Development Flow
```bash
# 1. Code di local
# Edit files di VS Code

# 2. Test local
npm run dev

# 3. Commit changes
git add .
git commit -m "Feature: Add booking system"

# 4. Push ke GitHub
git push

# 5. Vercel auto-deploy (~60 detik)
# Preview URL: https://easeyourneeds-git-feature.vercel.app
```

### Branch Workflow
```bash
# Create feature branch
git checkout -b feature/booking

# Code & commit
git add .
git commit -m "Add booking flow"

# Push branch
git push -u origin feature/booking

# Vercel akan auto-deploy preview URL
# https://easeyourneeds-git-feature-booking.vercel.app
```

---

## ⚠️ TROUBLESHOOTING

### Git Push Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/easeyourneeds.git
```

### "Permission denied (publickey)"
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/USERNAME/easeyourneeds.git
```

### Vercel Build Failed
```
1. Check build logs di Vercel dashboard
2. Test build locally: npm run build
3. Fix errors
4. Push again
```

### Database Connection Error
```bash
# Test connection
psql "postgresql://postgres:vgn6LIZDk2a4WBN7@db.anczgzanagrqegiweclh.supabase.co:5432/postgres" \
  -c "SELECT 1"
```

---

## 📋 CHECKLIST

### Pre-Push
- [ ] `.env.local` tidak ter-commit (cek .gitignore)
- [ ] `npm run build` passes locally
- [ ] No TypeScript errors
- [ ] Code tested di local

### Post-Push
- [ ] Repository created di GitHub
- [ ] Code pushed successfully
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Database migrations run
- [ ] R2 bucket created

---

## 🎉 DONE!

Setelah semua selesai:

**GitHub Repo:**
```
https://github.com/YOUR_USERNAME/easeyourneeds
```

**Vercel Production:**
```
https://easeyourneeds.vercel.app
```

**Vercel Preview (per branch):**
```
https://easeyourneeds-git-BRANCH_NAME.vercel.app
```

Good luck! 🚀
