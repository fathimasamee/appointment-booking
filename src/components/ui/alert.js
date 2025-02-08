// src/components/ui/alert.js
import React from 'react';

// Alert Component
export const Alert = ({ variant, className, children }) => {
  const variantClass = variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white';
  return (
    <div className={`alert ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

// AlertDescription Component
export const AlertDescription = ({ children }) => {
  return <div className="alert-description">{children}</div>;
};
