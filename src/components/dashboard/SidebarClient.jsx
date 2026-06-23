'use client';

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars, Bookmark, BookOpen, Books, ChartBar, Comment, House, Person, Persons, Plus, ShieldExclamation, SquarePlus, Thunderbolt, Layers } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export default function SidebarClient({ role }) {
    const pathname = usePathname();

    const dashboardNavLinks = {
        user: [
            { icon: Person, label: "My Profile", href: "/dashboard/user/my-profile" },
            { icon: BookOpen, label: "My Prompts", href: "/dashboard/user/my-prompts" },
            { icon: SquarePlus, label: "Add Prompts", href: "/dashboard/user/add-prompts" },
            { icon: Bookmark, label: "Saved Prompts", href: "/dashboard/user/saved-prompts" },
            { icon: Comment, label: "My Reviews", href: "/dashboard/user/my-reviews" }
        ],
        creator: [
            { icon: Person, label: "My Profile", href: "/dashboard/creator/my-profile" },
            { icon: House, label: "Creator Home", href: "/dashboard/creator/home" },
            { icon: Plus, label: "Add Prompt", href: "/dashboard/creator/add-prompt" },
            { icon: Layers, label: "My Prompts", href: "/dashboard/creator/my-prompts" }
        ],
        admin: [
            { icon: Person, label: "My Profile", href: "/dashboard/admin/my-profile" },
            { icon: Persons, label: "All Users", href: "/dashboard/admin/all-users" },
            { icon: Books, label: "All Prompts", href: "/dashboard/admin/all-prompts" },
            { icon: Bookmark, label: "All Payments", href: "/dashboard/admin/all-payments" },
            { icon: ShieldExclamation, label: "Reported Prompts", href: "/dashboard/admin/reported-prompts" },
            { icon: ChartBar, label: "Analytics", href: "/dashboard/admin/analytics" }
        ]
    };

    const navItems = dashboardNavLinks[role] || dashboardNavLinks.user;

    return (
        <Drawer>
            {/* Mobile Hamburger Button (Fixed to Icon Only to save space) */}
            <div className="md:hidden absolute top-3 left-4 z-50">
                <Button
                    className="bg-[#020a07] border border-[#72b01d]/30 text-[#72b01d] hover:bg-[#72b01d]/20 min-w-10 h-10 px-0 flex items-center justify-center rounded-lg shadow-md"
                    variant="flat"
                >
                    <Bars size={20} />
                </Button>
            </div>

            {/* Desktop Sidebar */}
            <nav className="hidden md:flex flex-col gap-2 p-4 border-r border-[#72b01d]/25 w-64 pt-8 bg-[#020604] shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20">

                {/* Logo Section */}
                <div className="pb-12 px-2">
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#72b01d] to-[#044a2b] flex items-center justify-center shadow-[0_0_20px_rgba(114,176,29,0.4)] group-hover:scale-105 transition-all duration-300">
                            <Thunderbolt className="text-[#ffffff]" py={1} size={20} />
                        </div>
                        <span className="text-[#ffffff] text-2xl font-extrabold tracking-wide">
                            Prompt<span className="text-[#72b01d] group-hover:text-[#95d542] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(114,176,29,0.5)]">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                href={item.href}
                                key={item.label}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-[#72b01d]/20 to-transparent border-l-4 border-[#72b01d] text-[#72b01d] shadow-[inset_10px_0_20px_rgba(114,176,29,0.05)]'
                                        : 'text-[#8fbc8f] hover:bg-[#72b01d]/10 hover:text-white border-l-4 border-transparent'
                                    }`}
                            >
                                <item.icon className={`size-5 ${isActive ? 'text-[#72b01d]' : 'text-[#8fbc8f] group-hover:text-white'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Drawer (Fixed Light Mode Issue) */}
            <Drawer.Backdrop className="bg-black/80 backdrop-blur-sm z-[100]">
                <Drawer.Content placement="left" className="!bg-[#020604] border-r border-[#72b01d]/20 w-64 h-full !text-white !m-0 !p-0 shadow-[5px_0_30px_rgba(0,0,0,0.8)]">
                    <Drawer.Dialog className="h-full w-full bg-[#020604] !m-0 !p-0 rounded-none flex flex-col">

                        <div className="flex items-center justify-between border-b border-[#72b01d]/20 px-6 py-5">
                            <Drawer.Heading className="text-[#72b01d] font-bold text-xl tracking-wide">
                                Menu
                            </Drawer.Heading>
                            <Drawer.CloseTrigger className="text-[#72b01d] hover:bg-[#72b01d]/20 hover:text-white rounded-md p-1 transition-colors" />
                        </div>

                        <Drawer.Body className="pt-6 px-4 bg-[#020604] flex-1 overflow-y-auto">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 ${isActive
                                                    ? 'bg-gradient-to-r from-[#72b01d]/20 to-transparent border-l-4 border-[#72b01d] text-[#72b01d]'
                                                    : 'text-[#8fbc8f] hover:bg-[#72b01d]/10 hover:text-white border-l-4 border-transparent'
                                                }`}
                                        >
                                            <item.icon className={`size-5 ${isActive ? 'text-[#72b01d]' : 'text-[#8fbc8f]'}`} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}