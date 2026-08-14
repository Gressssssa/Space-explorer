import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
    title: "Space Explorer",
    description: "Explore NASA's universe",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Sidebar />

        <main className="min-h-screen px-10 py-12 md:ml-72 md:px-8 md:py-8">
            {children}
        </main>
        </body>
        </html>
    );
}