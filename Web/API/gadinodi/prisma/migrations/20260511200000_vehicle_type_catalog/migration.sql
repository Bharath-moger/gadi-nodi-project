-- Catalog for browse UX (slug pages + homepage imagery)
CREATE TABLE "VehicleTypeCatalog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleTypeCatalog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "VehicleTypeCatalog_slug_key" ON "VehicleTypeCatalog"("slug");
CREATE UNIQUE INDEX "VehicleTypeCatalog_code_key" ON "VehicleTypeCatalog"("code");
CREATE UNIQUE INDEX "VehicleTypeCatalog_sortOrder_key" ON "VehicleTypeCatalog"("sortOrder");
