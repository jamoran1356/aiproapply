# AIProApply - AI-Powered Freelance Job Automation

AIProApply is an intelligent platform that automates freelance job searching, proposal generation, and application tracking using advanced AI agents. Built with a microservices architecture inspired by SuperiorAgents.

## 📢 Project Status & Demo Information

**Please Note:** This README describes the intended final functionality of AIProApply once it is 100% complete. The project is currently under active development.

This demo has been created to fulfill the requirements for the hackathon organized by **KIP Protocol** and its **Superior Agent Residency**.

To showcase the visual behavior and user interface of the application, you can access a live demo of the administrative panel at [aiproapply.com](https://aiproapply.com). You can log in using **any email and password** to explore the dashboard. This is intended to demonstrate the front-end and user experience.

## 🚀 Features

- **AI-Powered Job Search**: Automatically search and filter jobs across multiple platforms
- **Smart Proposal Generation**: Generate personalized proposals using **Superior Agents**
- **Auto-Apply System**: Automatically apply to relevant jobs based on your preferences
- **Performance Analytics**: Track success rates, earnings, and optimization insights
- **Multi-Platform Support**: Upwork, Fiverr, Freelancer, and more
- **Real-time Notifications**: Get notified about new opportunities and responses
- **Multilingual Support**: Available in Spanish, English, and Portuguese
- **Admin Dashboard**: Comprehensive management interface for administrators

## 🏗️ Architecture

AIProApply follows a microservices architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js Web   │    │   Agent Service │    │   API Service   │
│     (Port 3000) │    │   (Port 3001)   │    │   (Port 3002)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────┐    ┌─────────────────┐
         │  Notification   │    │   PostgreSQL    │
         │   (Port 3003)   │    │   Database      │
         └─────────────────┘    └─────────────────┘
```

### Services

1. **Web Service** (Next.js): Main user interface and dashboard
2. **Agent Service**: AI agents for job search, proposal generation, and analytics
3. **API Service**: RESTful API for data management and service coordination
4. **Notification Service**: Real-time notifications and email alerts
5. **Database**: PostgreSQL for data persistence

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn
- OpenAI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/jamoran1356/aiproapply.git
   cd aiproapply
   ```

2. **Run the bootstrap script**
   ```bash
   chmod +x bootstrap.sh
   ./bootstrap.sh
   ```

3. **Update environment variables**
   ```bash
   # Edit .env file with your actual values
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start all microservices**
   ```bash
   npm run start:services
   ```

### Docker Setup

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Web: http://localhost:3000
   - API: http://localhost:3002
   - Agent: http://localhost:3001
   - Notifications: http://localhost:3003

## 📝 Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://localhost:5432/aiproapply

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# App URLs
APP_URL=http://localhost:3000
API_URL=http://localhost:3002
```

### User Preferences

Users can configure:
- Auto-apply settings
- Job search criteria
- Notification preferences
- Platform connections
- Proposal templates

## 🤖 AI Agents

### Proposal Agent
- Analyzes job requirements
- Generates personalized proposals
- Calculates success probability
- Optimizes pricing strategies

### Search Agent
- Searches multiple platforms
- Filters and ranks opportunities
- Handles auto-apply workflows
- Tracks competition metrics

### Analytics Agent
- Performance analysis
- Trend identification
- Success rate optimization
- Earnings tracking

## 📊 API Documentation

### Authentication
```bash
POST /api/auth/login
POST /api/auth/register
```

### User Management
```bash
GET /api/users/:userId/profile
PUT /api/users/:userId/profile
GET /api/users/:userId/preferences
PUT /api/users/:userId/preferences
```

### Proposals
```bash
GET /api/users/:userId/proposals
POST /api/users/:userId/proposals
PUT /api/proposals/:proposalId
```

### Analytics
```bash
GET /api/users/:userId/analytics
GET /api/users/:userId/applications
```

## 🔧 Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run start:services   # Start all microservices
npm run stop:services    # Stop all microservices
npm run logs             # View service logs
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run test             # Run tests
```

### Project Structure

```
aiproapply/
├── agent/                 # AI Agent services
│   ├── index.js
│   ├── proposal-agent.js
│   ├── search-agent.js
│   └── analytics-agent.js
├── api/                   # REST API service
│   └── index.js
├── app/                   # Next.js pages
│   ├── dashboard/
│   ├── admin/
│   └── login/
├── components/            # React components
├── db/                    # Database schema and services
│   ├── schema.sql
│   └── service.js
├── notification/          # Notification service
│   ├── index.js
│   └── service.js
├── hooks/                 # React hooks
├── lib/                   # Utilities and configurations
└── public/                # Static assets
```

## 🌐 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start with PM2**
   ```bash
   npm run start:services
   ```

3. **Monitor services**
   ```bash
   pm2 status
   pm2 logs
   ```

### Environment Setup

- **Development**: Local PostgreSQL, file-based sessions
- **Staging**: Cloud database, Redis sessions
- **Production**: Managed database, Redis cluster, load balancer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.aiproapply.com](https://docs.aiproapply.com)
- **Issues**: [GitHub Issues](https://github.com/aiproapply/aiproapply/issues)
- **Discord**: [Join our community](https://discord.gg/aiproapply)
- **Email**: support@aiproapply.com

## 🙏 Acknowledgments

- Inspired by [SuperiorAgents](https://github.com/SuperiorAgents/superior-agents)
- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
