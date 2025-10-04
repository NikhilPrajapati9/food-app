import { body, type ValidationChain } from "express-validator";

export const userSignupValidator = (): ValidationChain[] => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
    body("contact")
      .trim()
      .notEmpty()
      .withMessage("Contact is required")
      .isNumeric()
      .withMessage("Contact must be a number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact must be 10 digits long"),
  ];
};

export const userLoginValidate = (): ValidationChain[] => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ];
};

export const userForgotPasswordRequestValidator = (): ValidationChain[] => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
}

export const userResetPasswordValidator = (): ValidationChain[] => {

  return [body("newPassword").notEmpty().withMessage("Password is required")];

}

export const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

export const userUpdateProfileValidator = (): ValidationChain[] => {
  return [
    body("username").optional().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body("contact").optional().isNumeric().withMessage("Contact must be a number"),
    body("address").optional().isString().withMessage("Address must be a string"),
    body("city").optional().isString().withMessage("City must be a string"),
    body("country").optional().isString().withMessage("Country must be a string"),
  ]

}