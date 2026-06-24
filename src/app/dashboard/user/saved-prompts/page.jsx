import BookmarkCard from '@/components/dashboard/user-components/BookmarkCard';
import { getMyBookmarks } from '@/lib/api/bookmark';
import { getUserSession } from '@/lib/core/session';

const SavedPromptsPage = async () => {
    const user = await getUserSession();
    const creatorId = user?.id || null;

    // বুকমার্ক ডেটা ফেচ
    const bookmarks = await getMyBookmarks(creatorId);

    return (
        <div className="p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Saved Prompts</h1>
                <p className="text-[#8fbc8f]">
                    View and manage all your bookmarked prompts in one place.
                </p>
            </div>

            {/* Empty State vs Grid Layout */}
            {!bookmarks || bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#020604] border border-dashed border-[#72b01d]/30 rounded-2xl">
                    <div className="h-16 w-16 mb-4 rounded-full bg-[#72b01d]/10 flex items-center justify-center">
                        <span className="text-[#95d542] text-2xl">🔖</span>
                    </div>
                    <h3 className="text-white text-lg font-medium mb-1">No Bookmarks Found</h3>
                    <p className="text-[#8fbc8f] text-sm text-center">
                        You haven't saved any prompts yet. Explore and bookmark your favorites!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark?._id}
                            bookmark={bookmark}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedPromptsPage;