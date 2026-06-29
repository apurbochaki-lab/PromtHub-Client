import { protectedFetch } from "@/lib/core/Token/getTokenServer"

export const getAdminAnalytics = async () => {
    return protectedFetch("/api/admin/analytics");
}

export const getAiToolCount = async () => {
    return protectedFetch("/api/admin/aiTools-count");
}