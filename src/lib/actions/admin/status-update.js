import { serverMutation } from "@/lib/core/server"

export const updatePromptStatus = async (promptId, status) => {
    return serverMutation(`/api/admin/update-status?promptId=${promptId}&status=${status}`, {}, 'PATCH')
}

export const deletePromptAdmin = async (promptId) => {
    return serverMutation(`/api/admin/delete-prompt?promptId=${promptId}`, {}, 'DELETE')
}

export const updateFeatured = (promptId, toggle) => {
    return serverMutation(`/api/admin/update-featured?promptId=${promptId}&toggle=${toggle}`, {}, 'PATCH')
}