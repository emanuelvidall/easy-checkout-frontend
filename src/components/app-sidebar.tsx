"use client";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

import Image from "next/image";

import Logo from "../../public/telmexlogo.png";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader className="h-12 flex items-center justify-center">
        <Image className="max-w-40" src={Logo} alt="telmex logo" />
      </SidebarHeader>
      <SidebarMenu>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <div className="flex flex-row justify-between px-2 items-center h-10 mt-4">
              <h1 className="font-bold">Menu</h1>
            </div>
            <Separator className="mt-4 mb-4" />

            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between w-full">
                <SidebarMenuButton> Gestão</SidebarMenuButton>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-expanded={isOpen}
                  aria-label={
                    isOpen ? "Collapse Management" : "Expand Management"
                  }
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem className="text-sm">
                  <Link href={"/"}>Produtos</Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem className="text-sm">
                  <Link href={"/"}>Vendas</Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </Sidebar>
  );
}
