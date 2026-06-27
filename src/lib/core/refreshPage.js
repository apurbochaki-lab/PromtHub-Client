'use server';

import { revalidatePath } from "next/cache";

export async function refreshPath(path) {
    revalidatePath(path);
}