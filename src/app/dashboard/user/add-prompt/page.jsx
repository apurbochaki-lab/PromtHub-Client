import { getUserSession } from '@/lib/core/session';
import AddPromptFormClient from './AddPromptFormClient';
import { getMyPrompts } from '@/lib/api/prompts';
import Link from 'next/link';

export default async function AddPromptPage() {
    const user = await getUserSession();
    
    // Check user plan (pro or free)
    const userPlan = user?.plan || 'free'; 
    const isPro = userPlan === 'pro';

    const creatorId = user?.id || null;
    const myPrompts = (await getMyPrompts(creatorId)) || [];
    const myPostCount = myPrompts.length;

    const freeLimit = {
        plan: "free",
        maxLimit: 3
    };

    // Limit only applies to FREE users. For PRO users, it's always false.
    const isLimitReached = !isPro && myPostCount >= freeLimit.maxLimit;
    const progressPercentage = Math.min((myPostCount / freeLimit.maxLimit) * 100, 100);

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 text-zinc-200">

            {/* =========================================================
                TOP STATUS SECTION (Conditional based on Plan)
               ========================================================= */}
            {isPro ? (
                /* --- ULTRA PREMIUM LIFETIME PRO USER DESIGN --- */
                <div className="bg-[#0B0F0C] p-5 sm:p-6 rounded-xl border border-[#1C2E24] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                    {/* Soft ambient background glow for Pro users */}
                    <div className="absolute right-0 top-0 w-32 h-32 bg-lime-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-lime-400 bg-[#132018] px-2.5 py-1 rounded border border-[#223A2C]">
                                PRO ACTIVE
                            </span>
                            <span className="text-xs text-emerald-400 font-medium">Lifetime Member</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mt-2">
                            Welcome Back, Premium Creator!
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1 max-w-md">
                            You have a lifetime Pro plan active. Enjoy unlimited prompt submissions and zero feature restrictions.
                        </p>
                    </div>

                    {/* Pro Unlimited Access Badge */}
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-[#132018] to-[#0A1710] px-4 py-2.5 rounded-xl border border-[#223A2C] shrink-0 whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                        <span className="text-sm font-bold text-lime-400 drop-shadow-[0_0_8px_rgba(114,176,29,0.4)]">
                            ∞ Unlimited Prompts
                        </span>
                    </div>
                </div>
            ) : (
                /* --- EXISTING FREE USAGE MONITOR & PROGRESS BAR --- */
                <div className="bg-[#0B0F0C] p-5 sm:p-6 rounded-xl border border-[#1C2E24] shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                USAGE MONITOR
                            </span>
                            <h2 className="text-xl font-semibold text-white mt-1">
                                Prompt Limit Status
                            </h2>
                        </div>

                        <div className="flex items-center space-x-2 bg-[#132018] px-3 py-1.5 rounded-lg border border-[#223A2C] shrink-0 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-sm font-mono font-bold text-emerald-400">
                                {myPostCount} / {freeLimit.maxLimit}
                            </span>
                        </div>
                    </div>

                    {/* Premium Glowing Progress Bar */}
                    <div className="w-full h-3 bg-[#141E18] rounded-full overflow-hidden p-[1px]">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                                isLimitReached
                                    ? 'bg-gradient-to-r from-red-500 to-amber-500'
                                    : 'bg-gradient-to-r from-emerald-500 to-lime-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    {/* Footer Text */}
                    <div className="mt-3 flex justify-between text-xs font-medium text-zinc-400">
                        <span>Free Account Plan</span>
                        <span className={isLimitReached ? "text-red-400 font-bold" : "text-emerald-400"}>
                            {isLimitReached
                                ? "Limit Exceeded"
                                : `${freeLimit.maxLimit - myPostCount} slots remaining`}
                        </span>
                    </div>
                </div>
            )}

            {/* =========================================================
                CONDITIONAL RENDERING: FORM OR UPGRADE UI
               ========================================================= */}
            {!isLimitReached ? (
                <div>
                    <AddPromptFormClient user={user} myPostCount={myPostCount} />
                </div>
            ) : (
                /* This will only trigger for Free users who exceed their limit */
                <div className="p-6 sm:p-8 text-center bg-[#0B0F0C] border border-dashed border-[#223A2C] rounded-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-14 h-14 mb-5 mx-auto flex items-center justify-center bg-[#132018] text-emerald-400 rounded-xl border border-[#223A2C]">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                        Upgrade to Unlimited <span className="text-lime-400">Prompts</span>
                    </h3>
                    <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                        You have used all <span className="text-emerald-400 font-semibold">{freeLimit.maxLimit} free slots</span>. Upgrade your plan to get unlimited submissions and premium badges.
                    </p>

                    <Link href="/pricing">
                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-600 hover:to-lime-500 text-black font-extrabold rounded-lg transition-all duration-200 shadow-[0_4px_20px_rgba(16,185,129,0.2)] active:scale-[0.98] cursor-pointer">
                            Upgrade Now
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}