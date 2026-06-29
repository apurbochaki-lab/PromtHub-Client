'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Magnifier, Sparkles, Compass, Flame } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import Link from 'next/link';

const Banner = () => {
    // Randomly static trending tags
    const trendingTags = [
        "#ChatGPT", "#Midjourney", "#Gemini", "#Claude", "#Marketing", "#WebDev"
    ];

    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#102b3f] pt-10 pb-20">

            {/* Blurry Glowing Background Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#6247aa] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-[#a06cd5] rounded-full mix-blend-screen filter blur-[150px] opacity-30"></div>
            <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[30vw] h-[30vw] bg-[#062726] rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center w-full"
                >
                    {/* Top Badge */}
                    <motion.div variants={itemVariants} className="mb-2">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a06cd5]/60 bg-[#4e148c]/20 text-[#e2cfea] text-sm font-medium backdrop-blur-md">
                            <Sparkles size={16} className="text-[#a06cd5]" />
                            The #1 AI Prompt Marketplace
                        </span>
                    </motion.div>

                    {/* Engaging Heading with Gradient Text */}
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-[#ffffff] leading-tight">
                        Supercharge Your Workflow with <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-[#a06cd5] via-[#e2cfea] to-[#72b01d] bg-clip-text text-transparent">
                            Top-Tier AI Prompts
                        </span>
                    </motion.h1>

                    {/* Short Description */}
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#e2cfea]/80 max-w-2xl mb-10 font-medium">
                        Discover, share, and manage premium prompts for ChatGPT, Gemini, Midjourney, and more. Elevate your AI game and boost your productivity today.
                    </motion.p>

                    {/* Big Search Bar */}
                    <motion.div variants={itemVariants} className="w-full max-w-3xl mb-8">
                        <div className="flex items-center w-full bg-[#062726]/60 backdrop-blur-xl border-2 border-[#6247aa]/40 rounded-full p-2 transition-all duration-300 focus-within:border-[#a06cd5] focus-within:shadow-[0_0_25px_rgba(160,108,213,0.3)]">
                            <div className="pl-4 pr-2 text-[#a06cd5]">
                                <Magnifier size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for 'marketing strategy', 'web design'..."
                                className="flex-1 bg-transparent text-[#ffffff] placeholder-[#e2cfea]/50 border-none outline-none text-lg px-2"
                            />
                            <Link href={"/prompts"}>
                                <Button
                                    size="lg"
                                    className="bg-[#a06cd5] hover:bg-[#6247aa] text-white font-bold rounded-full px-8 transition-transform duration-300 hover:scale-105"
                                >
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Trending Tags */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-10">
                        <span className="text-[#e2cfea]/70 text-sm font-semibold flex items-center gap-1 mr-2">
                            <Flame size={16} className="text-[#72b01d]" /> Trending:
                        </span>
                        {trendingTags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-4 py-1.5 rounded-full border border-[#4e148c] bg-[#102b3f]/50 text-[#e2cfea] text-sm hover:bg-[#a06cd5]/20 hover:border-[#a06cd5] transition-colors duration-300 cursor-pointer backdrop-blur-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* Call To Action (CTA) Buttons */}
                    <motion.div variants={itemVariants} className="">
                        <Link href={"/prompts"}>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-[#72b01d] to-[#4e148c] text-white font-bold rounded-xl px-8 shadow-[0_4px_15px_rgba(114,176,29,0.3)] hover:shadow-[0_6px_20px_rgba(114,176,29,0.5)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <Compass size={20} /> Browse Categories
                            </Button>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>

            {/* Bottom Gradient Fade (To blend smoothly with the next section) */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#102b3f] to-transparent z-10"></div>
        </section>
    );
};

export default Banner;