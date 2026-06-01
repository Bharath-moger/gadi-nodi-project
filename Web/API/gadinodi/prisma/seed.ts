import * as bcrypt from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";

import {
  featuredVehicleSlugs,
  marketStats,
  partnerTypes,
  sellerTypeSlugMap,
  vehicles,
} from "./seed-data";
import { sparePartsSeed } from "./spare-parts.seed";
import { vehicleTypeCatalogSeedRows } from "./vehicle-type-catalog.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (transaction) => {
    const marketStatLabels = marketStats.map((marketStat) => marketStat.label);
    const partnerTypeSlugs = partnerTypes.map((partnerType) => partnerType.slug);
    const vehicleSlugs = vehicles.map((vehicle) => vehicle.slug);
    const sparePartSlugs = sparePartsSeed.map((part) => part.slug);

    await transaction.sparePart.deleteMany({
      where: {
        slug: {
          notIn: sparePartSlugs,
        },
      },
    });

    await transaction.vehicle.deleteMany({
      where: {
        slug: {
          notIn: vehicleSlugs,
        },
      },
    });

    await transaction.partnerType.deleteMany({
      where: {
        slug: {
          notIn: partnerTypeSlugs,
        },
      },
    });

    await transaction.marketStat.deleteMany({
      where: {
        label: {
          notIn: marketStatLabels,
        },
      },
    });

    for (const [index, marketStat] of marketStats.entries()) {
      await transaction.marketStat.upsert({
        where: {
          label: marketStat.label,
        },
        update: {
          sortOrder: index,
          value: marketStat.value,
        },
        create: {
          sortOrder: index,
          label: marketStat.label,
          value: marketStat.value,
        },
      });
    }

    for (const partnerType of partnerTypes) {
      await transaction.partnerType.upsert({
        where: {
          slug: partnerType.slug,
        },
        update: {
          name: partnerType.name,
          shortLabel: partnerType.shortLabel,
          badge: partnerType.badge,
          description: partnerType.description,
          audience: partnerType.audience,
          highlights: partnerType.highlights,
          metrics: partnerType.metrics,
          ctaLabel: partnerType.ctaLabel,
        },
        create: {
          slug: partnerType.slug,
          name: partnerType.name,
          shortLabel: partnerType.shortLabel,
          badge: partnerType.badge,
          description: partnerType.description,
          audience: partnerType.audience,
          highlights: partnerType.highlights,
          metrics: partnerType.metrics,
          ctaLabel: partnerType.ctaLabel,
        },
      });
    }

    for (const row of vehicleTypeCatalogSeedRows) {
      await transaction.vehicleTypeCatalog.upsert({
        where: { slug: row.slug },
        update: {
          code: row.code,
          displayName: row.displayName,
          description: row.description,
          imageUrl: row.imageUrl,
          sortOrder: row.sortOrder,
        },
        create: {
          slug: row.slug,
          code: row.code,
          displayName: row.displayName,
          description: row.description,
          imageUrl: row.imageUrl,
          sortOrder: row.sortOrder,
        },
      });
    }

    const partnerTypeRows = await transaction.partnerType.findMany({
      select: {
        id: true,
        slug: true,
      },
    });
    const partnerTypeIdBySlug = Object.fromEntries(
      partnerTypeRows.map((partnerType) => [partnerType.slug, partnerType.id]),
    );

    for (const vehicle of vehicles) {
      const partnerTypeSlug = sellerTypeSlugMap[vehicle.sellerType];

      await transaction.vehicle.upsert({
        where: {
          slug: vehicle.slug,
        },
        update: {
          title: vehicle.title,
          subtitle: vehicle.subtitle,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          condition: vehicle.condition,
          price: vehicle.price,
          mileage: vehicle.mileage,
          fuel: vehicle.fuel,
          bodyStyle: vehicle.bodyStyle,
          transmission: vehicle.transmission,
          location: vehicle.location,
          sellerName: vehicle.sellerName,
          sellerType: vehicle.sellerType,
          description: vehicle.description,
          summary: vehicle.summary,
          color: vehicle.color,
          seats: vehicle.seats,
          financeEstimate: vehicle.financeEstimate,
          rating: vehicle.rating,
          heroTone: vehicle.heroTone,
          features: vehicle.features,
          specs: vehicle.specs,
          isFeatured: featuredVehicleSlugs.includes(vehicle.slug),
          partnerTypeId: partnerTypeSlug ? partnerTypeIdBySlug[partnerTypeSlug] : null,
        },
        create: {
          slug: vehicle.slug,
          title: vehicle.title,
          subtitle: vehicle.subtitle,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          condition: vehicle.condition,
          price: vehicle.price,
          mileage: vehicle.mileage,
          fuel: vehicle.fuel,
          bodyStyle: vehicle.bodyStyle,
          transmission: vehicle.transmission,
          location: vehicle.location,
          sellerName: vehicle.sellerName,
          sellerType: vehicle.sellerType,
          description: vehicle.description,
          summary: vehicle.summary,
          color: vehicle.color,
          seats: vehicle.seats,
          financeEstimate: vehicle.financeEstimate,
          rating: vehicle.rating,
          heroTone: vehicle.heroTone,
          features: vehicle.features,
          specs: vehicle.specs,
          isFeatured: featuredVehicleSlugs.includes(vehicle.slug),
          partnerTypeId: partnerTypeSlug ? partnerTypeIdBySlug[partnerTypeSlug] : null,
        },
      });
    }

    for (const part of sparePartsSeed) {
      await transaction.sparePart.upsert({
        where: { slug: part.slug },
        update: {
          title: part.title,
          subtitle: part.subtitle,
          category: part.category,
          partNumber: part.partNumber,
          condition: part.condition,
          price: part.price,
          location: part.location,
          sellerName: part.sellerName,
          sellerType: part.sellerType,
          compatibility: part.compatibility,
          description: part.description,
          summary: part.summary,
          warranty: part.warranty,
          features: part.features,
          heroTone: part.heroTone,
        },
        create: {
          slug: part.slug,
          title: part.title,
          subtitle: part.subtitle,
          category: part.category,
          partNumber: part.partNumber,
          condition: part.condition,
          price: part.price,
          location: part.location,
          sellerName: part.sellerName,
          sellerType: part.sellerType,
          compatibility: part.compatibility,
          description: part.description,
          summary: part.summary,
          warranty: part.warranty,
          features: part.features,
          heroTone: part.heroTone,
        },
      });
    }
  });

  const demoPassword = process.env.SEED_DEMO_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(demoPassword, 12);
  await prisma.user.upsert({
    where: { email: "demo@gadinodi.com" },
    update: { role: UserRole.Buyer, passwordHash, name: "Demo buyer" },
    create: {
      email: "demo@gadinodi.com",
      passwordHash,
      name: "Demo buyer",
      role: UserRole.Buyer,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@gadinodi.com" },
    update: { role: UserRole.Admin, passwordHash, name: "Application admin" },
    create: {
      email: "admin@gadinodi.com",
      passwordHash,
      name: "Application admin",
      role: UserRole.Admin,
    },
  });

  await prisma.user.upsert({
    where: { email: "superadmin@gadinodi.com" },
    update: { role: UserRole.Superadmin, passwordHash, name: "Super administrator" },
    create: {
      email: "superadmin@gadinodi.com",
      passwordHash,
      name: "Super administrator",
      role: UserRole.Superadmin,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
