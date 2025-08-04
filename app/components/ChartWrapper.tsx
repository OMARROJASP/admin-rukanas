"use client";

import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardContent } from "@/components/ui/card";

interface Props {
  data: {
    date: string;
    total: number | string;
  }[];
}

const chartConfig = {
  orders: {
    label: "Total Orders",
  },
  customers: {
    label: "Total Orders",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const ChartWrapper = ({ data }: Props) => {
  // Normalizar data para que funcione bien con Recharts
  const cleanData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("es-PE", {
      timeZone: "America/Lima",
      day: "numeric",
      month: "short",
    }),
    total: Number(item.total),
  }));

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <CardContent className="px-2 sm:p-6 w-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={cleanData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="total"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleString("es-PE", {
                      timeZone: "America/Lima",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default ChartWrapper;
