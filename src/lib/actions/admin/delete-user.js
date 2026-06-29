import { serverMutation } from "@/lib/core/server"

export const deleteUser = async (userId) => {
    return serverMutation(`/api/admin/delete-user?userId=${userId}`, {}, 'DELETE')
}