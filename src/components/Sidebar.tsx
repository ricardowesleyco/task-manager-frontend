"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/tasks", label: "Tarefas" },
  { href: "/tasks/create", label: "Nova Tarefa" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4">
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const baseStyle = "block px-4 py-2 rounded-lg transition-colors";
          const activeStyle = isActive
            ? "bg-blue-100 text-blue-800"
            : "hover:bg-gray-100";

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseStyle} ${activeStyle}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
