// src/components/Layout.tsx
"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (status === "loading") return;

    console.log({ isClient, session, location: window.location.pathname });
    if (!session && window.location.pathname !== "/login") {
      router.push("/login");
    }
  }, [session, status, router, isClient]);

  if (!session) {
    return <main>{children}</main>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
