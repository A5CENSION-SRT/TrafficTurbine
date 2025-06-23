import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ deviceData = [] }) {
  // Get the most recent data point
  const latestData = deviceData.length > 0 ? deviceData[deviceData.length - 1] : null;
  
  // Calculate carbon offset (example: 0.5kg CO2 per kWh)
  const carbonOffsetKg = latestData ? (latestData.energy * 0.5).toFixed(2) : 0;
  
  // Format values
  
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value || 0);
  };

  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Power Output</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestData ? `${latestData.power.toFixed(2)} W` : 'N/A'}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {latestData ? `${(latestData.power / 10).toFixed(1)}%` : '0%'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {latestData ? 'Current power output' : 'No data available'}
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Energy Generated</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestData ? formatNumber(latestData.energy) : '0'} Wh
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {latestData ? `${(latestData.energy / 100).toFixed(1)}%` : '0%'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total energy generated
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Battery Level</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestData ? `${latestData.batteryLevel.toFixed(1)}%` : '0%'}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {latestData && latestData.batteryLevel > 50 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {latestData ? `${(latestData.batteryLevel / 10).toFixed(1)}%` : '0%'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {latestData && latestData.batteryLevel > 50 ? 'Good' : 'Low'} battery level
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Estimated Carbon Offset</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {carbonOffsetKg} kg CO₂
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {latestData ? `${(carbonOffsetKg / 10).toFixed(1)}%` : '0%'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Carbon offset from energy generated
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
