import Banner from "@/components/homepage/Banner";
import CustomerReviews from "@/components/homepage/CustomerReviews";
import FeaturedPrompts from "@/components/homepage/Featured-Promt/FeaturedPrompts";
import GeminiPromptPreview from "@/components/homepage/GeminiPromptPreview";
import SupportedAITools from "@/components/homepage/SupportedAITools";
import TopCreators from "@/components/homepage/TopCreators";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { getLimitReviews } from "@/lib/api/prompt-review-public";
import { topCreators } from "@/lib/api/top-creators";

export default async function Home() {

  const creators = await topCreators()
  const reviews = await getLimitReviews()

  return (
    <div className="min-h-screen">
      <Banner />
      <FeaturedPrompts />
      <GeminiPromptPreview />
      <WhyChooseUs />
      <SupportedAITools />
      <TopCreators creators={creators} />
      <CustomerReviews reviews={reviews} />
    </div>
  );
}
