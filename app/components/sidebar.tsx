"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = [
        {
            href: "/",
            label: "Dashboard",
        },
        {
            href: "/apod",
            label: "Astronomy Picture",
        },
        {
            href: "/mars-photos",
            label: "NASA Images",
        },
        {
            href: "/favorites",
            label: "Favorites",
        },
    ];

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[var(--card)] text-lg text-white shadow-lg md:hidden"
                aria-label="Open navigation"
            >
                ☰
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-[var(--border)] bg-[var(--card)] transition-transform duration-300 ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="flex h-full flex-col">

                    <div className="border-b border-[var(--border)] px-6 py-6">
                        <div className="flex items-center justify-between">

                            <div>
                                <h1 className="text-base font-semibold">
                                    Space Explorer
                                </h1>

                                <p className="text-xs text-[var(--muted)]">
                                    NASA Dashboard
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-lg text-[var(--muted)] hover:text-white md:hidden"
                                aria-label="Close navigation"
                            >
                                ✕
                            </button>

                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-6">

                        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                            Explore
                        </p>

                        <div className="space-y-1">
                            {links.map((link) => {
                                const isActive =
                                    pathname === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                                            isActive
                                                ? "bg-indigo-500/10 text-white"
                                                : "text-[var(--muted)] hover:bg-[var(--card-hover)] hover:text-white"
                                        }`}
                                    >
                                        <span>
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                    </nav>

                    <div className="border-t border-[var(--border)] p-5">
                        <p className="text-xs text-[var(--muted)]">
                            Powered by NASA Open APIs
                        </p>
                    </div>

                </div>
            </aside>
        </>
    );
}