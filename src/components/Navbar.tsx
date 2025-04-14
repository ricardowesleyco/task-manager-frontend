"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold text-blue-600">
        Gerenciador de Tarefas
      </Link>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-sm text-gray-700">
              Olá, {session.user.name}
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
