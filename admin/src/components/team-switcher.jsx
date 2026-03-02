"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({ teams }) {
  const { state } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const isCollapsed = state === "collapsed";

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-white data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg shadow-2xl shrink-0">
                <img
                  src="/stackcart-icon.svg"
                  alt="StackCart"
                  className="size-10 rounded-lg"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                  <span className="truncate font-bold text-[15px] text-slate-800 tracking-tight">
                    {activeTeam.name}
                  </span>
                  <SidebarTrigger />
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
