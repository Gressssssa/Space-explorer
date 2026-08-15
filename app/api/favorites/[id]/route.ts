import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const favorite = await prisma.favoritePhoto.findUnique({
            where: {
                id,
            },
        });

        if (!favorite) {
            return NextResponse.json(
                { error: "Favorite not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(favorite);

    } catch (error) {
        console.error("GET favorite error:", error);

        return NextResponse.json(
            { error: "Failed to get favorite" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const body = await request.json();

        const { note } = body;

        const favorite = await prisma.favoritePhoto.update({
            where: {
                id,
            },
            data: {
                note,
            },
        });

        return NextResponse.json(favorite);

    } catch (error) {
        console.error("PATCH favorite error:", error);

        return NextResponse.json(
            { error: "Failed to update favorite" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        console.log("DELETE requested for:", id);

        const favorite = await prisma.favoritePhoto.findUnique({
            where: {
                id,
            },
        });

        if (!favorite) {
            console.log("Favorite not found:", id);

            return NextResponse.json(
                { error: "Favorite not found" },
                { status: 404 }
            );
        }

        await prisma.favoritePhoto.delete({
            where: {
                id,
            },
        });

        console.log("Successfully deleted:", id);

        return NextResponse.json({
            message: "Favorite deleted successfully",
        });

    } catch (error) {
        console.error("DELETE favorite error:", error);

        return NextResponse.json(
            { error: "Failed to delete favorite" },
            { status: 500 }
        );
    }
}