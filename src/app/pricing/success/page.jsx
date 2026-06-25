import { makePayment } from '@/lib/actions/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Check, CrownDiamond, Hashtag, Calendar } from '@gravity-ui/icons'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    // 1. Stripe থেকে সেশন ডেটা রিট্রিভ করা হচ্ছে (আপনার লজিক)
    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        // 2. পেমেন্ট ডেটা প্রসেস করা হচ্ছে (আপনার লজিক)
        const paymentData = {
            ...metadata,
            session_id,
            amount: 5
        }

        await makePayment(paymentData)

        // পেমেন্টের সময় দেখানোর জন্য কারেন্ট ডেট/টাইম নেওয়া হলো
        const paymentDate = new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })

        // 3. নতুন ডিজাইন করা Success UI (Logic অপরিবর্তিত)
        return (
            <div className="min-h-screen w-full bg-[#000000] flex items-center justify-center p-6 relative overflow-hidden pt-10 pb-30">

                {/* Background soft glow for eye comfort */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#72b01d] blur-[200px] opacity-10 pointer-events-none rounded-full" />

                <div className="w-full max-w-lg z-10 animate-in fade-in zoom-in duration-500 ease-out">
                    <div className="bg-[#020a07]/90 backdrop-blur-xl border border-[#72b01d]/30 rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#72b01d]/5 relative overflow-hidden text-center">

                        {/* Top Accent Line */}
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#72b01d] to-transparent opacity-80" />

                        {/* Success Icon */}
                        <div className="mx-auto w-20 h-20 bg-[#044a2b]/30 border-2 border-[#72b01d]/50 rounded-full flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 bg-[#72b01d] blur-lg opacity-20 rounded-full animate-pulse" />
                            <Check size={40} className="text-[#72b01d]" />
                        </div>

                        {/* Headings */}
                        <h1 className="text-3xl font-extrabold text-[#ffffff] mb-2 tracking-tight">
                            Payment Successful!
                        </h1>

                        {/* Pro Badge & Congratulation Message */}
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mt-2 mb-6 rounded-xl bg-[#72b01d]/10 border border-[#72b01d]/20 text-[#72b01d]">
                            <CrownDiamond size={18} />
                            <span className="text-sm font-bold tracking-wide uppercase">
                                You are now a Pro User
                            </span>
                        </div>

                        <p className="text-[#8fbc8f] text-sm leading-relaxed mb-8 px-4">
                            Congratulations! Your payment has been processed successfully. You now have
                            <span className="text-[#ffffff] font-semibold"> lifetime access </span>
                            to all premium prompt features and services.
                        </p>

                        {/* Transaction Details (Receipt Style) */}
                        <div className="bg-[#000000]/50 border border-[#72b01d]/10 rounded-2xl p-5 mb-8 text-left space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-[#72b01d]/10">
                                <span className="text-[#8fbc8f] text-sm">Amount Paid</span>
                                <span className="text-[#ffffff] text-lg font-bold">${paymentData.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-2 text-[#8fbc8f]">
                                    <Hashtag size={14} className="text-[#72b01d]/70" />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Transaction ID</span>
                                </div>
                                <span className="text-[#e2cfea] text-xs font-mono truncate max-w-[150px]" title={session_id}>
                                    {session_id}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-2 text-[#8fbc8f]">
                                    <Calendar size={14} className="text-[#72b01d]/70" />
                                    <span className="text-xs uppercase tracking-wider font-semibold">Payment Time</span>
                                </div>
                                <span className="text-[#e2cfea] text-xs">
                                    {paymentDate}
                                </span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center w-full bg-[#72b01d] hover:bg-[#95d542] text-[#000000] font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(114,176,29,0.2)] hover:shadow-[0_0_30px_rgba(149,213,66,0.4)] transform hover:-translate-y-0.5"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}