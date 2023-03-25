import http from 'http';
import config from './config';
const { BACKEND_URL } = config;

const healthUrl = `${BACKEND_URL}/api/health`;

/**
 * Make a request to the health endpoint.
 * If it returns a 200 status, exit the script with exitCode 0 (terminated with success).
 * If it returns any other status, exit the script with exitCode 1 (terminated with error).
 */
const req = http.request(healthUrl, (res) => {
  process.exitCode = res.statusCode === 200 ? 0 : 1;
});

req.on('error', (error) => {
  console.error(`Healthcheck failed with error: ${error}`);
  process.exit(1);
});

req.end();
