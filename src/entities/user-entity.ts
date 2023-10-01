import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt?: string;
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserReference = "User";

const UserModel = mongoose.model<User>(UserReference, todoSchema);

type UserModelType = Model<User>;

export { User, UserModel, UserModelType, UserReference };
