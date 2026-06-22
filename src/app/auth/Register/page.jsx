"use client";

import React from "react";
import { Check, Xmark, Person, Envelope, Link as LinkIcon, Lock, Thunderbolt } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Registered Data:", userData);

        // Register Logic via better-auth client
        const { data, error } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.image || undefined, // Optional field
        });

        console.log(data, error);

        if (!error) {
            router.push("/");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#062726] overflow-hidden py-12 px-4 z-0">

            {/* --- Background Blurry Glow Effects --- */}
            <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#a06cd5] rounded-full mix-blend-screen filter blur-[130px] opacity-30 z-[-1] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#4e148c] rounded-full mix-blend-screen filter blur-[130px] opacity-40 z-[-1] animate-pulse delay-700"></div>

            {/* --- Glassmorphism Form Card --- */}
            <div className="w-full max-w-md bg-[#102b3f]/70 backdrop-blur-xl border border-[#a06cd5]/30 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-10 relative">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a06cd5] to-[#4e148c] flex items-center justify-center shadow-[0_0_20px_rgba(160,108,213,0.5)] mb-4">
                        <Thunderbolt className="text-[#ffffff]" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#ffffff] tracking-wide">
                        Create Account
                    </h2>
                    <p className="text-[#e2cfea] text-sm mt-1">
                        Join us to explore the best prompts.
                    </p>
                </div>

                {/* HeroUI Form Section */}
                <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                    {/* 1. Name Field */}
                    <TextField
                        isRequired
                        name="name"
                        type="text"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#e2cfea] font-medium">Full Name</Label>
                        <Input
                            placeholder="John Doe"
                            className="bg-[#062726]/50 text-white rounded-xl placeholder:text-[#e2cfea]/50 border-none"
                            startcontent={<Person className="text-[#a06cd5] mr-2" size={18} />}
                        />
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* 2. Email Field */}
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
                        <Label className="text-[#e2cfea] font-medium">Email Address</Label>
                        <Input
                            placeholder="john@example.com"
                            className="bg-[#062726]/50 text-white rounded-xl placeholder:text-[#e2cfea]/50 border-none"
                            startcontent={<Envelope className="text-[#a06cd5] mr-2" size={18} />}
                        />
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* 3. Profile Image URL (Optional) */}
                    <TextField
                        name="image"
                        type="url"
                        validate={(value) => {
                            if (value && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(value)) {
                                return "Please enter a valid image URL (e.g., .jpg, .png)";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#e2cfea] font-medium">Profile Image URL <span className="text-xs text-[#a06cd5]">(Optional)</span></Label>
                        <Input
                            placeholder="https://example.com/avatar.jpg"
                            className="bg-[#062726]/50 text-white rounded-xl placeholder:text-[#e2cfea]/50 border-none"
                            startcontent={<LinkIcon className="text-[#a06cd5] mr-2" size={18} />}
                        />
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* 4. Password Field */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#e2cfea] font-medium">Password</Label>
                        <Input
                            placeholder="Enter a strong password"
                            className="bg-[#062726]/50 text-white rounded-xl placeholder:text-[#e2cfea]/50 border-none"
                            startcontent={<Lock className="text-[#a06cd5] mr-2" size={18} />}
                        />
                        <Description className="text-xs text-[#e2cfea]/70">Must be at least 8 characters with 1 uppercase & 1 number</Description>
                        <FieldError className="text-red-400 text-xs" />
                    </TextField>

                    {/* Submit and Reset Buttons */}
                    <div className="flex gap-3 mt-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-[#a06cd5] hover:bg-[#6247aa] text-[#ffffff] font-bold py-3 rounded-xl shadow-[0_4px_20px_rgba(160,108,213,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <Check size={18} />
                            Register
                        </Button>

                        <Button
                            type="reset"
                            variant="outline"
                            className="flex-1 border-[#a06cd5] text-[#e2cfea] hover:bg-[#a06cd5]/10 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                            <Xmark size={18} />
                            Reset
                        </Button>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4 w-full mt-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#a06cd5]/50"></div>
                        <span className="text-[#e2cfea]/70 text-sm font-medium">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#a06cd5]/50"></div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                        type="button"
                        variant="tertiary"
                        className="w-full bg-[#062726]/60 border border-[#a06cd5]/30 hover:border-[#a06cd5] hover:bg-[#a06cd5]/10 text-[#ffffff] font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Icon icon="devicon:google" width="20" height="20" />
                        Sign in with Google
                    </Button>

                </Form>
            </div>
        </div>
    );
}