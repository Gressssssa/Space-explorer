"use client";

import { useState } from "react";

interface ApodImageProps {
    imageUrl: string;
    title: string;
    description: string;
}

export default function ApodImage({
                                      imageUrl,
                                      title,
                                      description,
                                  }: ApodImageProps) {
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source: "Astronomy Picture of the Day (APOD)",
                imageUrl: imageUrl,
                title: title,
                description: description,
            }),
        });

        if (response.ok) {
            setSaved(true);
        }
    };

    return (
        <div className="overflow-hidden">

            {/* Image */}
            <div className="overflow-hidden bg-black">
                <img
                    src={imageUrl}
                    alt={title}
                    className="block h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
            </div>

            <div className="p-6">

                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Astronomy Picture of the Day
                </p>

                <h2 className="mt-2 text-xl font-semibold leading-tight">
                    {title}
                </h2>

                <button
                    onClick={handleSave}
                    disabled={saved}
                    className={`mt-5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                        saved
                            ? "cursor-default bg-green-500/10 text-green-400"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    {saved
                        ? "✓ Saved to Favorites"
                        : "☆ Save to Favorites"}
                </button>

            </div>
        </div>
    );
}