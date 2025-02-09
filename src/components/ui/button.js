// ui/button.js

import React from "react";
import clsx from "clsx"; // Optional, for better class name management

// Function to determine button styles
export function buttonVariants({ variant = "default" }) {
  switch (variant) {
    case "primary":
      return "bg-blue-500 text-white px-4 py-2 rounded";
    case "secondary":
      return "bg-gray-500 text-white px-4 py-2 rounded";
    default:
      return "bg-gray-300 text-black px-4 py-2 rounded";
  }
}

// Button component
export const Button = ({ children, variant, className = "", ...props }) => {
  const variantClass = buttonVariants({ variant });

  return (
    <button className={clsx(variantClass, className)} {...props}>
      {children}
    </button>
  );
};
