import mongoose, { Model, Schema } from "mongoose";

export interface IMenu {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IMenuDocument extends IMenu, Document {
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<IMenuDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Menu: Model<IMenuDocument> = mongoose.model<IMenuDocument>(
  "Menu",
  menuSchema
);
