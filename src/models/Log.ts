import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface ILogDocument extends Document {
  workflowId: Types.ObjectId;
  userId: Types.ObjectId;
  taskId?: Types.ObjectId;
  trigger: string;
  action: string;
  status: "success" | "failed";
  output: string;
  createdAt: Date;
}

const logSchema = new Schema<ILogDocument>(
  {
    workflowId: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    trigger: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Log: Model<ILogDocument> =
  models.Log || model<ILogDocument>("Log", logSchema);