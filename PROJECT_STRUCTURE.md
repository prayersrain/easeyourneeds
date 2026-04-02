# Ease Your Needs - Project Structure

```
easeyourneeds/
├── 📂 app/                        # Next.js App Router
│   ├── 📂 (public)/               # Public routes (no auth)
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Public layout
│   │   ├── 📂 terms/              # Terms of Service
│   │   └── 📂 privacy/            # Privacy Policy
│   │
│   ├── 📂 (auth)/                 # Authentication routes
│   │   ├── layout.tsx             # Auth layout
│   │   ├── 📂 signin/             # Sign in page
│   │   ├── 📂 register/           # Register page
│   │   └── 📂 forgot-password/    # Password reset
│   │
│   ├── 📂 (dashboard)/            # Protected customer routes
│   │   ├── layout.tsx             # Dashboard layout (sidebar)
│   │   ├── 📂 dashboard/          # Customer home
│   │   ├── 📂 bookings/           # Booking management
│   │   │   ├── page.tsx           # Booking list
│   │   │   ├── 📂 create/         # Create booking
│   │   │   └── 📂 [id]/           # Booking detail
│   │   ├── 📂 topup/              # Top-up saldo
│   │   ├── 📂 withdrawals/        # Withdrawal requests
│   │   ├── 📂 recordings/         # Recording library
│   │   ├── 📂 reports/            # Meeting reports ⭐
│   │   │   ├── page.tsx           # Reports list
│   │   │   └── 📂 [id]/           # Individual report
│   │   │       ├── page.tsx       # Report overview
│   │   │       ├── 📂 summary/    # AI Summary
│   │   │       ├── 📂 participants/ # Participants list
│   │   │       ├── 📂 polls/      # Poll results
│   │   │       ├── 📂 chat/       # Chat highlights
│   │   │       └── 📂 recording/  # Video recording
│   │   ├── 📂 profile/            # User profile
│   │   └── 📂 loyalty/            # Loyalty points
│   │
│   ├── 📂 (admin)/                # Admin routes
│   │   ├── layout.tsx             # Admin layout
│   │   └── 📂 admin/
│   │       ├── 📂 dashboard/      # Admin dashboard
│   │       ├── 📂 bookings/       # All bookings
│   │       ├── 📂 withdrawals/    # Withdrawal approval
│   │       ├── 📂 zoom-accounts/  # Zoom pool management
│   │       ├── 📂 users/          # User management
│   │       ├── 📂 pricing/        # Dynamic pricing
│   │       └── 📂 analytics/      # Analytics
│   │
│   ├── 📂 api/                    # API Routes
│   │   ├── 📂 v1/
│   │   │   ├── 📂 auth/           # Auth endpoints
│   │   │   ├── 📂 user/           # User endpoints
│   │   │   ├── 📂 balance/        # Balance endpoints
│   │   │   ├── 📂 topup/          # Top-up endpoints
│   │   │   ├── 📂 bookings/       # Booking endpoints
│   │   │   ├── 📂 recordings/     # Recording endpoints
│   │   │   ├── 📂 reports/        # Report endpoints
│   │   │   ├── 📂 withdrawals/    # Withdrawal endpoints
│   │   │   ├── 📂 loyalty/        # Loyalty endpoints
│   │   │   └── 📂 admin/          # Admin endpoints
│   │   │
│   │   ├── 📂 webhooks/
│   │   │   ├── 📂 xendit/         # Xendit webhook
│   │   │   └── 📂 zoom/           # Zoom webhook
│   │   │
│   │   └── 📂 cron/
│   │       ├── 📂 overtime-check/
│   │       ├── 📂 recording-expiry/
│   │       └── 📂 daily-reset/
│   │
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   └── not-found.tsx              # 404 page
│
├── 📂 src/
│   ├── 📂 components/             # React components
│   │   ├── 📂 ui/                 # UI components (shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📂 dashboard/          # Dashboard components
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── metric-card.tsx
│   │   │   └── booking-table.tsx
│   │   │
│   │   ├── 📂 booking/            # Booking components
│   │   │   ├── step-form.tsx
│   │   │   ├── step-indicator.tsx
│   │   │   ├── product-selector.tsx
│   │   │   ├── price-summary.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📂 reports/            # Report components ⭐
│   │   │   ├── ai-summary.tsx
│   │   │   ├── participants-table.tsx
│   │   │   ├── poll-results.tsx
│   │   │   ├── chat-highlights.tsx
│   │   │   └── recording-player.tsx
│   │   │
│   │   └── 📂 shared/             # Shared components
│   │       ├── navbar.tsx
│   │       ├── footer.tsx
│   │       └── loading.tsx
│   │
│   ├── 📂 lib/                    # Utilities
│   │   ├── db.ts                  # Supabase client
│   │   ├── auth.ts                # NextAuth config
│   │   ├── zoom.ts                # Zoom API client
│   │   ├── r2.ts                  # Cloudflare R2 client
│   │   ├── xendit.ts              # Xendit client
│   │   ├── whatsapp.ts            # WhatsApp client
│   │   ├── utils.ts               # Helper functions
│   │   └── validators.ts          # Zod schemas
│   │
│   ├── 📂 hooks/                  # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-balance.ts
│   │   ├── use-booking.ts
│   │   └── use-toast.ts
│   │
│   └── 📂 types/                  # TypeScript types
│       ├── booking.ts
│       ├── user.ts
│       ├── report.ts
│       └── index.ts
│
├── 📂 migrations/                 # SQL migrations
│   ├── 001_initial_schema.sql
│   ├── 002_seed_data.sql
│   ├── 003_indexes.sql
│   └── 004_functions.sql
│
├── .env.example                   # Environment template
├── .env.local                     # Local env (NOT in git)
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
