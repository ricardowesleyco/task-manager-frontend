"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Toast from "@/components/ui/Toast";

const EditTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "pending" | "in_progress" | "completed" | "canceled"
  >("pending");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const id = params?.id as string;
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/task/${id}`);
        console.log({ data });
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status.key);
      } catch (error: any) {
        console.error("Erro ao buscar tarefa:", error);
        const errorMessage =
          error?.status == 422 ? "Tarefa não encontrada." : null;
        setToast({
          message: `Erro ao carregar tarefa.${errorMessage}`,
          type: "error",
        });
        setTimeout(() => router.push("/tasks"), 1500);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id, session?.accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Tem certeza que deseja salvar esta tarefa?"
    );
    if (!confirmed) return;

    setLoading(true);

    try {
      await api.patch(`/task/${id}`, {
        title,
        description,
        status,
      });
      setToast({ message: "Tarefa atualizada com sucesso!", type: "success" });
      setTimeout(() => router.push("/tasks"), 1500);
    } catch (error) {
      setToast({ message: "Erro ao atualizar tarefa.", type: "error" });
      console.error("Erro ao atualizar tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mt-8 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Editar Tarefa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Digite o título da tarefa"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Atualize a descrição da tarefa..."
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="pending" key="pendente">
              Pendente
            </option>
            <option value="in_progress" key="em andamento">
              Em andamento
            </option>
            <option value="completed" key="concluída">
              Concluída
            </option>
            <option value="canceled" key="cancelada">
              Cancelada
            </option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default EditTaskPage;
