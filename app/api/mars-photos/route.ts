import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "mars";

    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("NASA Images API error:", response.status, errorBody);

            return NextResponse.json(
                { error: "NASA Images API request failed" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Images fetch threw:", error);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}