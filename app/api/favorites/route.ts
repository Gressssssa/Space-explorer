import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const favorites = await prisma.favoritePhoto.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(favorites);

    } catch (error) {
        console.error("GET favorites error:", error);

        return NextResponse.json(
            {
                error: "Failed to get favorites",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            source,
            imageUrl,
            title,
            description,
            metadata,
            note,
        } = body;

        if (!source || !imageUrl || !title) {
            return NextResponse.json(
                {
                    error: "source, imageUrl and title are required",
                },
                { status: 400 }
            );
        }

        const favorite = await prisma.favoritePhoto.create({
            data: {
                source,
                imageUrl,
                title,
                description,
                metadata,
                note,
            },
        });

        return NextResponse.json(favorite, { status: 201 });

    } catch (error) {
        console.error("POST favorite error:", error);

        return NextResponse.json(
            {
                error: "Failed to save favorite",
            },
            { status: 500 }
        );
    }
}