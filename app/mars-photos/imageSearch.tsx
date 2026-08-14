"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ImageSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(
        searchParams.get("q") || "mars"
    );

    const handleSearch = () => {
        if (!query.trim()) return;

        router.push(`?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-2">
                <label
                    htmlFor="image-search"
                    className="text-sm font-medium text-gray-300"
                >
                    Search the NASA image archive
                </label>

                <input
                    id="image-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    placeholder="e.g. nebula, moon, astronaut..."
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
            </div>

            <button
                onClick={handleSearch}
                className="h-11 rounded-lg bg-blue-500 px-6 text-sm font-medium text-white transition hover:bg-blue-400 active:scale-[0.98]"
            >
                Search
            </button>


        </div>
    );
}