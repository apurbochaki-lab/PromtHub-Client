import { serverFetch } from "../core/server"

export const getPrompts = async () => {
    return serverFetch('/api/prompts');
}

export const getPromptById = async (promptId) => {
    return serverFetch(`/api/prompt-details/${promptId}`);
}

export const getMyPrompts = async (creatorId) => {
    return serverFetch(`/api/my-prompts?creatorId=${creatorId}`);
}