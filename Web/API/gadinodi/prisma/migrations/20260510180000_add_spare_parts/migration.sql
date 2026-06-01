-- CreateTable
CREATE TABLE "SparePart" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "partNumber" TEXT,
    "condition" "VehicleCondition" NOT NULL,
    "price" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerType" TEXT NOT NULL,
    "compatibility" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "warranty" TEXT,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "heroTone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SparePart_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SparePart_slug_key" ON "SparePart"("slug");
CREATE INDEX "SparePart_category_idx" ON "SparePart"("category");
CREATE INDEX "SparePart_condition_idx" ON "SparePart"("condition");
