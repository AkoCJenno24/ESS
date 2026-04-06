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
<<<<<<< HEAD
} from "@/components/ui/sidebar"
import { 
  User, Calendar, FileText, CreditCard, 
  Users, HelpCircle, LogOut, Settings 
} from "lucide-react"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* 1. Header: Company Logo/Name */}
      <SidebarHeader className="p-4 font-bold text-xl">
        ESS Portal
=======
} from "@/components/ui/sidebar";

import {
  User,
  Calendar,
  FileText,
  CreditCard,
  Users,
  LogOut,
  Settings,
  Terminal,
} from "lucide-react";

export function AppSidebar() {
  const items = [
    {
      title: "Profile",
      icon: User,
      url: "#",
    },
    {
      title: "Leave & Attendance",
      icon: Calendar,
      url: "#",
    },
    {
      title: "Payroll",
      icon: CreditCard,
      url: "#",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Terminal />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ESS Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
>>>>>>> 4a8a594 (updated file directory)
      </SidebarHeader>

      <SidebarContent>
        {/* 2. Personal Group: Everyday tasks */}
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
<<<<<<< HEAD
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="My Profile"><User /> Profile</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Leave & Attendance"><Calendar /> Leave & Attendance</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pay & Benefits"><CreditCard /> Payroll</SidebarMenuButton>
              </SidebarMenuItem>
=======
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
>>>>>>> 4a8a594 (updated file directory)
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 3. Company Group: Resources & People */}
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
<<<<<<< HEAD
                <SidebarMenuButton><Users /> Directory</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><FileText /> Documents & Policies</SidebarMenuButton>
=======
                <SidebarMenuButton>
                  <Users /> Directory
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText /> Documents & Policies
                </SidebarMenuButton>
>>>>>>> 4a8a594 (updated file directory)
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 4. Footer: Settings & User Profile Toggle */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
<<<<<<< HEAD
            <SidebarMenuButton><Settings /> Settings</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive"><LogOut /> Logout</SidebarMenuButton>
=======
            <SidebarMenuButton>
              <Settings /> Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive">
              <LogOut /> Logout
            </SidebarMenuButton>
>>>>>>> 4a8a594 (updated file directory)
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 4a8a594 (updated file directory)
}
