// This file sets up the routes for user-related API endpoints using Express Router.

import { Router } from 'express';
import { findAllUsers } from '../controllers/userController';

const router = Router();

// Route to get all users from the database
router.get('/find-all', findAllUsers);

export default router;
