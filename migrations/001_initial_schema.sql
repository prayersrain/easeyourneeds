-- =====================================================
-- EASE YOUR NEEDS - Database Schema
-- Migration 001: Initial Schema
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
    -- Balance management with hold/lock mechanism
    balance BIGINT DEFAULT 0 CHECK (balance >= 0),
    balance_available BIGINT DEFAULT 0 CHECK (balance_available >= 0),
    balance_locked BIGINT DEFAULT 0 CHECK (balance_locked >= 0),
    
    -- Constraint: total = available + locked
    CONSTRAINT balance_check CHECK (balance = balance_available + balance_locked),
    
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'operator', 'admin', 'super_admin')),
    is_verified BOOLEAN DEFAULT TRUE,
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- 2. ZOOM ACCOUNTS TABLE
-- =====================================================
CREATE TABLE zoom_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id VARCHAR(100) UNIQUE NOT NULL,
    account_email VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    api_secret VARCHAR(255) NOT NULL,
    daily_limit INTEGER DEFAULT 100,
    daily_usage INTEGER DEFAULT 0,
    usage_reset_date DATE DEFAULT CURRENT_DATE,
    concurrent_limit INTEGER DEFAULT 2,
    current_concurrent INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'rate_limited')),
    last_sync TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_zoom_accounts_status ON zoom_accounts(status);
CREATE INDEX idx_zoom_accounts_usage ON zoom_accounts(daily_usage, daily_limit);

-- =====================================================
-- 3. BOOKINGS TABLE
-- =====================================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    zoom_account_id UUID NOT NULL REFERENCES zoom_accounts(id),
    topic VARCHAR(500) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity IN (100, 300, 500, 1000)),
    meeting_type VARCHAR(20) CHECK (meeting_type IN ('pro', 'webinar')),
    quality VARCHAR(20) CHECK (quality IN ('hd', 'full_hd')),
    zoom_link TEXT,
    hostkey VARCHAR(20),
    passcode VARCHAR(20),
    zoom_meeting_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'completed', 'cancelled', 'overtime')),
    total_price BIGINT NOT NULL,
    points_earned INTEGER DEFAULT 0,
    cancellation_deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_booking_duration CHECK (end_time > start_time)
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_zoom_account_id ON bookings(zoom_account_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_time_range ON bookings(start_time, end_time);

-- Prevent double-booking with exclusion constraint
CREATE EXCLUDE CONSTRAINT exclude_zoom_account_overlap
    ON bookings USING GIST (
        zoom_account_id WITH =,
        tsrange(start_time, end_time) WITH &&
    ) WHERE (status NOT IN ('cancelled'));

-- =====================================================
-- 4. BOOKING ADDONS TABLE
-- =====================================================
CREATE TABLE booking_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    addon_type VARCHAR(20) NOT NULL CHECK (addon_type IN ('mc', 'operator', 'obs', 'livestream')),
    addon_name VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_price BIGINT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_booking_addons_booking_id ON booking_addons(booking_id);

-- =====================================================
-- 5. TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL CHECK (type IN ('topup', 'booking', 'refund', 'withdrawal', 'loyalty_redemption', 'upgrade')),
    amount BIGINT NOT NULL,
    balance_before BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    reference_id VARCHAR(255),
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);

-- Prevent double top-up (idempotency)
CREATE UNIQUE INDEX idx_transactions_topup_unique
    ON transactions(reference_id)
    WHERE type = 'topup' AND status = 'success';

-- =====================================================
-- 6. WITHDRAWALS TABLE
-- =====================================================
CREATE TABLE withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount BIGINT NOT NULL CHECK (amount >= 50000),
    bank_name VARCHAR(100) NOT NULL,
    bank_account VARCHAR(50) NOT NULL,
    account_holder VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid', 'cancelled')),
    admin_notes TEXT,
    processed_by UUID REFERENCES users(id),
    processed_at TIMESTAMPTZ,
    rejection_reason VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);

