import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const authHeaderServer = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const head = {
        authorization: `Bearer ${token}`
    }
    return head;
}


export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...await authHeaderServer()
        }
    });
    return await res.json();
}


// const {token} = await auth.api.getToken({
//     headers: await headers()
// })