# Subscription Tracker API

A robust REST API for managing subscription tracking with built-in security features including rate limiting, bot detection, and JWT authentication.

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 🛡️ **Arcjet Security** - Rate limiting and bot detection
- 📊 **Subscription Management** - Track and manage subscriptions
- 🚀 **Express.js** - Fast and minimal web framework
- 📝 **Environment-based Configuration** - Separate configs for development and production

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **JWT** - JSON Web Token for authentication
- **Arcjet** - Security and rate limiting
- **dotenv** - Environment variable management

## Prerequisites

- Node.js v20.x or higher
- npm or yarn
- Arcjet API key

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd subscription-tracker-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

For production, create `.env.production.local`:
```env
PORT=3000
JWT_SECRET=your_production_jwt_secret
ARCJET_KEY=your_production_arcjet_key
DATABASE_URL=your_production_database_url
NODE_ENV=production
```

## Project Structure
```
subscription-tracker-api/
├── config/
│   ├── env.js              # Environment configuration
│   └── arcjet.js           # Arcjet security configuration
├── middleware/
│   ├── auth.middleware.js  # JWT authentication middleware
│   └── arcjet.middleware.js # Arcjet security middleware
├── routes/
│   └── ...                 # API routes
├── controllers/
│   └── ...                 # Route controllers
├── models/
│   └── ...                 # Data models
├── app.js                  # Application entry point
├── package.json
└── .env.development.local  # Environment variables (not committed)
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
```
POST /api/auth/register    - Register a new user
POST /api/auth/login       - Login user
POST /api/auth/refresh     - Refresh JWT token
```

### Subscriptions (Protected Routes)
```
GET    /api/subscriptions       - Get all subscriptions
GET    /api/subscriptions/:id   - Get subscription by ID
POST   /api/subscriptions       - Create new subscription
PUT    /api/subscriptions/:id   - Update subscription
DELETE /api/subscriptions/:id   - Delete subscription
```

## Authentication

All protected routes require a valid JWT token in the Authorization header:
```bash
Authorization: Bearer <your_jwt_token>
```

### Example Request
```bash
curl -X GET http://localhost:3000/api/subscriptions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Rate Limiting

The API uses Arcjet for rate limiting:
- **Rate Limit**: 100 requests per hour per IP
- **Bot Protection**: Automated bot detection and blocking

When rate limited, you'll receive:
```json
{
  "success": false,
  "message": "Too Many Requests - Rate limit exceeded"
}
```

## Error Handling

The API uses consistent error responses:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Security Features

### JWT Authentication
- Secure token-based authentication
- Token expiration handling
- User authorization checks

### Arcjet Protection
- **Rate Limiting**: Prevents API abuse
- **Bot Detection**: Blocks malicious bots
- **Shield Protection**: General security rules

### Best Practices
- Environment variables for sensitive data
- Input validation and sanitization
- Secure password handling
- CORS configuration

## Development

### Installing New Dependencies
```bash
npm install <package-name>
```

### Database Migrations
```bash
# Add your migration commands here
```

### Running Tests
```bash
npm test
```

## Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment:
- `JWT_SECRET` - Strong, unique secret key
- `ARCJET_KEY` - Production Arcjet API key
- `DATABASE_URL` - Production database connection
- `NODE_ENV=production`