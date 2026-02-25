"use client";

import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "StackCart",
      logo: ShoppingCart,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      color: "text-emerald-600",
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
      color: "text-purple-600",
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-white border-t">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t p-3 text-xs text-muted-foreground bg-white">
        <div className="flex flex-col">
          <span className="font-semibold">StackCart Admin</span>
          <span>v1.0.0</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
