'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Picture, Terminal, PlanetEarth, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

const SupportedAITools = () => {
    // Data for Supported AI Platforms (Kept intact as they match our theme seamlessly)
    const aiTools = [
        {
            name: "ChatGPT",
            description: "Master logic, writing, and problem-solving with advanced GPT-4 prompt frameworks.",
            icon: Cpu,
            glowColor: "group-hover:shadow-[0_0_40px_rgba(114,176,29,0.25)]",
            borderColor: "group-hover:border-[#72b01d]",
            iconColor: "text-[#72b01d]", // Lime Green
            bgHover: "group-hover:bg-[#72b01d]/5"
        },
        {
            name: "Midjourney",
            description: "Unlock photorealistic art and design with hyper-detailed parameter combinations.",
            icon: Picture,
            glowColor: "group-hover:shadow-[0_0_40px_rgba(160,108,213,0.25)]",
            borderColor: "group-hover:border-[#a06cd5]",
            iconColor: "text-[#a06cd5]", // Light Purple
            bgHover: "group-hover:bg-[#a06cd5]/5"
        },
        {
            name: "Claude AI",
            description: "Perfect for massive context windows, deep coding analysis, and creative writing.",
            icon: Terminal,
            glowColor: "group-hover:shadow-[0_0_40px_rgba(226,207,234,0.2)]",
            borderColor: "group-hover:border-[#e2cfea]",
            iconColor: "text-[#e2cfea]", // Off White/Pinkish
            bgHover: "group-hover:bg-[#e2cfea]/5"
        },
        {
            name: "Google Gemini",
            description: "Leverage multimodal capabilities combining text, image, and data processing.",
            icon: PlanetEarth,
            glowColor: "group-hover:shadow-[0_0_40px_rgba(98,71,170,0.3)]",
            borderColor: "group-hover:border-[#6247aa]",
            iconColor: "text-[#6247aa]", // Deep Purple
            bgHover: "group-hover:bg-[#6247aa]/5"
        }
    ];

    // Framer Motion Variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative w-full py-24 bg-[#0d2334] border-t border-[#6247aa]/20 overflow-hidden">

            {/* Subtle Grid Background Pattern - Adjusted color code to match branding */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#6247aa08_1px,transparent_1px),linear-gradient(to_bottom,#6247aa08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 px-4 py-1.5 rounded-full border border-[#a06cd5]/30 bg-[#102b3f]/60 backdrop-blur-md"
                    >
                        <span className="text-sm font-bold text-[#e2cfea] uppercase tracking-widest">
                            One Platform. All Models.
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#ffffff] tracking-tight mb-6"
                    >
                        Supercharge Your <span className="bg-gradient-to-r from-[#a06cd5] to-[#e2cfea] bg-clip-text text-transparent italic">AI Arsenal</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-[#e2cfea]/70 font-medium max-w-2xl"
                    >
                        Stop switching between tabs. Find battle-tested, ready-to-use prompts for the world's most powerful AI engines, all in one place.
                    </motion.p>
                </div>

                {/* AI Tools Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
                >
                    {aiTools.map((tool, index) => {
                        const IconComponent = tool.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`group relative bg-[#102b3f]/40 backdrop-blur-md border border-[#6247aa]/40 hover:border-[#6247aa] rounded-3xl p-8 transition-all duration-500 cursor-pointer overflow-hidden ${tool.borderColor} ${tool.glowColor} ${tool.bgHover}`}
                            >
                                {/* Floating Background Icon Effect */}
                                <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                                    <IconComponent size={120} className={tool.iconColor} />
                                </div>

                                {/* Main Icon Container with Glassmorphism */}
                                <div className="w-14 h-14 rounded-2xl bg-[#062726]/60 border border-[#a06cd5]/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 shadow-lg">
                                    <IconComponent className={tool.iconColor} size={28} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-[#ffffff] mb-3 group-hover:text-[#e2cfea] transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-[#e2cfea]/70 text-sm leading-relaxed font-medium mb-6">
                                    {tool.description}
                                </p>

                                {/* Action Link */}
                                <Link href="/all-prompts" className={`inline-flex items-center gap-2 text-sm font-bold ${tool.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    Explore Prompts <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <Link href="/all-prompts" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#6247aa] via-[#4e148c] to-[#a06cd5] border border-[#a06cd5]/40 rounded-full shadow-[0_0_20px_rgba(160,108,213,0.2)] hover:shadow-[0_0_35px_rgba(160,108,213,0.4)] hover:-translate-y-1">
                        Browse 10,000+ Premium Prompts
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default SupportedAITools;