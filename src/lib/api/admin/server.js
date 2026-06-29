import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUsersList = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc"

        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });

    return users;
}