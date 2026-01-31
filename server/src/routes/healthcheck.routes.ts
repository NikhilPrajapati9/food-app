import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.ts";
import type { Router as ExpressRouter } from "express";
const router: ExpressRouter = Router();

router.route("/").get(healthcheck);

export default router;
