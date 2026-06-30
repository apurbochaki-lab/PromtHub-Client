
import AllPromptsTable from "@/components/dashboard/admin-dashboard/AllPromptsTable";
import { getAllPrompts } from "@/lib/api/admin/all-users";


const AdminAllPromptsPage = async () => {

    const prompts = await getAllPrompts()
    // console.log(prompts)

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center pb-10">
                <div>
                    <h2 className="text-2xl font-semibold">Prompt Template Submissions Moderation</h2>
                    <p className="text-white/70">Approve templates, reject with feedback, or tag featured highlights.</p>
                </div>
                <h2>Total Prompt : {prompts.length} </h2>
            </div>

            <AllPromptsTable prompts={prompts} />
        </div>
    );
};

export default AdminAllPromptsPage;