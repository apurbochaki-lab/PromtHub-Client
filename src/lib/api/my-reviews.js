import { serverFetch } from "../core/server"

export const getMyReviews = async (userId) => {
    return serverFetch(`/api/dashboard/my-reviews?userId=${userId}`)
}