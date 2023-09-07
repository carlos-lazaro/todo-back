import mongoose, { Document, Model, Schema } from "mongoose";

interface Category extends Document {
  title: string;
  description?: string;
  createdAt: Date;
}

const categorySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const CategoryReference = "Category";

const CategoryModel = mongoose.model<Category>(
  CategoryReference,
  categorySchema,
);

type CategoryModelType = Model<Category>;

export { Category, CategoryModel, CategoryModelType, CategoryReference };
