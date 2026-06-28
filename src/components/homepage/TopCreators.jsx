'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Box, Files } from '@gravity-ui/icons';
import Image from 'next/image';

const TopCreators = ({ creators }) => {

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

    // Cycle through these styles to keep the UI colorful
    const badgeStyles = [
        { color: "text-[#a06cd5]", bg: "bg-[#a06cd5]/20" },
        { color: "text-[#72b01d]", bg: "bg-[#72b01d]/20" },
        { color: "text-cyan-400", bg: "bg-cyan-400/20" }
    ];

    // Image list provided by you
    const creatorImages = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVBS3eEdZ_DIxxq5A9-ZOzGiE-1YMCEFCfowEqgn1dDlXhs_8RlOEpvo&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoxIinmgCoGv4EayTvZdmYI3Uc_XtcVZqfdPQrax-Y3_BLWF5KdjJAsc&s=10",
        "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/669726e7b6388b54f9aa2769_66553f0390479b8e5a3fc524_image_CMEex1C1_1716770910814_raw.jpeg"
    ];

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
                    {/* Checking if creators array exists and mapping through real data */}
                    {creators && creators.map((creator, index) => {
                        // Dynamically assign badge colors
                        const badge = badgeStyles[index % badgeStyles.length];

                        // Dynamically assign image from your list based on index. Fallback to index 0 if out of bounds.
                        const finalImageUrl = creatorImages[index % creatorImages.length];

                        return (
                            <motion.div
                                key={creator.creatorId}
                                variants={cardVariants}
                                className="group relative bg-[#102b3f]/60 backdrop-blur-xl border border-[#6247aa]/50 hover:border-[#a06cd5]/70 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(160,108,213,0.15)] flex flex-col"
                            >
                                {/* Top Star Badge */}
                                <div className={`absolute top-5 right-5 w-8 h-8 rounded-full ${badge.bg} flex items-center justify-center shadow-inner`}>
                                    <Star className={badge.color} size={14} />
                                </div>

                                {/* Profile Info Section */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16 rounded-full border-2 border-[#6247aa] group-hover:border-[#a06cd5] p-[2px] transition-colors duration-300 bg-[#0b1a1f]">
                                        <Image
                                            src={finalImageUrl}
                                            alt={creator.creatorName}
                                            width={100}
                                            height={100}
                                            className="w-full h-full rounded-full object-cover"
                                            unoptimized // Helps with external domains if not added in next.config.js
                                        />
                                        {/* Active/Online indicator */}
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#72b01d] border-2 border-[#102b3f] rounded-full"></span>
                                    </div>

                                    <div className="overflow-hidden">
                                        <h3 className="text-xl font-bold text-[#ffffff] group-hover:text-[#e2cfea] transition-colors duration-300 truncate">
                                            {creator.creatorName}
                                        </h3>
                                        <p className="text-[#a06cd5] text-sm font-medium truncate">
                                            {creator.creatorEmail}
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-[#4e148c]/30 mb-5" />

                                {/* Stats Section */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#062726] flex items-center justify-center border border-[#6247aa]/20">
                                            <Box className="text-[#e2cfea]/80" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-[#ffffff]">{creator.totalPromptCount}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-[#e2cfea]/50 font-semibold">Prompts</p>
                                        </div>
                                    </div>

                                    <div className="h-10 w-px bg-[#4e148c]/40"></div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#062726] flex items-center justify-center border border-[#6247aa]/20">
                                            <Files className="text-[#e2cfea]/80" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-[#ffffff]">{creator.totalCopyCount}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-[#e2cfea]/50 font-semibold">Copies</p>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
};

export default TopCreators;