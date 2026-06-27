import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import AddPromptCreator from './AddPromptCreator';

export default async function AddPromptPage() {
    const currentUser = await getUserSession();

    // 🔴 Strict Role Guard: ক্রিয়েটর না হলে কোনোভাবেই এই পেজ এক্সেস করতে পারবে না
    if (!currentUser || currentUser?.role !== "creator") {
        redirect("/");
    }

    // const creatorId = currentUser?.id || null;
    // const myPrompts = (await getMyPrompts(creatorId)) || [];
    // const myPostCount = myPrompts.length;

    return (
        // আই-কমফোর্ট ধরে রাখার জন্য সফট ডার্ক গ্রিন টেক্সট ও লেআউট টোন
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 text-[#e3e9e5]">

            {/* =========================================================
                TOP STATUS SECTION (Ultra Premium Lifetime Creator Pass)
               ========================================================= */}
            <div className="bg-[#121c17]/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-[#233a2e] shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                {/* Soft ambient background glow */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#72b01d]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#72b01d] bg-[#16241e] px-2.5 py-1 rounded border border-[#233a2e]">
                            CREATOR PASS ACTIVE
                        </span>
                        <span className="text-xs text-[#8ba38f] font-medium">Lifetime Privilege</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-2">
                        Share Your Next AI Masterpiece
                    </h2>
                    <p className="text-xs text-[#8ba38f] max-w-md leading-relaxed">
                        Your verified Creator status automatically unlocks endless prompt publishing slots, advanced parameters analytics, and premium visibility.
                    </p>
                </div>

                {/* Infinite Access Badge */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-[#16241e] to-[#0e1612] px-4 py-2.5 rounded-xl border border-[#233a2e] shrink-0 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-[#72b01d] animate-pulse" />
                    <span className="text-sm font-bold text-[#72b01d] drop-shadow-[0_0_8px_rgba(114,176,29,0.2)]">
                        ∞ Unlimited Prompts
                    </span>
                </div>
            </div>

            {/* =========================================================
                DIRECT FORM RENDERING (No Restrictions/Limits)
               ========================================================= */}
            <div className="bg-[#121c17]/30 border border-[#1b2c24] rounded-2xl p-1">
                <AddPromptCreator user={currentUser} />
            </div>

        </div>
    );
}