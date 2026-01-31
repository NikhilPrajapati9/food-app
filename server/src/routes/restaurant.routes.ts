import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";
import upload from "../middlewares/multer.middleware.ts";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurants, updateOrderStatus, updateRestaurant } from "../controllers/restaurant.controller.ts";
import { validate } from "../validators/validate.ts";
import { createRestaurantValidator, updateOrderStatusValidator, updateRestaurantValidator } from "../validators/restaurant.validators.ts";
import type { Router as ExpressRouter } from "express";


const router:ExpressRouter = Router();

router.route("/").post(isAuthenticated, createRestaurantValidator(), validate, upload.single("imageFile"), createRestaurant)
router.route("/").get(isAuthenticated, getRestaurant);
router.route("/").put(isAuthenticated, updateRestaurantValidator(), validate, upload.single("imageFile"), updateRestaurant)
router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatusValidator(), validate, updateOrderStatus)
router.route("/search/:searchText").get(isAuthenticated, searchRestaurants);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;