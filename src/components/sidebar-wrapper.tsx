"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  const showSidebar = !pathname.startsWith("/checkout");

  return <>{showSidebar && <AppSidebar />}</>;
}
