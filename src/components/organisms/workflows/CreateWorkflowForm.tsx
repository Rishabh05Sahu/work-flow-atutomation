"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { createWorkflowSchema } from "@/lib/validations/workflow";
import { createWorkflowRequest } from "@/lib/services/workflow-client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof createWorkflowSchema>;

type Props = {
  onCreated: () => Promise<void> | void;
};

export function CreateWorkflowForm({ onCreated }: Props) {
const {
  handleSubmit,
  setValue,
  watch,
  reset,
  register,
  formState: { errors, isSubmitting },
} = useForm<FormValues>({
  resolver: zodResolver(createWorkflowSchema),
  defaultValues: {
    trigger: "task_created",
    action: "log_message",
    message: "",
  },
});

  const trigger = watch("trigger");
  const action = watch("action");
  const message = watch("message");

  const onSubmit = async (values: FormValues) => {
    try {
      await createWorkflowRequest(values);
      toast.success("Workflow created successfully");
      reset({
        trigger: "task_created",
        action: "log_message",
        message: "",
      });
      await onCreated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create workflow");
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Create Workflow</CardTitle>
        <CardDescription className="text-neutral-400">
          Define an IF trigger THEN action rule.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Trigger (IF)</Label>
            <Select
              value={trigger}
              onValueChange={(value) =>
                setValue("trigger", value as FormValues["trigger"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task_created">Task Created</SelectItem>
                <SelectItem value="task_updated">Task Updated</SelectItem>
              </SelectContent>
            </Select>
            {errors.trigger && (
              <p className="text-sm text-red-400">{errors.trigger.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Action (THEN)</Label>
            <Select
              value={action}
              onValueChange={(value) =>
                setValue("action", value as FormValues["action"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="log_message">Log a Message</SelectItem>
                <SelectItem value="save_db_entry">Save Entry in Database</SelectItem>
              </SelectContent>
            </Select>
            {errors.action && (
              <p className="text-sm text-red-400">{errors.action.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message / Output</Label>
            <Textarea
              id="message"
              value={message}
              {...register("message")}
              onChange={(e) =>
                setValue("message", e.target.value, { shouldValidate: true })
              }
              placeholder="Enter workflow message"
              className="min-h-[120px] border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
            />
            {errors.message && (
              <p className="text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-neutral-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workflow
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}