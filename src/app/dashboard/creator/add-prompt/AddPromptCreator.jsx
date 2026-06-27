'use client';

import React, { useState } from 'react';
import {
    TextField,
    Label,
    Input,
    TextArea,
    RadioGroup,
    Radio,
    Dropdown
} from '@heroui/react';
import { Plus, ArrowUpToLine, ChevronDown } from '@gravity-ui/icons';
import { imageUpload } from '@/lib/core/imgUpload';
import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/core/server';
import { useRouter } from 'next/navigation';

const AddPromptCreator = ({ user }) => {
    console.log(user)
    const [category, setCategory] = useState('Coding');
    const [aiTool, setAiTool] = useState('ChatGPT');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [isPrivate, setIsPrivate] = useState(false);
    const [fileName, setFileName] = useState(null);

    const categories = ['Coding', 'Art & Design', 'Marketing', 'Writing', 'SEO'];
    const aiTools = ['ChatGPT', 'Gemini', 'Midjourney', 'Claude', 'DALL-E'];
    const difficultyLevels = ['Beginner', 'Intermediate', 'Pro'];

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("Adding prompt...");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const image = await imageUpload(data?.image);

        Object.keys(data).forEach(key => {
            if (key.startsWith('react-aria')) {
                delete data[key];
            }
        });

        delete data.visibilityStatus;
        data.isPrivate = isPrivate;

        // ---------------------------------------------------

        const newData = {
            ...data,
            image: image?.url || "https://thumbs.dreamstime.com/b/computer-displaying-ai-programming-code-screen-blurred-modern-office-background-computer-displaying-ai-programming-code-375635675.jpg",
            creatorId: user?.id,
            status: "pending",
            copyCount: 0,
            bookmarkCount: 0,
            rating: 0
        };

        console.log(newData)

        const res = await serverMutation('/api/prompts', newData);
        console.log("response:", res)

        if (res.insertedId) {
            toast.success("Prompt added");
            e.target.reset();
            setFileName(null);
            router.push("/dashboard/creator/my-prompts")
        }
        else {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* হেডার সেকশন: ক্রিস্প টেক্সট ভিজিবিলিটি */}
            <div className="mb-10 border-b border-[#233a2e] pb-6">
                <h2 className="text-3xl font-extrabold text-white mb-2">
                    Submit New <span className="text-[#72b01d]">Prompt</span>
                </h2>
                <p className="text-zinc-400 text-sm">
                    Share your AI engineering skills with the community. Fill out the details below.
                </p>
            </div>

            {/* মূল ফর্ম কার্ড */}
            <form onSubmit={handleSubmit} className="bg-[#0d1511] border border-[#233a2e] rounded-2xl p-6 md:p-8 shadow-xl space-y-8">

                <input type="hidden" name="category" value={category} />
                <input type="hidden" name="aiTool" value={aiTool} />
                <input type="hidden" name="difficulty" value={difficulty} />

                <div className="space-y-6">
                    <TextField className="flex flex-col gap-2">
                        {/* টাইটেল এখন ১০০% স্পষ্টভাবে দৃশ্যমান */}
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">
                            Prompt Title *
                        </Label>
                        <Input
                            name="title"
                            required
                            placeholder="e.g. Optimized React Tailwind Card Builder"
                            className="!bg-[#132019] border border-[#233a2e] !text-white rounded-xl px-4 py-3 focus:border-[#72b01d] focus:ring-1 focus:ring-[#72b01d]/30 transition-all outline-none placeholder:text-zinc-600 w-full"
                        />
                    </TextField>

                    <TextField className="flex flex-col gap-2">
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">
                            Short Description *
                        </Label>
                        <Input
                            name="description"
                            required
                            placeholder="Explain what this prompt accomplishes in 1-2 sentences"
                            className="!bg-[#132019] border border-[#233a2e] !text-white rounded-xl px-4 py-3 focus:border-[#72b01d] focus:ring-1 focus:ring-[#72b01d]/30 transition-all outline-none placeholder:text-zinc-600 w-full"
                        />
                    </TextField>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">
                        Prompt Content Template *
                    </Label>
                    <TextArea
                        name="content"
                        required
                        className="!bg-[#132019] border border-[#233a2e] !text-white rounded-xl px-4 py-3 focus:border-[#72b01d] focus:ring-1 focus:ring-[#72b01d]/30 transition-all outline-none placeholder:text-zinc-600 min-h-[160px] w-full resize-y"
                        placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Category Dropdown */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">Category *</Label>
                        <Dropdown>
                            <Dropdown.Trigger className="bg-[#132019] border border-[#233a2e] text-[#e4ece7] rounded-xl px-4 py-3 w-full flex justify-between items-center hover:border-[#2f4f3e] focus:border-[#72b01d] transition-all outline-none cursor-pointer">
                                <span className="text-[#e4ece7] font-medium">{category}</span>
                                <ChevronDown size={16} className="text-[#72b01d]" />
                            </Dropdown.Trigger>
                            <Dropdown.Popover className="bg-[#0d1511] border border-[#233a2e] rounded-xl shadow-2xl w-full max-w-[350px] z-50">
                                <Dropdown.Menu
                                    onAction={(key) => setCategory(String(key))}
                                    className="p-1 outline-none space-y-1"
                                >
                                    {categories.map((cat) => (
                                        <Dropdown.Item
                                            key={cat}
                                            id={cat}
                                            className="flex items-center px-4 py-2.5 rounded-lg cursor-pointer outline-none transition-all data-[focused]:bg-[#182a21] data-[hovered]:bg-[#182a21] group"
                                        >
                                            <Label className="text-[#e4ece7] group-data-[focused]:text-[#72b01d] group-data-[hovered]:text-[#72b01d] font-medium cursor-pointer block w-full">
                                                {cat}
                                            </Label>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>

                    {/* AI Engine Dropdown */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">AI Engine *</Label>
                        <Dropdown>
                            <Dropdown.Trigger className="bg-[#132019] border border-[#233a2e] text-[#e4ece7] rounded-xl px-4 py-3 w-full flex justify-between items-center hover:border-[#2f4f3e] focus:border-[#72b01d] transition-all outline-none cursor-pointer">
                                <span className="text-[#e4ece7] font-medium">{aiTool}</span>
                                <ChevronDown size={16} className="text-[#72b01d]" />
                            </Dropdown.Trigger>
                            <Dropdown.Popover className="bg-[#0d1511] border border-[#233a2e] rounded-xl shadow-2xl w-full max-w-[350px] z-50">
                                <Dropdown.Menu
                                    onAction={(key) => setAiTool(String(key))}
                                    className="p-1 outline-none space-y-1"
                                >
                                    {aiTools.map((tool) => (
                                        <Dropdown.Item
                                            key={tool}
                                            id={tool}
                                            className="flex items-center px-4 py-2.5 rounded-lg cursor-pointer outline-none transition-all data-[focused]:bg-[#182a21] data-[hovered]:bg-[#182a21] group"
                                        >
                                            <Label className="text-[#e4ece7] group-data-[focused]:text-[#72b01d] group-data-[hovered]:text-[#72b01d] font-medium cursor-pointer block w-full">
                                                {tool}
                                            </Label>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>

                    {/* Difficulty Dropdown */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">Difficulty Level *</Label>
                        <Dropdown>
                            <Dropdown.Trigger className="bg-[#132019] border border-[#233a2e] text-[#e4ece7] rounded-xl px-4 py-3 w-full flex justify-between items-center hover:border-[#2f4f3e] focus:border-[#72b01d] transition-all outline-none cursor-pointer">
                                <span className="text-[#e4ece7] font-medium">{difficulty}</span>
                                <ChevronDown size={16} className="text-[#72b01d]" />
                            </Dropdown.Trigger>
                            <Dropdown.Popover className="bg-[#0d1511] border border-[#233a2e] rounded-xl shadow-2xl w-full max-w-[350px] z-50">
                                <Dropdown.Menu
                                    onAction={(key) => setDifficulty(String(key))}
                                    className="p-1 outline-none space-y-1"
                                >
                                    {difficultyLevels.map((level) => (
                                        <Dropdown.Item
                                            key={level}
                                            id={level}
                                            className="flex items-center px-4 py-2.5 rounded-lg cursor-pointer outline-none transition-all data-[focused]:bg-[#182a21] data-[hovered]:bg-[#182a21] group"
                                        >
                                            <Label className="text-[#e4ece7] group-data-[focused]:text-[#72b01d] group-data-[hovered]:text-[#72b01d] font-medium cursor-pointer block w-full">
                                                {level}
                                            </Label>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>

                    {/* Visibility Radio Status - টেক্সট কালার স্পষ্ট করা হয়েছে */}
                    <div className="flex flex-col gap-3">
                        <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">Visibility Status *</Label>
                        <RadioGroup
                            value={isPrivate ? "private" : "public"}
                            onChange={(val) => setIsPrivate(val === 'private')}
                            orientation="horizontal"
                            className="flex gap-6"
                        >
                            <Radio value="public" className="flex items-center gap-2 cursor-pointer group">
                                <Radio.Content className="flex items-center gap-2">
                                    <Radio.Control className="w-5 h-5 rounded-full border-2 border-[#233a2e] flex items-center justify-center group-data-[checked]:border-[#72b01d] transition-colors">
                                        <Radio.Indicator className="w-2.5 h-2.5 rounded-full bg-[#72b01d] data-[hidden]:hidden" />
                                    </Radio.Control>
                                    <span className="!text-zinc-200 text-sm group-hover:text-[#72b01d] transition-colors font-medium">Public (Free)</span>
                                </Radio.Content>
                            </Radio>

                            <Radio value="private" className="flex items-center gap-2 cursor-pointer group">
                                <Radio.Content className="flex items-center gap-2">
                                    <Radio.Control className="w-5 h-5 rounded-full border-2 border-[#233a2e] flex items-center justify-center group-data-[checked]:border-[#72b01d] transition-colors">
                                        <Radio.Indicator className="w-2.5 h-2.5 rounded-full bg-[#72b01d] data-[hidden]:hidden" />
                                    </Radio.Control>
                                    <span className="!text-zinc-200 text-sm group-hover:text-[#72b01d] transition-colors font-medium">Private (Premium)</span>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                {/* Tags Input */}
                <div className="flex flex-col gap-2">
                    <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">Tags (Comma-Separated)</Label>
                    <Input
                        name="tags"
                        placeholder="e.g. tailwind, card, component, responsive"
                        className="!bg-[#132019] border border-[#233a2e] !text-white rounded-xl px-4 py-3 focus:border-[#72b01d] focus:ring-1 focus:ring-[#72b01d]/30 transition-all outline-none w-full placeholder:text-zinc-600"
                    />
                </div>

                {/* Thumbnail Image Upload */}
                <div className="flex flex-col gap-2">
                    <Label className="text-zinc-300 text-xs font-extrabold uppercase tracking-widest">Thumbnail Image Upload</Label>
                    <div className="border-2 border-dashed border-[#233a2e] hover:border-[#72b01d]/50 hover:bg-[#132019]/40 rounded-2xl flex flex-col items-center justify-center py-12 cursor-pointer transition-all group relative">
                        <input
                            type="file"
                            name="image"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={(e) => setFileName(e.target.files[0]?.name || null)}
                        />
                        <div className="w-12 h-12 rounded-full bg-[#132019] border border-[#233a2e] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(114,176,29,0.1)]">
                            <ArrowUpToLine className="text-[#72b01d]" size={20} />
                        </div>
                        <p className="text-[#e4ece7] font-bold text-sm">
                            {fileName ? fileName : "Click to choose a thumbnail image file"}
                        </p>
                        <p className="text-zinc-400 text-xs mt-1">Supports PNG, JPG, or WEBP (Max 2MB)</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#72b01d] to-[#1a3124] hover:from-[#81c12c] hover:to-[#223f2e] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(114,176,29,0.15)] hover:shadow-[0_4px_25px_rgba(114,176,29,0.3)] cursor-pointer"
                    >
                        <Plus size={20} />
                        Submit Prompt for Review
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPromptCreator;