import { Schema, model, models, Model, Document, Types } from "mongoose";
import { TASK_STATUSES } from "@/lib/utils/constants";

export interface ITaskDocument extends Document {
  userId: Types.ObjectId;
  title: string;
  status: (typeof TASK_STATUSES)[number];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITaskDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Task: Model<ITaskDocument> =
  models.Task || model<ITaskDocument>("Task", taskSchema);