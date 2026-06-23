'use client'

import React, { useState } from 'react';
import { Thunderbolt, Bars, Xmark, ArrowRightToSquare, PersonPlus, ArrowRightFromSquare } from '@gravity-ui/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Spinner } from '@heroui/react';
import Image from 'next/image';
import { authClient, useSession } from '@/lib/auth-client';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    const router = useRouter();

    // Better auth session
    const { data: session, isPending } = useSession()
    const user = session?.user || null;
    // console.log(user)

    // TODO : replace this with session
    const isLoggedIn = user;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Prompts', href: '/all-prompts' },
    ];

    if (isLoggedIn) {
        navLinks.push({ name: 'Dashboard', href: `/dashboard/${user?.role}` });
    }

    const handleLogout = async () => {
        console.log("Logging out...");
        await authClient.signOut();
        // router.push('/auth/login');
        // router.refresh();
        window.location.href = '/auth/login';
    }

    if (pathName.includes('dashboard')) {
        return null;
    }

    return (
        <nav className="bg-[#102b3f] border-b border-[#062726] sticky top-0 z-50 backdrop-blur-md bg-opacity-95 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT: Logo + Site Name */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#a06cd5] to-[#4e148c] flex items-center justify-center shadow-[0_0_15px_rgba(160,108,213,0.5)] group-hover:scale-110 transition-all duration-300">
                            <Thunderbolt className="text-[#ffffff]" py={1} size={16} />
                        </div>
                        <span className="text-[#ffffff] text-xl font-bold tracking-wide">
                            Prompt<span className="text-[#a06cd5] group-hover:text-[#e2cfea] transition-colors duration-300">Hub</span>
                        </span>
                    </Link>

                    {/* MIDDLE: Desktop Navigation with Active Route Styling */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = pathName === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-bold text-lg transition-colors duration-300 relative group py-2 ${isActive ? 'text-[#ffffff]' : 'text-[#e2cfea] hover:text-[#ffffff]'
                                        }`}
                                >
                                    {link.name}
                                    {/* Underline Glow - Active হলে 'w-full' থাকবে, না হলে হোভারে ফুল হবে */}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#a06cd5] shadow-[0_0_8px_#a06cd5] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT: Desktop Authentication & Profile Conditional Rendering */}
                    <div className="hidden md:flex items-center gap-6">
                        {isPending ? <div className='text-white'><Spinner /></div> : isLoggedIn ? (
                            <>
                                {/* Profile Avatar + Name (Visible when logged in) */}
                                <div className='flex items-center gap-3'>
                                    <div className="relative w-10 h-10 rounded-full border-2 border-[#72b01d] cursor-pointer p-[2px] hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src={user?.image || "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"}
                                            alt={user?.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                        <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-[#72b01d] ring-2 ring-[#102b3f]" />
                                    </div>
                                    <h2 className='text-white font-semibold text-sm'>{user?.name}</h2>
                                </div>

                                {/* Logout Button */}
                                <Button onClick={handleLogout}
                                    variant='ghost'
                                    className="text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg font-bold transition-all duration-300 py-2.5"
                                >
                                    <ArrowRightFromSquare /> Logout
                                </Button>
                            </>
                        ) : (
                            /* Login & Register Buttons (Visible when logged out) */
                            <div className='flex gap-3'>
                                <Link href="/auth/login">
                                    <Button variant='primary' className="bg-[#a06cd5] text-white rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(160,108,213,0.3)]">
                                        <ArrowRightToSquare /> Login
                                    </Button>
                                </Link>

                                <Link href="/auth/register">
                                    <Button variant='outline' className="text-white border-[#a06cd5] hover:bg-[#a06cd5]/10 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                        <PersonPlus /> Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu Toggler */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#e2cfea] hover:text-[#ffffff] focus:outline-none p-2 rounded-xl hover:bg-[#062726] transition-all duration-300"
                        >
                            {isOpen ? <Xmark size={20} /> : <Bars size={20} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile & Tablet Dropdown Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-3 pt-2 pb-4 space-y-1 bg-[#062726] border-t border-[#102b3f] shadow-inner">

                    {/* Mobile Navigation Links */}
                    {navLinks.map((link) => {
                        const isActive = pathName === link.href;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                                    ? 'bg-[#102b3f] text-[#a06cd5] font-bold border-l-4 border-[#a06cd5]'
                                    : 'text-[#e2cfea] hover:bg-[#102b3f] hover:text-[#a06cd5]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    {/* Mobile Authentication Info & Buttons Conditional Rendering */}
                    <div className="pt-4 mt-4 border-t border-[#102b3f] flex flex-col gap-3 px-2">
                        {isLoggedIn ? (
                            <>
                                {/* Profile View (Only when logged in) */}
                                <div className="flex items-center gap-3 py-1">
                                    <div className="w-10 h-10 rounded-full border-2 border-[#72b01d] p-[2px]">
                                        <Image
                                            src={user?.image || "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"}
                                            alt="Profile"
                                            width={100}
                                            height={100}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#ffffff]">{user?.name}</p>
                                        <p className="text-xs text-[#72b01d]">{user?.plan || "Free Plan"}</p>
                                    </div>
                                </div>

                                {/* Mobile Logout Button */}
                                <Button onClick={handleLogout}
                                    variant='ghost'
                                    className="w-full text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg font-bold transition-all duration-300 py-2.5"
                                >
                                    <ArrowRightFromSquare /> Logout
                                </Button>
                            </>
                        ) : (
                            /* Mobile Login & Register Buttons (Only when logged out) */
                            <>
                                <Link href="/auth/login" className="w-full">
                                    <Button variant='primary' className="bg-[#a06cd5] text-white rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-0.5 w-full py-2.5">
                                        <ArrowRightToSquare /> Login
                                    </Button>
                                </Link>
                                <Link href="/auth/register" className="w-full">
                                    <Button variant='outline' className="text-white border-[#a06cd5] hover:bg-[#a06cd5]/10 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full py-2.5">
                                        <PersonPlus /> Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;