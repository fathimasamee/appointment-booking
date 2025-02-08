// src/components/ui/input.js
import React from 'react';

export const Input = ({ type, value, onChange, placeholder, required }) => {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />;
};
