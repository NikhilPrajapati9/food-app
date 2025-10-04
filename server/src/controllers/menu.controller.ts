import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { deleteMediaFromCloudinary, uploadImageOnCloudinary } from "../utils/cloudinary.ts";
import { Menu } from "../models/menu.model.ts";
import { Restaurant } from "../models/restaurant.model";
import type mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";

export const addMenu = asyncHandler(async (req: Request, res: Response) => {

    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        })
    };
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu: any = await Menu.create({
        name,
        description,
        price,
        image: imageUrl
    });
    const restaurant = await Restaurant.findOne({ user: req?.user?._id });
    if (restaurant) {
        (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
        await restaurant.save();
    }

    return res.status(201).json(new ApiResponse(201, menu, "Menu added successfully"));

})

export const editMenu = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name, description, price } = req.body ?? {};
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
        throw new ApiError(404, "Menu not found");
    }
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    let cloudinaryUrl = "";

    if (file) {
        cloudinaryUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        if (!cloudinaryUrl) {
            throw new ApiError(500, "Failed to upload image");
        }

        if (menu.image) {
            const publicId = menu.image?.split("/")?.pop()?.split(".")[0];
            if (publicId) {
                await deleteMediaFromCloudinary(publicId);
            } else {
                throw new ApiError(500, "Failed to get public ID of the old image");
            }
        }

    }
    await menu.save();

    return res.status(200).json(new ApiResponse(200, menu, "Menu updated successfully"));

})