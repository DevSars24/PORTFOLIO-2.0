// src/components/ui/dropdown-menu.jsx

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = React.forwardRef(
  ({ className = "", align = "center", sideOffset = 6, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={`min-w-[10rem] rounded-lg bg-black/80 text-gray-200 shadow-lg backdrop-blur-md border border-white/10 p-1 animate-in fade-in-80 ${className}`}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </DropdownMenuPrimitive.Content>
  )
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={`flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors
        hover:bg-cyan-500/20 focus:bg-cyan-500/20 active:bg-cyan-500/30 ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";
