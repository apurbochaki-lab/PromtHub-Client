import AiToolsPieChart from "@/components/dashboard/admin-dashboard/AiToolsPieChart";
import AnalyticsCards from "@/components/dashboard/admin-dashboard/AnalyticsCards";
import { getAdminAnalytics, getAiToolCount } from "@/lib/api/admin/analytics";


const AdminAnalyticsPage = async () => {
    const data = await getAdminAnalytics();
    const analytics = data?.data;

    // Data for pie chart
    const tools = await getAiToolCount();

    return (
        <div className="space-y-8 container mx-auto pb-10 p-8">
            <div>
                <h1 className="text-3xl font-bold">Administrative Analytics</h1>
                <p className="text-default-500 mt-2">
                    Complete overview of your platform performance.
                </p>
            </div>

            <AnalyticsCards analytics={analytics} />

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Ekhane tools variable theke exact array ta pass korba. 
                    Jodi API response theke nested thake tahole tools.data evabe diba, 
                    kintu tomar console log onujayi directly tools dilei hobe */}
                <AiToolsPieChart data={tools} />

                {/* Baki onno kono chart ba empty div rakhte paro design maintain korar jonno */}
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;