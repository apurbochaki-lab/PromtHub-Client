import { serverMutation } from "../core/server"

export const promptReport = (reportData) => {
    return serverMutation("/api/report-prompt", reportData);
}