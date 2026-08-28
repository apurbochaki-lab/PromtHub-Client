import { serverFetch } from "../core/server"
import { protectedFetch } from "../core/Token/getTokenServer";

export const getPrompts = async () => {
    // return protectedFetch("/api/prompts?status=approved");
    return serverFetch("/api/prompts?status=approved");
}

export const getPromptById = async (promptId, userId) => {
    // return serverFetch(`/api/prompt-details/${promptId}?userId=${userId}`);
    return protectedFetch(`/api/prompt-details/${promptId}?userId=${userId}`);
}

export const getMyPrompts = async (creatorId) => {
    return protectedFetch(`/api/my-prompts?creatorId=${creatorId}`);
}