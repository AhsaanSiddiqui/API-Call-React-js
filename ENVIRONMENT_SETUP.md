# Environment Variables Setup

## 📁 Environment Files

### 1. Frontend Environment (.env)

Create a `.env` file in the root directory for frontend variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://fakestoreapi.com/products

# Development Configuration
NODE_ENV=development
```

### 2. Backend Environment (.env)

Create a `.env` file in the root directory for backend variables:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# External API Configuration
EXTERNAL_API_URL=https://fakestoreapi.com

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## 🔧 How to Set Up

### Step 1: Create Environment Files

1. Copy `environment.env` to `.env`
2. Or create `.env` files manually with the content above

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Application

```bash
# Start both frontend and backend
npm start

# Or start them separately
npm run dev    # Frontend only
npm run server # Backend only
```

## 🌍 Environment Variables Explained

### Frontend Variables (VITE\_\*)

- `VITE_API_BASE_URL`: Base URL for API calls (used in React app)
- `NODE_ENV`: Environment mode (development/production)

### Backend Variables

- `PORT`: Server port number (default: 3001)
- `NODE_ENV`: Environment mode
- `EXTERNAL_API_URL`: External API base URL
- `CORS_ORIGIN`: Allowed origin for CORS

## 🚀 Production Deployment

### For Netlify (Frontend)

1. Set environment variables in Netlify dashboard:
   - `VITE_API_BASE_URL`: Your production API URL

### For Backend Deployment

1. Set environment variables in your hosting platform:
   - `PORT`: Your server port
   - `EXTERNAL_API_URL`: External API URL
   - `CORS_ORIGIN`: Your frontend domain

## 📝 Example .env Files

### Development (.env)

```bash
# Frontend
VITE_API_BASE_URL=https://fakestoreapi.com/products

# Backend
PORT=3001
NODE_ENV=development
EXTERNAL_API_URL=https://fakestoreapi.com
CORS_ORIGIN=http://localhost:5173
```

### Production (.env.production)

```bash
# Frontend
VITE_API_BASE_URL=https://your-backend-domain.com/api

# Backend
PORT=3001
NODE_ENV=production
EXTERNAL_API_URL=https://fakestoreapi.com
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use different environment files for different environments
- Keep sensitive data in environment variables
- Use strong, unique values for production
