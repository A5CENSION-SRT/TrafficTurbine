"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
const chartConfig = {
  voltage: {
    label: "Voltage (V)",
    color: "#ef4444", // Red
  },
  current: {
    label: "Current (A)",
    color: "#22c55e", // Green
  },
  power: {
    label: "Power (W)",
    color: "#3b82f6", // Blue
  },
  energy: {
    label: "Energy (Wh)",
    color: "#8b5cf6", // Purple (as a fourth distinct color)
  },
}
export function ChartAreaInteractive({ data = [] }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    if (!Array.isArray(data)) {
      return []
    }
    const now = new Date()
    let start = new Date()
    switch (timeRange) {
      case "1d":
        start.setDate(now.getDate() - 1)
        break
      case "7d":
        start.setDate(now.getDate() - 7)
        break
      case "30d":
        start.setDate(now.getDate() - 30)
        break
      case "90d":
        start.setDate(now.getDate() - 90)
        break
      default:
        start = new Date(0)
        break
    }
    return data.filter((item) => new Date(item.time) >= start)
  }, [data, timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Device Metrics</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Interactive chart displaying voltage, current, power, and energy over time.
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="1d">Today</ToggleGroupItem>
            <ToggleGroupItem value="7d">This week</ToggleGroupItem>
            <ToggleGroupItem value="30d">This month</ToggleGroupItem>
            <ToggleGroupItem value="90d">Lifetime</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1d" className="rounded-lg">Today</SelectItem>
              <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
              <SelectItem value="90d" className="rounded-lg">Lifetime</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.entries(chartConfig).map(([key, config]) => (
                <linearGradient key={key} id={`fill${key.charAt(0).toUpperCase() + key.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                if (timeRange === "1d") {
                  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
                fillOpacity={0.4}
                stroke={chartConfig[key].color}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
