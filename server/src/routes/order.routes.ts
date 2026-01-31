import express, { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controllers/order.controller.ts";
import type { Router as ExpressRouter } from "express";

const router:ExpressRouter = Router();



router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-cheackout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);

export default router;