'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Lock, ChartLine, Star } from '@gravity-ui/icons';

const WhyChooseUs = () => {
    // Platform Benefits Data with individual vibrant accent colors
    const benefits = [
        {
            title: "Battle-Tested Quality",
            description: "Every prompt goes through strict admin moderation. No spam, no broken tokens—only high-engineered prompts that deliver perfect results.",
            icon: Shield,
            iconColor: "text-[#72b01d]", // Lime Green
            bgColor: "bg-[#72b01d]/10",
            borderColor: "group-hover:border-[#72b01d]/50",
            glowColor: "hover:shadow-[0_0_30px_rgba(114,176,29,0.15)]"
        },
        {
            title: "Multi-Model Support",
            description: "A unified ecosystem for Midjourney, ChatGPT, Claude, Gemini, and more. Switch models seamlessly without leaving the platform.",
            icon: Layers,
            iconColor: "text-[#a06cd5]", // Light Purple
            bgColor: "bg-[#a06cd5]/10",
            borderColor: "group-hover:border-[#a06cd5]/50",
            glowColor: "hover:shadow-[0_0_30px_rgba(160,108,213,0.15)]"
        },
        {
            title: "Secure Marketplace",
            description: "Built-in anti-copy mechanisms for premium creators and safe, instantaneous 1-time payments powered securely by Stripe.",
            icon: Lock,
            iconColor: "text-cyan-400", // Electric Cyan (Eye catchy contrast)
            bgColor: "bg-cyan-400/10",
            borderColor: "group-hover:border-cyan-400/50",
            glowColor: "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        },
        {
            title: "Granular Analytics",
            description: "Track your prompt performance with beautiful interactive Recharts. Monitor your copies, bookmarks, and revenue growth in real-time.",
            icon: ChartLine,
            iconColor: "text-amber-400", // Neon Amber/Gold
            bgColor: "bg-amber-400/10",
            borderColor: "group-hover:border-amber-400/50",
            glowColor: "hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
        }
    ];

    // Animation Variants for Scroll Trigger
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative w-full py-24 bg-[#102b3f] overflow-hidden">

            {/* Blurry Background Accent to maintain the theme consistency */}
            <div className="absolute top-[50%] left-[-10%] w-[30vw] h-[30vw] bg-[#062726] rounded-full filter blur-[120px] opacity-80 z-0"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[25vw] h-[25vw] bg-[#6247aa]/20 rounded-full filter blur-[130px] opacity-40 z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062726] border border-[#6247aa]/40 text-[#a06cd5] text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        <Star size={12} className="text-[#72b01d]" /> Why PromptHub
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
                    >
                        Built for Next-Gen <span className="bg-gradient-to-r from-[#e2cfea] to-[#a06cd5] bg-clip-text text-transparent">AI Creators & Users</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-[#e2cfea]/70 font-medium"
                    >
                        We bridge the gap between complex AI engineering and everyday productivity. Here is why our platform stands out.
                    </motion.p>
                </div>

                {/* Benefits Equal Size Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
                >
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className={`group h-full bg-[#062726]/40 backdrop-blur-md border border-[#6247aa]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col items-start ${benefit.borderColor} ${benefit.glowColor} hover:-translate-y-1.5 cursor-default`}
                            >
                                {/* Icon Wrapper with dynamic background tint */}
                                <div className={`w-12 h-12 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                                    <IconComponent className={`${benefit.iconColor}`} size={22} />
                                </div>

                                {/* Benefit Title */}
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-[#e2cfea] transition-colors duration-200">
                                    {benefit.title}
                                </h3>

                                {/* Benefit Description */}
                                <p className="text-[#e2cfea]/70 text-sm leading-relaxed font-medium">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
};

export default WhyChooseUs;