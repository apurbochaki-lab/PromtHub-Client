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

    // Updated using the identical dynamic status color logic from the first table
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'text-[#72b01d] bg-[#72b01d]/10 border-[#72b01d]/30';
            case 'rejected':
                return 'text-red-400 bg-red-400/10 border-red-400/30';
            case 'pending':
            default:
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
        }
    };

    return (
        // Wrapper background and border synced with first table theme
        <div className="w-full bg-[#0b1410] text-white p-6 rounded-xl border border-[#72b01d]/50 shadow-2xl font-sans">
            {/* <div className="mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Prompt Template Submissions Moderation</h2>
                <p className="text-sm text-[#8b9d93] mt-1">Approve templates, reject with feedback, or tag featured highlights.</p>
            </div> */}

            <Table
                variant="primary"
                className="bg-[#0b1410] border-none"
                classnames={{
                    base: "bg-[#0b1410]",
                    wrapper: "bg-[#0b1410] shadow-none border-none p-0",
                    th: "bg-[#0b1410] border-b border-[#72b01d]/20 text-[#8fbc8f] text-xs font-semibold uppercase tracking-wider py-4 px-6 select-none",
                    td: "bg-[#0b1410] text-white py-4 px-6 align-middle border-none",
                    tr: "bg-[#0b1410] hover:bg-[#111111] border-none",
                    tbody: "bg-[#0b1410] divide-y divide-[#72b01d]/10 text-white",
                }}
            >
                <Table.ScrollContainer className="bg-[#0b1410]">
                    <Table.Content aria-label="Prompt moderation table" className="bg-[#0b1410] text-white">
                        <Table.Header className="bg-[#0b1410] text-[#8fbc8f] uppercase text-xs tracking-wider border-b border-[#72b01d]/20">
                            <Table.Column isRowHeader className="bg-[#0b1410] border-none">Template Title</Table.Column>
                            <Table.Column className="bg-[#0b1410] border-none">Creator</Table.Column>
                            <Table.Column className="bg-[#0b1410] border-none">AI Engine</Table.Column>
                            <Table.Column className="bg-[#0b1410] border-none">Visibility</Table.Column>
                            <Table.Column className="bg-[#0b1410] border-none">Featured</Table.Column>
                            <Table.Column className="bg-[#0b1410] border-none">Status</Table.Column>
                            <Table.Column className="text-right bg-[#0b1410] border-none">Actions</Table.Column>
                        </Table.Header>

                        <Table.Body className="bg-[#0b1410] divide-y divide-[#72b01d]/10 text-white">
                            {prompts.map((prompt) => {
                                const promptId = prompt._id?.$oid || prompt._id;
                                const status = prompt.status?.toLowerCase();
                                const statusStyles = getStatusStyles(status);
                                const isFeatured = prompt?.isFeatured;

                                return (
                                    <Table.Row key={promptId} className="bg-[#0b1410] hover:bg-black transition-colors group">

                                        {/* Template Title */}
                                        <Table.Cell className="bg-transparent font-medium text-white whitespace-nowrap border-none">
                                            <div className="flex flex-col">
                                                <span className="text-[#ffffff] font-medium text-sm group-hover:text-[#95d542] transition-colors">{prompt.title}</span>
                                                <span className="text-[#8fbc8f] text-xs mt-1">Category: {prompt.category}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Creator */}
                                        <Table.Cell className="bg-transparent text-[#8fbc8f] whitespace-nowrap border-none">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white text-sm">{prompt.creatorName || 'Creator'}</span>
                                                <span className="text-xs text-[#8fbc8f] mt-0.5">{prompt.creatorEmail}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* AI Engine */}
                                        <Table.Cell className="bg-transparent whitespace-nowrap border-none">
                                            <span className="px-3 py-1 text-xs rounded-full bg-[#044a2b]/40 text-[#ffffff] border border-[#72b01d]/20">
                                                {prompt.aiTool}
                                            </span>
                                        </Table.Cell>

                                        {/* Visibility */}
                                        <Table.Cell className="bg-transparent text-[#8fbc8f] text-sm whitespace-nowrap border-none">
                                            {prompt.isPrivate ? 'Private' : 'Public'}
                                        </Table.Cell>

                                        {/* Featured Button with transparent/accent rules */}
                                        <Table.Cell className="bg-transparent whitespace-nowrap border-none">
                                            <Button
                                                onClick={() => handleFeaturedToggle(promptId, !isFeatured)}
                                                className={`bg-transparent border p-2 rounded-lg transition-colors ${isFeatured
                                                        ? "text-yellow-400 font-semibold border-yellow-400/50 hover:bg-yellow-400/10"
                                                        : "text-white border-transparent hover:border-[#72b01d]/30 hover:text-[#95d542]"
                                                    } flex items-center gap-2`}
                                            >
                                                {isFeatured ? "⭐ Featured" : "Feature"}
                                            </Button>
                                        </Table.Cell>

                                        {/* Status */}
                                        <Table.Cell className="bg-transparent whitespace-nowrap border-none">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-semibold capitalize ${statusStyles}`}>
                                                {prompt.status}
                                            </span>
                                        </Table.Cell>

                                        {/* Actions */}
                                        <Table.Cell className="bg-transparent text-right whitespace-nowrap border-none">
                                            <div className="flex items-center justify-end gap-3">

                                                {/* View Details Button */}
                                                <Link href={`/prompts/${prompt?._id}`} title="View Details">
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleViewDetails(promptId)}
                                                        className="bg-transparent text-white hover:text-[#95d542] transition-colors p-2 rounded-lg border border-transparent hover:border-[#72b01d]/30 min-w-0 w-9 h-9"
                                                        title="View Details"
                                                    >
                                                        <Eye width={18} />
                                                    </Button>
                                                </Link>

                                                {/* Approve Button */}
                                                {(status === 'pending' || status === 'rejected') && (
                                                    <span title='Approve'>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleStatusChange(promptId, 'approved')}
                                                            className="bg-transparent text-white hover:text-[#95d542] transition-colors p-2 rounded-lg border border-transparent hover:border-[#72b01d]/30 min-w-0 w-9 h-9"
                                                            title="Approve"
                                                        >
                                                            <Check width={18} />
                                                        </Button>
                                                    </span>
                                                )}

                                                {/* Reject Button */}
                                                {(status === 'pending' || status === 'approved') && (
                                                    <span title='Reject'>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleStatusChange(promptId, 'rejected')}
                                                            className="bg-transparent text-white hover:text-red-400 transition-colors p-2 rounded-lg border border-transparent hover:border-red-400/30 min-w-0 w-9 h-9"
                                                            title="Reject"
                                                        >
                                                            <Xmark width={18} />
                                                        </Button>
                                                    </span>
                                                )}

                                                {/* Delete Button */}
                                                <span title='Delete prompt'>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDelete(promptId)}
                                                        className="bg-transparent text-[#8fbc8f] hover:text-[#ef4444] hover:border-[#ef4444] hover:bg-[#ef4444]/10 transition-all rounded-lg border border-transparent min-w-0 w-9 h-9"
                                                        title="Delete"
                                                    >
                                                        <TrashBin width={18} />
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