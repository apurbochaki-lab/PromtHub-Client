import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { Lock, Files, Star, Eye } from "@gravity-ui/icons";
import Image from "next/image";


const PromptCard = ({ prompt }) => {
    // MongoDB ID বের করে নেওয়া
    const promptId = prompt._id?.$oid || prompt._id;

    return (
        <Card
            className="bg-[#062726]/80 backdrop-blur-md border border-[#6247aa]/30 hover:border-[#a06cd5] hover:shadow-[0_0_30px_rgba(160,108,213,0.15)] transition-all duration-400 group overflow-hidden flex flex-col h-full rounded-2xl"
        >
            {/* 1. Image Section */}
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                <Image
                    width={500}
                    height={500}
                    alt={prompt.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                    src={prompt.image}
                />
                {/* Dark Gradient Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062726] via-transparent to-transparent opacity-90" />

                {/* Top Left Badges: AI Tool & Difficulty */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#ffffff] bg-[#6247aa]/90 backdrop-blur-sm rounded-md border border-[#a06cd5]/30">
                        {prompt.aiTool}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#102b3f] bg-[#e2cfea]/90 backdrop-blur-sm rounded-md">
                        {prompt.difficulty}
                    </span>
                </div>

                {/* Top Right Badge: Premium Chip (Conditional) */}
                {prompt.isPrivate && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#0b3032]/95 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_4px_18px_rgba(34,211,238,0.18)] backdrop-blur-md">
                            <Lock
                                size={11}
                                strokeWidth={2.5}
                                className="text-cyan-300"
                            />
                            <span className="text-cyan-300">Premium</span>
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Card Body */}
            <div className="flex flex-1 flex-col p-6 gap-4">
                <Card.Header className="p-0 flex flex-col items-start gap-3 w-full">

                    {/* Category & Stats Row */}
                    <div className="flex justify-between w-full items-center">
                        <span className="text-xs font-bold text-[#72b01d] uppercase tracking-wider flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#72b01d]" />
                            {prompt.category}
                        </span>

                        {/* Stats: Copies & Ratings */}
                        <div className="flex items-center gap-4 text-[#e2cfea] text-xs font-medium">
                            <span className="flex items-center gap-1.5" title="Total Copies">
                                <Files size={14} className="text-[#a06cd5]" />
                                {prompt.copyCount}
                            </span>
                            <span className="flex items-center gap-1.5" title="Rating">
                                <Star size={14} className="text-yellow-500" />
                                {prompt.rating === 0 ? "0.0" : prompt.rating}
                            </span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                        <Card.Title className="text-xl font-bold text-[#ffffff] line-clamp-1 group-hover:text-[#a06cd5] transition-colors">
                            {prompt.title}
                        </Card.Title>
                        <Card.Description className="text-sm text-[#e2cfea]/70 line-clamp-2 leading-relaxed">
                            {prompt.description}
                        </Card.Description>
                    </div>
                </Card.Header>

                {/* 3. Card Footer / Call to Action (Fixed Link Issue) */}
                <Card.Footer className="p-0 mt-auto pt-5">
                    {/* Link নিজেই এখন বাটনের ডিজাইন বহন করবে, তাই রিলোড হবে না */}
                    {/* <Link
                        href={`/prompts/${promptId}`}
                        className="w-full bg-[#102b3f] hover:bg-[#6247aa] text-[#ffffff] font-semibold text-sm py-3.5 rounded-xl border border-[#6247aa]/50 hover:border-[#a06cd5] transition-all duration-300 flex justify-center items-center gap-2 group/btn"
                    >
                        <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                        View Details
                    </Link> */}

                    <Link
                        href={`/prompts/${promptId}`}
                        className="w-full"
                    >
                        <Button className="w-full bg-[#102b3f] hover:bg-[#6247aa] text-[#ffffff] font-semibold text-sm py-5 rounded-xl border border-[#6247aa]/50 hover:border-[#a06cd5] transition-all duration-300 flex justify-center items-center gap-2 group/btn">
                            <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                            View Details
                        </Button>
                    </Link>
                </Card.Footer>
            </div>
        </Card>
    );
};

export default PromptCard;