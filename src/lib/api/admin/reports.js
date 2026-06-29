import { serverFetch } from "@/lib/core/server"

export const getReports = () => {
    return serverFetch("/api/admin/prompts-reports")
}