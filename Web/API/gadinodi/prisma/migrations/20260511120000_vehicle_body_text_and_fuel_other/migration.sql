-- Extend fuel enum for human-powered / N/A listings (e.g. bicycles)
ALTER TYPE "FuelType" ADD VALUE 'Other';

-- Replace BodyStyle enum with free-form vehicle type strings (bicycle … industrial equipment)
ALTER TABLE "Vehicle" ALTER COLUMN "bodyStyle" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "bodyStyle" TYPE TEXT USING ("bodyStyle"::text);

UPDATE "Vehicle" SET "bodyStyle" = 'Motorcycle' WHERE "bodyStyle" = 'Bike';

DROP TYPE IF EXISTS "BodyStyle";
