import { getMyBookmarks } from '@/lib/api/bookmark';
import { getUserSession } from '@/lib/core/session';

const SavedPromptsPage = async () => {
    const user = await getUserSession();
    const creatorId = user?.id || null;

    const bookmarks = await getMyBookmarks(creatorId)
    console.log(bookmarks)

    return (
        <div>
            Saved prompts page
        </div>
    );
};

export default SavedPromptsPage;