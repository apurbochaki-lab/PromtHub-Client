"use client";

import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import {
    Eye,
    Calendar,
    Star,
    Hashtag,
    QuoteOpen,
} from "@gravity-ui/icons";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

export default function MyReviewsTable({ reviews }) {
    return (
        <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-[#03110d] via-[#03100d] to-[#020604] shadow-[0_0_40px_rgba(16,185,129,.05)]">

            {/* Responsive Scroll Wrapper */}
            <div
                className="w-full overflow-x-auto scrollbar-green"
                style={{
                    WebkitOverflowScrolling: "touch",
                    touchAction: "auto",
                }}
            >
                <table className="w-full min-w-[1180px] border-collapse">

                    <thead className="bg-[#041510]">

                        <tr className="border-b border-emerald-900/40">

                            <th className="px-6 py-5 text-left text-xs uppercase tracking-[.18em] text-emerald-400">
                                Prompt
                            </th>

                            <th className="px-6 py-5 text-left text-xs uppercase tracking-[.18em] text-emerald-400">
                                AI Tool
                            </th>

                            <th className="px-6 py-5 text-left text-xs uppercase tracking-[.18em] text-emerald-400">
                                Rating
                            </th>

                            <th className="px-6 py-5 text-left text-xs uppercase tracking-[.18em] text-emerald-400">
                                Review
                            </th>

                            <th className="px-6 py-5 text-left text-xs uppercase tracking-[.18em] text-emerald-400">
                                Submitted
                            </th>

                            <th className="px-6 py-5 text-center text-xs uppercase tracking-[.18em] text-emerald-400">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {reviews.map((review) => (

                            <tr
                                key={review._id}
                                className="border-b border-emerald-900/20 hover:bg-emerald-950/30 transition-colors"
                            >

                                {/* Prompt */}
                                <td className="min-w-[300px] px-6 py-6">

                                    <h3 className="text-lg font-semibold text-white">
                                        {review.title}
                                    </h3>

                                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">

                                        <Hashtag className="h-4 w-4 text-emerald-600" />

                                        {review.promptId.slice(-12)}

                                    </div>

                                </td>

                                {/* AI Tool */}
                                <td className="min-w-[170px] px-6">

                                    <Chip
                                        radius="full"
                                        variant="bordered"
                                        className="border-emerald-700 bg-emerald-950/40 text-emerald-300"
                                    >
                                        {review.aiTool}
                                    </Chip>

                                </td>

                                {/* Rating */}
                                <td className="min-w-[140px] px-6">

                                    <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-800 bg-[#061b14] px-4 py-2">

                                        <Star className="text-yellow-400" />

                                        <span className="font-bold text-white">
                                            {review.rating}.0
                                        </span>

                                    </div>

                                </td>

                                {/* Review */}
                                <td className="min-w-[360px] max-w-[360px] px-6">

                                    <div className="flex gap-3">

                                        <QuoteOpen className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />

                                        <p className="line-clamp-3 leading-7 text-zinc-300">
                                            {review.comment}
                                        </p>

                                    </div>

                                </td>

                                {/* Date */}
                                <td className="min-w-[180px] px-6">

                                    <div className="flex items-center gap-2 text-zinc-400">

                                        <Calendar className="text-emerald-500" />

                                        {formatDate(review.createdAt)}

                                    </div>

                                </td>

                                {/* Action */}
                                <td className="min-w-[130px] px-6 text-center">

                                    <Link href={`/prompts/${review.promptId}`}>

                                        <Button
                                            isIconOnly
                                            radius="full"
                                            variant="bordered"
                                            className="border-emerald-700 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-700 hover:text-white"
                                        >
                                            <Eye />
                                        </Button>

                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-emerald-900/30 bg-[#03110d] px-6 py-5">

                <p className="text-sm text-zinc-500">
                    Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}
                </p>

            </div>

        </div>
    );
}