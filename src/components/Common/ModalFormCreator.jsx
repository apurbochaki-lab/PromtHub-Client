"use client";

import { updateDataCreator } from "@/lib/actions/data-update-creator";
import { imageUpload } from "@/lib/core/imgUpload";
import { refreshPath } from "@/lib/core/refreshPage";
import { Pencil } from "@gravity-ui/icons";
import { Button, Input, Label, ListBox, Modal, Radio, RadioGroup, Surface, TextArea, TextField, Select } from "@heroui/react";
import { ArrowUpToLine } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function ModalFormCreator({ prompt }) {

    const [fileName, setFileName] = useState(null);

    const handleModal = async (e) => {
        e.preventDefault();
        console.log("Modal");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        let imageUrl = prompt?.image || "";

        // ইমেজ সিলেক্ট করা হয়েছে কিনা এবং ফাইলের সাইজ ০ থেকে বড় কিনা চেক করা হচ্ছে
        if (data?.image && data.image instanceof File && data.image.size > 0) {
            try {
                const imageRes = await imageUpload(data.image);
                imageUrl = imageRes?.url || prompt?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
            } catch (error) {
                console.error("Image upload failed:", error);
                imageUrl = prompt?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
            }
        }

        // isPrivate এর ভ্যালুকে স্ট্রিং থেকে boolean (true/false) এ রূপান্তর করা হচ্ছে
        data.isPrivate = data.isPrivate === "private";

        const updatedData = {
            ...data,
            image: imageUrl
        };

        // TODO: Update database data
        const res = await updateDataCreator(prompt?._id, updatedData)

        if (res?.result?.modifiedCount > 0) {
            refreshPath("/dashboard/creator/my-prompts")
            toast.success("Prompt Updated")
        } else {
            toast.error("Something went wrong!")
        }
    };

    return (
        <Modal>
            <Button
                variant="outline" className="bg-transparent text-white hover:text-[#95d542] transition-colors p-3 rounded-lg border-transparent hover:border-[#72b01d]/30" title="Edit Data">
                <Pencil width={18} />
            </Button>

            <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
                <Modal.Container placement="auto">

                    <Modal.Dialog className="sm:max-w-2xl w-full max-w-[95vw] mx-auto bg-[#051614] border border-[#11423c] text-[#e0f2f1] rounded-2xl shadow-2xl">
                        <Modal.CloseTrigger className="text-[#8ecae6] hover:text-[#e0f2f1]" />

                        <Modal.Body className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                            <Surface variant="default" className="bg-transparent">

                                <form onSubmit={handleModal} className="flex flex-col gap-5">

                                    {/* Title */}
                                    <TextField defaultValue={prompt?.title || ""}
                                        className="w-full" name="title" type="text" variant="secondary">
                                        <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">PROMPT TITLE</Label>
                                        <Input
                                            className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] focus:border-[#2ec4b6] placeholder-[#8ecae6]/40 rounded-xl"
                                            placeholder="Enter prompt title"
                                        />
                                    </TextField>

                                    {/* Short Description */}
                                    <TextField defaultValue={prompt?.description || ""}
                                        className="w-full" name="description" type="text" variant="secondary">
                                        <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">SHORT DESCRIPTION</Label>
                                        <Input

                                            className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] focus:border-[#2ec4b6] placeholder-[#8ecae6]/40 rounded-xl"
                                            placeholder="Enter short description"
                                        />
                                    </TextField>

                                    {/* Prompt content */}
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="textarea-rows-3" className="text-[#2ec4b6] font-semibold text-xs tracking-wider">PROMPT CONTENT TEMPLATE</Label>
                                        <TextArea name="content"
                                            aria-label="Short feedback"
                                            id="textarea-rows-3"
                                            placeholder="This week's highlights..."
                                            rows={3}
                                            defaultValue={prompt?.content || ""}
                                            className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] focus:border-[#2ec4b6] placeholder-[#8ecae6]/40 rounded-xl p-3 w-full"
                                        />
                                    </div>

                                    {/* Select section */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Category */}
                                        <Select name="category" className="w-full" placeholder="Select one" defaultSelectedKey={prompt?.category || "Coding"}>
                                            <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">CATEGORY</Label>
                                            <Select.Trigger className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] rounded-xl w-full">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-[#0b2b26] border border-[#11423c] rounded-xl shadow-xl">
                                                <ListBox className="text-[#e0f2f1]">
                                                    <ListBox.Item id="Coding" textValue="Coding" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Coding
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Art & Design" textValue="Art & Design" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Art & Design
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Marketing" textValue="Marketing" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Marketing
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Writing" textValue="Writing" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Writing
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="SEO" textValue="SEO" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        SEO
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>

                                        {/* Ai Engine */}
                                        <Select name="aiTool" className="w-full" placeholder="Select one" defaultSelectedKey={prompt?.aiTool || "ChatGPT"}>
                                            <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">AI ENGINE</Label>
                                            <Select.Trigger className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] rounded-xl w-full">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-[#0b2b26] border border-[#11423c] rounded-xl shadow-xl">
                                                <ListBox className="text-[#e0f2f1]">
                                                    <ListBox.Item id="ChatGPT" textValue="ChatGPT" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        ChatGPT
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Gemini" textValue="Gemini" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Gemini
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Midjourny" textValue="Midjourny" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Midjourny
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Claude" textValue="Claude" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Claude
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="DALL-E" textValue="DALL-E" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        DALL-E
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>

                                        {/* Difficulty Level */}
                                        <Select name="difficulty" className="w-full" placeholder="Select one" defaultSelectedKey={prompt?.difficulty || "Beginner"}>
                                            <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">DIFFICULTY LEVEL</Label>
                                            <Select.Trigger className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] rounded-xl w-full">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover className="bg-[#0b2b26] border border-[#11423c] rounded-xl shadow-xl">
                                                <ListBox className="text-[#e0f2f1]">
                                                    <ListBox.Item id="Beginner" textValue="Beginner" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Beginner
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Intermediate" textValue="Intermediate" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Intermediate
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Pro" textValue="Pro" className="hover:bg-[#11423c] rounded-lg p-2 cursor-pointer">
                                                        Pro
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    {/* Visibility status */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">VISIBILITY STATUS</Label>

                                        <RadioGroup defaultValue={prompt?.isPrivate ? "private" : "public"} name="isPrivate" orientation="horizontal" className="flex gap-4">
                                            <Radio value="public" className="text-[#e0f2f1]">
                                                <Radio.Content>
                                                    <Radio.Control>
                                                        <Radio.Indicator className="bg-[#2ec4b6]" />
                                                    </Radio.Control>
                                                    <span className="text-sm font-medium ml-1 text-[#e0f2f1]">Public(Free)</span>
                                                </Radio.Content>
                                            </Radio>
                                            <Radio value="private" className="text-[#e0f2f1]">
                                                <Radio.Content>
                                                    <Radio.Control>
                                                        <Radio.Indicator className="bg-[#2ec4b6]" />
                                                    </Radio.Control>
                                                    <span className="text-sm font-medium ml-1 text-[#e0f2f1]">Private(Premium)</span>
                                                </Radio.Content>
                                            </Radio>
                                        </RadioGroup>
                                    </div>

                                    {/* Tags */}
                                    <TextField defaultValue={prompt?.tags || ""}
                                        className="w-full" name="tags" type="text" variant="secondary">
                                        <Label className="text-[#2ec4b6] font-semibold text-xs tracking-wider">TAGS (COMMA-SEPARATED)</Label>
                                        <Input

                                            className="bg-[#0b2b26] text-[#e0f2f1] border border-[#11423c] focus:border-[#2ec4b6] placeholder-[#8ecae6]/40 rounded-xl"
                                            placeholder="Enter tags"
                                        />
                                    </TextField>

                                    {/* Image */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[#2ec4b6] text-xs font-bold uppercase tracking-wider">THUMBNAIL IMAGE UPLOAD</Label>
                                        <div className="border-2 border-dashed border-[#2ec4b6]/30 hover:border-[#2ec4b6] hover:bg-[#11423c]/20 rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition-all group relative">
                                            <input
                                                type="file"
                                                name="image"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={(e) => setFileName(e.target.files[0]?.name || null)}
                                            />
                                            <div className="w-12 h-12 rounded-full bg-[#051614] border border-[#2ec4b6]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(46,196,182,0.2)]">
                                                <ArrowUpToLine className="text-[#2ec4b6]" size={20} />
                                            </div>
                                            <p className="text-[#e0f2f1] font-bold text-sm px-4 text-center">
                                                {fileName ? fileName : (prompt?.image ? "Image already selected (Click to change)" : "Click to choose a thumbnail image file")}
                                            </p>
                                            <p className="text-[#8ecae6]/70 text-xs mt-1">Supports PNG, JPG, or WEBP (Max 2MB)</p>
                                        </div>
                                    </div>

                                    <Modal.Footer className="border-t border-[#11423c] pt-4 mt-2 flex justify-end gap-3">
                                        <Button slot="close" variant="secondary" className="bg-[#11423c] text-[#8ecae6] hover:bg-[#1a5c54] font-medium rounded-xl">
                                            Cancel
                                        </Button>
                                        <Button slot="close" type="submit" className="bg-[#2ec4b6] text-[#051614] hover:bg-[#25a195] font-bold rounded-xl px-6 shadow-lg shadow-[#2ec4b6]/20">
                                            Update Prompt
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}