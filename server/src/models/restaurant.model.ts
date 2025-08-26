import { Model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IRestaurant {
  user: Schema.Types.ObjectId;
  restaurant: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
}

export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurantDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant: Model<IRestaurantDocument> =
  mongoose.model<IRestaurantDocument>("Restaurant", restaurantSchema);
