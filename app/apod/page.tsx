import DateSearch from "./dateSearch";
import ApodImage from "@/app/apod/apodImage";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>;
}) {
    const params = await searchParams;

    const date =
        params.date || new Date().toISOString().split("T")[0];

    const apiKey = process.env.NASA_API_KEY;

    let data;

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`,
{
    cache: "no-store",
}
);

if (!response.ok) {
    throw new Error("NASA API request failed");
}

data = await response.json();
} catch (error) {
    console.error("Failed to load APOD:", error);

    return (
        <main className="mx-auto max-w-5xl">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
                Something went wrong loading the Astronomy Picture of the Day.
            </div>
        </main>
    );
}

return (
    <main className="mx-auto max-w-5xl space-y-8">

        <div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Astronomy Picture of the Day
            </h1>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <DateSearch />
        </div>

        <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

            <div className="overflow-hidden bg-black">
                <ApodImage
                    imageUrl={data.url}
                    title={data.title}
                    description={data.explanation}
                />
            </div>

            <div className="p-6 lg:p-8">

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-blue-400">
                        {date}
                    </p>

                    <h2 className="text-2xl font-semibold leading-tight">
                        {data.title}
                    </h2>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                        About this image
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-400">
                        {data.explanation}
                    </p>
                </div>

            </div>

        </article>

    </main>
);
}
