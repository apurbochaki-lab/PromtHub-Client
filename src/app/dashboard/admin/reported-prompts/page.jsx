import { getReports } from "@/lib/api/admin/reports";
import ReportCard from "./ReportCard";

const ReportedPromptPage = async () => {
    const reports = await getReports();

    return (
        <section className="space-y-8 container mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Reported Prompts
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Review reported prompts, inspect complaints, warn creators or remove
                    harmful content.
                </p>
            </div>

            <ReportCard reports={reports} />
        </section>
    );
};

export default ReportedPromptPage;