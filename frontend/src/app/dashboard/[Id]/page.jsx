"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BatteryChart } from "@/components/battery";


export default function Page() {
  const params = useParams();
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    console.log("params:", params);
    const deviceIdStr = params?.Id;
    const deviceId = Number(deviceIdStr);
    console.log("deviceId:", deviceId);
    fetch(`https://trafficturbine.onrender.com/api/data/${deviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setDeviceData(data)
        console.log("Fetched data:", data)
      })
      .catch((err) => console.error("Failed to fetch device data:", err));
  }, [params]);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards deviceData={deviceData} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={deviceData} />
                <BatteryChart data={deviceData} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
