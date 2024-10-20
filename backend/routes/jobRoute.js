import express from 'express';
import { getAdminJobs, getAllJobs, getJobsFindById, postJob } from '../controllers/jobController.js';
import isAuthenticated from './../middleware/isAuthenticated.js';
const router = express.Router();

router.post('/post', isAuthenticated, postJob);
router.get('/get', isAuthenticated, getAllJobs);
router.get('/get/:id', isAuthenticated, getJobsFindById);
router.get('/getAdminJobs', isAuthenticated, getAdminJobs);

export default router;