import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  User,
  Calendar,
  FileText,
  CreditCard,
  Users,
  LogOut,
  Settings,
  Home,
  ClipboardList,
  CalendarCheck2,
  LifeBuoy,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { appPaths, type AppRouteKey } from "@/routes"
import { NexoLogo } from "@/components/dashboard/logo"


type SidebarItem = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  routeKey: AppRouteKey
}

export function AppSidebar() {
  const { isMobile, setOpen } = useSidebar()

  const items: SidebarItem[] = [
    { title: "Dashboard", icon: Home, routeKey: "dashboard" },
    { title: "Profile", icon: User, routeKey: "profile" },
    { title: "Leave", icon: Calendar, routeKey: "leave" },
    { title: "Payroll", icon: CreditCard, routeKey: "payroll" },
    { title: "My Requests", icon: ClipboardList, routeKey: "myRequests" },
    { title: "Attendance Details", icon: CalendarCheck2, routeKey: "attendance" },
    { title: "Documents", icon: FileText, routeKey: "documents" },
    { title: "Helpdesk", icon: LifeBuoy, routeKey: "helpdesk" }
  ]

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => {
        if (!isMobile) setOpen(true)
      }}
      onMouseLeave={() => {
        if (!isMobile) setOpen(false)
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          <SidebarMenuButton asChild>
  <NavLink to={appPaths.dashboard} className="flex items-center gap-2">
    <NexoLogo className="h-6 w-6 stroke-[1.5]" /> {/* Styled like Lucide icons */}
    <span className="font-semibold text-lg tracking-tight">Nexo</span>
  </NavLink>
</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={appPaths[item.routeKey]}
                      className={({ isActive }) =>
                        isActive ? "font-semibold text-foreground" : "text-muted-foreground"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users /> Directory
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText /> Documents & Policies
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings /> Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive">
              <LogOut /> Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}