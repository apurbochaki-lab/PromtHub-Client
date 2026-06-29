import AdminUsersTable from "@/components/dashboard/admin-dashboard/AdminUsersTable";
import { getUsersList } from "@/lib/api/admin/server";

const AllUsersPage = async () => {

    const data = await getUsersList()
    const users = data?.users
    console.log(users)

    return (
        <div className="min-h-screen bg-[#121f18] p-8 text-slate-200">
            <div className="max-w-7xl mx-auto space-y-4">
                <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                    User Management ({users.length})
                </h2>

                <AdminUsersTable users={users} />
            </div>
        </div>
    );
};

export default AllUsersPage;