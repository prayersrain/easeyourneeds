# Ease Your Needs - Automated Event & Booking Management SaaS

Platform SaaS B2B untuk penyewaan Zoom Business/Enterprise dan manajemen event digital (Operator, MC, OBS/VMIX) yang 100% terotomatisasi.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x atau lebih baru
- **PostgreSQL** 15+ (via Supabase)
- **Git**

### Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd easeyourneeds

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Edit .env.local dengan credentials Anda
# - Supabase URL & Key
# - Cloudflare R2 credentials
# - Zoom API credentials
# - Xendit API key
# - dll

# 5. Run database migrations
psql $DATABASE_URL -f migrations/001_initial_schema.sql

# 6. Seed initial data (optional)
psql $DATABASE_URL -f migrations/002_seed_data.sql

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Project Structure

```
easeyourneeds/
├── app/                      # Next.js App Router
│   ├── (public)/             # Public routes
│   ├── (auth)/               # Auth routes (signin, register)
│   ├── (dashboard)/          # Protected customer routes
│   ├── (admin)/              # Admin routes
│   └── api/                  # API routes
├── src/
│   ├── components/           # React components
│   ├── lib/                  # Utilities & clients
│   ├── hooks/                # Custom hooks
│   └── types/                # TypeScript types
├── migrations/               # SQL migrations
├── .env.example              # Environment template
├── middleware.ts             # Auth middleware
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL 15+ (Supabase) |
| **Auth** | NextAuth.js v5 (Credentials) |
| **Storage** | Cloudflare R2 |
| **Payment** | Xendit |
| **Video** | Zoom API |
| **Hosting** | Vercel |

---

## 🔐 Authentication

Project ini menggunakan **password-based authentication** (bukan magic link):

- Login dengan email + password
- Password di-hash dengan bcrypt
- Session JWT via NextAuth.js (30 hari)
- Email verification hanya untuk reset password

---

## 📊 Database Schema

### Main Tables (15 tables):

1. **users** - User accounts (customer, operator, admin)
2. **zoom_accounts** - Pool 30 akun Zoom
3. **bookings** - Booking meetings
4. **booking_addons** - Add-on services (MC, Operator, OBS)
5. **transactions** - Financial ledger
6. **withdrawals** - Withdrawal requests
7. **recordings** - Recording metadata (Cloudflare R2)
8. **meeting_reports** - AI summary, participants, polls, chat ⭐
9. **loyalty_points** - Loyalty program
10. **mc_profiles** - MC talent database
11. **operator_profiles** - Operator database
12. **pricing_config** - Dynamic pricing
13. **support_tickets** - Customer support
14. **failed_operations** - Dead letter queue
15. **sessions** - NextAuth sessions

---

## 🎯 Key Features

### Customer Portal
- ✅ Register & Login (password-based)
- ✅ Top-up saldo (Xendit VA + QRIS)
- ✅ Booking Zoom (instant auto-generate)
- ✅ Add-on MC, Operator, OBS
- ✅ Meeting Reports (AI Summary, Participants, Polls, Chat) ⭐
- ✅ Recording management (Cloudflare R2)
- ✅ Loyalty points
- ✅ Withdrawal

### Admin Dashboard
- ✅ Analytics & reporting
- ✅ Zoom pool management
- ✅ Withdrawal approval
- ✅ User management
- ✅ Dynamic pricing
- ✅ Support tickets

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Environment Variables di Vercel

Set semua variables dari `.env.example` di Vercel Dashboard:
- Settings → Environment Variables

### Database Migrations di Production

```bash
psql $DATABASE_URL -f migrations/001_initial_schema.sql
```

---

## 📝 API Documentation

Lihat [API CONTRACT](./docs/technical/TECHNICAL%20SPECIFICATIONS%20-%20API%20CONTRACT.md) untuk detail endpoint.

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

### Authentication
Semua endpoint (kecuali public) memerlukan JWT token:
```
Authorization: Bearer <jwt_token>
```

---

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test

# E2E tests
npm run test:e2e
```

---

## 📚 Documentation

- [Project Requirements Document](./docs/technical/PROJECT%20REQUIREMENTS%20DOCUMENT%20(PRD).md)
- [Database Schema](./docs/technical/TECHNICAL%20SPECIFICATIONS%20-%20DATABASE%20SCHEMA.md)
- [API Contract](./docs/technical/TECHNICAL%20SPECIFICATIONS%20-%20API%20CONTRACT.md)
- [Infrastructure Architecture](./docs/technical/TECHNICAL%20SPECIFICATIONS%20-%20INFRASTRUCTURE%20ARCHITECTURE.md)

---

## 💰 Business Model

- **Revenue**: Top-up saldo → booking dipotong otomatis
- **Zoom Pool**: 30 akun (20 Business + 10 Free backup)
- **Target Market**: B2B - perusahaan, EO, asosiasi
- **Value Prop**: Booking < 2 menit, 24/7, zero manual intervention

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

Copyright © 2026 Ease Your Needs. All rights reserved.

---

## 📞 Support

- **Email:** tech@easeyourneeds.com
- **Documentation:** See `/docs` folder

---

**Last Updated:** 3 April 2026
**Version:** 1.0.0
