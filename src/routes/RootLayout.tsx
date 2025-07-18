import {Outlet} from "react-router";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AdminSidebar from "@/components/AdminSidebar.tsx";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar/>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SidebarTrigger/>
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
