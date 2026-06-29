"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Person, Calendar } from "@gravity-ui/icons";

const PaymentsTableAdmin = ({ payments }) => {
    return (
        <div className="text-white border border-[#72b01d]/50 rounded-xl shadow-2xl p-4 w-full">
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
                    <Table.Content aria-label="Stripe Payments Log Table" className="min-w-[1000px] w-full text-left bg-[#0b1410] text-white">

                        <Table.Header className="bg-[#0b1410] text-[#8fbc8f] uppercase text-xs tracking-wider border-b border-[#72b01d]/20">
                            <Table.Column isRowHeader className="bg-[#0b1410] py-4 px-4 border-none">Transaction ID</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Purchaser Details</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Billing Email</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Amount Charged</Table.Column>
                            <Table.Column className="bg-[#0b1410] py-4 px-4 border-none">Payment Date</Table.Column>
                        </Table.Header>

                        <Table.Body className="bg-[#0b1410] divide-y divide-[#72b01d]/10 text-white">
                            {payments?.map((payment) => {
                                // MongoDB এর অবজেক্ট আইডি বা সাধারণ আইডি হ্যান্ডেল করার জন্য
                                const paymentId = payment._id?.$oid || payment._id;
                                const createdAtDate = payment.createdAt?.$date || payment.createdAt;

                                return (
                                    <Table.Row key={paymentId} className="bg-[#0b1410] hover:bg-black transition-colors group">

                                        {/* Transaction ID (session_id used here) */}
                                        <Table.Cell className="bg-transparent py-4 px-4 border-none">
                                            <span className="text-[#95d542] font-medium text-sm break-all max-w-[250px] inline-block">
                                                {payment.session_id.slice(0, 25)}....
                                            </span>
                                        </Table.Cell>

                                        {/* Purchaser Details (User Icon & User ID) */}
                                        <Table.Cell className="bg-transparent py-4 px-4 border-none">
                                            <div className="flex items-start gap-2">
                                                <div className="mt-0.5 text-[#8fbc8f]">
                                                    <Person width={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[#ffffff] font-medium text-sm">User</span>
                                                    <span className="text-[#8fbc8f] text-xs mt-0.5">ID: {payment.userId}</span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* Billing Email */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-[#8fbc8f] text-sm border-none">
                                            {payment.userEmail}
                                        </Table.Cell>

                                        {/* Amount Charged (Using the #72b01d green color for emphasis) */}
                                        <Table.Cell className="bg-transparent py-4 px-4 font-bold text-[#72b01d] border-none">
                                            ${Number(payment.amount).toFixed(2)}
                                        </Table.Cell>

                                        {/* Payment Date (Calendar Icon & formatted date) */}
                                        <Table.Cell className="bg-transparent py-4 px-4 text-[#8fbc8f] text-sm border-none">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar width={14} />
                                                <span>
                                                    {new Date(createdAtDate).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "numeric",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        second: "numeric",
                                                        hour12: true
                                                    })}
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

export default PaymentsTableAdmin;