// src/components/ui/Button.tsx
"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  let variantClass = "";

  if (variant === "primary") {
    variantClass = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "secondary") {
    variantClass = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  } else if (variant === "danger") {
    variantClass = "bg-red-600 text-white hover:bg-red-700";
  }

  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
