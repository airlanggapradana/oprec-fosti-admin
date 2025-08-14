"use client"

import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"


interface ChartData {
  tanggal: string
  jumlah: number
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarDefault({chartData}: { chartData: ChartData[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>10 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="tanggal"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel/>}
            />
            <Bar dataKey="jumlah" fill="var(--color-desktop)" radius={8}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Pertumbuhan pendaftar pada 10 hari terakhir <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="text-muted-foreground leading-none">
          Jumlah pendaftar yang mendaftar dalam 10 hari terakhir
        </div>
      </CardFooter>
    </Card>
  )
}
