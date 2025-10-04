import Router from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.ts";
import upload from "../middlewares/multer.middleware.ts";
import { addMenu, editMenu } from "../controllers/menu.controller.ts";


const router = Router();    


router.route("/").post(isAuthenticated, upload.single("imageFile"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("imageFile"), editMenu);


export default router;