import express from "express";
import { sql } from "../config/db.js";
import { createTransaction, deleteTransaction, getSummary, getTransaction } from "../controllers/transactionsController.js";

const router = express.Router();

router.get('/summary/:userId', getSummary);
router.get('/:userId', getTransaction);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;