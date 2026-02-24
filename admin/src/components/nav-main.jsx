import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={isActive}
                tooltip={item.title}
                className="transition-all duration-200"
              >
                <NavLink
                  to={item.url}
                  className={`flex items-center gap-4 px-3 py-2.5 rounded-lg 
                  ${
                    isActive
                      ? "bg-blue-50 border-l-blue-600 text-blue-600 border-l-4"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`h-6 w-6 ${
                        isActive ? "text-blue-600" : item.color
                      }`}
                    />
                  )}

                  <span
                    className={`text-base ${
                      isActive
                        ? "font-semibold text-blue-600"
                        : "font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
