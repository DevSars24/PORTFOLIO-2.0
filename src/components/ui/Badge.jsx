import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  cyan: "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-cyan-500 text-white",
  green: "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-500 text-white",
  red: "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-red-500 text-white",
};

function Badge({ className, variant = "default", children, ...props }) {
  return (
    <span
      className={cn(badgeVariants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
