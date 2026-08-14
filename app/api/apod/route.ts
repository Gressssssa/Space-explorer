import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const apiKey = process.env.NASA_API_KEY;

        const { searchParams } = new URL(request.url);

        const date = searchParams.get("date");

        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

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
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}