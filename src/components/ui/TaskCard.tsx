// src/components/tasks/TaskCard.tsx
"use client";

import StatusBadge, { StatusType } from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { Tooltip } from "react-tooltip";
import { JSX, useState } from "react";
// type StatusType = "pendente" | "em_progresso" | "completo" | "cancelado";

type TaskCardProps = {
  title: string;
  description: string;
  user?: string;
  status: StatusType;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskCard({
  title,
  description,
  status,
  user,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="max-w-sm rounded-xl shadow p-4 bg-white relative border border-gray-100">
      <StatusBadge status={status} />

      <h3 className="text-lg font-semibold mb-2 line-clamp-2 pr-12">{title}</h3>

      {showDescription && (
        <p className="text-sm text-gray-700 mb-4">{description}</p>
      )}
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="text-xs text-blue-500 hover:underline mb-2"
      >
        {showDescription ? "Ocultar descrição" : "Exibir descrição"}
      </button>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          {user ? `Autor: ${user}` : ""}
        </span>
        <div className="space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              <svg
                className="w-4 h-4 inline-block mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 3l6 6-9 9H6v-6l9-9z" />
              </svg>
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              <svg
                className="w-4 h-4 inline-block mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
                <path d="M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1z" />
              </svg>
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
