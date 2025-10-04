import type { Request, Response } from "express";
import { Order } from "../models/order.model.ts";
import { Restaurant } from "../models/restaurant.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { deleteMediaFromCloudinary, uploadImageOnCloudinary } from "../utils/cloudinary.ts";






export const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const imageFile = req.file;
    const userId = req.user?._id
    if (!restaurantName || !city || !country || !deliveryTime || !cuisines) {
        throw new ApiError(400, "All fields are required");
    }

    if (!imageFile) {
        throw new ApiError(400, "Image file is required");
    }

    const restaurant = await Restaurant.findOne({ user: userId });

    if (restaurant) {
        throw new ApiError(400, "Restaurant already exists for this user");
    }

    const imageUrl = await uploadImageOnCloudinary(imageFile);

    if (!imageUrl) {
        throw new ApiError(500, "Failed to upload image");
    }

    await Restaurant.create({
        user: userId,
        restaurantName,
        city,
        country,
        deliveryTime,
        cuisines: JSON.parse(cuisines),
        imageUrl,
    })

    res.status(201).json(new ApiResponse(201, [], "Restaurant created successfully"))
})

export const getRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const restaurant = await Restaurant.findOne({ user: req.user?._id }).populate("menus");

    if (!restaurant) {
        return res.status(404).json(new ApiResponse(404, [], "Restaurant not found"));
    }

    return res.status(200).json(new ApiResponse(200, restaurant, "Restaurant fetched successfully"));
})

export const updateRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body ?? {};
    const imageFile = req.file;
    const userId = req.user?._id

    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
        throw new ApiError(400, "Restaurant not found");
    }

    let cloudinaryUrl;

    if (imageFile) {
        cloudinaryUrl = await uploadImageOnCloudinary(imageFile as Express.Multer.File);

        if (!cloudinaryUrl) {
            throw new ApiError(500, "Failed to upload image");
        }

        if (restaurant.imageUrl) {
            const publicId = restaurant.imageUrl?.split("/")?.pop()?.split(".")[0];
            if (publicId) {
                deleteMediaFromCloudinary(publicId);
            } else {
                throw new ApiError(500, "Failed to get public ID of the old image");
            }
        }
    }

    if (restaurantName) restaurant.restaurantName = restaurantName
    if (city) restaurant.city = city
    if (country) restaurant.country = country
    if (deliveryTime) restaurant.deliveryTime = deliveryTime
    if (cuisines) restaurant.cuisines = JSON.parse(cuisines)
    if (imageFile && cloudinaryUrl) restaurant.imageUrl = cloudinaryUrl;


    await restaurant.save();

    res.status(201).json(new ApiResponse(200, [], "Restaurant updated successfully"))
})


export const getRestaurantOrder = asyncHandler(async (req: Request, res: Response) => {
    const restaurant = await Restaurant.findOne({ user: req.user?._id });

    const orders = await Order.find({ restaurant: restaurant?._id }).populate("user").populate("restaurant");

    return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
})


export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.status = status;
    await order.save();

    return res.status(200).json(new ApiResponse(200, { status: order.status }, "Order status updated successfully"));
})


export const searchRestaurants = asyncHandler(async (req: Request, res: Response) => {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery as string || "";
    const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
    const query: any = {};

    if (searchText) {
        query.$or = [
            { restaurantName: { $regex: searchText, $options: 'i' } },
            { city: { $regex: searchText, $options: 'i' } },
            { country: { $regex: searchText, $options: 'i' } },
        ]
    }
    // filter on the basis of searchQuery
    if (searchQuery) {
        query.$or = [
            { restaurantName: { $regex: searchQuery, $options: 'i' } },
            { cuisines: { $regex: searchQuery, $options: 'i' } }
        ]
    }

    if (selectedCuisines.length > 0) {
        query.cuisines = { $in: selectedCuisines }
    }

    console.log("query => ", query);

    const restaurants = await Restaurant.find(query);

    return res.status(200).json(new ApiResponse(200, restaurants, "Restaurants fetched successfully"));
})

export const getSingleRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
        path: "menus",
        options: { createdAt: -1 }
    });

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res.status(200).json(new ApiResponse(200, restaurant, "Restaurant fetched successfully"));
})