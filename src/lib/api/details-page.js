import { serverFetch } from "../core/server"

export const getRecentReviews = async (promptId) => {
    return serverFetch(`/api/prompt-review?promptId=${promptId}`);
}