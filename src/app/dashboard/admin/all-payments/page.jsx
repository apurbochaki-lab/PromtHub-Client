import PaymentsTableAdmin from "@/components/dashboard/admin-dashboard/PaymentsTableAdmin";
import { getPayments } from "@/lib/api/admin/payment";

const AdminPaymentPage = async () => {
    const payments = await getPayments();

    return (
        <section className="bg-[#09110d]">
            <div className="p-6 min-h-screen space-y-6 container mx-auto">
                {/* Header portion like the screenshot */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Stripe Premium Payments Log</h1>
                    <p className="text-sm text-[#8fbc8f]">Comprehensive database of customer subscription transactions.</p>
                </div>

                {/* Table Component */}
                <div className="pt-4">
                    <PaymentsTableAdmin payments={payments} />
                </div>
            </div>
        </section>
    );
};

export default AdminPaymentPage;