import PromptCard from "@/components/Common/PromptCard";
import { serverFetch } from "@/lib/core/server";


const FeaturedPrompts = async () => {
    // API থেকে ৬টি ডেটা ফেচ করা হচ্ছে
    const prompts = await serverFetch('/api/prompts/featured') || [];

    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">

            {/* Heading Section */}
            <div className="flex flex-col items-center text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffffff] mb-4 tracking-tight">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a06cd5] to-[#72b01d]">Prompts</span>
                </h2>
                <p className="text-[#e2cfea] max-w-2xl text-sm md:text-base">
                    Explore the most powerful, highly-rated AI prompts crafted by top professionals to boost your productivity.
                </p>
            </div>

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {prompts?.map((prompt) => (
                    <PromptCard
                        key={prompt._id.$oid || prompt._id}
                        prompt={prompt}
                    />
                ))}
            </div>

        </section>
    );
};

export default FeaturedPrompts;