-- CreateTable
CREATE TABLE "FavoritePhoto" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoritePhoto_pkey" PRIMARY KEY ("id")
);
