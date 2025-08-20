import express from "express";
import { createSubscription, deleteSubscription, getSubscription, getSummary, updateSubscription } from "../controllers/subscriptionsController.js";

const router = express.Router();

router.post('/', createSubscription);
router.get('/:userId', getSubscription);
router.put('/update/:id', updateSubscription);
router.delete('/:id', deleteSubscription);
router.get('/summary/:userId', getSummary);

export default router;