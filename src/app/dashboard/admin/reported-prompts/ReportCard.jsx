"use client";

import { Button } from "@heroui/react";
import {
    Eye,
    Check,
    TriangleExclamation,
    TrashBin,
    Calendar,
    CircleExclamation,
} from "@gravity-ui/icons";
import Link from "next/link";
import toast from "react-hot-toast";
import { dismissReport, removePrompt, warnCreator } from "@/lib/actions/report-prompt";
import { refreshPath } from "@/lib/core/refreshPage";

const ReportCard = ({ reports = [] }) => {
    const handleInspect = (report) => {
        console.log("Inspect", report);
    };

    const handleDismiss = async (reportDocId) => {
        const res = await dismissReport(reportDocId);
        if (res?.deletedCount > 0) {
            refreshPath("/dashboard/admin/reported-prompts")
            toast.success("Dismissed")
        } else {
            toast.error("Something went wrong!")
        }
    };

    const handleWarnCreator = async (promptId) => {
        const res = await warnCreator(promptId)
        console.log(res)

        if (res?.matchedCount > 0) {
            refreshPath("/dashboard/admin/reported-prompts")
            toast.success("Warning sent")
        } else {
            toast.error("Something went wrong!")
        }
    };

    const handleRemovePrompt = async (promptId) => {
        const res = await removePrompt(promptId)

        if (res?.deletedCount > 0) {
            refreshPath("/dashboard/admin/reported-prompts")
            toast.success("Prompt removed")
        } else {
            toast.error("Something went wrong!")
        }
    };

    const badgeColor = (reason = "") => {
        const value = reason.toLowerCase();

        if (value.includes("spam"))
            return "bg-red-500/15 text-red-300 border-red-500/40";

        if (value.includes("copyright"))
            return "bg-orange-500/15 text-orange-300 border-orange-500/40";

        if (value.includes("inappropriate"))
            return "bg-pink-500/15 text-pink-300 border-pink-500/40";

        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/40";
    };

    if (!reports?.length) {
        return (
            <div className="rounded-2xl border border-[#31544d] bg-[#102a26] py-16 text-center">
                <CircleExclamation width={44} height={44} className="mx-auto text-teal-400" />

                <h3 className="mt-4 text-2xl font-bold text-white">
                    No Reports Found
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                    Everything looks clean right now.
                </p>
            </div>
        );
    }

    // from-[#14352f] via-[#173d36] to-[#112d28]

    return (
        <div className="space-y-5">
            {reports?.map((report) => (
                <div
                    key={report?._id}
                    className="max-w-[1200px] mx-auto rounded-2xl border border-[#31544d] bg-gradient-to-br from-[#102c27] via-[#12332d] to-[#0b201d] p-5 shadow-lg transition-all duration-300 hover:border-teal-400/40 hover:shadow-xl"
                >
                    {/* Header */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                        <div className="space-y-2">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgeColor(
                                    report?.reason
                                )}`}
                            >
                                <CircleExclamation width={14} height={14} />
                                {report?.reason || "Unknown"}
                            </span>

                            <h2 className="text-xl font-bold text-white">
                                Prompt Report : {report?.promptTitle}
                            </h2>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-slate-300">
                            <Calendar width={16} height={16} />

                            {report?.createdAt
                                ? new Date(report.createdAt).toLocaleDateString()
                                : "N/A"
                            }
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4 rounded-xl border border-[#2e4d47] bg-[#0f2824]/80 p-4">
                        <h3 className="text-sm font-semibold text-white">
                            Report Details
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                            {report?.description || "No description provided."}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-[#29443f] pt-4">

                        <Link href={`/prompts/${report?.promptId}`}>
                            <Button
                                radius="md"
                                size="sm"
                                className="bg-sky-600 px-4 font-semibold text-white transition hover:bg-sky-500"
                            >   <Eye width={16} height={16} />
                                Inspect
                            </Button>
                        </Link>

                        <Button
                            radius="md"
                            size="sm"
                            className="bg-emerald-600 px-4 font-semibold text-white transition hover:bg-emerald-500"
                            onPress={() => handleDismiss(report?._id)}
                        >   <Check width={16} height={16} />
                            Dismiss
                        </Button>

                        <Button
                            radius="md"
                            size="sm"
                            className="bg-amber-500 px-4 font-semibold text-black transition hover:bg-amber-400"
                            onPress={() => handleWarnCreator(report?.promptId)}
                        >   <TriangleExclamation width={16} height={16} />
                            Warn Creator
                        </Button>

                        <Button
                            radius="md"
                            size="sm"
                            className="bg-red-600 px-4 font-semibold text-white transition hover:bg-red-500"
                            onPress={() => handleRemovePrompt(report?.promptId)}
                        >   <TrashBin width={16} height={16} />
                            Remove Prompt
                        </Button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReportCard;