import { body, param, type ValidationChain } from "express-validator";


export const createRestaurantValidator = (): ValidationChain[] => {
    return [
        body("restaurantName")
            .trim()
            .notEmpty()
            .withMessage("Restaurant name is required"),
        body("city")
            .trim()
            .notEmpty()
            .withMessage("City is required"),
        body("country")
            .trim()
            .notEmpty()
            .withMessage("Country is required"),
        body("deliveryTime")
            .notEmpty()
            .withMessage("Delivery time is required")
            .isNumeric()
            .withMessage("Delivery time must be a number"),
        body("cuisines")
            .notEmpty()
            .withMessage("Cuisines are required")
    ]
}

export const updateRestaurantValidator = (): ValidationChain[] => {
    return [
        body("restaurantName")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Restaurant name is required"),
        body("city")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("City is required"),
        body("country")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Country is required"),
        body("deliveryTime")
            .optional()
            .notEmpty()
            .withMessage("Delivery time is required")
            .isNumeric()
            .withMessage("Delivery time must be a number"),
        body("cuisines")
            .optional()
            .notEmpty()
            .withMessage("Cuisines are required")
    ]
}

export const updateOrderStatusValidator = (): ValidationChain[] => {
    return [
        param("orderId")
            .trim()
            .notEmpty()
            .withMessage("OrderId is required")
        ,
        body("status")
            .trim()
            .notEmpty()
            .withMessage("status is required")
    ]
}


