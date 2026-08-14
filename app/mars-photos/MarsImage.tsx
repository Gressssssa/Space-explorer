"use client";

import { useState } from "react";

interface MarsImageProps {
    imageUrl: string;
    title: string;
    description?: string;
}

export default function MarsImage({
                                      imageUrl,
                                      title,
                                      description,
                                  }: MarsImageProps) {
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source: "NASA Image and Video Library",
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
        <article className="overflow-hidden">
            <div className="overflow-hidden bg-black">
                <img
                    src={imageUrl}
                    alt={title}
                    className="block h-auto w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>

            <div className="p-4">

                <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white">
                    {title}
                </h3>

                {description && (
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                )}

                <button
                    onClick={handleSave}
                    disabled={saved}
                    className={`mt-4 w-full rounded-lg px-3 py-2 text-sm font-medium transition ${
                        saved
                            ? "cursor-default bg-green-500/10 text-green-400"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    {saved ? "✓ Saved to Favorites" : "☆ Save to Favorites"}
                </button>

            </div>
        </article>
    );
}