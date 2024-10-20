import express from 'express';
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from '../controllers/applicationController.js';
import isAuthenticated from './../middleware/isAuthenticated.js';
const router = express.Router();

router.get('/apply/:id', isAuthenticated, applyJob);
router.get('/get', isAuthenticated, getAppliedJobs);
router.get('/:id/applicants', isAuthenticated, getApplicant);
router.post('/status/:id', isAuthenticated, updateStatus);

export default router;