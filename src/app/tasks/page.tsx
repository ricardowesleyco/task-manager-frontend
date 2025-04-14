"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Toast from "@/components/ui/Toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/ui/TaskCard";
import { StatusType } from "@/components/ui/StatusBadge";
type Task = {
  status: { key: StatusType };
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userEntity: {
    name: string;
  };
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get("/task");
        setTasks(res.data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Deseja realmente excluir esta tarefa?");
    if (!confirmed) return;

    try {
      await api.delete(`/task/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      setToast({ message: "Tarefa excluída com sucesso!", type: "success" });
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setToast({ message: "Erro ao excluir tarefa.", type: "error" });
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {session?.user?.role === "admin"
            ? "Todas as Tarefas"
            : "Minhas Tarefas"}
        </h1>
      </div>

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              title={task.title}
              description={task.description}
              user={
                session?.user?.role === "admin"
                  ? task.userEntity.name
                  : undefined
              }
              onDelete={() => handleDelete(task.id)}
              onEdit={() => {
                router.push(`/tasks/${task.id}/edit`);
              }}
              status={task.status.key}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-12">
            Nenhuma tarefa encontrada.
          </div>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
