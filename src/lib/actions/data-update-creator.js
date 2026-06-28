import { serverMutation } from "../core/server"

export const updateDataCreator = async (promptId, updatedData) => {
    return serverMutation(`/api/data-update/creator?promptId=${promptId}`, updatedData, 'PATCH')
}

export const deleteCreatorPrompt = async (promptId) => {
    return serverMutation(`/api/data-delete/creator?promptId=${promptId}`, { data: null }, 'DELETE')
}