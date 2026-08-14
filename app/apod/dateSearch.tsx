"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DateSearch() {
    const router = useRouter();

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleSearch = () => {
        if (!date) return;

        router.push(`/apod?date=${date}`);
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

            <div className="flex flex-1 flex-col gap-2">
                <label
                    htmlFor="apod-date"
                    className="text-sm font-medium text-gray-300"
                >
                    Choose a date
                </label>

                <input
                    id="apod-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
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