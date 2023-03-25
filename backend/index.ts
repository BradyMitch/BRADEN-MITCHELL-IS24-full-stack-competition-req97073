import app from './express';

import config from './config';
const { PORT } = config;

// Start the Express application (server).
app.listen(PORT, () => {
  try {
    // Log server start information.
    console.info(`Express Server started on port ${PORT}`);
  } catch (error) {
    // Log any error that occurs during the server start.
    console.error(error);
  }
});
