import StatsCard from "@/components/dashboard/creator-components/StatsCard";
import GrowthChart from "@/components/dashboard/creator-components/GrowthChart";
import { getPromptsStats } from "@/lib/api/creator/creator-home";
import { getMyPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";

const CreatorHomepage = async () => {

    const user = await getUserSession();
    const creatorId = user?.id || null;
    const myPrompts = await getMyPrompts(creatorId) || [];
    const stats = await getPromptsStats(creatorId) || {};

    // All data :
    const totalPrompt = myPrompts.length;
    const totalCopies = stats?.totalCopyCount || 0;
    const totalBookmarks = stats?.totalBookmarkCount || 0;

    return (
        <div className="min-h-screen bg-[#000000] p-6 lg:p-2 max-w-7xl mx-auto">
            {/* Dashboard Header Text */}
            <div className="mb-8 mt-4">
                <h1 className="text-3xl font-bold text-emerald-50 tracking-tight">
                    Creator Analytics Dashboard
                </h1>
                <p className="text-emerald-100/60 mt-2 text-sm">
                    Real-time usage statistics and performance insights.
                </p>
            </div>

            {/* Stats Cards Section */}
            <StatsCard
                totalPrompt={totalPrompt}
                totalCopies={totalCopies}
                totalBookmarks={totalBookmarks}
            />

            {/* Growth Metrics Chart Section */}
            <div className="mt-8">
                <GrowthChart
                    totalPrompt={totalPrompt}
                    totalCopies={totalCopies}
                    totalBookmarks={totalBookmarks}
                />
            </div>
        </div>
    );
};

export default CreatorHomepage;