import { serverMutation } from "../core/server"

export const promptReport = (reportData) => {
    return serverMutation("/api/report-prompt", reportData);
}

export const dismissReport = (reportDocId) => {
    return serverMutation(`/api/admin/dismiss-report?reportDocId=${reportDocId}`, {}, 'DELETE')
}

export const warnCreator = (promptId) => {
    return serverMutation(`/api/admin/warn-creator?promptId=${promptId}`, {}, 'PATCH')
}

export const removePrompt = async (promptId) => {
    return serverMutation(`/api/admin/remove-prompt?promptId=${promptId}`, {}, 'DELETE')
}