import axios from 'axios';

// In-memory database for prices (in production, use a real database)
const priceDatabase = {
  15: { value: 29.99, currency_code: 'USD' },
  16: { value: 19.99, currency_code: 'USD' },
  17: { value: 39.99, currency_code: 'USD' },
  18: { value: 24.99, currency_code: 'USD' },
  19: { value: 34.99, currency_code: 'USD' },
};

export async function handler(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const { path, httpMethod } = event;
  const pathSegments = path.split('/').filter(Boolean);

  try {
    // Handle different endpoints
    if (pathSegments[1] === 'products' && pathSegments[2]) {
      const productId = parseInt(pathSegments[2]);

      if (httpMethod === 'GET') {
        // GET /api/products/:id
        const externalApiUrl =
          process.env.EXTERNAL_API_URL || 'https://fakestoreapi.com';
        const externalResponse = await axios.get(
          `${externalApiUrl}/products/${productId}`
        );
        const productData = externalResponse.data;

        const priceData = priceDatabase[productId] || {
          value: 0.0,
          currency_code: 'USD',
        };

        const combinedData = {
          id: productId,
          title: productData.title,
          current_price: priceData,
        };

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(combinedData),
        };
      }

      if (httpMethod === 'PUT') {
        // PUT /api/products/:id
        const body = JSON.parse(event.body);
        const { current_price } = body;

        if (!current_price || typeof current_price.value !== 'number') {
          return {
            statusCode: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message:
                'Invalid price data. Please provide current_price.value as a number.',
            }),
          };
        }

        // Update price in local database
        priceDatabase[productId] = {
          value: current_price.value,
          currency_code: current_price.currency_code || 'USD',
        };

        const externalApiUrl =
          process.env.EXTERNAL_API_URL || 'https://fakestoreapi.com';
        const externalResponse = await axios.get(
          `${externalApiUrl}/products/${productId}`
        );
        const productData = externalResponse.data;

        const updatedData = {
          id: productId,
          title: productData.title,
          current_price: priceDatabase[productId],
        };

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        };
      }
    }

    if (pathSegments[1] === 'health') {
      // GET /api/health
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'OK',
          message: 'Products API is running',
        }),
      };
    }

    // 404 for unknown endpoints
    return {
      statusCode: 404,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Endpoint not found' }),
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}
