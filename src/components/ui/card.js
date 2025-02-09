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

function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-xl font-bold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("px-4 py-3 border-t bg-gray-50", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };