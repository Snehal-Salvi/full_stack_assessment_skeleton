// This file sets up the routes for home-related API endpoints using Express Router.

import { Router } from 'express';
import { findHomesByUser, findUsersByHome, updateUsersByHome } from '../controllers/homeController';

const router = Router();

// Route to get all homes associated with a specific user
router.get('/find-by-user/:username', findHomesByUser);

// Route to get all users associated with a specific home
router.get('/find-by-home/:street_address', findUsersByHome);

// Route to update the users associated with a specific home
router.post('/update-users/:street_address', updateUsersByHome);

export default router;
