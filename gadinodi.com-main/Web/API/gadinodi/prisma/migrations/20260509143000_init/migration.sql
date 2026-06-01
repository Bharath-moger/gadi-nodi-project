-- CreateEnum
CREATE TYPE "VehicleCondition" AS ENUM ('New', 'Used');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG');

-- CreateEnum
CREATE TYPE "BodyStyle" AS ENUM ('SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Bike');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('Automatic', 'Manual');

-- CreateTable
CREATE TABLE "MarketStat" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerType" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortLabel" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metrics" JSONB NOT NULL,
    "ctaLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "condition" "VehicleCondition" NOT NULL,
    "price" INTEGER NOT NULL,
    "mileage" TEXT NOT NULL,
    "fuel" "FuelType" NOT NULL,
    "bodyStyle" "BodyStyle" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "location" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "financeEstimate" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "heroTone" TEXT NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specs" JSONB NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "partnerTypeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarketStat_sortOrder_key" ON "MarketStat"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "MarketStat_label_key" ON "MarketStat"("label");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerType_slug_key" ON "PartnerType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE INDEX "Vehicle_bodyStyle_idx" ON "Vehicle"("bodyStyle");

-- CreateIndex
CREATE INDEX "Vehicle_condition_idx" ON "Vehicle"("condition");

-- CreateIndex
CREATE INDEX "Vehicle_fuel_idx" ON "Vehicle"("fuel");

-- CreateIndex
CREATE INDEX "Vehicle_sellerType_idx" ON "Vehicle"("sellerType");

-- CreateIndex
CREATE INDEX "Vehicle_isFeatured_idx" ON "Vehicle"("isFeatured");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_partnerTypeId_fkey" FOREIGN KEY ("partnerTypeId") REFERENCES "PartnerType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

