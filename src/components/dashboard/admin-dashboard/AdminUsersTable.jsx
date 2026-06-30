'use client';

import React, { useState } from 'react';
import { AlertDialog, Button } from "@heroui/react";
import { updateUserRole } from '@/lib/actions/admin/users-update';
import toast from 'react-hot-toast';
import { refreshPath } from '@/lib/core/refreshPage';
import { deleteUser } from '@/lib/actions/admin/delete-user';


export default function AdminUsersTable({ users }) {
    // Modal confirmation states for Role Change
    const [isRoleConfirmOpen, setIsRoleConfirmOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null); // stores { userId, userName, newRole }
    const [isUpdating, setIsUpdating] = useState(false);

    // Robust Helper function to format Dates (Handles both string and MongoDB $date object)
    const formatDate = (dateObj) => {
        if (!dateObj) return 'N/A';

        // Extract date string whether it's wrapped in $date or comes as a direct string
        const dateString = (typeof dateObj === 'object' && dateObj !== null && dateObj.$date)
            ? dateObj.$date
            : dateObj;

        const date = new Date(dateString);

        // Fallback if the date is invalid
        if (isNaN(date.getTime())) return 'N/A';

        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    // Safe accessor for MongoDB OID
    const getUserId = (user) => user._id?.$oid || user.id;

    // Trigger confirmation modal when select option changes
    const handleRoleSelectChange = (userId, userName, newRole) => {
        // console.log("User ID:", userId, "Name:", userName, "Role:", newRole)
        setPendingChange({ userId, userName, newRole });
        setIsRoleConfirmOpen(true);
    };

    // Execute server action if confirmed for Role
    const confirmRoleChange = async () => {
        if (!pendingChange) return;

        setIsUpdating(true);
        try {
            const { userId, newRole } = pendingChange;

            // Server Action runs -> updates DB -> revalidatePath updates Server Component props
            await updateUserRole(userId, newRole);

        } catch (error) {
            console.error("Failed to update user role:", error);
        } finally {
            refreshPath("/dashboard/admin/all-users")
            toast.success("Role updated")
            setIsUpdating(false);
            setIsRoleConfirmOpen(false);
            setPendingChange(null);
        }
    };

    // Execute delete action
    const handleDelete = async (userId) => {
        try {
            const res = await deleteUser(userId)

            if (res?.userResult?.deletedCount > 0) {
                refreshPath("/dashboard/admin/all-users")
                toast.success("User deleted")
            } else {
                toast.error("Something went wrong!")
            }

        } catch (error) {
            console.error("Failed to update user role:", error);
        }
    };

    return (
        <div className="relative w-full">
            {/* Dark Marine Green Theme Base (#080d0b for ultra dark green vibe) */}
            <div className="w-full bg-[#080d0b] border border-[#14241a] rounded-xl overflow-hidden shadow-2xl font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs text-zinc-400">

                        {/* Header */}
                        <thead>
                            <tr className="border-b border-[#14241a] text-[#6b967e] font-semibold uppercase tracking-wider select-none bg-[#0a120e]">
                                <th className="py-4 px-6 font-medium">Profile Details</th>
                                <th className="py-4 px-6 font-medium">Email Address</th>
                                <th className="py-4 px-6 font-medium">Subscription</th>
                                <th className="py-4 px-6 font-medium">Role Level</th>
                                <th className="py-4 px-6 font-medium">Registered Date</th>
                                <th className="py-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-[#14241a]/60 bg-[#080d0b]">
                            {users.map((user) => {
                                const userId = getUserId(user);
                                const userRole = user.role?.toLowerCase() || 'user';
                                const userPlan = user.plan?.toLowerCase() || 'free';

                                return (
                                    <tr key={userId} className="hover:bg-[#0d1712] border-b border-[#14241a]/50 transition-colors duration-150">

                                        {/* Profile Details (Avatar + Name) */}
                                        <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {/* Smart Avatar Wrapper */}
                                                <div className="w-8 h-8 rounded-full bg-[#182920] border border-[#243d30] flex items-center justify-center text-xs text-[#4ade80] font-bold tracking-wider relative overflow-hidden shrink-0">
                                                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                                    {user.image && (
                                                        <img
                                                            src={user.image}
                                                            alt={user.name}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-zinc-200 font-semibold">{user.name || 'Unknown User'}</span>
                                            </div>
                                        </td>

                                        {/* Email Address */}
                                        <td className="py-4 px-6 text-[#8b9d93] whitespace-nowrap">
                                            {user.email}
                                        </td>

                                        {/* Subscription Plan Badge */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {userPlan === 'pro' || userPlan === 'premium' ? (
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-[#0b2416] text-[#4ade80] border border-[#16472b] uppercase tracking-wide">
                                                    Premium
                                                </span>
                                            ) : (
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-[#291e0a] text-[#fbbf24] border border-[#4d3813] uppercase tracking-wide">
                                                    Free
                                                </span>
                                            )}
                                        </td>

                                        {/* Role Level Dropdown */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="relative w-32">
                                                <select
                                                    value={userRole}
                                                    onChange={(e) => handleRoleSelectChange(userId, user.name, e.target.value)}
                                                    className="w-full bg-[#0d1712] text-zinc-200 border border-[#1c3325] rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#4ade80]/50 cursor-pointer appearance-none capitalize transition-all"
                                                >
                                                    <option value="user" className="bg-[#0d1712]">User</option>
                                                    <option value="creator" className="bg-[#0d1712]">Creator</option>
                                                    <option value="admin" className="bg-[#0d1712]">Admin</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-[#6b967e]">
                                                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Registered Date */}
                                        <td className="py-4 px-6 text-[#8b9d93] whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 opacity-80">
                                                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDate(user.createdAt)}</span>
                                            </div>
                                        </td>

                                        {/* Actions (HeroUI Alert Dialog for Delete) */}
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <AlertDialog>
                                                <Button
                                                    variant="light"
                                                    className="p-2 min-w-0 w-auto h-auto bg-[#2b1616] hover:bg-[#3d1a1a] text-red-400 rounded-lg transition-all group"
                                                    title="Delete User"
                                                >
                                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="group-hover:scale-105 transition-transform">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </Button>

                                                <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-sm">
                                                    <AlertDialog.Container>
                                                        <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#0a120e] border border-[#1c3325] shadow-2xl shadow-green-900/10">
                                                            <AlertDialog.CloseTrigger className="text-[#6b967e] hover:text-white" />
                                                            <AlertDialog.Header>
                                                                <AlertDialog.Icon status="danger" className="text-red-500" />
                                                                <AlertDialog.Heading className="text-zinc-100 font-semibold">Delete user permanently?</AlertDialog.Heading>
                                                            </AlertDialog.Header>
                                                            <AlertDialog.Body>
                                                                <p className="text-[#8b9d93] text-sm">
                                                                    This will permanently delete <strong>{user.name}</strong> and all of their data. This action cannot be undone.
                                                                </p>
                                                            </AlertDialog.Body>
                                                            <AlertDialog.Footer>
                                                                <Button slot="close" variant="tertiary" className="text-[#6b967e] hover:bg-[#14241a] border-none font-medium">
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    slot="close"
                                                                    variant="danger"
                                                                    onClick={() => handleDelete(userId)}
                                                                    className="bg-red-600 hover:bg-red-500 text-white font-medium"
                                                                >
                                                                    Delete User
                                                                </Button>
                                                            </AlertDialog.Footer>
                                                        </AlertDialog.Dialog>
                                                    </AlertDialog.Container>
                                                </AlertDialog.Backdrop>
                                            </AlertDialog>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {/* <div className="flex items-center justify-between px-6 py-4 border-t border-[#14241a] bg-[#0a120e]/60 text-xs text-[#6b967e] select-none">
                    <div>
                        Showing 1 to {users.length} of 12,842 users
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:text-white transition-colors">
                            <ChevronLeft width={16} height={16} />
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center bg-[#4ade80] text-[#080d0b] rounded font-semibold">
                            1
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-[#14241a] rounded text-[#8b9d93] transition-colors">
                            2
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-[#14241a] rounded text-[#8b9d93] transition-colors">
                            3
                        </button>
                        <span className="px-1 text-[#4b6a58]">...</span>
                        <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-[#14241a] rounded text-[#8b9d93] transition-colors">
                            1285
                        </button>
                        <button className="p-1 hover:text-white transition-colors">
                            <ChevronRight width={16} height={16} />
                        </button>
                    </div>
                </div> */}
            </div>

            {/* Custom Modal for Role Change (Kept custom to avoid conflicting HeroUI states if preferred) */}
            {isRoleConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70">
                    <div className="w-full max-w-sm bg-[#0a120e] border border-[#1c3325] rounded-xl p-6 shadow-2xl shadow-green-900/10 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                                Confirm Role Change
                            </h3>
                            <p className="text-xs text-[#8b9d93] leading-relaxed">
                                Are you sure you want to change the role of <span className="text-zinc-200 font-semibold">{pendingChange?.userName}</span> to <span className="text-[#4ade80] font-bold capitalize">{pendingChange?.newRole}</span>? This alters system access and application flow permissions immediately.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                            <button
                                disabled={isUpdating}
                                onClick={() => { setIsRoleConfirmOpen(false); setPendingChange(null); }}
                                className="px-4 py-2 text-[#6b967e] hover:text-white bg-[#14241a]/60 hover:bg-[#1c3325] rounded-md transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={confirmRoleChange}
                                className="px-4 py-2 text-[#080d0b] font-semibold bg-[#4ade80] hover:bg-[#34c76b] rounded-md transition-colors shadow-lg shadow-green-900/20 disabled:opacity-50 min-w-[76px] flex items-center justify-center"
                            >
                                {isUpdating ? (
                                    <span className="w-4 h-4 border-2 border-[#080d0b]/30 border-t-[#080d0b] rounded-full animate-spin" />
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}