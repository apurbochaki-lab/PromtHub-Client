import PromptDetailsClient from "@/components/promt-details/PromptDetailsClient";
import { getRecentReviews } from "@/lib/api/details-page";
import { getPromptById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { ArrowLeft, Lock } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    // console.log("Prompt id :", id);

    const currentSessionUser = await getUserSession();
    const userId = currentSessionUser?.id;
    const promptDetails = await getPromptById(id, userId);

    // Recent reviews
    const recentReviews = await getRecentReviews(id);

    if (!promptDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#e2cfea] bg-[#062726]">
                <h2 className="text-2xl font-bold">Prompt not found!</h2>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#062726] to-[#102b3f] py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <PromptDetailsClient
                    prompt={promptDetails}
                    currentSessionUser={currentSessionUser}
                    recentReviews={recentReviews}
                />
            </div>
        </main>
    );
};

export default PromptDetailsPage;