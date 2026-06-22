'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, QuoteOpen } from '@gravity-ui/icons';
import Image from 'next/image';

const CustomerReviews = () => {
    // Fake Review Data structured from Screenshot_839.png
    const reviewsData = [
        {
            _id: "1",
            name: "Sarah Connor",
            role: "Content Strategist",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
            rating: 5,
            comment: "PromptHub completely changed how I interact with Claude. The prompts are highly refined and save me hours every day. Absolute lifesaver for content creators!"
        },
        {
            _id: "2",
            name: "Alex Rivera",
            role: "Software Engineer",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
            rating: 5,
            comment: "I found an incredible prompt that debugs React code and writes unit tests in seconds. Simply amazing! The quality control on this platform is top-notch."
        },
        {
            _id: "3",
            name: "Elena Rostova",
            role: "Digital Artist",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
            rating: 5,
            comment: "The Midjourney prompts here are pure gold. The parameters and keywords are so detailed. Highly recommend for any serious digital artist or designer."
        }
    ];

    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative w-full py-24 bg-[#000000] overflow-hidden pb-50">

            {/* Dark Premium Gradient Mesh Overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-[#102b3f]/60 via-[#4e148c]/20 to-transparent rounded-full filter blur-[160px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-[#062726]/70 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#ffffff] tracking-tight mb-4"
                    >
                        Loved by <span className="bg-gradient-to-r from-[#a06cd5] to-[#72b01d] bg-clip-text text-transparent">Creators Worldwide</span>
                    </motion.h2>
                    <p className="text-lg text-[#e2cfea]/60 font-medium">
                        Don't just take our word for it. Here is what our community members have to say about their productivity boost.
                    </p>
                </div>

                {/* Reviews Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                >
                    {reviewsData.map((review) => (
                        <motion.div
                            key={review._id}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative bg-gradient-to-b from-[#102b3f]/40 to-[#000000]/90 backdrop-blur-xl border border-[#6247aa]/40 hover:border-[#a06cd5]/60 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(160,108,213,0.1)]"
                        >
                            {/* Decorative Big Quote Icon in Background */}
                            <div className="absolute top-6 right-8 text-[#6247aa]/30 group-hover:text-[#a06cd5]/50 transition-colors duration-300 pointer-events-none">
                                <QuoteOpen size={48} />
                            </div>

                            <div>
                                {/* Rating Stars (Dynamic Loop based on rating count) */}
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className="text-[#72b01d] fill-[#72b01d]" // Eye-catchy Lime Green stars from palette
                                        />
                                    ))}
                                </div>

                                {/* Review Comment */}
                                <p className="text-[#e2cfea]/90 text-base italic leading-relaxed mb-8 relative z-10 font-medium">
                                    &quot;{review.comment}&quot;
                                </p>
                            </div>

                            {/* User Profile Footer */}
                            <div className="flex items-center gap-4 border-t border-[#6247aa]/20 pt-6 mt-auto">
                                <div className="relative w-12 h-12 rounded-full border border-[#a06cd5]/40 overflow-hidden">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-[#ffffff] tracking-wide">
                                        {review.name}
                                    </h4>
                                    <p className="text-[#a06cd5] text-xs font-semibold tracking-wider uppercase mt-0.5">
                                        {review.role}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default CustomerReviews;