import { protectedFetch } from "@/lib/core/Token/getTokenServer"

export const getPayments = async () => {
    return protectedFetch("/api/admin/payment-details");
}