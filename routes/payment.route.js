import express from "express";
import {
  createPayment,
  getPayment,
  getPayments,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createPayment);
router.get("/:id", getPayment);
router.get("/", getPayments);

export default router;
