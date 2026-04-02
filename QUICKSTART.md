# 🎯 QUICK START GUIDE

## Mulai Development dalam 5 Menit

---

## 1️⃣ SETUP LOKAL (Sekali aja)

### Install Dependencies

```bash
cd easeyourneeds
npm install
```

### Setup Environment

```bash
# Copy .env.example ke .env.local
cp .env.example .env.local

# Edit .env.local dengan credentials kamu
# Minimal setup untuk development:
# - DATABASE_URL (Supabase)
# - NEXTAUTH_SECRET
```

### Setup Database (Supabase)

```bash
# 1. Buat project di https://supabase.com
# 2. Dapatkan connection string dari:
#    Project Settings → Database → Connection string

# 3. Run migrations
psql "postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres" \
  -f migrations/001_initial_schema.sql
```

---

## 2️⃣ DEVELOPMENT WORKFLOW

### Option A: Local Development (Laptop Kuat)

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

**Keuntungan:**
- ✅ Fast iteration
- ✅ No internet needed (except for APIs)
- ✅ Easy debugging

**Kekurangan:**
- ⚠️ No HTTPS (webhook testing susah)
- ⚠️ Laptop resource usage

---

### Option B: Vercel-First Development (Recommended!)

```bash
# 1. Code di local (VS Code)
# 2. Commit & push
git add .
git commit -m "Feature: Add something"
git push

# 3. Vercel auto-deploy (~60 detik)
# 4. Test di preview URL:
#    https://easeyourneeds-git-branch-name.vercel.app
```

**Keuntungan:**
- ✅ Laptop ringan (build di Vercel)
- ✅ HTTPS otomatis (webhook ready!)
- ✅ Mirror production environment
- ✅ Shareable preview URL

**Kekurangan:**
- ⚠️ Butuh internet
- ⚠️ Deploy time ~60 detik

---

## 3️⃣ GIT WORKFLOW

### Branch Naming

```bash
# Feature branches
git checkout -b feature/login
git checkout -b feature/booking-system
git checkout -b feature/reports

# Bugfix branches
git checkout -b fix/auth-error
git checkout -b fix/booking-crash

# Always push to branch
git push origin feature/login
```

### Pull Request (Optional)

```
1. Push ke branch
2. Buka GitHub → Pull Requests
3. Create PR → Review
4. Merge to main
5. Vercel auto-deploy production
```

---

## 4️⃣ TESTING CHECKLIST

### Local Testing

```bash
# 1. Build test
npm run build

# 2. Type check
npx tsc --noEmit

# 3. Lint
npm run lint
```

### Vercel Preview Testing

```
✓ Homepage loads
✓ Register works
✓ Login works
✓ Dashboard accessible
✓ Booking flow works
✓ Recording page loads
✓ Reports pages load (5 pages)
✓ Mobile responsive
```

---

## 5️⃣ COMMON TASKS

### Add New Page

```bash
# 1. Create file di app/
touch app/(dashboard)/new-feature/page.tsx

# 2. Add component
echo "export default function NewFeature() { return <div>New</div> }" > app/(dashboard)/new-feature/page.tsx

# 3. Commit & push
git add .
git commit -m "Add new feature page"
git push
```

### Add API Endpoint

```bash
# 1. Create route file
touch app/api/v1/new-endpoint/route.ts

# 2. Add handler
cat > app/api/v1/new-endpoint/route.ts << EOF
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true });
}
EOF

# 3. Test di preview URL
```

### Database Migration

```bash
# 1. Create new migration file
touch migrations/003_new_feature.sql

# 2. Add SQL
echo "ALTER TABLE users ADD COLUMN new_field TEXT;" > migrations/003_new_feature.sql

# 3. Run migration
psql $DATABASE_URL -f migrations/003_new_feature.sql
```

---

## 6️⃣ DEBUGGING TIPS

### Vercel Logs

```
1. Vercel Dashboard → Project → Deployments
2. Click deployment
3. View logs
4. Filter by error/warning
```

### Supabase Logs

```
1. Supabase Dashboard → Database → Logs
2. Filter by query type
3. Check for errors
```

### Browser DevTools

```javascript
// Console logs
console.log('Debug:', data);

// Network tab
// - Check API requests
// - Check response status
// - Check headers
```

---

## 7️⃣ ENV VARIABLES CHEAT SHEET

### Required (Minimal untuk development)

```bash
# Database
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...

# Auth
NEXTAUTH_SECRET=generate_me_a_secret_32_chars
NEXTAUTH_URL=http://localhost:3000
```

### Optional (Untuk fitur lengkap)

```bash
# Cloudflare R2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=easeyourneeds-recordings
R2_PUBLIC_URL=...

# Zoom
ZOOM_ACCOUNT_ID=...
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...

# Xendit
XENDIT_API_KEY=...
XENDIT_CALLBACK_TOKEN=...

# WhatsApp
WHATSAPP_API_KEY=...

# Email
RESEND_API_KEY=...
```

---

## 8️⃣ PROJECT STRUCTURE REFERENCE

```
app/
├── (public)/          # Landing page, terms, privacy
├── (auth)/            # Signin, register, forgot-password
├── (dashboard)/       # Customer dashboard
│   ├── dashboard/     # Home
│   ├── bookings/      # Booking management
│   ├── recordings/    # Recording library
│   └── reports/       # ⭐ Meeting reports (5 pages)
│       ├── [id]/
│       │   ├── summary/       # AI Summary
│       │   ├── participants/  # Participants list
│       │   ├── polls/         # Poll results
│       │   ├── chat/          # Chat highlights
│       │   └── recording/     # Video player
├── (admin)/           # Admin dashboard
└── api/               # API routes
    ├── v1/            # API endpoints
    ├── webhooks/      # Webhook handlers
    └── cron/          # Cron jobs

src/
├── components/        # React components
├── lib/               # Utilities (db, auth, r2, zoom)
├── hooks/             # Custom hooks
└── types/             # TypeScript types

migrations/            # SQL migrations
```

---

## 9️⃣ HOTKEYS & COMMANDS

### Development

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Git

```bash
git status           # Check status
git add .            # Stage all changes
git commit -m "..."  # Commit
git push             # Push to GitHub
git pull             # Pull latest changes
```

### Database

```bash
psql $DATABASE_URL -c "SELECT * FROM users;"  # Query
psql $DATABASE_URL -f migrations/001.sql      # Run migration
```

---

## 🔟 TROUBLESHOOTING

### "Module not found"

```bash
# Clear cache
rm -rf node_modules .next
npm install
```

### "Database connection error"

```bash
# Check DATABASE_URL format
# Should be: postgresql://user:pass@host:port/db

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### "NEXTAUTH_SECRET must be at least 32 characters"

```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Update .env.local
```

### "Build failed on Vercel"

```
1. Check build logs di Vercel
2. Test build locally: npm run build
3. Fix errors
4. Push again
```

---

## 📚 NEXT STEPS

Setelah setup dasar:

1. ✅ Customize landing page
2. ✅ Implement booking flow
3. ✅ Setup Zoom integration
4. ✅ Setup Xendit payment
5. ✅ Implement reports pages (5 pages)
6. ✅ Setup WhatsApp notifications
7. ✅ Testing end-to-end
8. ✅ Deploy to production

---

**Happy Coding!** 🚀

**Last Updated:** 3 April 2026
