import { useState } from 'react'
import axios from 'axios'
import { getProductUrl } from './config/api'
import './App.css'

function App() {
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [updateLoading, setUpdateLoading] = useState(false)

  // API configuration is now imported from config/api.js

  const fetchProduct = async () => {
    if (!productId.trim()) {
      setError('Please enter a product ID')
      return
    }

    setLoading(true)
    setError('')
    setProduct(null)

    try {
      const response = await axios.get(getProductUrl(productId))
      const productData = response.data
      
      // Transform FakeStoreAPI data to match our expected structure
      const transformedProduct = {
        id: productData.id,
        title: productData.title,
        current_price: {
          value: productData.price,
          currency_code: 'USD'
        }
      }
      
      setProduct(transformedProduct)
      setNewPrice(transformedProduct.current_price.value.toString())
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }

  const updateProductPrice = async () => {
    if (!product || !newPrice.trim()) {
      setError('Please enter a valid price')
      return
    }

    setUpdateLoading(true)
    setError('')

    try {
      // Since FakeStoreAPI doesn't support PUT requests, we'll update local state
      const updatedProduct = {
        ...product,
        current_price: {
          value: parseFloat(newPrice),
          currency_code: product.current_price.currency_code
        }
      }

      setProduct(updatedProduct)
      setError('')
    } catch (err) {
      setError('Failed to update product price')
    } finally {
      setUpdateLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>🛍️ Products API</h1>
        <p className="subtitle">Fetch and update product details by ID</p>

        {/* Product ID Input */}
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="productId">Product ID:</label>
            <input
              id="productId"
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID (e.g., 15, 16, 17, 18, 19)"
              min="1"
            />
            <button 
              onClick={fetchProduct} 
              disabled={loading}
              className="fetch-btn"
            >
              {loading ? 'Fetching...' : 'Fetch Product'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Product Display */}
        {product && (
          <div className="product-section">
            <h2>📦 Product Details</h2>
            <div className="product-card">
              <div className="product-info">
                <div className="info-row">
                  <strong>Product ID:</strong>
                  <span>{product.id}</span>
                </div>
                <div className="info-row">
                  <strong>Title:</strong>
                  <span>{product.title}</span>
                </div>
                <div className="info-row">
                  <strong>Current Price:</strong>
                  <span className="price">
                    {product.current_price.value} {product.current_price.currency_code}
                  </span>
                </div>
              </div>

              {/* Price Update Form */}
              <div className="update-section">
                <h3>💰 Update Price</h3>
                <div className="update-form">
                  <div className="input-group">
                    <label htmlFor="newPrice">New Price:</label>
                    <input
                      id="newPrice"
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Enter new price"
                      step="0.01"
                      min="0"
                    />
                    <button 
                      onClick={updateProductPrice}
                      disabled={updateLoading}
                      className="update-btn"
                    >
                      {updateLoading ? 'Updating...' : 'Update Price'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="instructions">
          <h3>📋 How to use:</h3>
          <ul>
            <li>Enter a product ID (15, 16, 17, 18, 19 are examples)</li>
            <li>Click "Fetch Product" to get product details</li>
            <li>Update the price using the form below</li>
            <li>Click "Update Price" to save changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
