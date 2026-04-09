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
} from "@/components/ui/sidebar"
import {
  User,
  Calendar,
  FileText,
  CreditCard,
  Users,
  LogOut,
  Settings,
  Terminal,
  Home,
  ClipboardList,
  CalendarCheck2,
  LifeBuoy,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { appPaths, type AppRouteKey } from "@/routes"

type SidebarItem = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  routeKey: AppRouteKey
}

export function AppSidebar() {
  const items: SidebarItem[] = [
    { title: "Dashboard", icon: Home, routeKey: "dashboard" },
    { title: "Profile", icon: User, routeKey: "profile" },
    { title: "Leave & Attendance", icon: Calendar, routeKey: "leave" },
    { title: "Payroll", icon: CreditCard, routeKey: "payroll" },
    { title: "My Requests", icon: ClipboardList, routeKey: "myRequests" },
    { title: "Attendance Details", icon: CalendarCheck2, routeKey: "attendance" },
    { title: "Documents", icon: FileText, routeKey: "documents" },
    { title: "Helpdesk", icon: LifeBuoy, routeKey: "helpdesk" }
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to={appPaths.dashboard}>
                <Terminal />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ESS Portal</span>
                </div>
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