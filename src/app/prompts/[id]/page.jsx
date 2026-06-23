import PromptDetailsClient from "@/components/promt-details/PromptDetailsClient";
import { getPromptById } from "@/lib/api/prompts";


const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    console.log("Prompt id :", id);

    // API থেকে সিগেল প্রম্পট ডেটা ফেচ করা
    const promptDetails = await getPromptById(id);

    // যদি কোনো কারণে ডেটা না আসে
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
                {/* ক্লায়েন্ট কম্পোনেন্টে ডেটা পাস করা হলো */}
                <PromptDetailsClient prompt={promptDetails} />
            </div>
        </main>
    );
};

export default PromptDetailsPage;