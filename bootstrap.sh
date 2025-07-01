#!/bin/bash

# AIProApply Bootstrap Script
# This script sets up the development environment

echo "🚀 Setting up AIProApply development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Database
DATABASE_URL=postgresql://localhost:5432/aiproapply
POSTGRES_USER=aiproapply
POSTGRES_PASSWORD=aiproapply123
POSTGRES_DB=aiproapply

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@aiproapply.com

# App URLs
APP_URL=http://localhost:3000
API_URL=http://localhost:3002
AGENT_URL=http://localhost:3001
NOTIFICATION_URL=http://localhost:3003

# JWT
JWT_SECRET=your_jwt_secret_here

# Environment
NODE_ENV=development
EOL
    echo "✅ .env file created. Please update it with your actual values."
fi

# Setup database
echo "🗄️ Setting up database..."
createdb aiproapply 2>/dev/null || echo "Database might already exist"

# Run database migrations
echo "🔄 Running database migrations..."
psql -d aiproapply -f db/schema.sql

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update your .env file with actual API keys and credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Run 'npm run start:services' to start all microservices"
echo "4. Visit http://localhost:3000 to see your application"
echo ""
echo "📚 Available commands:"
echo "  npm run dev          - Start Next.js development server"
echo "  npm run build        - Build for production"
echo "  npm run start        - Start production server"
echo "  npm run start:services - Start all microservices with PM2"
echo "  npm run stop:services  - Stop all microservices"
echo "  npm run logs         - View service logs"
echo "  npm run db:migrate   - Run database migrations"
echo "  npm run db:seed      - Seed database with sample data"
