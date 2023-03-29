import express from 'express';
const router = express.Router();

import { healthController } from '../controllers';
const { isHealthy } = healthController;

/**
 * Check if application is healthy.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /api/health
 */
router.get('/', isHealthy);

export default router;
