import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="uppercase text-gray-400">
        Menu
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size="md"
                isActive={isActive}
                tooltip={item.title}
                className="transition-all duration-200"
              >
                <NavLink
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg 
                  ${
                    isActive
                      ? "bg-indigo-50 border-l-blue-700 text-blue-700 border-l-4"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`h-5 w-5 ${
                        isActive ? "text-blue-700" : item.color
                      }`}
                    />
                  )}

                  <span
                    className={`${
                      isActive ? "font-semibold text-blue-700" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                  {/* <span
                    className={`${
                      isActive
                        ? "ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"
                        : ""
                    }`}
                  ></span> */}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
