'use client';

import React, { useState } from 'react';
import { Table, Button } from '@heroui/react';
import { Star, StarFill, Eye, Check, Xmark, TrashBin } from '@gravity-ui/icons';
import Link from 'next/link';
import { deletePromptAdmin, updateFeatured, updatePromptStatus } from '@/lib/actions/admin/status-update';
import toast from 'react-hot-toast';
import { refreshPath } from '@/lib/core/refreshPage';

const AllUsersTable = ({ prompts }) => {

    const handleStatusChange = async (id, newStatus) => {
        const res = await updatePromptStatus(id, newStatus);

        if (res?.updateResult?.modifiedCount > 0) {
            refreshPath("/dashboard/admin/all-prompts")
            toast.success("Status updated")
        }
        else {
            toast.error("Something went wrong")
        }
    };

    const handleFeaturedToggle = async (id, toggle) => {
        const res = await updateFeatured(id, toggle)
        if (res?.featuredUpdate?.modifiedCount > 0) {
            refreshPath("/dashboard/admin/all-prompts")
            toast.success("Updated")
        } else {
            toast.error("Something went wrong")
        }
    };

    const handleDelete = async (id) => {
        const res = await deletePromptAdmin(id);
        if (res?.deletePrompt?.deletedCount > 0) {
            refreshPath("/dashboard/admin/all-prompts")
            toast.success("Prompt deleted")
        }
        else {
            toast.error("Something went wrong")
        }
    };

    const handleViewDetails = (id) => {
        console.log(`View Details for ID: ${id}`);
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'text-emerald-400 bg-[#0b2416] border-[#16472b]';
            case 'rejected':
                return 'text-rose-400 bg-[#2b1616] border-rose-900/60';
            case 'pending':
            default:
                return 'text-amber-400 bg-[#291e0a] border-[#4d3813]';
        }
    };

    return (
        <div className="w-full bg-[#080d0b] text-zinc-400 p-6 rounded-xl border border-[#14241a] shadow-2xl font-sans">
            {/* <div className="mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Prompt Template Submissions Moderation</h2>
                <p className="text-sm text-[#8b9d93] mt-1">Approve templates, reject with feedback, or tag featured highlights.</p>
            </div> */}

            <Table
                className="bg-transparent"
                classnames={{
                    wrapper: "bg-[#080d0b] shadow-none p-0 border border-[#14241a] rounded-lg overflow-hidden",
                    th: "bg-[#0a120e] text-[#6b967e] text-xs font-semibold uppercase tracking-wider py-4 px-6 border-b border-[#14241a] select-none first:rounded-l-lg last:rounded-r-lg",
                    td: "py-4 px-6 align-middle border-b border-[#14241a]/50 text-zinc-400 group-hover:bg-[#0d1712] transition-colors duration-150",
                    tr: "hover:bg-[#0d1712] border-b border-[#14241a]/50 bg-[#080d0b]",
                    tbody: "bg-[#080d0b] divide-y divide-[#14241a]/60",
                    base: "bg-[#080d0b]",
                }}
            >
                <Table.ScrollContainer>
                    <Table.Content aria-label="Prompt moderation table">
                        <Table.Header>
                            <Table.Column isRowHeader>Template Title</Table.Column>
                            <Table.Column>Creator</Table.Column>
                            <Table.Column>AI Engine</Table.Column>
                            <Table.Column>Visibility</Table.Column>
                            <Table.Column>Featured</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column className="text-right">Actions</Table.Column>
                        </Table.Header>

                        <Table.Body className="bg-[#080d0b] divide-y divide-[#14241a]/60">
                            {prompts.map((prompt) => {
                                const promptId = prompt._id?.$oid || prompt._id;
                                const status = prompt.status?.toLowerCase();
                                const statusStyles = getStatusStyles(status);
                                const isFeatured = prompt?.isFeatured;

                                return (
                                    <Table.Row key={promptId} className="hover:bg-[#0d1712] border-b border-[#14241a]/50 bg-[#080d0b] transition-colors duration-150">
                                        <Table.Cell className="font-medium text-zinc-200 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-200 text-sm">{prompt.title}</span>
                                                <span className="text-xs text-zinc-500 mt-0.5">Category: {prompt.category}</span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="text-[#8b9d93] whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-zinc-200 text-sm">{prompt.creatorName || 'Creator'}</span>
                                                <span className="text-xs text-neutral-500 mt-0.5">{prompt.creatorEmail}</span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap">
                                            <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-md text-[10px] font-bold uppercase tracking-widest">
                                                {prompt.aiTool}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="text-zinc-300 text-sm whitespace-nowrap">
                                            {prompt.isPrivate ? 'Private' : 'Public'}
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap">
                                            {/* <Button
                                                size="sm"
                                                variant="bordered"
                                                onClick={() => {
                                                    // setToggleMap(prev => ({ ...prev, [promptId]: !prev[promptId] }));
                                                    handleFeaturedToggle(prompt?._id);
                                                }}
                                                startContent={
                                                    isFeatured ? (
                                                        <StarFill className="text-amber-400" width={14} height={14} />
                                                    ) : (
                                                        <Star className="text-neutral-500" width={14} height={14} />
                                                    )
                                                }
                                                className={`h-auto min-w-0 px-3 py-1.5 rounded-md border text-xs font-semibold font-sans transition-all ${isFeatured
                                                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                                                    : 'bg-transparent border-[#1c3325] text-neutral-400 hover:text-neutral-200 hover:border-neutral-500'
                                                    }`}
                                            >
                                                {isFeatured ? 'Featured' : 'Feature'}
                                            </Button> */}

                                            <Button
                                                onClick={() => handleFeaturedToggle(promptId, !isFeatured)}
                                                className={`bg-black/85 border-2 p-2 rounded-lg ${isFeatured ? "text-red-500 font-semibold border-red-500" : ""
                                                    } flex items-center gap-2`}
                                            >
                                                {isFeatured ? "⭐ Featured" : "Feature"}
                                            </Button>

                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap">
                                            <span className={`px-2 py-0.5 border rounded text-[10px] font-bold uppercase tracking-wide ${statusStyles}`}>
                                                {prompt.status}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/prompts/${prompt?._id}`} title="View Details">
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="bordered"
                                                        onClick={() => handleViewDetails(promptId)}
                                                        className="text-[#6b967e] hover:text-white border-[#1c3325] hover:bg-[#14241a]/60 rounded-lg min-w-0 w-8 h-8"
                                                        title="View Details"
                                                    >
                                                        <Eye width={14} height={14} />
                                                    </Button>
                                                </Link>

                                                {(status === 'pending' || status === 'rejected') && (
                                                    <span title='Approve'>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="bordered"
                                                            onClick={() => handleStatusChange(promptId, 'approved')}
                                                            className="text-[#4ade80] hover:text-[#34c76b] border-[#1c3325] hover:bg-[#0b2416] rounded-lg min-w-0 w-8 h-8"
                                                            title="Approve"
                                                        >
                                                            <Check width={14} height={14} />
                                                        </Button>
                                                    </span>
                                                )}

                                                {/* Status : Rejected */}
                                                {(status === 'pending' || status === 'approved') && (
                                                    <span title='Reject'>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="bordered"
                                                            onClick={() => handleStatusChange(promptId, 'rejected')}
                                                            className="text-rose-500 hover:text-rose-400 border-[#1c3325] hover:bg-[#2b1616] rounded-lg min-w-0 w-8 h-8"
                                                            title="Reject"
                                                        >
                                                            <Xmark width={14} height={14} />
                                                        </Button>
                                                    </span>
                                                )}

                                                <span title='Delete prompt'>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="bordered"
                                                        onClick={() => handleDelete(promptId)}
                                                        className="p-2 min-w-0 w-8 h-8 bg-[#2b1616] hover:bg-[#3d1a1a] border-none text-red-400 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <TrashBin width={14} height={14} />
                                                    </Button>
                                                </span>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default AllUsersTable;