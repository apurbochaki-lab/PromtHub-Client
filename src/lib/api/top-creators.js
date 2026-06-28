import { serverFetch } from "../core/server"

export const topCreators = async () => {
    return serverFetch("/api/top-creators")
}


