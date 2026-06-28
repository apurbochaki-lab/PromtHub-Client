"use client";

import { useState, useMemo } from "react";
import PromptCard from "@/components/Common/PromptCard";
import { Magnifier, Sliders } from "@gravity-ui/icons";

const PromptExplorer = ({ initialPrompts }) => {
    // State for Search
    const [searchQuery, setSearchQuery] = useState("");

    // State for Filters
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTool, setSelectedTool] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");

    // State for Sorting
    const [sortBy, setSortBy] = useState("latest");

    // 1. Define pre-defined options
    const predefinedCategories = ["Art & Design", "Marketing", "Writing", "SEO"];
    const predefinedTools = ["Midjourney", "DALL-E", "DeepSeek"];

    // 2. Combine pre-defined options with dynamic data & remove duplicates using Set
    const categories = [
        "All",
        ...Array.from(new Set([
            ...predefinedCategories,
            ...initialPrompts.map(p => p.category).filter(Boolean)
        ]))
    ];

    const tools = [
        "All",
        ...Array.from(new Set([
            ...predefinedTools,
            ...initialPrompts.map(p => p.aiTool).filter(Boolean)
        ]))
    ];

    const difficulties = ["All", ...Array.from(new Set(initialPrompts.map(p => p.difficulty).filter(Boolean)))];

    // Filter and Sort Logic
    const filteredAndSortedPrompts = useMemo(() => {
        let result = [...initialPrompts];

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(prompt =>
                (prompt.title && prompt.title.toLowerCase().includes(lowerQuery)) ||
                (prompt.tags && prompt.tags.toLowerCase().includes(lowerQuery)) ||
                (prompt.aiTool && prompt.aiTool.toLowerCase().includes(lowerQuery))
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(prompt => prompt.category === selectedCategory);
        }
        if (selectedTool !== "All") {
            result = result.filter(prompt => prompt.aiTool === selectedTool);
        }
        if (selectedDifficulty !== "All") {
            result = result.filter(prompt => prompt.difficulty === selectedDifficulty);
        }

        result.sort((a, b) => {
            if (sortBy === "popular") {
                return (b.rating || 0) - (a.rating || 0);
            } else if (sortBy === "copied") {
                return (b.copyCount || 0) - (a.copyCount || 0);
            } else {
                const dateA = new Date(a.createdAt?.$date || a.createdAt).getTime();
                const dateB = new Date(b.createdAt?.$date || b.createdAt).getTime();
                return dateB - dateA;
            }
        });

        return result;
    }, [initialPrompts, searchQuery, selectedCategory, selectedTool, selectedDifficulty, sortBy]);

    return (
        <div className="space-y-10">

            {/* Premium Search and Filter Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#102b3f]/80 via-[#0b1a1f]/90 to-[#062726]/80 border border-[#a06cd5]/30 p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(6,39,38,0.6)] backdrop-blur-xl space-y-6">

                {/* Decorative glowing blobs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#a06cd5] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#72b01d] rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>

                {/* Search Bar */}
                <div className="relative z-10">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#a06cd5]">
                        <Magnifier width={22} height={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title, tags, or AI tool..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-[#062726]/40 border border-[#6247aa]/50 hover:border-[#a06cd5]/80 rounded-2xl text-lg text-white placeholder-[#e2cfea]/50 focus:outline-none focus:ring-2 focus:ring-[#72b01d]/50 focus:border-[#72b01d] transition-all shadow-inner"
                    />

                    {/* Clear Button (Visible only when there is text) */}
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#e2cfea]/50 hover:text-[#ff5c5c] transition-colors"
                            aria-label="Clear search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>

                {/* Filters and Sort Row */}
                <div className="relative z-10 flex flex-col lg:flex-row gap-5 items-center justify-between bg-[#062726]/20 p-2 rounded-2xl">

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-wrap items-center">
                        <div className="flex items-center gap-2 text-[#a06cd5] mr-2 px-2">
                            <Sliders width={20} height={20} />
                            <span className="text-sm font-bold uppercase tracking-wider text-[#e2cfea]/80">Filters</span>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-[#102b3f]/80 border border-[#6247aa]/40 hover:border-[#a06cd5] rounded-xl px-4 py-2.5 text-sm font-medium text-[#e2cfea] focus:outline-none focus:ring-2 focus:ring-[#a06cd5]/50 w-full sm:w-auto cursor-pointer transition-all appearance-none"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #a06cd5 50%), linear-gradient(135deg, #a06cd5 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                        >
                            <option disabled value="All" className="bg-[#0b1a1f] text-gray-400">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-[#0b1a1f] text-white">{cat}</option>
                            ))}
                        </select>

                        {/* AI Tool Filter */}
                        <select
                            value={selectedTool}
                            onChange={(e) => setSelectedTool(e.target.value)}
                            className="bg-[#102b3f]/80 border border-[#6247aa]/40 hover:border-[#a06cd5] rounded-xl px-4 py-2.5 text-sm font-medium text-[#e2cfea] focus:outline-none focus:ring-2 focus:ring-[#a06cd5]/50 w-full sm:w-auto cursor-pointer transition-all appearance-none"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #a06cd5 50%), linear-gradient(135deg, #a06cd5 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                        >
                            <option disabled value="All" className="bg-[#0b1a1f] text-gray-400">Select AI Tool</option>
                            {tools.map(tool => (
                                <option key={tool} value={tool} className="bg-[#0b1a1f] text-white">{tool}</option>
                            ))}
                        </select>

                        {/* Difficulty Filter */}
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="bg-[#102b3f]/80 border border-[#6247aa]/40 hover:border-[#a06cd5] rounded-xl px-4 py-2.5 text-sm font-medium text-[#e2cfea] focus:outline-none focus:ring-2 focus:ring-[#a06cd5]/50 w-full sm:w-auto cursor-pointer transition-all appearance-none"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #a06cd5 50%), linear-gradient(135deg, #a06cd5 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                        >
                            <option disabled value="All" className="bg-[#0b1a1f] text-gray-400">Select Difficulty</option>
                            {difficulties.map(diff => (
                                <option key={diff} value={diff} className="bg-[#0b1a1f] text-white">{diff}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="w-full lg:w-auto flex items-center gap-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#e2cfea]/80 px-2">Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#72b01d]/10 border border-[#72b01d]/50 hover:border-[#72b01d] rounded-xl px-4 py-2.5 text-sm font-bold text-[#72b01d] focus:outline-none focus:ring-2 focus:ring-[#72b01d]/50 w-full sm:w-auto cursor-pointer transition-all appearance-none"
                            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #72b01d 50%), linear-gradient(135deg, #72b01d 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                        >
                            <option value="latest" className="bg-[#0b1a1f] text-white">Latest</option>
                            <option value="popular" className="bg-[#0b1a1f] text-white">Most Popular</option>
                            <option value="copied" className="bg-[#0b1a1f] text-white">Most Copied</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between border-b border-[#6247aa]/20 pb-4">
                <p className="text-sm md:text-base text-[#e2cfea]/80">
                    Showing <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a06cd5] to-[#72b01d] text-lg">{filteredAndSortedPrompts.length}</span> optimized prompts
                </p>

                {/* Visual indicator if any filter is active */}
                {(searchQuery || selectedCategory !== "All" || selectedTool !== "All" || selectedDifficulty !== "All") && (
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                            setSelectedTool("All");
                            setSelectedDifficulty("All");
                        }}
                        className="text-xs font-semibold text-[#ff5c5c] hover:text-[#ff7676] bg-[#ff5c5c]/10 hover:bg-[#ff5c5c]/20 px-3 py-1.5 rounded-lg transition-all"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>

            {/* Prompts Grid */}
            {filteredAndSortedPrompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-24 bg-[#102b3f]/20 border border-[#6247aa]/10 rounded-3xl backdrop-blur-sm">
                    <div className="bg-[#062726] p-4 rounded-full mb-4">
                        <Magnifier width={32} height={32} className="text-[#a06cd5]/50" />
                    </div>
                    <h3 className="text-[#e2cfea] text-xl font-bold mb-2">No prompts found</h3>
                    <p className="text-[#e2cfea]/60 text-sm max-w-md">We couldn't find anything matching your current search or filter criteria. Try adjusting them to see more results.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    {filteredAndSortedPrompts.map((prompt) => (
                        <div
                            key={prompt._id?.$oid || prompt._id}
                            className="h-full flex flex-col transition-transform hover:-translate-y-1 duration-300"
                        >
                            <PromptCard prompt={prompt} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PromptExplorer;