import { body, type ValidationChain } from "express-validator";




export const addMenuValidator = (): ValidationChain[] => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("description is requred"),
        body("price")
            .notEmpty()
            .withMessage("Price is requred")
            .isNumeric()
            .withMessage("Price must be a number")
    ]
}


export const editMenuValidator = (): ValidationChain[] => {
    return [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Name is required"),
        body("description")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("description is requred"),
        body("price")
            .optional()
            .notEmpty()
            .withMessage("Price is requred")
            .isNumeric()
            .withMessage("Price must be a number")
    ]
}