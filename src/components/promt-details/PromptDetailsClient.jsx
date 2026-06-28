"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Bookmark,
    BookmarkFill,
    Flag,
    Copy,
    Check,
    ArrowLeft,
    ShieldExclamation,
    Person,
    Lock
} from "@gravity-ui/icons";
import { Button, Modal, Surface } from "@heroui/react";
import toast from "react-hot-toast";
import { serverMutation } from "@/lib/core/server";
import { copyCount } from "@/lib/actions/userDashboard";
import { promptReport } from "@/lib/actions/report-prompt";
import { refreshPath } from "@/lib/core/refreshPage";
import ReviewSection from "./ReviewSection";

const PromptDetailsClient = ({ prompt, currentSessionUser, recentReviews }) => {
    // console.log(prompt)

    const promptId = prompt?._id;
    const userId = currentSessionUser?.id;

    const [isBookmarked, setIsBookmarked] = useState(prompt?.isBookmarked || false);
    const [isCopied, setIsCopied] = useState(false);

    // isLocked Condition:
    const isLocked = prompt?.isPrivate &&
        currentSessionUser?.role === "user" &&
        currentSessionUser?.plan === "free";

    // console.log("Locked", isLocked)

    const handleCopy = async () => {
        navigator.clipboard.writeText(prompt.content);
        setIsCopied(true);
        toast.success("Prompt copied")

        try {
            const res = await copyCount({ promptId: prompt?._id });
            // console.log(res)
        }
        catch (error) {

        }

        setTimeout(() => {
            setIsCopied(false);
        }, 2500);
    };

    const handleBookmark = async () => {
        const previousBookmarkState = isBookmarked;
        setIsBookmarked(!previousBookmarkState);


        const bookmarkData = {
            promptId,
            userId,
            description: prompt?.description,
            title: prompt?.title,
            aiTool: prompt?.aiTool,
            category: prompt?.category
        }

        // POST to database
        try {
            const response = await serverMutation(`/api/prompts/bookmark?promptId=${promptId}`, bookmarkData);
            // console.log("Response from Backend :", response)

            await refreshPath(`/prompts/${promptId}`)
            if (response.isBookmarked) {
                toast.success("Prompt bookmarked! 🌟");
            } else {
                toast.success("Bookmark removed! 🗑️");
            }
        }
        catch (error) {
            setIsBookmarked(previousBookmarkState);
            toast.error("Something went wrong. Please try again.");
            console.error("Bookmark Error:", error);
        }

    }

    // Prompt report
    const handleReportData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const reportData = {
            ...data,
            promptId: prompt?._id,
            creatorId: prompt?.creatorId,
            reporterId: currentSessionUser?.id
        }

        // TODO : POST the data in the database
        const res = await promptReport(reportData);
        if (res.insertedId) {
            toast.success("Reported successfully! Admin will review it")
        }
    }


    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
            {/* Back Button */}
            <Link
                href="/prompts"
                className="inline-flex items-center gap-2 text-[#e2cfea] hover:text-[#a06cd5] transition-colors mb-8 text-sm font-medium"
            >
                <ArrowLeft size={16} />
                Back to previous page
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Section: Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Card */}
                    <div className="bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/40 rounded-2xl p-6 md:p-8 relative">
                        {/* Top Actions: Bookmark & Report */}
                        <div className="absolute top-6 right-6 flex items-center gap-3">
                            <Button
                                isIconOnly
                                className="bg-[#062726]/50 hover:bg-[#6247aa]/30 border border-[#6247aa]/30 text-[#e2cfea] rounded-xl transition-all"
                                onClick={handleBookmark}
                                aria-label="Bookmark prompt"
                            >
                                {isBookmarked ? (
                                    <BookmarkFill className="text-[#a06cd5]" size={18} />
                                ) : (
                                    <Bookmark size={18} />
                                )}
                            </Button>

                            {/* HeroUI Modal for Report */}
                            <Modal>
                                <Button
                                    isIconOnly
                                    className="bg-[#062726]/50 hover:bg-red-500/20 border border-[#6247aa]/30 hover:border-red-500/50 text-[#e2cfea] hover:text-red-400 rounded-xl transition-all"
                                    aria-label="Report prompt"
                                >
                                    <Flag size={18} />
                                </Button>
                                <Modal.Backdrop className="bg-[#000000]/70 backdrop-blur-sm">
                                    <Modal.Container placement="center">
                                        <Modal.Dialog className="sm:max-w-md bg-[#102b3f] border border-[#6247aa]/50 rounded-2xl shadow-2xl shadow-[#a06cd5]/10">
                                            <Modal.CloseTrigger className="text-[#e2cfea] hover:bg-[#6247aa]/30 mt-2 mr-2" />
                                            <Modal.Header className="pt-6 px-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <ShieldExclamation className="text-red-400" size={24} />
                                                    <Modal.Heading className="text-xl font-bold text-[#ffffff]">
                                                        Report Prompt Template
                                                    </Modal.Heading>
                                                </div>
                                                <p className="text-sm leading-relaxed text-[#e2cfea]/80">
                                                    Help us maintain community standards. If this prompt contains malicious instructions, plagiarized files, or spam content, report it below.
                                                </p>
                                            </Modal.Header>
                                            <Modal.Body className="p-6">
                                                <Surface className="bg-transparent border-none">
                                                    <form onSubmit={handleReportData} className="flex flex-col gap-5">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-[#e2cfea] uppercase tracking-wider">Reason</label>
                                                            <select name="reason" className="w-full bg-[#062726] border border-[#6247aa]/40 text-[#ffffff] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#a06cd5]">
                                                                <option>Inappropriate Content</option>
                                                                <option>Spam or Misleading</option>
                                                                <option>Malicious Instructions</option>
                                                                <option>Plagiarism</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-[#e2cfea] uppercase tracking-wider">Additional Description (Optional)</label>
                                                            <textarea name="description"
                                                                className="w-full bg-[#062726] border border-[#6247aa]/40 text-[#ffffff] text-sm rounded-xl px-4 py-3 min-h-[100px] resize-y focus:outline-none focus:border-[#a06cd5] placeholder:text-[#e2cfea]/30"
                                                                placeholder="Provide details about the infraction..."
                                                            />
                                                        </div>

                                                        <Modal.Footer className="pb-6 px-6 border-t border-[#6247aa]/20 pt-4 flex gap-3 justify-end">
                                                            <Button slot="close" className="bg-[#062726] text-[#e2cfea] border border-[#6247aa]/40 hover:bg-[#6247aa]/30 rounded-xl px-6">
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                slot="close" className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white border border-red-500/50 rounded-xl px-6">
                                                                Submit Report
                                                            </Button>
                                                        </Modal.Footer>
                                                    </form>
                                                </Surface>
                                            </Modal.Body>

                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                            </Modal>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#ffffff] pr-24 mb-4 leading-tight">
                            {prompt.title}
                        </h1>
                        <p className="text-base md:text-lg text-[#e2cfea]/80 leading-relaxed max-w-2xl">
                            {prompt.description}
                        </p>
                    </div>


                    {
                        isLocked ? (<div className="relative overflow-hidden rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-[#030807] via-[#071412] to-[#020604] p-8 md:p-12">


                            <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

                            <div className="relative z-10 flex flex-col items-center text-center">


                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">

                                    <Lock className="h-8 w-8 text-emerald-400" />

                                </div>


                                <h2 className="text-3xl font-extrabold tracking-tight text-white">

                                    Premium Prompt Locked

                                </h2>


                                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">

                                    Upgrade to the <span className="font-semibold text-emerald-400">Premium Plan</span> to
                                    unlock this prompt, access detailed reviews, copy the content,
                                    and enjoy every premium feature without limits.

                                </p>


                                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                                        Unlimited Premium Prompts
                                    </span>

                                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                                        Full Prompt Copy
                                    </span>

                                    <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                                        Reviews & Ratings
                                    </span>

                                </div>


                                <Link href="/pricing" className="mt-10 w-full max-w-sm">

                                    <Button
                                        size="lg"
                                        radius="full"
                                        className="h-14 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-lg font-bold text-black shadow-[0_0_30px_rgba(45,212,191,.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(45,212,191,.45)]"
                                    >
                                        Subscribe to Premium ($5)
                                    </Button>

                                </Link>

                            </div>

                        </div>) : (<div className="bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/40 rounded-2xl p-6 md:p-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#ffffff]">Prompt Template</h2>
                                <Button
                                    onClick={handleCopy}
                                    className="bg-[#6247aa]/20 hover:bg-[#6247aa]/40 text-[#e2cfea] border border-[#a06cd5]/30 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 transition-all"
                                >
                                    {isCopied ? <Check size={16} className="text-[#72b01d]" /> : <Copy size={16} />}
                                    {isCopied ? "Copied!" : "Copy"}
                                </Button>
                            </div>

                            <div className="bg-[#000000]/40 border border-[#062726] rounded-xl p-6 relative group overflow-hidden">
                                <pre className="text-[#a06cd5] font-mono text-sm md:text-base whitespace-pre-wrap leading-loose">
                                    {prompt.content}
                                </pre>
                            </div>


                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-[#ffffff] mb-3">Usage Instructions</h3>
                                <p className="text-[#e2cfea]/70 text-sm leading-relaxed">
                                    For best results, configure your parameters on {prompt.aiTool} with low temperature to avoid hallucinations. Replace any specific context in the template with your target topic details.
                                </p>
                            </div>
                        </div>)
                    }

                </div>


                <div className="space-y-6">
                    {/* Prompt Details Stats Card */}
                    <div className="bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/40 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-[#ffffff] mb-6">Prompt Details</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-[#6247aa]/20">
                                <span className="text-[#e2cfea]/70 text-sm">AI Engine</span>
                                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#a06cd5] bg-[#4e148c]/20 border border-[#a06cd5]/30 rounded-md">
                                    {prompt.aiTool}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-[#6247aa]/20">
                                <span className="text-[#e2cfea]/70 text-sm">Category</span>
                                <span className="text-sm font-semibold text-[#ffffff]">{prompt.category}</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-[#6247aa]/20">
                                <span className="text-[#e2cfea]/70 text-sm">Difficulty</span>
                                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#102b3f] bg-[#e2cfea] rounded-md">
                                    {prompt.difficulty}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-[#6247aa]/20">
                                <span className="text-[#e2cfea]/70 text-sm">Visibility</span>
                                <span className={`text-sm font-bold ${prompt.isPrivate ? "text-[#a06cd5]" : "text-[#72b01d]"}`}>
                                    {prompt.isPrivate ? "PRIVATE (PREMIUM)" : "PUBLIC (FREE)"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[#e2cfea]/70 text-sm">Copies Made</span>
                                <span className="text-sm font-bold text-[#ffffff]">{prompt.copyCount}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[#e2cfea]/70 text-sm">Bookmarked</span>
                                <span className="text-sm font-bold text-[#ffffff]">{prompt.bookmarkCount}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[#e2cfea]/70 text-sm">Community Rating</span>
                                <span className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                                    ★ {prompt.rating === 0 ? "0.0" : prompt.rating} <span className="text-white font-normal">({prompt.reviewCount})</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/40 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-[#ffffff] mb-4">Creator Information</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#062726] border border-[#a06cd5] flex items-center justify-center text-[#e2cfea]">
                                <Person size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#ffffff]">{prompt?.creatorName}</h4>
                                <p className="text-xs text-[#e2cfea]/60 mt-0.5">Email: {prompt?.creatorEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Review Section */}
            <ReviewSection
                prompt={prompt}
                user={currentSessionUser}
                recentReviews={recentReviews}
                isLocked={isLocked} />
        </div>
    );
};

export default PromptDetailsClient;