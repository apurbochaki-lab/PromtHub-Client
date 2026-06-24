import PromptsTableClient from "@/components/dashboard/user-components/PromptsTableClient";
import { getMyPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";


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
                    <h1 className="text-3xl font-bold text-[#ffffff] tracking-wide mb-2">
                        My Prompt Templates
                    </h1>
                    <p className="text-[#8fbc8f] text-sm">
                        Review approval statuses, change details, and check analytics.
                    </p>
                </div>

                {/* Client Component */}
                <PromptsTableClient prompts={myPrompts || []} />
            </div>
        </div>
    );
};

export default MyPromptsPage;