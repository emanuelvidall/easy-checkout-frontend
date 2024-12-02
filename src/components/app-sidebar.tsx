import { Home, PackageOpen, ChartNoAxesCombined } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { Separator } from "./ui/separator";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Produtos",
    url: "/",
    icon: PackageOpen,
  },
  {
    title: "Vendas",
    url: "/vendas",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Image
            className="self-center"
            src="/telmexlogo.png"
            width={150}
            height={50}
            alt="telmex logo"
          />
          <Separator className="mb-4" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
