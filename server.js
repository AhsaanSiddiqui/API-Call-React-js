import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// In-memory database for prices (in a real app, this would be a database)
const priceDatabase = {
  15: { value: 29.99, currency_code: 'USD' },
  16: { value: 19.99, currency_code: 'USD' },
  17: { value: 39.99, currency_code: 'USD' },
  18: { value: 24.99, currency_code: 'USD' },
  19: { value: 34.99, currency_code: 'USD' },
};

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Fetch product data from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || 'https://fakestoreapi.com';
    const externalResponse = await axios.get(
      `${externalApiUrl}/products/${productId}`
    );
    const productData = externalResponse.data;

    // Get price from local database
    const priceData = priceDatabase[productId] || {
      value: 0.0,
      currency_code: 'USD',
    };

    // Combine data
    const combinedData = {
      id: productId,
      title: productData.title,
      current_price: priceData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(404).json({
      message: `Product with ID ${req.params.id} not found`,
    });
  }
});

// PUT /api/products/:id
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { current_price } = req.body;

    // Validate input
    if (!current_price || typeof current_price.value !== 'number') {
      return res.status(400).json({
        message:
          'Invalid price data. Please provide current_price.value as a number.',
      });
    }

    // Update price in local database
    priceDatabase[productId] = {
      value: current_price.value,
      currency_code: current_price.currency_code || 'USD',
    };

    // Fetch updated product data
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || 'https://fakestoreapi.com';
    const externalResponse = await axios.get(
      `${externalApiUrl}/products/${productId}`
    );
    const productData = externalResponse.data;

    // Return updated combined data
    const updatedData = {
      id: productId,
      title: productData.title,
      current_price: priceDatabase[productId],
    };

    res.json(updatedData);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({
      message: 'Failed to update product price',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Products API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Products API server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/products/:id - Fetch product details`);
  console.log(`   PUT  /api/products/:id - Update product price`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`\n💡 Try these product IDs: 15, 16, 17, 18, 19`);
});
