import PromptExplorer from "@/components/PromptExplorer";
import { getPrompts } from "@/lib/api/prompts";


const AllPromptsPage = async () => {
    // Fetch data on the server
    const prompts = await getPrompts() || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#062726] via-[#0b1a1f] to-[#102b3f] text-white py-12 px-4 sm:px-6 md:px-8 pb-30">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* 1. Header & Intro Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#6247aa]/20">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                            Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a06cd5] to-[#72b01d]">AI Prompts</span>
                        </h1>
                        <p className="text-[#e2cfea]/80 max-w-xl text-sm md:text-base">
                            Discover, test, and copy premium prompt templates tailored for ChatGPT, Claude, Midjourney, and more.
                        </p>
                    </div>
                    {/* Total Count Badge */}
                    <div className="self-start md:self-auto bg-[#6247aa]/20 border border-[#a06cd5]/30 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold text-[#e2cfea] backdrop-blur-md">
                        Total Prompts: <span className="text-[#72b01d] font-bold">{prompts.length}</span>
                    </div>
                </div>

                {/* 2. Pass data to the Client Component for interactivity */}
                <PromptExplorer initialPrompts={prompts} />

            </div>
        </div>
    );
};

export default AllPromptsPage;