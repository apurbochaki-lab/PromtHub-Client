import { getMyPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";

const MyPromptsPage = async() => {

    const user = await getUserSession()
    const creatorId = user?.id || null;
    
    const myPrompts = await getMyPrompts(creatorId);
    console.log(myPrompts)

    return (
        <div>
            <h2>My prompts page</h2>
        </div>
    );
};

export default MyPromptsPage;