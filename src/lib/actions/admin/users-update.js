'use server'

import { auth } from "@/lib/auth"
// import { serverMutation } from "@/lib/core/server"
import { headers } from "next/headers"

export const updateUserRole = async (userId, role) => {
    const data = await auth.api.setRole({
        body: {
            userId,
            role
        },
        headers: await headers()
    })

    return data;
}


// export const deleteUser = async (userId) => {
//     return serverMutation(`/api/admin/delete-user?userId=${userId}`, {}, 'DELETE')
// }