import PromptsTableClient from "@/components/dashboard/user-components/PromptsTableClient";
import { getMyPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";


const MyPromptsPage = async () => {
    const user = await getUserSession();
    const creatorId = user?.id || null;

    const myPrompts = await getMyPrompts(creatorId) || [];

    return (
        // Added dark bg and relative wrapper for the glow
        <div className="min-h-screen bg-[#000000] relative overflow-hidden p-6 md:p-10">

            {/* Blurry Glowy Background Effects */}
            <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#72b01d] blur-[150px] opacity-15 rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#044a2b] blur-[150px] opacity-20 rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-[#020a07]/80 backdrop-blur-md border-b border-[#72b01d]/20 pb-6 pt-4 px-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#ffffff] tracking-wide mb-2">
                                My Prompt Templates
                            </h1>
                            <p className="text-[#8fbc8f] text-sm">
                                Review approval statuses, change details, and check analytics.
                            </p>
                        </div>

                        <Link href="/dashboard/user/add-prompt">
                            <span>
                                <Button className="bg-green-800 font-semibold hover:bg-green-700">
                                    Add Prompt
                                </Button>
                            </span>
                        </Link>
                    </div>
                </div>


                {/* Empty State vs Grid Layout */}
                {!myPrompts || myPrompts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#020604] border border-dashed border-[#72b01d]/30 rounded-2xl">
                        <div className="h-16 w-16 mb-4 rounded-full bg-[#72b01d]/10 flex items-center justify-center">
                            <span className="text-[#95d542] text-2xl">🔖</span>
                        </div>
                        <h3 className="text-white text-lg font-medium mb-1">No Prompts Found</h3>
                        <p className="text-[#8fbc8f] text-sm text-center">
                            You haven&apos;t post any prompts yet. Explore and post your favorites!
                        </p>
                    </div>
                ) : (
                    <div>
                        {/* Client Component */}
                        <PromptsTableClient prompts={myPrompts || []} />
                    </div>
                )}





            </div>
        </div>
    );
};

export default MyPromptsPage;