import { getUserSession } from "@/lib/core/session";
import {
    Person,
    Envelope,
    ShieldCheck,
    Files,
    CrownDiamond,
    CircleCheck,
    ArrowUpRight
} from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation"; // রোল গার্ডের জন্য রিডাইরেক্ট ইম্পোর্ট করা হলো

const MyProfilePage = async () => {
    const currentUser = await getUserSession();
    const myPostCount = 5;

    // 🔴 1. Strict Role Guard: ক্রিয়েটর ছাড়া অন্য কেউ আসলে হোমে রিডাইরেক্ট করে দেবে
    if (!currentUser || currentUser?.role !== "creator") {
        redirect("/");
    }

    const user = currentUser || {
        name: "Not found",
        email: "Not found",
        image: "https://i.pravatar.cc/150?u=apurbo",
        role: "creator"
    };

    return (
        // চোখের আরামের জন্য ব্যাকগ্রাউন্ডে সফট ম্যাট গ্রিনিশ ডার্ক টোন (#0b110e) ব্যবহার করা হয়েছে
        <div className="relative min-h-[85vh] w-full bg-[#0b110e] text-[#e3e9e5] p-6 md:p-10 overflow-hidden rounded-3xl border border-[#1b2c24]">

            {/* Soft Green Ambient Light (কালার কনট্রাস্ট কমানো হয়েছে আই-কমফোর্টের জন্য) */}
            <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#72b01d] blur-[180px] opacity-5 pointer-events-none rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#22441f] blur-[180px] opacity-10 pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto space-y-8">

                {/* 2. New Layout Style: Top Horizontal Modern Profile Banner */}
                <div className="bg-[#121c17]/60 backdrop-blur-xl border border-[#233a2e] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        {/* Avatar Layer */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-tr from-[#72b01d]/50 to-[#2e531c]">
                                <img
                                    src={user?.image || `https://ui-avatars.com/api/?name=${user.name}&background=121c17&color=ffffff`}
                                    alt={user?.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#72b01d] text-[#0b110e] p-1.5 rounded-full shadow-lg">
                                <CrownDiamond size={14} />
                            </div>
                        </div>

                        {/* Name & Role Spec */}
                        <div className="space-y-1.5">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{user?.name}</h1>
                            <p className="text-[#8ba38f] text-sm flex items-center justify-center md:justify-start gap-2">
                                <Envelope size={14} className="text-[#72b01d]/70" /> {user?.email}
                            </p>
                            <div className="pt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1b3126] border border-[#2e523f] text-[#8ce2a1] rounded-full text-xs font-semibold uppercase tracking-wider">
                                    <Person size={12} /> Creator Account
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Overview Link */}
                    <Link href="/" className="group flex items-center gap-2 text-xs font-medium text-[#8ba38f] hover:text-[#72b01d] bg-[#16241e] px-4 py-2.5 rounded-xl border border-[#233a2e] transition-all">
                        View Marketplace <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* 3. Bottom Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left & Mid Side: Ultra-Premium Lifetime Free Creator Pass Card */}
                    <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#12231a] to-[#0e1612] border border-[#2d4d3b] rounded-3xl p-8 flex flex-col justify-between shadow-2xl group">

                        {/* Premium Soft Glow Graphic overlay inside card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#72b01d]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#72b01d]/15 transition-all duration-500" />

                        <div className="space-y-4 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#72b01d]/10 text-[#72b01d] rounded-lg border border-[#72b01d]/20 text-xs font-bold tracking-wide uppercase">
                                Exclusive Privilege
                            </div>
                            <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                Premium Lifetime Pass Active
                            </h2>
                            <p className="text-[#96ae9d] text-sm leading-relaxed">
                                As an authorized <span className="text-[#72b01d] font-semibold">Creator</span> on our platform, you have automatically unlocked full access to all premium features, parameters, and monetization suites entirely free of charge. Forever.
                            </p>

                            {/* Features breakdown for Creators */}
                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#8ca594]">
                                <div className="flex items-center gap-2">
                                    <CircleCheck size={14} className="text-[#72b01d]" /> Unlimited Prompt Submissions
                                </div>
                                <div className="flex items-center gap-2">
                                    <CircleCheck size={14} className="text-[#72b01d]" /> Advanced Parameters Analytics
                                </div>
                                <div className="flex items-center gap-2">
                                    <CircleCheck size={14} className="text-[#72b01d]" /> Verified Creator Badge
                                </div>
                                <div className="flex items-center gap-2">
                                    <CircleCheck size={14} className="text-[#72b01d]" /> Zero Marketplace Platform Fees
                                </div>
                            </div>
                        </div>

                        {/* Premium Footer Text inside pass */}
                        <div className="mt-8 pt-4 border-t border-[#233c2e] flex items-center justify-between text-xs text-[#738a7a]">
                            <span>Subscription Status: <span className="text-[#72b01d] font-bold">LIFETIME FREE</span></span>
                            <span className="font-mono text-[10px] tracking-widest opacity-40">PASS-ID: CR-{user?.name.slice(0, 3).toUpperCase()}-2026</span>
                        </div>
                    </div>

                    {/* Right Side: Muted Sage Stats Column */}
                    <div className="lg:col-span-1 flex flex-col gap-6">

                        {/* Stat Item 1: Prompts */}
                        <div className="bg-[#121c17]/50 border border-[#1f3529] rounded-2xl p-6 hover:border-[#2d4d3b] transition-all">
                            <div className="w-9 h-9 rounded-xl bg-[#72b01d]/10 text-[#72b01d] flex items-center justify-center mb-4">
                                <Files size={18} />
                            </div>
                            <p className="text-[#8ba38f] text-xs font-bold uppercase tracking-widest mb-1">Prompts Hosted</p>
                            <h3 className="text-3xl font-black text-white">{myPostCount || 0}</h3>
                        </div>

                        {/* Stat Item 2: Integrity Verification */}
                        <div className="bg-[#121c17]/50 border border-[#1f3529] rounded-2xl p-6 hover:border-[#2d4d3b] transition-all">
                            <div className="w-9 h-9 rounded-xl bg-[#72b01d]/10 text-[#72b01d] flex items-center justify-center mb-4">
                                <ShieldCheck size={18} />
                            </div>
                            <p className="text-[#8ba38f] text-xs font-bold uppercase tracking-widest mb-1">Security Tier</p>
                            <h3 className="text-base font-bold text-[#72b01d] mt-2 flex items-center gap-1.5">
                                Verified Creator Studio
                            </h3>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;