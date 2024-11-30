import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Image from "next/image";

import Logo from "../../public/telmexlogo.png";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={Logo} alt="telmex logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
