"use client";

import React, { useState } from "react";
import { Table, AlertDialog, Button } from "@heroui/react";
import {
    Eye,
    Pencil,
    ChartColumn,
    TrashBin,
    CircleCheck,
    CircleXmark,
    Clock,
    Xmark
} from "@gravity-ui/icons";
import Link from "next/link";
import toast from "react-hot-toast";

const PromptsTableClient = ({ prompts }) => {
    const [selectedAnalytics, setSelectedAnalytics] = useState(null);
    console.log("selectedAnalytics", selectedAnalytics)

    // Conditional UI for Status
    const getStatusUI = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return { text: "text-[#72b01d]", border: "border-[#72b01d]/30", bg: "bg-[#72b01d]/10", icon: <CircleCheck width={14} /> };
            case "rejected":
                return { text: "text-red-400", border: "border-red-400/30", bg: "bg-red-400/10", icon: <CircleXmark width={14} /> };
            case "pending":
            default:
                return { text: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", icon: <Clock width={14} /> };
        }
    };

    const handlePromptUpdate = () => {
        toast.success("Edit clicked")


    }

    return (
        // Added 'dark' class and forced global text-white to kill light mode defaults
        <div className=" text-white border border-[#72b01d]/50 rounded-xl shadow-2xl p-4 w-full">

            <Table
                variant="primary"
                className="bg-[#0b1410] border-none"
                classnames={{
                    base: "bg-[#0b1410]",
                    wrapper: "bg-[#0b1410] shadow-none border-none p-0",
                    th: "bg-[#0b1410] border-b border-[#72b01d]/20 text-[#8fbc8f]",
                    td: "bg-[#0b1410] text-white",
                    tr: "bg-[#0b1410] hover:bg-[#111111]",
                    tbody: "bg-[#0b1410] text-white"
                }}
            >
                <Table.ScrollContainer className="bg-[#0b1410]">
                    <Table.Content aria-label="My Prompts Table" className="min-w-[1000px] w-full text-left bg-[#0b1410] text-white">

                        <Table.Header className="bg-[#0b1410] text-[#8fbc8f] uppercase text-xs tracking-wider border-b border-[#72b01d]/20">
                            <Table.Column isRowHeader className="bg-[#0b1410] py-4 px-4 border-none">Title</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">AI Engine</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Visibility</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Status</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 text-center border-none">Copies</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 text-center border-none">Rating</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 text-right border-none">Actions</Table.Column>
                        </Table.Header>

                        <Table.Body className="bg-[#0b1410] divide-y divide-[#72b01d]/10 text-white">
                            {prompts.map((prompt) => {
                                const statusUI = getStatusUI(prompt.status);

                                return (
                                    <Table.Row key={prompt._id} className="bg-[#0b1410] hover:bg-black transition-colors group">

                                        {/* Title & Category */}
                                        <Table.Cell className="bg-transparent py-4 px-4 border-none">
                                            <div className="flex flex-col">
                                                <span className="text-[#ffffff] font-medium text-sm group-hover:text-[#95d542] transition-colors">{prompt.title}</span>
                                                <span className="text-[#8fbc8f] text-xs mt-1">Category: {prompt.category}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* AI Engine */}
                                        <Table.Cell className="bg-transparent py-4 px-4 border-none">
                                            <span className="px-3 py-1 text-xs rounded-full bg-[#044a2b]/40 text-[#ffffff] border border-[#72b01d]/20">
                                                {prompt.aiTool}
                                            </span>
                                        </Table.Cell>

                                        {/* Visibility */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-[#8fbc8f] text-sm border-none">
                                            {prompt.isPrivate ? "Private" : "Public"}
                                        </Table.Cell>

                                        {/* Status */}
                                        <Table.Cell className="bg-transparent py-4 px-4 border-none">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border ${statusUI.border} ${statusUI.bg} ${statusUI.text} text-xs font-semibold capitalize`}>
                                                {statusUI.icon}
                                                {prompt.status}
                                            </div>
                                        </Table.Cell>

                                        {/* Copies */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-center text-[#ffffff] font-medium border-none">
                                            {prompt.copyCount}
                                        </Table.Cell>

                                        {/* Rating */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-center text-[#ffffff] font-medium border-none">
                                            ★ {prompt.rating.toFixed(1)}
                                        </Table.Cell>

                                        {/* Actions */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-right border-none">
                                            <div className="flex items-center justify-end gap-3 ">
                                                <Link href={`/prompts/${prompt?._id}`} className="bg-transparent text-white hover:text-[#95d542] transition-colors p-2.5 rounded-lg border border-transparent hover:border-[#72b01d]/30" title="View Details">
                                                    <Eye width={18} />
                                                </Link>

                                                {/* Edit Data (Update CRUD) */}
                                                <Button onClick={handlePromptUpdate}
                                                    variant="outline" className="bg-transparent text-white hover:text-[#95d542] transition-colors p-3 rounded-lg border-transparent hover:border-[#72b01d]/30" title="Edit Data">
                                                    <Pencil width={18} />
                                                </Button>


                                                <Button variant="outline"
                                                    onClick={() => setSelectedAnalytics(prompt)}
                                                    className="bg-transparent text-white hover:text-[#95d542] transition-colors p-3 rounded-lg border-transparent hover:border-[#72b01d]/30"
                                                    title="Analytics"
                                                >
                                                    <ChartColumn width={18} />
                                                </Button>

                                                {/* HeroUI Delete Confirmation Modal */}
                                                <AlertDialog>
                                                    <Button
                                                        isIconOnly
                                                        variant="outline"
                                                        className="bg-transparent text-[#8fbc8f] hover:text-[#ef4444] hover:border-[#ef4444] hover:bg-[#ef4444]/10 transition-all rounded-lg border-transparent"
                                                        title="Delete"
                                                    >
                                                        <TrashBin width={18} />
                                                    </Button>
                                                    <AlertDialog.Backdrop className="bg-[#0b1410]/80 backdrop-blur-sm z-50">
                                                        <AlertDialog.Container>
                                                            <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#0b1410] border border-[#72b01d]/20 text-[#ffffff] shadow-[0_0_30px_rgba(114,176,29,0.1)] rounded-xl">
                                                                <AlertDialog.CloseTrigger className="text-[#8fbc8f] hover:text-[#95d542] m-2 bg-transparent" />
                                                                <AlertDialog.Header className="bg-[#0b1410]">
                                                                    <AlertDialog.Heading className="text-xl text-[#ffffff] font-bold">Delete Prompt?</AlertDialog.Heading>
                                                                </AlertDialog.Header>
                                                                <AlertDialog.Body className="bg-[#0b1410] text-[#8fbc8f] text-sm mt-2">
                                                                    <p>
                                                                        Are you sure you want to delete <strong>{prompt.title}</strong>? This action cannot be undone.
                                                                    </p>
                                                                </AlertDialog.Body>
                                                                <AlertDialog.Footer className="bg-[#0b1410] mt-6 flex justify-end gap-3">
                                                                    <Button slot="close" className="bg-transparent text-[#8fbc8f] hover:text-[#ffffff] border border-[#72b01d]/20 px-4 py-2 rounded-md">
                                                                        Cancel
                                                                    </Button>
                                                                    <Button slot="close" className="bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444] hover:text-white border border-[#ef4444]/30 px-4 py-2 rounded-md transition-colors">
                                                                        Confirm Delete
                                                                    </Button>
                                                                </AlertDialog.Footer>
                                                            </AlertDialog.Dialog>
                                                        </AlertDialog.Container>
                                                    </AlertDialog.Backdrop>
                                                </AlertDialog>
                                            </div>
                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {/* Custom Analytics Modal for viewing stats */}
            {selectedAnalytics && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1410]/80 backdrop-blur-md p-4">
                    <div className="bg-[#0b1410] border border-[#72b01d]/30 rounded-xl w-full max-w-md shadow-[0_0_40px_rgba(114,176,29,0.15)] overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-[#72b01d]/10 bg-[#0b1410]">
                            <div className="flex items-center gap-3">
                                <ChartColumn className="text-[#72b01d]" width={24} />
                                <h3 className="text-lg font-bold text-[#ffffff]">Prompt Analytics</h3>
                            </div>
                            <button
                                onClick={() => setSelectedAnalytics(null)}
                                className="bg-transparent text-[#8fbc8f] hover:text-[#95d542] transition-colors"
                            >
                                <Xmark width={20} />
                            </button>
                        </div>

                        {/* Body - applying gradient border guidelines */}
                        <div className="bg-[#0b1410] p-6 space-y-4">
                            <h4 className="text-sm font-semibold text-[#8fbc8f] mb-4">
                                {selectedAnalytics.title}
                            </h4>

                            {/* Analytics Data Items */}
                            <div className="flex justify-between items-center bg-gradient-to-r from-[#72b01d]/20 to-transparent border-l-4 border-[#72b01d] p-3 rounded-r-md">
                                <span className="text-[#8fbc8f] text-sm">Total Copies</span>
                                <span className="text-[#ffffff] font-bold text-lg">{selectedAnalytics.copyCount}</span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0b1410] border-b border-[#72b01d]/10 p-3">
                                <span className="text-[#8fbc8f] text-sm">Bookmarks Saved</span>
                                <span className="text-[#ffffff] font-bold">{selectedAnalytics?.bookmarkCount} </span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0b1410] border-b border-[#72b01d]/10 p-3">
                                <span className="text-[#8fbc8f] text-sm">Average Rating</span>
                                <span className="text-[#95d542] font-bold flex items-center gap-1">★ {selectedAnalytics?.rating}</span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0b1410] border-b border-[#72b01d]/10 p-3">
                                <span className="text-[#8fbc8f] text-sm">Review Feedbacks</span>
                                <span className="text-[#ffffff] font-bold">{selectedAnalytics?.reviewCount} reviews </span>
                            </div>

                            <div className="flex justify-between items-center bg-[#0b1410] p-3 text-xs text-[#8fbc8f] mt-4">
                                <span>Created Date</span>
                                <span className="font-semibold">🗓 {new Date(selectedAnalytics?.createdAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptsTableClient;