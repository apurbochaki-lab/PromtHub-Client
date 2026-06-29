"use client";
import { FileText, Copy, Bookmark } from "lucide-react";

const StatsCard = ({ totalPrompt, totalCopies, totalBookmarks }) => {
    const statItems = [
        {
            title: "Total Prompts",
            value: totalPrompt,
            icon: <FileText size={22} className="text-emerald-400" />,
            progress: "w-[80%]", // Example visual indicator
            color: "from-emerald-500/20 to-transparent",
        },
        {
            title: "Total Copies",
            value: totalCopies,
            icon: <Copy size={22} className="text-teal-400" />,
            progress: "w-[65%]",
            color: "from-teal-500/20 to-transparent",
        },
        {
            title: "Total Bookmarks",
            value: totalBookmarks,
            icon: <Bookmark size={22} className="text-cyan-400" />,
            progress: "w-[45%]",
            color: "from-cyan-500/20 to-transparent",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-8 mx-auto">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-[#030d09] border border-[#0a2e21] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.15)] active:scale-95 cursor-pointer"
                >
                    {/* Subtle Background Glow on Hover */}
                    <div
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10 flex flex-col gap-4">
                        {/* Header Area */}
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded-xl bg-[#021f14] border border-[#0a3a27] shadow-inner">
                                {item.icon}
                            </div>
                            <span className="text-xs font-semibold tracking-wider text-emerald-200/60 uppercase">
                                Analytics
                            </span>
                        </div>

                        {/* Content Area */}
                        <div>
                            <h3 className="text-emerald-50 font-bold text-4xl mt-2 tracking-tight">
                                {item.value}
                            </h3>
                            <p className="text-emerald-100/70 text-sm font-medium mt-1">
                                {item.title}
                            </p>
                        </div>

                        {/* Decorative Premium Progress Bar */}
                        <div className="w-full h-1.5 bg-[#021f14] rounded-full mt-2 overflow-hidden border border-[#0a2e21]/50">
                            <div
                                className={`h-full bg-gradient-to-r ${index === 0 ? "from-emerald-600 to-emerald-400" :
                                    index === 1 ? "from-teal-600 to-teal-400" :
                                        "from-cyan-600 to-cyan-400"
                                    } rounded-full ${item.progress} transition-all duration-1000 ease-out`}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCard;