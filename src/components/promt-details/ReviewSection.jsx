"use client";

import { useState } from "react";
import { Star } from "@gravity-ui/icons";
import ReviewCard from "./ReviewCard";
import { Button } from "@heroui/react";
import { serverMutation } from "@/lib/core/server";
import toast from "react-hot-toast";
import { refreshPath } from "@/lib/core/refreshPage";

export default function ReviewSection({ isReviewed, user, promptId, recentReviews: reviews }) {
    console.log("REcent review: ", reviews)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(isReviewed)


    // const reviews = [
    //     {
    //         id: 1,
    //         name: "Apurbo Chaki",
    //         rating: 5,
    //         date: "June 27, 2026",
    //         comment:
    //             "Excellent prompt. Helped me generate clean and professional code reviews."
    //     },
    //     {
    //         id: 2,
    //         name: "Creator",
    //         rating: 4,
    //         date: "June 26, 2026",
    //         comment:
    //             "Very useful for improving code quality and spotting security issues."
    //     },
    //     {
    //         id: 3,
    //         name: "User",
    //         rating: 3,
    //         date: "June 25, 2026",
    //         comment:
    //             "Good prompt overall, but I had to tweak it a little for my use case."
    //     }
    // ];

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
            promptId,
            userName: user?.name,
            uerEmail: user?.email,
            userId: user?.id

        }

        // API call later
        const res = await serverMutation("/api/prompt-review", reviewData)
        if (!res.isExist) {
            refreshPath(`prompts/${promptId}`)
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

                        {
                            submitted ?
                                <div className="py-10 text-green-500 font-bold">
                                    You already submitted your review!
                                </div>

                                : (<form
                                    onSubmit={handleSubmit}
                                    className="mt-6 space-y-6"
                                >
                                    {/* Rating */}
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

                                    {/* Comment */}
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

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                                    >
                                        Submit Review
                                    </Button>
                                </form>)
                        }


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