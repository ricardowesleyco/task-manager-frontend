"use client";
import { JSX } from "react";

export type StatusType = "pending" | "in_progress" | "completed" | "canceled";

const statusStyles: Record<
  StatusType,
  { color: string; label: string; icon: JSX.Element }
> = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Pendente",
    icon: (
      <svg
        className="w-4 h-4 inline-block mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  in_progress: {
    color: "bg-blue-100 text-blue-800",
    label: "Em Andamento",
    icon: (
      <svg
        className="w-4 h-4 inline-block mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  completed: {
    color: "bg-green-100 text-green-800",
    label: "Concluída",
    icon: (
      <svg
        className="w-4 h-4 inline-block mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  canceled: {
    color: "bg-red-100 text-red-800",
    label: "Cancelada",
    icon: (
      <svg
        className="w-4 h-4 inline-block mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
};

export default function StatusBadge({ status }: { status: StatusType }) {
  const badge = statusStyles[status];
  return (
    <div
      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
    >
      {badge.icon}
      {badge.label}
    </div>
  );
}
