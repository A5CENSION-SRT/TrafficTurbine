"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,

} from "@/components/ui/sidebar"


const data = {
  versions: ["Traffic Turbine"],
  navMain: [
    {
      title: "Device Cluster",
      url: "#",
      items: [
        {
          title: "Device A", // <-- fix here
          url: "/dashboard/device/device-a",
        },
        {
          title: "Device B", // <-- fix here
          url: "/dashboard/device/device-b",
        }
      ]
    }
  ]
}// for now

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar {...props}>
      <h1 className="text-2xl font-bold m-5 ml-3.5">Traffic Turbine</h1>
        <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
