import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "../nav-user";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6 bg-white">
          <SidebarTrigger />
          <NavUser />
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
