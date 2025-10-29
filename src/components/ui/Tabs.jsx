import * as React from "react";
import { cn } from "@/lib/utils";

function Tabs({ className, children, defaultValue = 0, onValueChange }) {
  const [activeIndex, setActiveIndex] = React.useState(defaultValue);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (onValueChange) onValueChange(index);
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          activeIndex,
          onTabClick: handleTabClick,
          tabIndex: index,
        })
      )}
    </div>
  );
}

function TabsList({ children, activeIndex, onTabClick }) {
  return (
    <div className="flex border-b border-gray-300 dark:border-gray-600">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => onTabClick(index),
        })
      )}
    </div>
  );
}

function TabsTrigger({ children, isActive, onClick }) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
        isActive
          ? "border-b-2 border-cyan-500 text-cyan-500"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TabsContent({ children, activeIndex, tabIndex }) {
  return <div className={activeIndex === tabIndex ? "block mt-4" : "hidden"}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
