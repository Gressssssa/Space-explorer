import ImageSearch from "./imageSearch";
import MarsImage from "./MarsImage";

interface NasaImageItem {
    data: {
        title: string;
        nasa_id: string;
        description?: string;
    }[];
    links?: {
        href: string;
    }[];
}

export default async function ImagesPage({
                                             searchParams,
                                         }: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || "mars";

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(
        `${baseUrl}/api/mars-photos?q=${encodeURIComponent(query)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <main className="mx-auto max-w-6xl">
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
                    Something went wrong loading images.
                </div>
            </main>
        );
    }

    const data = await res.json();
    const items: NasaImageItem[] = data.collection?.items || [];

    return (
        <main className="mx-auto max-w-6xl space-y-8">

            <div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    NASA Image Library
                </h1>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <ImageSearch />
            </div>

            {items.length > 0 && (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Search results
                        </p>

                        <h2 className="text-xl font-semibold">
                            Images for "{query}"
                        </h2>
                    </div>
                </div>
            )}

            {items.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
                    <p className="text-gray-400">
                        No images found for "{query}".
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        Try searching for something else, like "galaxy",
                        "moon", or "astronaut".
                    </p>
                </div>
            ) : (
                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
                    {items.map((item) => {
                        const info = item.data[0];
                        const imgUrl = item.links?.[0]?.href;

                        if (!imgUrl) return null;

                        return (
                            <div
                                key={info.nasa_id}
                                className="mb-5 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                            >
                                <MarsImage
                                    imageUrl={imgUrl}
                                    title={info.title}
                                    description={info.description}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

        </main>
    );
}