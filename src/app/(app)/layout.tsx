"use client";

import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "unauthenticated") redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="container flex-1 px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
