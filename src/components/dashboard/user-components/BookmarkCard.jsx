'use client'

import { Card, Button } from "@heroui/react";
import Link from "next/link";
import { TrashBin } from "@gravity-ui/icons";
import toast from "react-hot-toast";

const BookmarkCard = ({ bookmark }) => {

    const handleBookmarkDelete = () => {
        toast.error("Under construction!⚠️")
    }

    return (
        <Card
            // ব্যাকগ্রাউন্ড কালার একটু হালকা (#0b1410) করা হয়েছে যাতে OLED Black এর ওপর ফুটে ওঠে
            className="bg-[#0b1410] border border-[#72b01d]/20 hover:border-[#72b01d]/50 hover:shadow-[0_8px_30px_rgba(114,176,29,0.08)] transition-all duration-300 h-full flex flex-col rounded-2xl overflow-hidden"
        >
            <Card.Header className="p-5 pb-2 flex flex-col items-start gap-3">
                {/* AI Tool এবং Category ব্যাজগুলো উপরে রাখা হলো (১ম স্ক্রিনশটের মতো) */}
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#72b01d]/10 border border-[#72b01d]/20 text-[#95d542] text-[10px] font-bold uppercase tracking-wider">
                        {bookmark.aiTool}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#72b01d]/10 border border-[#72b01d]/20 text-[#95d542] text-[10px] font-bold uppercase tracking-wider">
                        {bookmark.category}
                    </span>
                </div>

                {/* প্রম্পট টাইটেল */}
                <Card.Title className="text-white text-xl font-bold line-clamp-1 w-full text-left mt-1">
                    {bookmark.title}
                </Card.Title>
            </Card.Header>

            <Card.Content className="p-5 pt-0 flex-grow">
                {/* প্রম্পট ডেসক্রিপশন */}
                <Card.Description className="text-[#8fbc8f] text-sm mt-1 line-clamp-2 leading-relaxed">
                    {bookmark.description}
                </Card.Description>
            </Card.Content>

            <Card.Footer className="p-5 pt-4 border-t border-[#72b01d]/10 mt-auto flex gap-3 items-center">
                {/* ভিউ ডিটেইলস বাটন (বেশিরভাগ জায়গা নেবে) */}
                <Link 
                href={`/prompts/${bookmark?.promptId}`} 
                className="w-full">
                    <span>
                        <Button
                            className="w-full bg-[#72b01d]/10 text-[#95d542] hover:bg-[#72b01d] hover:text-white transition-colors rounded-xl font-medium"
                        >
                            View Prompt
                        </Button>
                    </span>
                </Link>


                {/* ডিলিট বাটন (ডানপাশে ছোট করে থাকবে) */}
                <Button onClick={handleBookmarkDelete}
                    isIconOnly
                    className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all duration-200"
                    aria-label="Delete Bookmark"
                // onClick={() => handleDelete(bookmark.promptId)} // ডিলিট ফাংশন এখানে কল করবেন
                >
                    <TrashBin width={18} height={18} />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default BookmarkCard;