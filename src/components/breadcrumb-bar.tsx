import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { House } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

interface BreadcrumbProps {
  page: string;
}

export const BreadCrumBar = ({ page }: BreadcrumbProps) => {
  return (
    <div className="w-full pt-4 pb-4 pr-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <SidebarTrigger />
            <BreadcrumbLink
              href="/"
              className="flex flex-row gap-2 items-center"
            >
              <div className="border-r border-border border-black opacity-30 h-4" />
              <House />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{page}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
