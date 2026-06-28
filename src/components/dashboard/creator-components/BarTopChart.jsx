"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

export default function BarTopChart({
    totalCopies,
    totalBookmarks,
}) {

    const data = [
        {
            name: "Copies",
            value: totalCopies,
        },
        {
            name: "Bookmarks",
            value: totalBookmarks,
        },
    ];

    return (

        <div className="rounded-3xl border border-emerald-900/20 bg-gradient-to-br from-[#010504] via-[#04100d] to-[#000000] p-6 shadow-[0_0_45px_rgba(16,185,129,.04)]">

            {/* Header */}

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-white">
                    Usage Performance
                </h2>

                <p className="mt-2 text-sm text-emerald-100/60">
                    Compare how many times your prompts have been copied and bookmarked.
                </p>

            </div>

            <div className="h-[380px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                        margin={{
                            top: 25,
                            right: 20,
                            left: -15,
                            bottom: 10,
                        }}
                    >

                        {/* Premium Gradients */}

                        <defs>

                            {/* Copies */}

                            <linearGradient
                                id="copiesGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#8B5CF6"
                                />

                                <stop
                                    offset="55%"
                                    stopColor="#6366F1"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#312E81"
                                />

                            </linearGradient>

                            {/* Bookmarks */}

                            <linearGradient
                                id="bookmarkGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#FBBF24"
                                />

                                <stop
                                    offset="55%"
                                    stopColor="#F59E0B"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#92400E"
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="4 6"
                            stroke="#0f3d35"
                            opacity={0.25}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            tick={{
                                fill: "#A7F3D0",
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tick={{
                                fill: "#6EE7B7",
                                fontSize: 13,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            cursor={{
                                fill: "rgba(16,185,129,.05)",
                            }}
                            contentStyle={{
                                background: "#07110F",
                                border: "1px solid rgba(16,185,129,.18)",
                                borderRadius: "16px",
                                color: "#fff",
                                boxShadow:
                                    "0 15px 40px rgba(0,0,0,.45)",
                            }}
                            labelStyle={{
                                color: "#A7F3D0",
                                fontWeight: 700,
                            }}
                            formatter={(value) => [
                                value,
                                "Total",
                            ]}
                        />

                        <Bar
                            dataKey="value"
                            radius={[14, 14, 0, 0]}
                            maxBarSize={95}
                            animationDuration={1200}
                        >

                            {data.map((item, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        index === 0
                                            ? "url(#copiesGradient)"
                                            : "url(#bookmarkGradient)"
                                    }
                                />

                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* Footer */}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t border-emerald-900/20 pt-5">

                <div className="flex items-center gap-2">

                    <div className="h-3 w-3 rounded-full bg-[#7C3AED]" />

                    <span className="text-sm text-zinc-400">

                        Prompt Copies

                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />

                    <span className="text-sm text-zinc-400">

                        Bookmarks

                    </span>

                </div>

            </div>

        </div>

    );

}