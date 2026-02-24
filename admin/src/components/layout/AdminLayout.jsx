import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
