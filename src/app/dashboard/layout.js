import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getUserSession } from "@/lib/core/session";
import { CrownDiamond, Diamond, House } from "@gravity-ui/icons";

export const DashboardLayout = async ({ children }) => {

    const user = await getUserSession();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#000000] text-white selection:bg-[#72b01d]/30">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-0">

                {/* Background Blurry Glow for OLED effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#72b01d] rounded-full mix-blend-screen filter blur-[250px] opacity-10 pointer-events-none z-[-1]"></div>

                {/* Top Header - Fixed Overlap with pl-16 on mobile */}
                <header className="h-16 bg-[#020a07]/80 backdrop-blur-xl border-b border-[#72b01d]/20 flex items-center justify-between pr-6 pl-16 md:px-6 shrink-0 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    <h1 className="font-bold text-sm lg:text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a1bfa1] pl-10 md:pl-0">
                        Welcome to Dashboard
                    </h1>
                    {user?.plan === "pro" && <span className="flex items-center gap-2  text-yellow-300 font-semibold">
                        <CrownDiamond /> Premium
                    </span>}
                </header>

                {/* Actual Page Content */}
                <main className="flex-1 p-0 overflow-y-auto bg-transparent relative z-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;