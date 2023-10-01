import mongoose, { Document, Model, Schema } from "mongoose";

import { CategoryReference } from "./Category";

interface Todo extends Document {
  userId: string;
  title: string;
  description?: string;
  status?: number;
  categories?: string[];
  createdAt?: string;
}

const todoSchema: Schema = new Schema({
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
  status: {
    type: Number,
    default: 10,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: CategoryReference,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TodoReference = "Todo";

const TodoModel = mongoose.model<Todo>(TodoReference, todoSchema);

type TodoModelType = Model<Todo>;

export { Todo, TodoModel, TodoModelType, TodoReference };
