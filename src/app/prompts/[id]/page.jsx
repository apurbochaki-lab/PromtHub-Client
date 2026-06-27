import PromptDetailsClient from "@/components/promt-details/PromptDetailsClient";
import { getPromptById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { ArrowLeft, Lock } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    // console.log("Prompt id :", id);

    const currentSessionUser = await getUserSession();
    console.log(currentSessionUser)
    const userId = currentSessionUser?.id;
    const promptDetails = await getPromptById(id, userId);

    if (!promptDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#e2cfea] bg-[#062726]">
                <h2 className="text-2xl font-bold">Prompt not found!</h2>
            </div>
        );
    }

    // User & Creator condition: shudhu "user" role r "free" plan holei block hobe
    if (
        promptDetails?.isPrivate &&
        currentSessionUser?.role === "user" &&
        currentSessionUser?.plan === "free"
    ) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-in fade-in zoom-in duration-700 py-20">
                <div className="bg-[#102b3f]/80 backdrop-blur-xl border border-[#6247aa]/50 p-8 md:p-12 rounded-3xl shadow-2xl shadow-[#a06cd5]/10 max-w-lg text-center relative overflow-hidden">

                    {/* Decorative Background Glows */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#a06cd5] rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#6247aa] rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>

                    {/* Lock Icon Box */}
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#6247aa] to-[#a06cd5] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#a06cd5]/30 transform rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10">
                        <Lock size={36} className="text-[#ffffff] -rotate-3 hover:rotate-0 transition-transform duration-300" />
                    </div>

                    {/* Texts */}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#ffffff] mb-3 relative z-10">
                        Premium Content Locked
                    </h2>

                    <p className="text-[#e2cfea]/80 text-base mb-8 leading-relaxed relative z-10">
                        This is an exclusive premium prompt. Upgrade your plan to unlock this template and get access to our full library of premium content!
                    </p>

                    {/* Upgrade Button */}
                    <div className="relative z-10 space-y-4">
                        <Link href={`/pricing?redirect=prompts/${promptDetails?._id}`} className="block">
                            <Button className="w-full bg-gradient-to-r from-[#6247aa] to-[#a06cd5] hover:from-[#a06cd5] hover:to-[#6247aa] text-[#ffffff] font-bold text-base py-6 rounded-xl border border-[#e2cfea]/20 shadow-xl transition-all hover:scale-[1.02]">
                                Upgrade to Premium
                            </Button>
                        </Link>

                        {/* Back Button */}
                        <Link
                            href="/prompts"
                            className="inline-flex items-center gap-2 text-[#e2cfea]/60 hover:text-[#e2cfea] transition-colors text-sm font-medium mt-4"
                        >
                            <ArrowLeft size={16} />
                            Back to free prompts
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#062726] to-[#102b3f] py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <PromptDetailsClient prompt={promptDetails} currentSessionUser={currentSessionUser} />
            </div>
        </main>
    );
};

export default PromptDetailsPage;