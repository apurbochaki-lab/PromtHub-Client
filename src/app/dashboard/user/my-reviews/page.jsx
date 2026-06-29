import MyReviewsTable from "@/components/dashboard/user-components/MyReviewsTable";
import { getMyReviews } from "@/lib/api/my-reviews";
import { getUserSession } from "@/lib/core/session";


const MyReviewsPage = async () => {
    const user = await getUserSession();
    const myReviews = await getMyReviews(user?.id);

    return (
        <section className="space-y-8 p-8">
            <div>
                <h1 className="text-4xl font-bold text-white">
                    My Reviews
                </h1>

                <p className="mt-2 text-zinc-400">
                    View and manage every review you&apos;ve submitted on PromptHub.
                </p>
            </div>

            {!myReviews || myReviews.length === 0 ?
                (<div className="flex flex-col items-center justify-center py-24 px-4 bg-[#020604] border border-dashed border-[#72b01d]/30 rounded-2xl">
                    <div className="h-16 w-16 mb-4 rounded-full bg-[#72b01d]/10 flex items-center justify-center">
                        <span className="text-[#95d542] text-2xl">🔖</span>
                    </div>
                    <h3 className="text-white text-lg font-medium mb-1">No Reviews Found</h3>
                    <p className="text-[#8fbc8f] text-sm text-center">
                        You haven&apos;t give any reviews yet. Explore and give your review!
                    </p>
                </div>) : (<MyReviewsTable reviews={myReviews} />)
            }



        </section>
    );
};

export default MyReviewsPage;