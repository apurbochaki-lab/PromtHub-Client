import { getUserSession } from "@/lib/core/session";
import {
    Shield,
    Envelope,
    CrownDiamond,
    ArrowUpRight,
    CircleCheck,
    LayoutCells,
    Check
} from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from 'next/image'; // Importing Next.js Image component

const MyProfilePage = async () => {
    const currentUser = await getUserSession();

    // Restricted strictly to Admin Role
    if (!currentUser || currentUser?.role !== "admin") {
        redirect("/error/unauthorized");
    }

    const user = currentUser || {
        name: "Not found",
        email: "Not found",
        image: "https://i.pravatar.cc/150?u=apurbo",
        role: "admin"
    };

    return (
        // Super Ultra Premium Deep Obsidian Carbon Base
        <div className="relative min-h-[85vh] w-full bg-[#08080a] text-[#f3f4f6] p-4 sm:p-8 md:p-12 overflow-hidden rounded-[2.5rem] border border-[#1a1a24] shadow-[0_0_50px_rgba(0,0,0,0.8)]">

            {/* Ultra Elegant Gold & Cyber Violet Ambient Glow Overlays */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#d4af37]/10 to-[#7000ff]/5 blur-[150px] opacity-40 pointer-events-none rounded-full" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#9a7b1c]/10 to-transparent blur-[150px] opacity-30 pointer-events-none rounded-full" />

            {/* Subtle Metallic Grid Pattern Overlay for Depth */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161f_1px,transparent_1px),linear-gradient(to_bottom,#16161f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto space-y-8">

                {/* 1. Header Banner Layout */}
                {/* Background color changed to dark marine greenish, text color adjusted, rest kept as in image_0.png */}
                <div className="bg-[#0a2123]/80 backdrop-blur-2xl border border-[#242433] rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

                        {/* Golden Avatar Layer */}
                        <div className="relative group">
                            <div className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#d4af37] via-[#9a7b1c] to-[#1a1a24] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                {/* Replaced img tag with Next.js Image component */}
                                <Image
                                    src={user?.image || `https://ui-avatars.com/api/?name=${user.name}&background=0f0f15&color=d4af37`}
                                    alt={user?.name || "User profile image"}
                                    className="w-full h-full rounded-full object-cover bg-[#0a2123]"
                                    width={112} // 28 * 4
                                    height={112} // 28 * 4
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#08080a] p-2 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] animate-pulse">
                                <CrownDiamond size={16} />
                            </div>
                        </div>

                        {/* Identity & Status */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-[#f3f4f6] to-[#a3a3a3] bg-clip-text text-transparent">
                                    {user?.name}
                                </h1>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] rounded-md text-[10px] font-extrabold uppercase tracking-widest">
                                    Root Admin
                                </span>
                            </div>

                            <p className="text-[#a3a3bc] text-sm flex items-center justify-center md:justify-start gap-2">
                                <Envelope size={14} className="text-[#d4af37]/80" /> {user?.email}
                            </p>

                            <div className="pt-1">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#08080a] border border-[#2b2b3d] text-[#e2e2e9] rounded-full text-xs font-medium tracking-wide">
                                    <Shield size={14} className="text-[#d4af37]" /> Administrator Console Active
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Link with Premium Accent Hover */}
                    <Link href="/" className="group flex items-center gap-2 text-xs font-semibold text-[#a3a3bc] hover:text-white bg-[#08080a] hover:bg-[#1a1a26] px-5 py-3 rounded-xl border border-[#242433] hover:border-[#d4af37]/40 transition-all duration-300 shadow-inner">
                        Return to Marketplace <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d4af37]" />
                    </Link>
                </div>

                {/* 2. Main Premium Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left & Middle Side: Exclusive Ultra-VIP Lifetime Admin Privilege Card */}
                    <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#111119] via-[#0d0d12] to-[#08080a] border border-[#262636] rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between shadow-2xl group transition-all duration-500 hover:border-[#d4af37]/30">

                        {/* Inner Micro Glow Overlay */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#d4af37]/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-[#d4af37]/10 transition-all duration-700" />

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#d4af37]/10 to-transparent text-[#d4af37] rounded-lg border-l-2 border-[#d4af37] text-xs font-black tracking-widest uppercase">
                                Root Privilege Account
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Lifetime Ultimate Premium <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] bg-clip-text text-transparent">VIP Access Granted</span>
                            </h2>

                            <p className="text-[#a3a3bc] text-sm leading-relaxed max-w-xl">
                                As a premier <span className="text-[#d4af37] font-semibold">System Administrator</span>, your profile operates under high-tier system clearance. You are granted complimentary, permanent lifetime access to all marketplace layers, advanced metric tooling, and core developer tools.
                            </p>

                            {/* Perks Matrix */}
                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#c1c1d1]">
                                <div className="flex items-center gap-2.5 bg-[#08080a]/50 p-3 rounded-xl border border-[#1f1f2e]">
                                    <CircleCheck size={15} className="text-[#d4af37]" /> Core System Configuration
                                </div>
                                <div className="flex items-center gap-2.5 bg-[#08080a]/50 p-3 rounded-xl border border-[#1f1f2e]">
                                    <CircleCheck size={15} className="text-[#d4af37]" /> Advanced Analytics Override
                                </div>
                                <div className="flex items-center gap-2.5 bg-[#08080a]/50 p-3 rounded-xl border border-[#1f1f2e]">
                                    <CircleCheck size={15} className="text-[#d4af37]" /> Global Marketplace Moderation
                                </div>
                                <div className="flex items-center gap-2.5 bg-[#08080a]/50 p-3 rounded-xl border border-[#1f1f2e]">
                                    <CircleCheck size={15} className="text-[#d4af37]" /> Absolute Platform Waiver
                                </div>
                            </div>
                        </div>

                        {/* Card Elegant Footer */}
                        <div className="mt-10 pt-5 border-t border-[#1f1f2e] flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-[#717185]">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                                <span>Status Block: <span className="text-white font-bold uppercase tracking-wider">LIFETIME PREMIUM BYPASS</span></span>
                            </div>
                            <span className="font-mono text-[10px] tracking-widest bg-[#08080a] px-3 py-1 rounded-md border border-[#1f1f2e]">
                                SYS-ADM-{user?.name.slice(0, 3).toUpperCase()}-2026
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Sleek Obsidian Admin Status Cards */}
                    <div className="lg:col-span-1 flex flex-col gap-6">

                        {/* Panel Status 1 */}
                        <div className="relative overflow-hidden bg-[#0a2123]/80 backdrop-blur-xl border border-[#242433] rounded-2xl p-6 transition-all duration-300 hover:border-[#d4af37]/30">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent text-[#d4af37] flex items-center justify-center mb-4 border border-[#d4af37]/20">
                                <LayoutCells size={18} />
                            </div>
                            <p className="text-[#717185] text-[11px] font-extrabold uppercase tracking-widest mb-1">Infrastructure</p>
                            <h3 className="text-2xl font-black text-white">Full Access</h3>
                            <p className="text-xs text-[#a3a3bc] mt-1">Global ecosystem visibility.</p>
                        </div>

                        {/* Panel Status 2 */}
                        <div className="relative overflow-hidden bg-[#0a2123]/80 backdrop-blur-xl border border-[#242433] rounded-2xl p-6 transition-all duration-300 hover:border-[#d4af37]/30">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent text-[#d4af37] flex items-center justify-center mb-4 border border-[#d4af37]/20">
                                <Check size={18} />
                            </div>
                            <p className="text-[#717185] text-[11px] font-extrabold uppercase tracking-widest mb-1">System Security</p>
                            <h3 className="text-lg font-bold text-[#d4af37] flex items-center gap-1.5">
                                Verified System Root
                            </h3>
                            <p className="text-xs text-[#a3a3bc] mt-1">Encrypted profile instance.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;