import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const apiKey = process.env.NASA_API_KEY;

        const { searchParams } = new URL(request.url);

        const start_date =
            searchParams.get("start_date") ||
            new Date().toISOString().split("T")[0];

        const end_date =
            searchParams.get("end_date") ||
            start_date;

        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch data from NASA" },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error("NeoWs error:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}