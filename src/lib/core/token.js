

import { authClient } from "../auth-client";

export const getToken = async () => {
    // Implementation for getting token
    const { data } = await authClient.token()
    return data;
};