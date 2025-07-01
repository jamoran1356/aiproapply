-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'basic',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    title VARCHAR(255),
    skills TEXT,
    experience INTEGER DEFAULT 0,
    description TEXT,
    min_budget INTEGER,
    max_budget INTEGER,
    portfolio_url VARCHAR(500),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    auto_apply_enabled BOOLEAN DEFAULT FALSE,
    max_daily_applications INTEGER DEFAULT 5,
    min_job_score INTEGER DEFAULT 60,
    max_competition INTEGER DEFAULT 20,
    min_client_rating DECIMAL(3,2) DEFAULT 4.0,
    keywords TEXT,
    avoid_keywords TEXT,
    platforms TEXT[], -- Array of enabled platforms
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id VARCHAR(255) NOT NULL,
    title VARCHAR(500),
    platform VARCHAR(100),
    client VARCHAR(255),
    budget VARCHAR(255),
    proposed_price VARCHAR(255),
    content TEXT,
    success_probability INTEGER,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id VARCHAR(255) NOT NULL,
    proposal_id INTEGER REFERENCES proposals(id) ON DELETE CASCADE,
    platform VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    response_received_at TIMESTAMP,
    client_response TEXT
);

-- Search results table
CREATE TABLE IF NOT EXISTS search_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    query JSONB,
    results JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Earnings table
CREATE TABLE IF NOT EXISTS earnings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    project_id VARCHAR(255),
    description TEXT,
    date TIMESTAMP DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Platform connections table
CREATE TABLE IF NOT EXISTS platform_connections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(100) NOT NULL,
    api_key VARCHAR(500),
    access_token VARCHAR(500),
    refresh_token VARCHAR(500),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, platform)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_proposals_user_id ON proposals(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_search_results_user_id ON search_results(user_id);
CREATE INDEX IF NOT EXISTS idx_search_results_timestamp ON search_results(timestamp);
CREATE INDEX IF NOT EXISTS idx_earnings_user_id ON earnings(user_id);
CREATE INDEX IF NOT EXISTS idx_earnings_date ON earnings(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
