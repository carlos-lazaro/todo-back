import mongoose, { Document, Model, Schema } from "mongoose";

import { TodoReference } from "./Todo";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  commonTodos: [
    {
      title: string;
      quantity: number;
    },
  ];
}

const todoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  commonTodos: [
    {
      title: String,
      quantity: Number,
    },
  ],
});

const UserReference = "User";

const UserModel = mongoose.model<User>(UserReference, todoSchema);

type UserModelType = Model<User>;

export { User, UserModel, UserModelType, UserReference };
