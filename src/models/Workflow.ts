import { Schema, model, models, Model, Document, Types } from "mongoose";
import { WORKFLOW_ACTIONS, WORKFLOW_TRIGGERS } from "@/lib/utils/constants";

export interface IWorkflowDocument extends Document {
  userId: Types.ObjectId;
  trigger: (typeof WORKFLOW_TRIGGERS)[number];
  action: (typeof WORKFLOW_ACTIONS)[number];
  message: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workflowSchema = new Schema<IWorkflowDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    trigger: {
      type: String,
      enum: WORKFLOW_TRIGGERS,
      required: true,
    },
    action: {
      type: String,
      enum: WORKFLOW_ACTIONS,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Workflow: Model<IWorkflowDocument> =
  models.Workflow || model<IWorkflowDocument>("Workflow", workflowSchema);