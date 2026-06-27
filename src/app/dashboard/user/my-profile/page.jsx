import { getMyPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import {
    Person,
    Envelope,
    ShieldCheck,
    Files,
    CrownDiamond,
    StarFill
} from "@gravity-ui/icons";
import Link from "next/link";

const MyProfilePage = async () => {

    const currentUser = await getUserSession();
    const creatorId = currentUser?.id || null;
    const myPrompts = (await getMyPrompts(creatorId)) || [];
    const myPostCount = myPrompts.length;

    const user = currentUser || {
        name: "Not found",
        email: "Not found",
        image: "https://i.pravatar.cc/150?u=apurbo",
        role: "Not found",
        plan: "Not found",
        promptsPublished: 0
    };

    return (
        <div className="relative min-h-[80vh] w-full bg-[#000000] p-6 md:p-10 overflow-hidden rounded-2xl">

            {/* Global Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#72b01d] blur-[250px] opacity-10 pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-[#ffffff] mb-2 tracking-tight">
                        My Profile
                    </h1>
                    <p className="text-[#8fbc8f] text-sm">
                        Manage your account settings, view your stats, and upgrade your plan.
                    </p>
                </div>

                {/* Profile Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: User Identity Card */}
                    <div className="lg:col-span-1 bg-[#020a07]/80 backdrop-blur-md border border-[#72b01d]/20 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-[#72b01d]/40 shadow-lg hover:shadow-[#72b01d]/5">

                        {/* Avatar */}
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full p-1 border-2 border-dashed border-[#72b01d]/50 hover:border-[#95d542] transition-colors duration-300">
                                <img
                                    src={user?.image || `https://ui-avatars.com/api/?name=${user.name}&background=044a2b&color=ffffff`}
                                    alt={user?.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            {user?.plan === "pro" && (
                                <div className="absolute -bottom-2 -right-2 bg-[#72b01d] text-[#000000] p-2 rounded-full shadow-[0_0_15px_rgba(114,176,29,0.5)]">
                                    <CrownDiamond size={18} />
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <h2 className="text-2xl font-bold text-[#ffffff] mb-1">{user?.name}</h2>
                        <p className="text-[#8fbc8f] text-sm flex items-center gap-2 mb-6 justify-center">
                            <Envelope size={14} /> {user?.email}
                        </p>

                        {/* Role & Plan Badges */}
                        <div className="flex items-center gap-3 w-full justify-center pt-6 border-t border-[#72b01d]/10">
                            <span className="px-4 py-1.5 bg-[#044a2b]/30 border border-[#72b01d]/20 text-[#8fbc8f] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Person size={12} /> Role: {user?.role}
                            </span>
                            <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${user?.plan === "pro" ? "bg-[#72b01d]/20 border-[#72b01d]/50 text-[#72b01d]" : "bg-gray-800/30 border-gray-600/30 text-gray-400"}`}>
                                {user?.plan === "pro" ? <StarFill size={12} /> : null}
                                Plan: {user?.plan}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Stats & Upgrade Banner */}
                    <div className="lg:col-span-2 flex flex-col gap-8">

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Prompts Published Stat */}
                            <div className="bg-[#020a07]/80 backdrop-blur-md border border-[#72b01d]/10 rounded-2xl p-6 group hover:border-[#72b01d]/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#72b01d]/10 text-[#72b01d] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Files size={20} />
                                </div>
                                <p className="text-[#8fbc8f] text-xs font-bold uppercase tracking-widest mb-1">Prompts Published</p>
                                <h3 className="text-3xl font-extrabold text-[#ffffff]">{myPostCount || 0}</h3>
                            </div>

                            {/* Account Status Stat */}
                            <div className="bg-[#020a07]/80 backdrop-blur-md border border-[#72b01d]/10 rounded-2xl p-6 group hover:border-[#72b01d]/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#72b01d]/10 text-[#72b01d] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-[#8fbc8f] text-xs font-bold uppercase tracking-widest mb-1">Account Status</p>
                                <h3 className="text-xl font-bold text-[#72b01d] mt-2">Verified Member</h3>
                            </div>
                        </div>

                        {/* Conditional Rendering: Upgrade to Pro Banner */}
                        {user?.plan !== "pro" && (
                            <div className="relative overflow-hidden bg-gradient-to-r from-[#044a2b]/40 to-[#020a07]/80 border border-[#72b01d]/30 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#72b01d]/60 transition-colors duration-500">
                                {/* Decorative Glow inside the banner */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#72b01d] blur-[80px] opacity-20 pointer-events-none" />

                                <div className="relative z-10 max-w-lg">
                                    <h3 className="text-2xl font-extrabold text-[#ffffff] flex items-center gap-2 mb-3">
                                        <CrownDiamond className="text-[#72b01d] w-7 h-7" />
                                        Upgrade to Pro Lifetime
                                    </h3>
                                    <p className="text-[#8fbc8f] text-sm leading-relaxed">
                                        Unlock access to all private prompt templates, advanced parameter sets, and exclusive community reviews for a single one-time contribution of $5.
                                    </p>
                                </div>

                                <Link href="/pricing"
                                    className="relative z-10 w-full sm:w-auto whitespace-nowrap bg-[#72b01d] hover:bg-[#95d542] text-[#000000] font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(114,176,29,0.3)] hover:shadow-[0_0_30px_rgba(149,213,66,0.5)] transform hover:-translate-y-0.5 cursor-pointer">
                                    Upgrade Now $5
                                </Link>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;