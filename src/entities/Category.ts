import mongoose, { Document, Model, Schema } from "mongoose";

interface Category extends Document {
  userId: string;
  title: string;
  description?: string;
  createdAt?: Date;
}

const categorySchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryReference = "Category";

const CategoryModel = mongoose.model<Category>(
  CategoryReference,
  categorySchema,
);

type CategoryModelType = Model<Category>;

export { Category, CategoryModel, CategoryModelType, CategoryReference };
