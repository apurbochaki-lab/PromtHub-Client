// File: components/dashboard/DashboardSidebar.jsx
import { getUserSession } from "@/lib/core/session";
import SidebarClient from "./SidebarClient";


export default async function DashboardSidebar() {
    const user = await getUserSession();
    const role = user?.role || "user"; // যদি রোল না থাকে, ডিফল্ট "user"

    return <SidebarClient role={role} />;
}