import axios from 'axios';

// Optionally, you can set a base URL for all requests
// axios.defaults.baseURL = 'http://your-api-base-url.com/api';

/**
 * A utility function for making API requests.
 * @param {string} url The URL path, appended to the base URL.
 * @param {string} method The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data] The data to be sent as the request body.
 * @param {Object} [headers] Additional headers for the request.
 * @returns {Promise} A Promise that resolves to the response of the request.
 */
const ApiRequest = async (url, method, data = {}, headers = {}) => {
  const config = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Spread any additional headers
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data; 
  } catch (error) {
    // Handle or throw the error as you prefer
    console.error('API request error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export default ApiRequest;