-- Only ONE pending withdrawal per user
CREATE UNIQUE INDEX idx_withdrawals_one_pending_per_user
    ON withdrawals(user_id)
    WHERE status = 'pending';

-- =====================================================
-- 7. RECORDINGS TABLE
-- =====================================================
CREATE TABLE recordings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    zoom_cloud_id VARCHAR(100),
    storage_provider VARCHAR(20) DEFAULT 'cloudflare_r2',
    storage_url TEXT,
    storage_key VARCHAR(500),
    storage_bucket VARCHAR(255),
    file_size BIGINT,
    duration INTEGER,
    recording_type VARCHAR(20) CHECK (recording_type IN ('cloud', 'local', 'speaker', 'gallery')),
    expires_at TIMESTAMPTZ NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recordings_booking_id ON recordings(booking_id);
CREATE INDEX idx_recordings_expires_at ON recordings(expires_at);

-- =====================================================
-- 8. MEETING REPORTS TABLE (NEW - for Summary & Reports)
-- =====================================================
CREATE TABLE meeting_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    
    -- AI Summary
    ai_summary TEXT,
    smart_chapters JSONB,
    action_items JSONB,
    
    -- Participants
    participants_count INTEGER,
    participants_data JSONB,
    
    -- Polls
    polls_data JSONB,
    
    -- Chat
    chat_highlights JSONB,
    
    -- Zoom metadata
    zoom_meeting_uuid VARCHAR(100),
    zoom_cloud_recording_id VARCHAR(100),
    
    -- Processing status
    processing_status VARCHAR(20) DEFAULT 'processing',
    processed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meeting_reports_booking_id ON meeting_reports(booking_id);
CREATE INDEX idx_meeting_reports_status ON meeting_reports(processing_status);

-- =====================================================
-- 9. LOYALTY POINTS TABLE
-- =====================================================
CREATE TABLE loyalty_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER DEFAULT 0 CHECK (balance >= 0),
    total_earned INTEGER DEFAULT 0,
    total_redeemed INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loyalty_points_user_id ON loyalty_points(user_id);

-- =====================================================
-- 10. MC PROFILES TABLE
-- =====================================================
CREATE TABLE mc_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    daily_rate BIGINT NOT NULL,
    half_day_rate BIGINT,
    photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 11. OPERATOR PROFILES TABLE
-- =====================================================
CREATE TABLE operator_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(20) CHECK (tier IN ('bronze', 'silver', 'gold')),
    is_available BOOLEAN DEFAULT TRUE,
    daily_rate BIGINT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 12. PRICING CONFIG TABLE
-- =====================================================
CREATE TABLE pricing_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('zoom_package', 'addon_mc', 'addon_operator', 'addon_obs', 'addon_livestream', 'bundle')),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    capacity INTEGER,
    meeting_type VARCHAR(20),
    quality VARCHAR(20),
    duration_type VARCHAR(20) CHECK (duration_type IN ('perhari', 'perjam', 'fixed')),
    price BIGINT NOT NULL CHECK (price >= 0),
    discount_percent INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pricing_config_category ON pricing_config(category);
CREATE INDEX idx_pricing_config_active ON pricing_config(is_active);

-- =====================================================
-- 13. SUPPORT TICKETS TABLE
-- =====================================================
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(30) NOT NULL CHECK (category IN ('booking', 'payment', 'technical', 'recording', 'billing', 'other')),
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    related_booking_id UUID REFERENCES bookings(id),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')),
    priority VARCHAR(10) DEFAULT 'normal',
    assigned_to UUID REFERENCES users(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 14. FAILED OPERATIONS TABLE
-- =====================================================
CREATE TABLE failed_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operation_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID NOT NULL,
    error_message TEXT NOT NULL,
    retry_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 15. SESSIONS TABLE (NextAuth)
-- =====================================================
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON sessions(session_token);
