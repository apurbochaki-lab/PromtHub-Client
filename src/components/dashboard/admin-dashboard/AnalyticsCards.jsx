"use client";

import { Card } from "@heroui/react";
import {
    Users,
    FileText,
    MessageSquareText,
    Copy,
    Wallet,
} from "lucide-react";

const AnalyticsCards = ({ analytics }) => {
    const {
        totalUsersCount,
        totalPromptsCount,
        totalReviewsCount,
        totalCopyCount,
        totalRevenue,
    } = analytics;

    const cards = [
        {
            title: "Total Users",
            value: totalUsersCount,
            icon: Users,
            iconColor: "text-violet-300",
            iconBg:
                "from-violet-500/20 to-violet-900/10 border-violet-500/20",
            glow: "hover:shadow-[0_0_45px_rgba(139,92,246,.25)]",
        },
        {
            title: "Total Prompts",
            value: totalPromptsCount,
            icon: FileText,
            iconColor: "text-emerald-300",
            iconBg:
                "from-emerald-500/20 to-emerald-900/10 border-emerald-500/20",
            glow: "hover:shadow-[0_0_45px_rgba(16,185,129,.25)]",
        },
        {
            title: "Total Reviews",
            value: totalReviewsCount,
            icon: MessageSquareText,
            iconColor: "text-cyan-300",
            iconBg: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/20",
            glow: "hover:shadow-[0_0_45px_rgba(34,211,238,.25)]",
        },
        {
            title: "Total Copies",
            value: totalCopyCount,
            icon: Copy,
            iconColor: "text-amber-300",
            iconBg:
                "from-amber-500/20 to-amber-900/10 border-amber-500/20",
            glow: "hover:shadow-[0_0_45px_rgba(251,191,36,.25)]",
        },
        {
            title: "Revenue",
            value: `$${Number(totalRevenue)}`,
            icon: Wallet,
            iconColor: "text-rose-300",
            iconBg: "from-rose-500/20 to-rose-900/10 border-rose-500/20",
            glow: "hover:shadow-[0_0_45px_rgba(244,63,94,.25)]",
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Card
                        key={card.title}
                        ispressable="true"
                        shadow="none"
                        className={`
              group
              relative
              overflow-hidden
              border
              border-white/10
              bg-gradient-to-br
              from-[#231317]
              via-[#17171d]
              to-[#102019]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:scale-[1.03]
              active:scale-95
              ${card.glow}
            `}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.08),transparent_45%)]" />

                        <Card.Content className="relative p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-default-400">
                                        {card.title}
                                    </p>

                                    <h2 className="mt-3 text-4xl font-bold text-white">
                                        {card.value}
                                    </h2>
                                </div>

                                <div
                                    className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    bg-gradient-to-br
                    ${card.iconBg}
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                  `}
                                >
                                    <Icon
                                        className={`${card.iconColor} h-6 w-6 transition-transform duration-500 group-hover:scale-125`}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 h-[4px] overflow-hidden rounded-full bg-white/5">
                                <div className="h-full w-0 rounded-full bg-gradient-to-r from-emerald-400 via-rose-400 to-violet-400 transition-all duration-700 group-hover:w-full" />
                            </div>
                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
};

export default AnalyticsCards;