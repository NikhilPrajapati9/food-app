import { Router } from "express";
import {
  userChangeCurrentPasswordValidator,
  userLoginValidate,
  userSignupValidator,
  userUpdateProfileValidator,
} from "../validators/user.validators.ts";
import { validate } from "../validators/validate.ts";
import { changeCurrentPassword, checkAuth, forgotPasswordRequest, login, logout, refreshAccessToken, resendEmailVerification, resetForgottenPassword, signup, updateProfile, verifyEmail } from "../controllers/user.controller.ts";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";
import upload from "../middlewares/multer.middleware.ts";
import type { Router as ExpressRouter } from "express";

const router: ExpressRouter = Router();

// Unsecured route

router.route("/signup").post(userSignupValidator(), validate, signup);
router.route("/login").post(userLoginValidate(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/resend-email-verification").get(resendEmailVerification);
router
  .route("/forgot-password")
  .post(forgotPasswordRequest);
router
  .route("/reset-password/:resestToken")
  .post(
    resetForgottenPassword
  );
router.route("/refresh-token").get(refreshAccessToken)


//secure route
router.route("/logout").post(isAuthenticated, logout);
router.route("/check-auth").get(isAuthenticated, checkAuth)
router.route("/update/profile").put(isAuthenticated, userUpdateProfileValidator(), validate, upload.single("profilePicture"), updateProfile)
router.route("/change-password").put(isAuthenticated, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword)


export default router;
