import {Outlet, useNavigate} from "react-router";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AdminSidebar from "@/components/AdminSidebar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import Cookies from "js-cookie";
import {useEffect} from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return (
    <SidebarProvider>
      <AdminSidebar/>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <SidebarTrigger/>
            <ModeToggle/>
          </div>
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
