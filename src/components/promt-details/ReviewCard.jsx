"use client";

import { Star } from "@gravity-ui/icons";

export default function ReviewCard({ review }) {
    const formattedDate = new Date(review.createdAt).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                        {review.userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h4 className="font-semibold text-white">
                            {review.userName}
                        </h4>

                        <p className="text-xs text-gray-400">
                            {review.uerEmail}
                        </p>

                        <p className="text-xs text-gray-500">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={16}
                            className={
                                star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Comment */}
            <p className="mt-4 leading-7 text-gray-300">
                {review.comment}
            </p>
        </div>
    );
}