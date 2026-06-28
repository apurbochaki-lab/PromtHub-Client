import MyReviewsTable from "@/components/dashboard/user-components/MyReviewsTable";
import { getMyReviews } from "@/lib/api/my-reviews";
import { getUserSession } from "@/lib/core/session";


const MyReviewsPage = async () => {
    const user = await getUserSession();
    const myReviews = await getMyReviews(user?.id);

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">
                    My Reviews
                </h1>

                <p className="mt-2 text-zinc-400">
                    View and manage every review you&apos;ve submitted on PromptHub.
                </p>
            </div>

            <MyReviewsTable reviews={myReviews} />
        </section>
    );
};

export default MyReviewsPage;