import { serverFetch } from "../core/server"

export const getLimitReviews = async () => {
    return serverFetch("/api/prompt-review-public");
}