import Banner from "@/components/homepage/Banner";
import CustomerReviews from "@/components/homepage/CustomerReviews";
import FeaturedPrompts from "@/components/homepage/Featured-Promt/FeaturedPrompts";
import GeminiPromptPreview from "@/components/homepage/GeminiPromptPreview";
import SupportedAITools from "@/components/homepage/SupportedAITools";
import TopCreators from "@/components/homepage/TopCreators";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <FeaturedPrompts />
      <GeminiPromptPreview />
      <WhyChooseUs />
      <SupportedAITools />
      <TopCreators />
      <CustomerReviews />
    </div>
  );
}
