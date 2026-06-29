import { protectedFetch } from "@/lib/core/Token/getTokenServer";

export const getAllPrompts = async () => {
    return protectedFetch("/api/admin/prompts");
}