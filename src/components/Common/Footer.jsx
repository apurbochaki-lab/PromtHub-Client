'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from '@gravity-ui/icons';
import { usePathname } from 'next/navigation';

const Footer = () => {
    // Current Year for Copyright
    const currentYear = new Date().getFullYear();

    const pathName = usePathname()
    if (pathName.includes('dashboard')) {
        return null;
    }

    return (
        <footer className="relative w-full pt-20 pb-8 bg-[#020b0a] border-t border-[#062726] overflow-hidden">

            {/* Subtle Top Glow Effect (Greenish) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[80px] bg-[#062726] filter blur-[100px] opacity-60 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Brand Info */}
                    {/* Mobiles: centered alignment | Desktops: left alignment */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <Sparkles size={28} className="text-[#72b01d] group-hover:text-[#a06cd5] transition-colors duration-300" />
                            <span className="text-2xl font-extrabold text-[#ffffff] tracking-wide">
                                Prompt<span className="bg-gradient-to-r from-[#72b01d] to-[#a06cd5] bg-clip-text text-transparent ml-1">Hub</span>
                            </span>
                        </Link>
                        {/* Mobiles: text-base (16px) | Desktops: text-sm (14px) */}
                        <p className="text-[#e2cfea]/60 text-base md:text-sm leading-relaxed mb-6 md:pe-8">
                            Your ultimate destination for discovering, sharing, and mastering AI prompts. Elevate your creative and coding workflows with the community's best resources.
                        </p>
                        <div className="mt-auto">
                            <p className="text-[#e2cfea]/50 text-base md:text-sm mb-1">Got a question? Email us:</p>
                            <a href="mailto:hello@prompthub.com" className="text-[#e2cfea] text-base md:text-sm font-semibold hover:text-[#72b01d] transition-colors duration-300">
                                hello@prompthub.com
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    {/* Mobiles: centered alignment | Desktops: left alignment */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left md:pl-10">
                        <h4 className="text-[#ffffff] font-bold tracking-wider uppercase mb-6 text-sm border-b border-[#062726] pb-2 inline-block w-max">
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {['Explore Prompts', 'Top Creators', 'Pricing Plans', 'Community Guidelines', 'Privacy Policy'].map((item, index) => (
                                <li key={index}>
                                    {/* Mobiles: text-base | Desktops: text-sm */}
                                    <Link
                                        href="#"
                                        className="text-[#e2cfea]/70 text-base md:text-sm font-medium hover:text-[#72b01d] hover:translate-x-1 md:hover:translate-x-1 transition-all duration-300 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Connect & Socials */}
                    {/* Mobiles: centered alignment | Desktops: left alignment */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h4 className="text-[#ffffff] font-bold tracking-wider uppercase mb-6 text-sm border-b border-[#062726] pb-2 inline-block w-max">
                            Connect With Us
                        </h4>

                        <p className="text-[#e2cfea]/60 text-base md:text-sm mb-6">
                            Join our community on social media to stay updated with the latest AI trends and top prompts.
                        </p>

                        {/* Social Icons Container - centered on mobile */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                            {/* X / Twitter Icon */}
                            <Link href="#" className="w-10 h-10 rounded-xl bg-[#062726]/50 border border-[#193d58] flex items-center justify-center text-[#e2cfea]/80 hover:bg-[#72b01d] hover:text-[#020b0a] hover:border-[#72b01d] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(114,176,29,0.4)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                                </svg>
                            </Link>

                            {/* GitHub Icon */}
                            <Link href="#" className="w-10 h-10 rounded-xl bg-[#062726]/50 border border-[#193d58] flex items-center justify-center text-[#e2cfea]/80 hover:bg-[#a06cd5] hover:text-[#ffffff] hover:border-[#a06cd5] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(160,108,213,0.4)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                                </svg>
                            </Link>

                            {/* LinkedIn Icon */}
                            <Link href="#" className="w-10 h-10 rounded-xl bg-[#062726]/50 border border-[#193d58] flex items-center justify-center text-[#e2cfea]/80 hover:bg-[#72b01d] hover:text-[#020b0a] hover:border-[#72b01d] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(114,176,29,0.4)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0 -2 -2 2 2 0 0 0 -2 2v7h-4v-7a6 6 0 0 1 6 -6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>

                            {/* Website/Globe Icon */}
                            <Link href="#" className="w-10 h-10 rounded-xl bg-[#062726]/50 border border-[#193d58] flex items-center justify-center text-[#e2cfea]/80 hover:bg-[#a06cd5] hover:text-[#ffffff] hover:border-[#a06cd5] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(160,108,213,0.4)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 -4 10 15.3 15.3 0 0 1 -4 -10 15.3 15.3 0 0 1 4 -10z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright Section */}
                <div className="pt-8 border-t border-[#062726]/60 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#e2cfea]/50 text-sm text-center md:text-left">
                        © {currentYear} Prompt Hub. All rights reserved.
                    </p>
                    <p className="text-[#e2cfea]/50 text-sm flex items-center gap-1">
                        Created with <span className="text-red-500 animate-pulse">♥</span> by <span className="text-white font-bold tracking-wide">Apurbo Chaki</span>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;