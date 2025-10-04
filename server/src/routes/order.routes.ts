import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controllers/order.controller.ts";


const router = Router();



router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-cheackout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);

export default router;