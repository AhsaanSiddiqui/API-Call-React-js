# 🛍️ Products API - React Frontend

A modern React.js application that demonstrates a Products API proof-of-concept. This application fetches product details from an external API and combines them with local pricing data.

## ✨ Features

- **Product Fetching**: Retrieve product details by ID from external API
- **Price Management**: Update product prices in local database
- **Modern UI**: Beautiful, responsive interface with gradient backgrounds
- **Real-time Updates**: See price changes immediately after updates
- **Error Handling**: Comprehensive error messages and loading states

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   node server.js
   ```
   The backend will run on `http://localhost:3001`

3. **Start the React frontend:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## 📋 How to Use

1. **Fetch a Product:**
   - Enter a product ID (try: 15, 16, 17, 18, 19)
   - Click "Fetch Product"
   - View product details including title and current price

2. **Update Price:**
   - After fetching a product, enter a new price
   - Click "Update Price"
   - See the updated price immediately

## 🏗️ Project Structure

```
api-call-react/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Modern styling
│   └── main.jsx         # React entry point
├── server.js            # Express backend server
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔧 API Endpoints

### Backend Server (`http://localhost:3001`)

- **GET** `/api/products/:id` - Fetch product details
- **PUT** `/api/products/:id` - Update product price
- **GET** `/api/health` - Health check

### Example API Responses

**GET** `/api/products/15`
```json
{
  "id": 15,
  "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  "current_price": {
    "value": 29.99,
    "currency_code": "USD"
  }
}
```

**PUT** `/api/products/15`
```json
{
  "current_price": {
    "value": 25.99,
    "currency_code": "USD"
  }
}
```

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Clear error messages for failed requests
- **Interactive Elements**: Hover effects and button animations

## 🔄 Data Flow

1. **Product Fetching:**
   - User enters product ID
   - Frontend calls backend API
   - Backend fetches product title from `https://fakestoreapi.com/`
   - Backend combines with local pricing data
   - Frontend displays combined data

2. **Price Updates:**
   - User enters new price
   - Frontend sends PUT request to backend
   - Backend updates local price database
   - Backend returns updated product data
   - Frontend displays updated information

## 🛠️ Technology Stack

- **Frontend**: React.js with Vite
- **HTTP Client**: Axios
- **Backend**: Node.js with Express
- **Styling**: Modern CSS with gradients and animations
- **External API**: FakeStore API for product data

## 🧪 Testing the Application

1. Start both servers (backend and frontend)
2. Try these product IDs: 15, 16, 17, 18, 19
3. Test price updates with different values
4. Verify error handling with invalid product IDs

## 📝 Notes

- The backend uses an in-memory database for simplicity
- In a production environment, you'd use a real database
- The external API is `https://fakestoreapi.com/`
- CORS is enabled for local development

## 🚀 Deployment

To deploy this application:

1. **Frontend**: Build with `npm run build` and serve the `dist` folder
2. **Backend**: Deploy `server.js` to your preferred hosting platform
3. **Update API URL**: Change `API_BASE_URL` in `App.jsx` to your production backend URL

---

**Happy coding! 🎉**
