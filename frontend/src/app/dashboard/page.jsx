"use client"
import React, {useEffect, useState} from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import PowerGraph from "@/components/ui/powergraph";



export default function Page() {
    const [energyData,setEnergyData] =useState([]);

    useEffect(() =>{
      fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => setEnergyData(data))
      .catch((err) =>console.error("Failed to fetch the data" ,err));
    },[]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Device cluster
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>

              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <div>
            <PowerGraph/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
