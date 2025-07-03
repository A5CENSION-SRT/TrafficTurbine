"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
  IconDashboard,
  IconSettings,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const clusterData = [
  {
    DeviceName: "ARD-1",
    Url: "/dashboard/1",
  },
  {
    DeviceName: "ARD-2",
    Url: "/dashboard/2",
  },
  {
    DeviceName: "ARD-3",
    Url: "/dashboard/3",
  },
  {
    DeviceName: "ARD-4",
    Url: "/dashboard/4",
  },
]


export function AppSidebar({ ...props }) {
  return (
    <Sidebar className="sidebar list-none !p-0" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Traffic Turbine</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <a href="#">
              <IconDashboard className="!size-4" />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>Device Cluster</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {clusterData.map((item) => (
                <SidebarMenuSubItem key={item.DeviceName}>
                  <SidebarMenuSubButton asChild>
                    <a href={item.Url}>{item.DeviceName}</a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <IconSettings className="!size-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
