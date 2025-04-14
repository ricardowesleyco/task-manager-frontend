"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  duration = 3000,
}: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-md shadow-lg text-sm text-white transition-all
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
}
