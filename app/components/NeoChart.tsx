"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface NeoData {
    name: string;
    diameter: number;
}

interface NeoChartProps {
    data: NeoData[];
}

export default function NeoChart({ data }: NeoChartProps) {
    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 60,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.08)"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="name"
                        angle={-35}
                        textAnchor="end"
                        tick={{
                            fill: "#9ca3af",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                    />

                    <YAxis
                        tick={{
                            fill: "#9ca3af",
                            fontSize: 11,
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}m`}
                    />

                    <Tooltip
                        cursor={{
                            fill: "rgba(255,255,255,0.03)",
                        }}
                        contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        labelStyle={{
                            color: "#9ca3af",
                            marginBottom: "4px",
                        }}
                        formatter={(value) => [
                            `${Number(value).toFixed(2)} m`,
                            "Diameter",
                        ]}
                    />

                    <Bar
                        dataKey="diameter"
                        fill="#3b82f6"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={45}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}