import { Router } from "express";
import {
  userLoginValidate,
  userSignupValidator,
} from "../validators/user.validators.ts";
import { validate } from "../validators/validate.ts";
import { login, signup, verifyEmail } from "../controllers/user.controller.ts";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";

const router = Router();

// Unsecured route

router.route("/signup").post(userSignupValidator(), validate, signup);
router.route("/login").post(userLoginValidate(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);

//secure route
router.route("/logout").post(isAuthenticated, login);

export default router;
