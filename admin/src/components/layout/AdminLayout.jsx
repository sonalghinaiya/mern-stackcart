import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "../nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function AdminLayout() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <div className="flex h-screen">
      <SidebarProvider className="flex flex-1">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 shrink flex items-center justify-between border-b bg-background/80 backdrop-blur px-6">
            <div className="flex items-center gap-4">
              <Breadcrumb>
                <BreadcrumbList className="flex items-center gap-2 text-sm">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      to="/admin/dashboard"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnames
                    .filter((name) => name !== "admin" && name !== "dashboard")
                    .map((name, index, filtered) => {
                      const routeTo =
                        "/admin/" + filtered.slice(0, index + 1).join("/");

                      const isLast = index === filtered.length - 1;

                      return (
                        <div key={routeTo} className="flex items-center">
                        <BreadcrumbSeparator className="text-muted-foreground" />
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage className="capitalize font-semibold text-foreground ms-1">
                                {name}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                to={routeTo}
                                className="capitalize text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {name}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </div>
                      );
                    })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
              <NavUser variant="navbar" />
            </div>
          </header>
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default AdminLayout;
