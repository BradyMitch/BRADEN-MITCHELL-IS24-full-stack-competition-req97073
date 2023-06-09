import dotenv from 'dotenv';
dotenv.config();

// Environment variables set in docker-compose file.
const { NODE_ENV, FRONTEND_URL, BACKEND_URL, PORT } = process.env;

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
 * @module cors
 * @property {string|string[]} origin - The allowed origins for CORS requests.
 * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
 */
const CORS_OPTIONS = {
  origin: FRONTEND_URL,
  credentials: true,
};

/**
 * Middleware for rate-limiting requests on the server.
 * @module express-rate-limit
 * @property {number} windowMs - The length of the rate-limiting window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per window per IP address.
 * @property {boolean} headers - Whether to include rate limit info in the `RateLimit-*` headers.
 * @property {boolean} legacy - Whether to include rate limit info in the `X-RateLimit-*` headers (deprecated).
 */
const RATE_LIMIT_OPTIONS = {
  windowMs: 2 * 1000, // 2 seconds
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

// Swagger OpenAPI configuration.
const OPENAPI_OPTIONS = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CITZ, IMB Product Catalog',
      version: '1.0.0',
      description: 'by Braden Mitchell',
    },
    servers: [{ url: `${BACKEND_URL}/api` }],
  },
  apis: ['./src/routes/*.yaml'],
};

// Exported configuration values.
export default {
  PORT: PORT ?? 8008,
  NODE_ENV,
  FRONTEND_URL,
  BACKEND_URL,
  CORS_OPTIONS,
  RATE_LIMIT_OPTIONS,
  OPENAPI_OPTIONS,
};
