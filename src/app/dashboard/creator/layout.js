import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

const AdminLayout = async ({ children }) => {
    const user = await getUserSession();

    if (!user) {
        redirect("/auth/login");
    }

    if (user.role !== "creator") {
        redirect("/error/unauthorized");
    }

    return (
        <div className="admin-dashboard-layout">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;