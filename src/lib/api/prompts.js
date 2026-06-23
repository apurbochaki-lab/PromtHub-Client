import { serverFetch } from "../core/server"

export const getPromptById = async (promptId) => {
    return serverFetch(`/api/prompt-details/${promptId}`);
}