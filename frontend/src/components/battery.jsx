"use client"

import { Battery, BatteryFull, BatteryLow, BatteryMedium, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartConfig = {
  batteryLevel: {
    label: "Battery Level",
    color: "#3b82f6",
    unit: "%"
  }
}

export function BatteryChart({ data = [] }) {
  const [timeRange, setTimeRange] = useState("7d")

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.log('Data is not an array:', data);
      return [];
    }
    
    const now = new Date();
    let start = new Date();
    
    switch (timeRange) {
      case "1d":
        start.setDate(now.getDate() - 1);
        break;
      case "7d":
        start.setDate(now.getDate() - 7);
        break;
      case "30d":
        start.setDate(now.getDate() - 30);
        break;
      default:
        start = new Date(0);
    }
    
    console.log('Filtering data - start date:', start);
    console.log('Raw data first few items:', data.slice(0, 3));
    
    const result = data
      .filter(item => {
        if (!item || !item.time) return false;
        const itemDate = new Date(item.time);
        return itemDate >= start;
      })
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .map(item => ({
        ...item,
        timestamp: item.time,  // Ensure we have timestamp for compatibility
        time: new Date(item.time).toLocaleTimeString(),
        date: new Date(item.time).toLocaleDateString(),
        batteryLevel: Number(item.batteryLevel) || 0
      }));
    
    console.log('Processed data:', result);
    return result;
  }, [data, timeRange])

  const getBatteryIcon = (level) => {
    if (!level && level !== 0) return <Battery className="h-5 w-5 text-gray-400" />
    if (level > 75) return <BatteryFull className="h-5 w-5 text-green-500" />
    if (level > 50) return <BatteryMedium className="h-5 w-5 text-yellow-500" />
    if (level > 25) return <BatteryLow className="h-5 w-5 text-orange-500" />
    return <Battery className="h-5 w-5 text-red-500" />
  }

  const averageBatteryLevel = useMemo(() => {
    if (!filteredData.length) return 0
    const sum = filteredData.reduce((acc, curr) => acc + (curr.batteryLevel || 0), 0)
    return (sum / filteredData.length).toFixed(1)
  }, [filteredData])

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Battery Level</CardTitle>
            <CardDescription className="mt-1">
              {timeRange === "1d" ? "Last 24 hours" : `Last ${timeRange}`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getBatteryIcon(averageBatteryLevel)}
            <span className="text-2xl font-bold">{averageBatteryLevel}%</span>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            className="h-8 gap-1"
            variant="outline"
          >
            <ToggleGroupItem value="1d" className="h-8 text-xs px-2">
              1D
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 text-xs px-2">
              7D
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 text-xs px-2">
              30D
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}
        className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return timeRange === "1d" 
                  ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const data = payload[0].payload
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium">
                      {new Date(data.timestamp).toLocaleString()}
                    </p>
                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: chartConfig.batteryLevel.color }}
                        />
                        <span className="text-sm">
                          {chartConfig.batteryLevel.label}: {data.batteryLevel}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }}
            />
            <Line
              type="monotone"
              dataKey="batteryLevel"
              stroke={chartConfig.batteryLevel.color}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: chartConfig.batteryLevel.color,
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing {filteredData.length} data points from the last {timeRange === "1d" ? 'day' : timeRange === "7d" ? 'week' : 'month'}
        </div>
      </CardFooter>
    </Card>
  )
}
