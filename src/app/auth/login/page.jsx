"use client";

import React from "react";
import { Check, Xmark, Envelope, Lock, ArrowRightToSquare } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Login Data:", userData);

        // TODO: Login logic via better-auth client
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            // callbackUrl: "/"
        })

        if (!error) {
            toast.success("Login Successful")
            // router.push("/");
            window.location.href = '/';
        }
        else {
            toast.error("Invalid user or password");
        }
    };

    // Login with google
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden py-12 px-4 z-0">

            {/* --- Background Blurry Glow Effects (Emerald & Sky Blue) --- */}
            <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#10b981] rounded-full mix-blend-screen filter blur-[140px] opacity-20 z-[-1] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#0ea5e9] rounded-full mix-blend-screen filter blur-[140px] opacity-20 z-[-1] animate-pulse delay-700"></div>

            {/* --- Glassmorphism Form Card --- */}
            <div className="w-full max-w-md bg-[#1e293b]/70 backdrop-blur-xl border border-[#10b981]/30 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-10 relative">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#0ea5e9] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-4">
                        <ArrowRightToSquare className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Welcome Back
                    </h2>
                    <p className="text-slate-300 text-sm mt-1">
                        Sign in to continue to your account.
                    </p>
                </div>

                {/* HeroUI Form Section */}
                <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                    {/* 1. Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-slate-200 font-medium">Email Address</Label>
                        <Input
                            placeholder="john@example.com"
                            className="bg-[#0f172a]/80 text-white rounded-xl placeholder:text-slate-500 border-none focus-within:ring-1 focus-within:ring-[#10b981]/50 transition-all"
                            startcontent={<Envelope className="text-[#10b981] mr-2" size={18} />}
                        />
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* 2. Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >
                        <Label className="text-slate-200 font-medium">Password</Label>
                        <Input
                            placeholder="Enter your password"
                            className="bg-[#0f172a]/80 text-white rounded-xl placeholder:text-slate-500 border-none focus-within:ring-1 focus-within:ring-[#10b981]/50 transition-all"
                            startcontent={<Lock className="text-[#10b981] mr-2" size={18} />}
                        />
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* Forgot Password Link (Optional but good for Login pages) */}
                    {/* <div className="flex justify-end w-full -mt-2">
                        <a href="#" className="text-xs text-[#10b981] hover:text-[#34d399] transition-colors">
                            Forgot password?
                        </a>
                    </div> */}

                    {/* Submit and Reset Buttons */}
                    <div className="flex gap-3 mt-2">
                        <Button
                            type="submit"
                            className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <Check size={18} />
                            Login
                        </Button>

                        <Button
                            type="reset"
                            variant="outline"
                            className="flex-1 border-[#10b981] text-slate-300 hover:bg-[#10b981]/10 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                            <Xmark size={18} />
                            Reset
                        </Button>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4 w-full mt-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#10b981]/50"></div>
                        <span className="text-slate-400 text-sm font-medium">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#10b981]/50"></div>
                    </div>

                    {/* Google Login Button */}
                    <Button onClick={handleGoogleLogin}
                        type="button"
                        variant="tertiary"
                        className="w-full bg-[#0f172a]/60 border border-[#10b981]/30 hover:border-[#10b981] hover:bg-[#10b981]/10 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Icon icon="devicon:google" width="20" height="20" />
                        Sign in with Google
                    </Button>

                </Form>
            </div>
        </div>
    );
}