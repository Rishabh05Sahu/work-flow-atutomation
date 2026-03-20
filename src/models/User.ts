import { Schema, model, models, Model, Document } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> =
  models.User || model<IUserDocument>("User", userSchema);