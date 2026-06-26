import { getUserSession } from '@/lib/core/session';
import AddPromptFormClient from './AddPromptFormClient';
import { getMyPrompts } from '@/lib/api/prompts';


export default async function AddPromptPage() {
    const user = await getUserSession();

    const creatorId = user?.id || null;
    const myPrompts = await getMyPrompts(creatorId) || [];
    const myPostCount = myPrompts.length;

    return <AddPromptFormClient user={user} myPostCount={myPostCount} />;
}