import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const apiKey = process.env.NASA_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "NASA_API_KEY is missing" },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);

        const date =
            searchParams.get("date") ||
            new Date().toISOString().split("T")[0];

        const url =
            `https://api.nasa.gov/planetary/apod` +
    `?api_key=${apiKey}` +
    `&date=${date}`;

const response = await fetch(url, {
    cache: "no-store",
});

const data = await response.json();

if (!response.ok) {
    console.error("NASA APOD ERROR:", data);

    return NextResponse.json(
        {
            error: "NASA API request failed",
            details: data,
        },
        { status: response.status }
    );
}

return NextResponse.json(data);

} catch (error) {
    console.error("APOD ROUTE ERROR:", error);

    return NextResponse.json(
        {
            error: "Something went wrong",
        },
        { status: 500 }
    );
}
}
