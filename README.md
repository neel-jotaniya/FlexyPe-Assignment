# Request Monitor & Alert System

A TypeScript-based monitoring system that tracks failed API requests and sends alerts when suspicious activity is detected.

## 🚀 Quick Start

1. **Setup**
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

2. **Configure .env**
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/FlexyPe
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-app-specific-password
ALERT_EMAIL=recipient@email.com
ALERT_THRESHOLD=5
TIME_WINDOW=10
```

3. **Run**
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Submit Request
```http
POST /api/submit
Headers:
  Content-Type: application/json
  Authorization: Bearer valid-token
Body:
  { "data": "your-data" }
```

### Get Metrics
```http
GET /api/metrics?timeWindow=60
```

## 🔍 Features

- Request validation & monitoring
- IP-based tracking
- Email alerts for suspicious activity
- Metrics API for analytics
- MongoDB persistence
- Winston logging

## 🛠️ Tech Stack

- Node.js & TypeScript
- Express.js
- MongoDB
- Nodemailer (Gmail)
- Winston Logger

## 📊 Sample Responses

### Success
```json
{
  "success": true
}
```

### Metrics
```json
{
  "totalFailures": 5,
  "failuresByIp": {
    "127.0.0.1": 3
  },
  "recentFailures": [
    {
      "ip": "127.0.0.1",
      "timestamp": "2024-01-10T14:30:00Z",
      "reason": "Invalid token",
      "endpoint": "/api/submit"
    }
  ]
}
```

## 📝 Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGODB_URI | Database URL | mongodb://127.0.0.1:27017/FlexyPe |
| ALERT_THRESHOLD | Failed attempts limit | 5 |
| TIME_WINDOW | Monitor window (minutes) | 10 |

## 🔒 Security Notes

- Uses Bearer token authentication
- Implements request validation
- Includes CORS & Helmet protection
- Rate limiting by IP

## 📦 Project Structure
```
src/
├── app.ts                    # Entry point
├── config/                   # Configuration
├── controllers/              # Request handlers
├── middleware/               # Validation & auth
├── models/                   # MongoDB schemas
├── services/                # Business logic
├── types/                   # TypeScript types
└── utils/                   # Utilities
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT
