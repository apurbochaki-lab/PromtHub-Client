import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const authHeader = async () => {
    const { data: tokenData } = await authClient.token()
    const token = tokenData?.token;
    const headers = {
        authorization: `Bearer ${token}`
    }
    return headers;
}

export const serverMutation = async (path, data, method = 'POST') => {

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}