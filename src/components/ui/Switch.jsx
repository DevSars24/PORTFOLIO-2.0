import * as React from "react";

export const Switch = React.forwardRef(({ checked, onCheckedChange, disabled }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 
        ${checked ? "bg-cyan-500" : "bg-gray-500"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 
          ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
});

Switch.displayName = "Switch";
