import { Types } from "mongoose";
import { createTaskSchema, updateTaskSchema } from "@/lib/validations/task";
import { Task } from "@/models/Task";
import { executeWorkflows } from "@/lib/workflow-engine/engine";

function serializeTask(task: any) {
  return {
    _id: task._id.toString(),
    userId: task.userId.toString(),
    title: task.title,
    status: task.status,
    createdAt: task.createdAt?.toISOString?.() || task.createdAt,
    updatedAt: task.updatedAt?.toISOString?.() || task.updatedAt,
  };
}

export async function createTask(userId: string, body: unknown) {
  const parsed = createTaskSchema.safeParse(body);

  if (!parsed.success) {
    throw new Error(
      parsed.error.issues[0]?.message || "Invalid task data"
    );
  }

  const task = await Task.create({
    userId,
    title: parsed.data.title,
    status: parsed.data.status || "pending",
  });

  await executeWorkflows({
    userId,
    trigger: "task_created",
    task: {
      _id: task._id.toString(),
      title: task.title,
      status: task.status,
    },
  });

  return serializeTask(task);
}

export async function getTasks(userId: string) {
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return tasks.map(serializeTask);
}

export async function updateTask(
  userId: string,
  taskId: string,
  body: unknown
) {
  const parsed = updateTaskSchema.safeParse(body);

  if (!parsed.success) {
    throw new Error(
      parsed.error.issues[0]?.message || "Invalid task update data"
    );
  }

  if (!Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task id");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  // Only allow updating tasks that belong to this authenticated user
  const existingTask = await Task.findOne({
    _id: new Types.ObjectId(taskId),
    userId: new Types.ObjectId(userId),
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (parsed.data.title !== undefined) {
    existingTask.title = parsed.data.title;
  }

  if (parsed.data.status !== undefined) {
    existingTask.status = parsed.data.status;
  }

  await existingTask.save();

  await executeWorkflows({
    userId,
    trigger: "task_updated",
    task: {
      _id: existingTask._id.toString(),
      title: existingTask.title,
      status: existingTask.status,
    },
  });

  return serializeTask(existingTask);
}