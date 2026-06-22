'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Box, Files, ArrowUpRight } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';

const TopCreators = () => {
    // Fake Array of Objects for Top Creators
    const creatorsData = [
        {
            _id: "1",
            name: "PromptMaster",
            role: "Senior AI Engineer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            prompts: 42,
            copies: 1240,
            badgeColor: "text-[#a06cd5]",
            badgeBg: "bg-[#a06cd5]/20"
        },
        {
            _id: "2",
            name: "CreativeAI",
            role: "Art Director",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            prompts: 28,
            copies: 980,
            badgeColor: "text-[#72b01d]", // Lime Green for variety
            badgeBg: "bg-[#72b01d]/20"
        },
        {
            _id: "3",
            name: "GeminiWiz",
            role: "Writer & Marketer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            prompts: 35,
            copies: 850,
            badgeColor: "text-cyan-400", // Cyan for variety
            badgeBg: "bg-cyan-400/20"
        }
    ];

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="relative w-full py-24 bg-[#062726] overflow-hidden">

            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-[10%] w-[40vw] h-[40vw] bg-[#a06cd5]/10 rounded-full filter blur-[150px] opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-[5%] w-[30vw] h-[30vw] bg-[#102b3f] rounded-full filter blur-[120px] opacity-80 z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffffff] tracking-tight mb-4">
                            Meet Our <span className="text-[#a06cd5]">Top Creators</span>
                        </h2>
                        <p className="text-lg text-[#e2cfea]/70 font-medium">
                            Discover the brilliant minds behind the most popular and highly effective AI prompts on our platform.
                        </p>
                    </motion.div>
                </div>

                {/* Creators Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                >
                    {creatorsData.map((creator) => (
                        <motion.div
                            key={creator._id}
                            variants={cardVariants}
                            className="group relative bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/50 hover:border-[#a06cd5]/70 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(160,108,213,0.15)] flex flex-col"
                        >
                            {/* Top Star Badge (Absolute position inside card) */}
                            <div className={`absolute top-5 right-5 w-8 h-8 rounded-full ${creator.badgeBg} flex items-center justify-center shadow-inner`}>
                                <Star className={creator.badgeColor} size={14} />
                            </div>

                            {/* Profile Info Section (Left Aligned) */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full border-2 border-[#6247aa] group-hover:border-[#a06cd5] p-[2px] transition-colors duration-300">
                                    <Image
                                        src={creator.image}
                                        alt={creator.name}
                                        width={100}
                                        height={100}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    {/* Active/Online indicator */}
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#72b01d] border-2 border-[#102b3f] rounded-full"></span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#ffffff] group-hover:text-[#e2cfea] transition-colors duration-300">
                                        {creator.name}
                                    </h3>
                                    <p className="text-[#a06cd5] text-sm font-medium">
                                        {creator.role}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-[#4e148c]/30 mb-5" />

                            {/* Stats Section (Stylized Data Display) */}
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#062726] flex items-center justify-center border border-[#6247aa]/20">
                                        <Box className="text-[#e2cfea]/80" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#ffffff]">{creator.prompts}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-[#e2cfea]/50 font-semibold">Prompts</p>
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-[#4e148c]/40"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#062726] flex items-center justify-center border border-[#6247aa]/20">
                                        <Files className="text-[#e2cfea]/80" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#ffffff]">{creator.copies}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-[#e2cfea]/50 font-semibold">Copies</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default TopCreators;