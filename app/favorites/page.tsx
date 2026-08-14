import FavoriteCard from "./FavoriteCard";

export default async function FavoritesPage() {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/favorites`, {
        cache: "no-store",
    });

    if (!response.ok) {
        return (
            <main className="mx-auto max-w-6xl">
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                    <h1 className="text-xl font-semibold">
                        My Favorites
                    </h1>

                    <p className="mt-2 text-sm text-red-400">
                        Something went wrong loading your favorites.
                    </p>
                </div>
            </main>
        );
    }

    const favorites = await response.json();

    return (
        <main className="mx-auto max-w-6xl space-y-8">

            <div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    My Favorites
                </h1>
            </div>



            {favorites.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-12 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl">
                        ☆
                    </div>

                    <h2 className="mt-4 text-lg font-semibold">
                        No saved discoveries yet
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                        Explore NASA's collection and save something
                        interesting to build your personal space gallery.
                    </p>

                </div>
            ) : (
                <section>
                    <div className="mb-4">
                        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                            Saved images
                        </p>
                    </div>

                    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
                        {favorites.map((favorite: any) => (
                            <div
                                key={favorite.id}
                                className="mb-5 break-inside-avoid overflow-hidden rounded-xl bg-white/[0.03] transition duration-300 hover:-translate-y-1"
                            >
                                <FavoriteCard favorite={favorite} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}