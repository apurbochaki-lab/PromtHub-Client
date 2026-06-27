import { serverFetch } from "@/lib/core/server";

export const getPromptsStats = async (creatorId) => {
    return serverFetch(`/api/my-prompts-stats?creatorId=${creatorId}`);
}