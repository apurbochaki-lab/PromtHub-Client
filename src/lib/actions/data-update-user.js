import { serverMutation } from "../core/server"

export const updateDataUser = async (promptId, updatedData) => {
    return serverMutation(`/api/data-update/user?promptId=${promptId}`, updatedData, 'PATCH')
}

export const deleteUserPrompt = async (promptId) => {
    return serverMutation(`/api/data-delete/user?promptId=${promptId}`, { data: null }, 'DELETE')
}