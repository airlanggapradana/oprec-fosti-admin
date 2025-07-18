import {
  Sidebar,
  SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarRail
} from "@/components/ui/sidebar.tsx";
import {BarChart3, LogOut, Store, Users} from "lucide-react";
import {useLocation, useNavigate} from "react-router";
import Cookies from "js-cookie";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "/",
  },
  {
    title: "Mahasiswa",
    icon: Users,
    id: "/mahasiswa",
  },
]

const AdminSidebar = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Store className="size-4"/>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Oprec Fosti {new Date().getFullYear()} Admin</span>
                <span className="text-xs">Dashboard System</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={pathname === item.id} onClick={() => navigate(item.id)}>
                    <item.icon className="size-4"/>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  Cookies.remove("token");
                  navigate("/")
                }}>
                  <span className="flex items-center gap-1 font-normal"><LogOut className="size-4 mr-2"/>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  );
};

export default AdminSidebar;
