"use client";

import { useState } from "react";
import { CircleCheckFill, Star } from "@gravity-ui/icons";
import ReviewCard from "./ReviewCard";
import { Button } from "@heroui/react";
import { serverMutation } from "@/lib/core/server";
import toast from "react-hot-toast";
import { refreshPath } from "@/lib/core/refreshPage";
import { LockIcon } from "lucide-react";

export default function ReviewSection({ isLocked, prompt, user, recentReviews: reviews }) {
    // console.log("REcent review: ", prompt)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(prompt?.isReviewed)


    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            rating,
            comment,
        }

        const reviewData = {
            ...data,
            title: prompt?.title,
            aiTool: prompt?.aiTool,
            promptId: prompt?._id,
            userName: user?.name,
            uerEmail: user?.email,
            userId: user?.id
        }

        // API call later
        const res = await serverMutation("/api/prompt-review", reviewData)
        if (!res.isExist) {
            refreshPath(`prompts/${prompt?._id}`)
            setSubmitted(true)
            toast.success("Review Submitted")
        }

        setRating(0);
        setComment("");
    };

    return (
        <section className="mt-12">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                    Community Reviews
                </h2>

                <p className="mt-2 text-gray-400">
                    Share your experience and read feedback from other users.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Side */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white">
                            Submit a Review
                        </h3>

                        {isLocked ? (
                            <div className="pt-8 ">
                                <span className="flex justify-center text-green-400 pb-5"><LockIcon size={30} /></span>
                                <h2 className="text-teal-200 font-bold">Reviews are disabled for premium locked prompts. Subscribe to premium to contribute feedback.</h2>
                            </div>
                        ) : (
                            <div>
                                {
                                    submitted ?
                                        <div className="py-10">
                                            <div className="inline-flex max-w-xl items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">

                                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                                                    <CircleCheckFill className="text-emerald-400" size={20} />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold text-emerald-300">
                                                        Review Already Submitted
                                                    </h3>

                                                    <p className="mt-1 text-sm leading-6 text-emerald-100/90">
                                                        Thanks for sharing your feedback! You've already submitted a review
                                                        for this prompt, so additional reviews aren't allowed.
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                        : (<form
                                            onSubmit={handleSubmit}
                                            className="mt-6 space-y-6"
                                        >
                                            <div>
                                                <label className="mb-3 block text-sm font-medium text-gray-300">
                                                    Rating
                                                </label>

                                                <div className="flex items-center gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            type="button"
                                                            key={star}
                                                            onClick={() =>
                                                                handleStarClick(star)
                                                            }
                                                            className="transition-transform hover:scale-110"
                                                        >
                                                            <Star
                                                                size={28}
                                                                className={
                                                                    star <= rating
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-500"
                                                                }
                                                            />
                                                        </button>
                                                    ))}
                                                </div>

                                                {rating > 0 && (
                                                    <p className="mt-2 text-sm text-gray-400">
                                                        Selected Rating: {rating}/5
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="mb-3 block text-sm font-medium text-gray-300">
                                                    Comment
                                                </label>

                                                <textarea
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(e.target.value)
                                                    }
                                                    rows={5}
                                                    placeholder="Write your feedback..."
                                                    className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white outline-none transition focus:border-primary"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                                            >
                                                Submit Review
                                            </Button>
                                        </form>)
                                }
                            </div>)}




                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-7">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">
                            Recent Reviews
                        </h3>

                        <span className="text-sm text-gray-400">
                            {reviews.length} Reviews
                        </span>
                    </div>

                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review._id}
                                review={review}

                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}