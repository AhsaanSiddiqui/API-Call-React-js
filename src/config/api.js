// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',

  // API Endpoints
  ENDPOINTS: {
    PRODUCTS: '/products',
    HEALTH: '/health',
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 10000,

  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get full product URL
export const getProductUrl = (productId) => {
  return buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`);
};

// Helper function to get health check URL
export const getHealthUrl = () => {
  return buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH);
};
