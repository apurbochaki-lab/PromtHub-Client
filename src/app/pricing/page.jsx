import { Card, Button } from "@heroui/react";
import { Check, CrownDiamond, ShieldCheck } from "@gravity-ui/icons";

const PricingPage = () => {
    return (
        <div className="min-h-[85vh] w-full bg-[#000000] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#044a2b]/20 via-[#020a07] to-[#000000] flex flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden mb-30">

            {/* Soft Background Glow for eye comfort */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#72b01d] blur-[300px] opacity-[0.08] pointer-events-none" />

            {/* Page Headers */}
            <div className="text-center z-10 mb-12 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#044a2b]/30 border border-[#72b01d]/20 text-[#8fbc8f] text-xs font-bold uppercase tracking-widest mb-6">
                    <CrownDiamond size={14} className="text-[#72b01d]" />
                    Simple & Transparent Pricing
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffffff] mb-4 tracking-tight">
                    Unlock Limitless <span className="text-[#72b01d]">Creativity</span>
                </h1>
                <p className="text-[#8fbc8f] text-base md:text-lg leading-relaxed">
                    No subscriptions. No hidden fees. Pay once and get lifetime access to all premium features, private templates, and community reviews.
                </p>
            </div>

            {/* Pricing Card */}
            <div className="w-full max-w-md z-10">
                <Card className="bg-[#020a07]/80 backdrop-blur-xl border border-[#72b01d]/20 hover:border-[#72b01d]/50 transition-all duration-500 shadow-2xl shadow-[#72b01d]/5 rounded-3xl overflow-hidden relative">

                    {/* Inner Card Glow highlight */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#72b01d] to-transparent opacity-70" />

                    <Card.Header className="p-8 pb-4 text-center border-b border-[#72b01d]/10">
                        <Card.Title className="text-2xl font-bold text-[#ffffff] mb-2">
                            Pro Lifetime
                        </Card.Title>
                        <Card.Description className="text-[#8fbc8f] text-sm">
                            Everything you need to master AI prompting.
                        </Card.Description>

                        {/* Price Display */}
                        <div className="mt-6 mb-2 flex items-center justify-center gap-1">
                            <span className="text-2xl font-semibold text-[#8fbc8f] translate-y-1">$</span>
                            <span className="text-6xl font-extrabold text-[#ffffff] tracking-tighter">5</span>
                        </div>
                        <p className="text-[#72b01d] text-sm font-semibold tracking-wide">
                            One-time payment
                        </p>
                    </Card.Header>

                    <Card.Content className="p-8">
                        <ul className="space-y-4">
                            {[
                                "Access to all Private Prompts",
                                "Advanced Parameter Sets",
                                "Exclusive Community Reviews",
                                "Priority Customer Support",
                                "Lifetime Free Updates",
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#044a2b]/50 flex items-center justify-center shrink-0 border border-[#72b01d]/30">
                                        <Check size={12} className="text-[#72b01d]" />
                                    </div>
                                    <span className="text-[#e2cfea] md:text-sm text-base leading-snug">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card.Content>

                    <Card.Footer className="p-8 pt-0 flex flex-col gap-4">
                        <form action="/api/payment-getway" method="POST">
                            <Button type="submit"
                                className="w-full h-14 bg-[#72b01d] hover:bg-[#95d542] text-[#000000] font-bold text-base rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(114,176,29,0.2)] hover:shadow-[0_0_30px_rgba(149,213,66,0.4)] hover:-translate-y-0.5">
                                Get Lifetime Access
                            </Button>
                        </form>
                        <div className="flex justify-center items-center gap-1.5 text-[#8fbc8f] text-xs">
                            <ShieldCheck size={14} />
                            <span>Secure, one-click checkout via Stripe</span>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

        </div>
    );
};

export default PricingPage;