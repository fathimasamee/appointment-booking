// src/components/ui/card.js
import * as React from "react";
import { cn } from "../../lib/utils"; // Ensure correct path

function Card({ className, children, ...props }) {
  return (
    <div className={cn("border rounded-lg shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("bg-gray-100 p-4 text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent };
