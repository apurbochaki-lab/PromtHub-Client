'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const deleteBookmark = async (bookmarkId) => {
    const data = serverMutation("/api/delete/my-bookmark", bookmarkId, "DELETE");
    revalidatePath("/dashboard/user/saved-prompts");
    return data;
}

export const copyCount = async (promptId) => {
    const data = serverMutation("/api/prompts/copy-count", promptId, "PATCH");
    revalidatePath(`/prompts/${promptId}`);
    return data;
}