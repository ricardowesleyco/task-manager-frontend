// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white shadow-md text-center py-4 mt-auto text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Gerenciador de Tarefas. Todos os
      direitos reservados.
    </footer>
  );
}
