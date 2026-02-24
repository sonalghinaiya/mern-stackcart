import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
              >
                <NavLink to={item.url}>
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}