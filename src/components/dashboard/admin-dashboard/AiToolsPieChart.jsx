"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Eye-catchy Neon Marine Green Palette (Dark ড্যাশবোর্ডে দারুণ ফুটবে)
const COLORS = ["#10B981", "#34D399", "#059669", "#6EE7B7", "#047857"];

export default function AiToolsPieChart({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-[450px] p-6 bg-gradient-to-br from-[#111827]/40 to-[#0b0f19]/60 backdrop-blur-md rounded-2xl border border-gray-800/60 shadow-xl flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-200">
                    AI Tools Usage
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                    Distribution based on total prompts generated.
                </p>
            </div>

            <div className="w-full h-[320px] relative mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%" // একটু ওপরে উঠানো হয়েছে যেন নিচে Legend এর জন্য পর্যাপ্ত জায়গা থাকে
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={6}
                            dataKey="totalPrompts"
                            nameKey="_id"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        {/* Dark Theme-matched Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderColor: '#1f2937',
                                color: '#f3f4f6',
                                borderRadius: '12px',
                                fontSize: '14px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#10B981', fontWeight: '600' }}
                        />

                        {/* Custom styled Legend with proper spacing */}
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ paddingTop: "20px" }}
                            formatter={(value) => (
                                <span className="text-gray-400 text-xs font-medium px-1">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}