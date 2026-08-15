import prisma from "@/lib/prisma";
import NeoChart from "./components/NeoChart";

export const dynamic = "force-dynamic";

export default async function Home() {
    const favorites = await prisma.favoritePhoto.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    const totalFavorites = favorites.length;

    const apodFavorites = favorites.filter(
        (favorite) =>
            favorite.source === "Astronomy Picture of the Day (APOD)"
    ).length;

    const nasaLibraryFavorites = favorites.filter(
        (favorite) =>
            favorite.source === "NASA Image and Video Library"
    ).length;

    const recentFavorites = favorites.slice(0, 3);

    const today = new Date().toISOString().split("T")[0];

    let neoData = null;

    try {
        const apiKey = process.env.NASA_API_KEY;

        if (apiKey) {
            const neoUrl =
                `https://api.nasa.gov/neo/rest/v1/feed` +
                `?start_date=${today}` +
                `&end_date=${today}` +
                `&api_key=${apiKey}`;

            const neoResponse = await fetch(neoUrl, {
                cache: "no-store",
            });

            if (neoResponse.ok) {
                const contentType =
                    neoResponse.headers.get("content-type");

                if (contentType?.includes("application/json")) {
                    neoData = await neoResponse.json();
                }
            }
        }
    } catch (error) {
        console.error("Failed to load NEO data:", error);
    }

    const asteroids =
        neoData?.near_earth_objects?.[today] || [];

    const chartData = asteroids.map((asteroid: any) => ({
        name: asteroid.name,
        diameter:
        asteroid.estimated_diameter.meters
            .estimated_diameter_max,
    }));

    return (
        <main className="mx-auto max-w-6xl space-y-10">

            <div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    Space Explorer Dashboard
                </h1>
            </div>

            <section>
                <div className="mb-4">
                    <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                        Your collection
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-gray-500">
                            Total Favorites
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {totalFavorites}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-gray-500">
                            APOD Favorites
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {apodFavorites}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-gray-500">
                            NASA Library
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {nasaLibraryFavorites}
                        </p>
                    </div>

                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="mt-1 text-2xl font-semibold">
                        Near-Earth Objects
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Asteroids discovered near Earth on {today}.
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">

                    {chartData.length > 0 ? (
                        <NeoChart data={chartData} />
                    ) : (
                        <div className="py-10 text-center">
                            <p className="text-sm text-gray-500">
                                No near-Earth objects found.
                            </p>
                        </div>
                    )}

                </div>
            </section>

            <section>
                <div className="mb-4 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                            Recently saved
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold">
                            Recent Favorites
                        </h2>
                    </div>
                </div>

                {recentFavorites.length > 0 ? (
                    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">

                        {recentFavorites.map((favorite) => (
                            <article
                                key={favorite.id}
                                className="mb-5 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                            >
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

                                    <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white">
                                        {favorite.title}
                                    </h3>
                                </div>
                            </article>
                        ))}

                    </div>
                ) : (
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl">
                            ☆
                        </div>

                        <h3 className="mt-4 text-lg font-semibold">
                            No favorites yet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Explore NASA's collection and save something interesting.
                        </p>

                    </div>
                )}

            </section>

        </main>
    );
}