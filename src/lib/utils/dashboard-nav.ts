import {
  LayoutDashboard,
  CheckSquare,
  Workflow,
  FileText,
} from "lucide-react";

export const dashboardNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Workflows",
    href: "/dashboard/workflows",
    icon: Workflow,
  },
  {
    title: "Logs",
    href: "/dashboard/logs",
    icon: FileText,
  },
];