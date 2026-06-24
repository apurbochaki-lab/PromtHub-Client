import { serverFetch } from "../core/server";

export const getMyBookmarks = async (userId) => {
    return serverFetch(`/api/my-bookmark?userId=${userId}`);
}