import DateSearch from "./dateSearch";
import ApodImage from "@/app/apod/apodImage";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ date?: string }>;
}) {
    const params = await searchParams;
    const date = params.date || new Date().toISOString().split("T")[0];

    const response = await fetch(
        `http://localhost:3000/api/apod?date=${date}`,
        { cache: "no-store" }
    );

    const data = await response.json();

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