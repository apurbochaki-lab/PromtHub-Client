'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Check } from '@gravity-ui/icons';
import Image from 'next/image';
import toast from 'react-hot-toast';

const GeminiPromptPreview = () => {
    const [copied, setCopied] = useState(false);

    const promptText = "A futuristic cybernetic forest with bioluminescent plants, cinematic lighting, 8k resolution, hyper-detailed, Unreal Engine 5 render, deep emerald and neon green color palette.";

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        toast.success("Prompt copied")
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative w-full py-24 bg-[#102b3f] overflow-hidden">

            {/* Theme-matched Glowing Background Effects */}
            <div className="absolute top-[20%] left-[-10%] w-[30vw] h-[30vw] bg-[#6247aa] rounded-full mix-blend-screen filter blur-[150px] opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-[#062726] rounded-full mix-blend-screen filter blur-[150px] opacity-50"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffffff] mb-4">
                        Prompt to <span className="bg-gradient-to-r from-[#a06cd5] to-[#72b01d] bg-clip-text text-transparent">Visual Magic</span>
                    </h2>
                    <p className="text-[#e2cfea]/80 text-lg">
                        Generated with <span className="text-[#a06cd5] font-bold">Google Gemini</span>. Copy the prompt and create your own art.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Code/Prompt Preview Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#062726]/40 backdrop-blur-xl border border-[#6247aa]/40 rounded-2xl p-6 relative group shadow-[0_0_30px_rgba(160,108,213,0.1)]"
                    >
                        {/* Fake Code Window Header */}
                        <div className="flex items-center gap-2 mb-4 border-b border-[#a06cd5]/20 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-[#72b01d]/60"></div>
                            <span className="ml-2 text-xs text-[#19b12d] font-mono">gemini_prompt.txt</span>
                        </div>

                        {/* Prompt Content */}
                        <pre className="text-[#e2cfea] font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {promptText}
                        </pre>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="absolute top-6 right-6 p-2 rounded-lg bg-[#a06cd5]/10 hover:bg-[#a06cd5]/25 border border-[#a06cd5]/30 transition-all text-[#19b12d] hover:scale-105"
                        >
                            {copied ? <Check size={20} /> : <Paperclip size={20} />}
                        </button>
                    </motion.div>

                    {/* Right Side: Result Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden border border-[#6247aa]/30 group shadow-[0_0_25px_rgba(6,39,38,0.5)]"
                    >
                        {/* Purple-ish hover tint to match theme */}
                        <div className="absolute inset-0 bg-[#a06cd5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                        <Image
                            src="/gemini-gen-1.png"
                            alt="Gemini AI Generated Art"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-0"
                        />
                        {/* Shine overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102b3f]/90 via-[#102b3f]/30 to-transparent z-10"></div>

                        <div className="absolute bottom-6 left-6 z-20">
                            <p className="text-[#ffffff] font-bold text-lg">AI Generated Result</p>
                            <p className="text-[#72b01d] text-sm font-medium mt-1">Created with Gemini Pro</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default GeminiPromptPreview;