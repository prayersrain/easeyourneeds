-- =====================================================
-- EASE YOUR NEEDS - Seed Data
-- Migration 002: Initial Data
-- =====================================================

-- Insert 20 Zoom Business Accounts (Active)
INSERT INTO zoom_accounts (id, account_id, account_email, api_key, api_secret, daily_limit, concurrent_limit, status) VALUES
(gen_random_uuid(), 'zoom_001', 'zoom001@easeyourneeds.com', 'key_001', 'secret_001', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_002', 'zoom002@easeyourneeds.com', 'key_002', 'secret_002', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_003', 'zoom003@easeyourneeds.com', 'key_003', 'secret_003', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_004', 'zoom004@easeyourneeds.com', 'key_004', 'secret_004', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_005', 'zoom005@easeyourneeds.com', 'key_005', 'secret_005', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_006', 'zoom006@easeyourneeds.com', 'key_006', 'secret_006', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_007', 'zoom007@easeyourneeds.com', 'key_007', 'secret_007', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_008', 'zoom008@easeyourneeds.com', 'key_008', 'secret_008', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_009', 'zoom009@easeyourneeds.com', 'key_009', 'secret_009', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_010', 'zoom010@easeyourneeds.com', 'key_010', 'secret_010', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_011', 'zoom011@easeyourneeds.com', 'key_011', 'secret_011', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_012', 'zoom012@easeyourneeds.com', 'key_012', 'secret_012', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_013', 'zoom013@easeyourneeds.com', 'key_013', 'secret_013', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_014', 'zoom014@easeyourneeds.com', 'key_014', 'secret_014', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_015', 'zoom015@easeyourneeds.com', 'key_015', 'secret_015', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_016', 'zoom016@easeyourneeds.com', 'key_016', 'secret_016', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_017', 'zoom017@easeyourneeds.com', 'key_017', 'secret_017', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_018', 'zoom018@easeyourneeds.com', 'key_018', 'secret_018', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_019', 'zoom019@easeyourneeds.com', 'key_019', 'secret_019', 100, 2, 'active'),
(gen_random_uuid(), 'zoom_020', 'zoom020@easeyourneeds.com', 'key_020', 'secret_020', 100, 2, 'active');

-- Insert 10 Zoom Free Accounts (Backup)
INSERT INTO zoom_accounts (account_id, account_email, api_key, api_secret, daily_limit, concurrent_limit, status) VALUES
('zoom_backup_001', 'backup001@easeyourneeds.com', 'backup_key_001', 'backup_secret_001', 40, 1, 'inactive'),
('zoom_backup_002', 'backup002@easeyourneeds.com', 'backup_key_002', 'backup_secret_002', 40, 1, 'inactive'),
('zoom_backup_003', 'backup003@easeyourneeds.com', 'backup_key_003', 'backup_secret_003', 40, 1, 'inactive'),
('zoom_backup_004', 'backup004@easeyourneeds.com', 'backup_key_004', 'backup_secret_004', 40, 1, 'inactive'),
('zoom_backup_005', 'backup005@easeyourneeds.com', 'backup_key_005', 'backup_secret_005', 40, 1, 'inactive'),
('zoom_backup_006', 'backup006@easeyourneeds.com', 'backup_key_006', 'backup_secret_006', 40, 1, 'inactive'),
('zoom_backup_007', 'backup007@easeyourneeds.com', 'backup_key_007', 'backup_secret_007', 40, 1, 'inactive'),
('zoom_backup_008', 'backup008@easeyourneeds.com', 'backup_key_008', 'backup_secret_008', 40, 1, 'inactive'),
('zoom_backup_009', 'backup009@easeyourneeds.com', 'backup_key_009', 'backup_secret_009', 40, 1, 'inactive'),
('zoom_backup_010', 'backup010@easeyourneeds.com', 'backup_key_010', 'backup_secret_010', 40, 1, 'inactive');

-- Insert MC Profiles (9 MCs)
INSERT INTO mc_profiles (name, category, daily_rate, half_day_rate, bio) VALUES
('MC Jaya', 'Corporate', 1500000, 800000, 'MC profesional dengan pengalaman 10+ tahun'),
('MC Indah', 'Corporate', 1200000, 700000, 'Spesialis event korporat dan seminar'),
('MC Jeje', 'General', 1000000, 600000, 'MC energik untuk berbagai acara'),
('MC Elva', 'Wedding', 1300000, 750000, 'Spesialis wedding dan engagement'),
('MC Reynatha', 'Corporate', 1400000, 800000, 'Professional bilingual MC'),
('MC Andi', 'General', 900000, 550000, 'MC fun dan entertaining'),
('MC Sarah', 'Corporate', 1100000, 650000, 'Spesialis conference dan webinar'),
('MC Budi', 'General', 950000, 575000, 'MC berpengalaman 5+ tahun'),
('MC Lisa', 'Wedding', 1250000, 725000, 'Elegant wedding MC');

-- Insert Operator Profiles (3 tiers)
INSERT INTO operator_profiles (name, tier, daily_rate) VALUES
('Operator Pro 1', 'gold', 1500000),
('Operator Pro 2', 'gold', 1500000),
('Operator Silver 1', 'silver', 1000000),
('Operator Silver 2', 'silver', 1000000),
('Operator Silver 3', 'silver', 1000000),
('Operator Bronze 1', 'bronze', 600000),
('Operator Bronze 2', 'bronze', 600000),
('Operator Bronze 3', 'bronze', 600000),
('Operator Bronze 4', 'bronze', 600000);

-- Insert Pricing Config
INSERT INTO pricing_config (category, name, description, capacity, meeting_type, quality, duration_type, price, is_active) VALUES
-- Zoom Packages
('zoom_package', 'Zoom 100p Pro HD Perhari', 'Zoom Pro 100 peserta, HD quality, per hari', 100, 'pro', 'hd', 'perhari', 150000, true),
('zoom_package', 'Zoom 100p Pro HD Perjam', 'Zoom Pro 100 peserta, HD quality, per jam', 100, 'pro', 'hd', 'perjam', 25000, true),
('zoom_package', 'Zoom 300p Pro Full HD Perhari', 'Zoom Pro 300 peserta, Full HD, per hari', 300, 'pro', 'full_hd', 'perhari', 300000, true),
('zoom_package', 'Zoom 300p Pro Full HD Perjam', 'Zoom Pro 300 peserta, Full HD, per jam', 300, 'pro', 'full_hd', 'perjam', 50000, true),
('zoom_package', 'Zoom 500p Webinar Perhari', 'Zoom Webinar 500 peserta, per hari', 500, 'webinar', 'hd', 'perhari', 500000, true),
('zoom_package', 'Zoom 1000p Webinar Perhari', 'Zoom Webinar 1000 peserta, per hari', 1000, 'webinar', 'hd', 'perhari', 800000, true);

-- Add default admin user (password: admin123)
-- Note: This is hashed password for 'admin123' with bcrypt 12 rounds
INSERT INTO users (email, password_hash, name, phone, role, is_verified, balance, balance_available, balance_locked) VALUES
('admin@easeyourneeds.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MebAJu', 'Admin', '+628123456789', 'admin', true, 0, 0, 0);
