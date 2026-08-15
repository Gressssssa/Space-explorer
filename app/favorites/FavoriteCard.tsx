"use client";

import { useState } from "react";

interface Favorite {
    id: string;
    source: string;
    imageUrl: string;
    title: string;
    description: string | null;
    metadata: any;
    note: string | null;
    createdAt: Date;
}

interface FavoriteCardProps {
    favorite: Favorite;
}

export default function FavoriteCard({
                                         favorite,
                                     }: FavoriteCardProps) {
    const [deleted, setDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (deleting) return;

        setDeleting(true);

        try {
            const response = await fetch(
                `/api/favorites/${favorite.id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setDeleted(true);
            } else {
                const data = await response.json();

                console.error("Delete failed:", data);

                setDeleting(false);
            }
        } catch (error) {
            console.error("Delete request failed:", error);

            setDeleting(false);
        }
    };

    if (deleted) {
        return null;
    }

    return (
        <article className="overflow-hidden">

            <div className="overflow-hidden bg-black">
                <img
                    src={favorite.imageUrl}
                    alt={favorite.title}
                    className="block h-auto w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>

            <div className="p-4">

                <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                    {favorite.source}
                </p>

                <h2 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white">
                    {favorite.title}
                </h2>

                {favorite.description && (
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
                        {favorite.description}
                    </p>
                )}

                <div className="mt-4 flex gap-2">

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </article>
    );
}