"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const GrowthChart = ({ totalPrompt, totalCopies, totalBookmarks }) => {
    // Chart er jonno data format kora holo
    const data = [
        { name: "Prompts", value: totalPrompt, gradient: "url(#colorPrompt)" },
        { name: "Copies", value: totalCopies, gradient: "url(#colorCopies)" },
        { name: "Bookmarks", value: totalBookmarks, gradient: "url(#colorBookmarks)" },
    ];

    // Custom Tooltip Design
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#021f14] border border-[#0a3a27] p-4 rounded-xl shadow-lg">
                    <p className="text-emerald-200/80 text-xs font-semibold uppercase tracking-wider mb-1">
                        {label}
                    </p>
                    <p className="text-emerald-50 text-2xl font-bold">
                        {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full mt-6 p-6 bg-[#020604] border border-[#0a2e21] rounded-2xl shadow-[0_8px_30px_-5px_rgba(16,185,129,0.05)]">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-emerald-50 tracking-tight">
                    Prompt Growth Metrics
                </h3>
                <p className="text-emerald-100/60 text-sm mt-1">
                    Comparison between prompts, copies, and bookmarks.
                </p>
            </div>

            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barSize={60} // Bar er width
                    >
                        {/* Custom Gradients for a Premium Look */}
                        <defs>
                            <linearGradient id="colorPrompt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                                <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={1} />
                                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="colorBookmarks" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                                <stop offset="100%" stopColor="#0891b2" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>

                        {/* Faint Dark Green Grid Lines */}
                        <CartesianGrid strokeDasharray="3 3" stroke="#0a2e21" vertical={false} />

                        <XAxis
                            dataKey="name"
                            stroke="#6ee7b7"
                            opacity={0.6}
                            tick={{ fill: '#a7f3d0', fontSize: 13, fontWeight: 500 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#6ee7b7"
                            opacity={0.6}
                            tick={{ fill: '#a7f3d0', fontSize: 13 }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: '#0a2e21', opacity: 0.4 }}
                            content={<CustomTooltip />}
                        />

                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.gradient} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthChart;