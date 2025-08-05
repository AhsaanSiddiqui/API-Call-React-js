# 🚀 Netlify Deployment Guide

## ✅ What's Configured

Your project is now fully configured for Netlify deployment with:

- ✅ **Frontend**: React app with Vite build
- ✅ **Backend**: Netlify Functions (serverless)
- ✅ **Environment Variables**: Automatic detection
- ✅ **Routing**: SPA and API routes configured
- ✅ **CORS**: Properly configured for cross-origin requests

## 🔧 Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes**:

   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

2. **Verify your files**:
   - ✅ `netlify.toml` - Build configuration
   - ✅ `netlify/functions/api.js` - Backend API
   - ✅ `src/config/api.js` - API configuration
   - ✅ `package.json` - Dependencies

### Step 2: Deploy to Netlify

#### Option A: Connect Git Repository (Recommended)

1. **Go to Netlify Dashboard**

   - Visit [netlify.com](https://netlify.com)
   - Sign in/Sign up

2. **Connect Your Repository**

   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, etc.)
   - Select your repository

3. **Configure Build Settings**

   - **Build command**: `npm run build` (auto-detected)
   - **Publish directory**: `dist` (auto-detected)
   - **Functions directory**: `netlify/functions` (auto-detected)

4. **Set Environment Variables** (Optional)

   - Go to Site settings → Environment variables
   - Add: `EXTERNAL_API_URL` = `https://fakestoreapi.com`

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

#### Option B: Manual Deploy

1. **Build locally**:

   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to Netlify

## 🌍 Environment Configuration

### Automatic Environment Detection

Your app automatically detects the environment:

- **Development**: Uses `http://localhost:3001/api`
- **Production**: Uses `/api` (Netlify Functions)

### Environment Variables

| Variable            | Development                 | Production                 | Description  |
| ------------------- | --------------------------- | -------------------------- | ------------ |
| `VITE_API_BASE_URL` | `http://localhost:3001/api` | `/api`                     | API base URL |
| `EXTERNAL_API_URL`  | `https://fakestoreapi.com`  | `https://fakestoreapi.com` | External API |

## 🔍 Testing Your Deployment

### 1. Check Frontend

- Visit your Netlify URL
- Test the UI functionality
- Verify product fetching works

### 2. Check Backend

- Test API endpoints:
  - `https://your-site.netlify.app/api/health`
  - `https://your-site.netlify.app/api/products/15`

### 3. Test Full Flow

- Enter a product ID (15, 16, 17, 18, 19)
- Fetch product details
- Update product price
- Verify changes persist

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**

   - Check `netlify.toml` configuration
   - Verify all dependencies are in `package.json`
   - Check build logs in Netlify dashboard

2. **API Not Working**

   - Verify Netlify Functions are deployed
   - Check function logs in Netlify dashboard
   - Ensure CORS is properly configured

3. **Environment Variables**
   - Check if variables are set in Netlify dashboard
   - Verify variable names start with `VITE_` for frontend

### Debug Steps

1. **Check Function Logs**:

   - Go to Netlify dashboard → Functions
   - Click on your function to see logs

2. **Test API Directly**:

   - Use browser dev tools
   - Check Network tab for API calls

3. **Verify Configuration**:
   - Check `netlify.toml` syntax
   - Verify function path is correct

## 🎯 Success Indicators

✅ **Frontend loads** without errors
✅ **Product fetching** works
✅ **Price updates** persist
✅ **No CORS errors** in console
✅ **API endpoints** respond correctly

## 📊 Performance

- **Build time**: ~1-2 minutes
- **Function cold start**: ~200-500ms
- **Page load time**: ~1-2 seconds
- **API response time**: ~500ms-1s

## 🔄 Continuous Deployment

Once configured:

- Every push to `main` branch triggers deployment
- Automatic preview deployments for pull requests
- Rollback to previous versions available

Your app is now production-ready on Netlify! 🎉
