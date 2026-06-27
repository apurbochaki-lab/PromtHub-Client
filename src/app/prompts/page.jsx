import PromptCard from "@/components/Common/PromptCard";
import { getPrompts } from "@/lib/api/prompts";
import { Magnifier, Sliders } from "@gravity-ui/icons";

const AllPromptsPage = async () => {

    const prompts = await getPrompts() || [];
    // console.log(prompts)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#062726] via-[#0b1a1f] to-[#102b3f] text-white py-12 px-4 sm:px-6 md:px-8 pb-30">
            <div className="max-w-7xl mx-auto space-y-12">

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

                {/* 2. Beautiful Premium Search & Filter Bar Section (UI Inspiration) */}
                <div className="bg-[#102b3f]/40 backdrop-blur-xl border border-[#6247aa]/30 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    {/* Fake Search Input (Styling match) */}
                    <div className="relative w-full md:max-w-md group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#e2cfea]/50 group-focus-within:text-[#a06cd5] transition-colors">
                            <Magnifier size={18} />
                        </span>
                        <input
                            type="text"
                            disabled
                            placeholder="Search prompts by title, tags or tools..."
                            className="w-full bg-[#062726]/60 border border-[#6247aa]/30 text-sm rounded-xl pl-11 pr-4 py-3 text-[#ffffff] placeholder:text-[#e2cfea]/40 focus:outline-none cursor-not-allowed"
                        />
                    </div>

                    {/* Fake Filters Dropdown UI */}
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <div className="bg-[#062726]/60 border border-[#6247aa]/30 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#e2cfea] flex items-center gap-2 cursor-not-allowed whitespace-nowrap">
                            <Sliders size={14} /> Filter
                        </div>
                        <div className="bg-[#062726]/60 border border-[#6247aa]/30 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#e2cfea] cursor-not-allowed whitespace-nowrap">
                            All Tools
                        </div>
                        <div className="bg-[#062726]/60 border border-[#6247aa]/30 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#e2cfea] cursor-not-allowed whitespace-nowrap">
                            Sort By: Newest
                        </div>
                    </div>
                </div>

                {/* 3. Fully Responsive Prompts Grid */}
                {prompts.length === 0 ? (
                    /* Fallback when no data exists */
                    <div className="text-center py-20 bg-[#102b3f]/20 border border-[#6247aa]/10 rounded-2xl">
                        <p className="text-[#e2cfea]/60 text-lg">No prompts found at the moment.</p>
                    </div>
                ) : (
                    /* Grid Layout: 1 col on Mobile, 2 cols on Tablet, 3 cols on Desktop */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                        {prompts.map((prompt) => (
                            <div
                                key={prompt._id?.$oid || prompt._id}
                                className="h-full flex flex-col"
                            >
                                <PromptCard prompt={prompt} />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllPromptsPage;