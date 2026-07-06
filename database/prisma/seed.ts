import {
  cityNameToSlug,
  getPackageBibleDestinationNames,
  HOME_QUICK_PICK_CITIES,
  PACKAGE_BIBLE_CATALOG,
  RAJASTHAN_TOURIST_CITIES,
  resolveAdminSeedCredentials,
  validateHomeQuickPickCities,
  validatePackageBibleCatalog,
  validatePilotCatalogForLaunch,
} from "@bmv/shared";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { SEED_IMAGES } from "./seed-images";

const prisma = new PrismaClient();

const EXTRA_DESTINATION_NAMES = ["Jawai"] as const;

async function main() {
  validatePackageBibleCatalog();
  validatePilotCatalogForLaunch(PACKAGE_BIBLE_CATALOG);
  validateHomeQuickPickCities();

  const { email: adminEmail, password: adminPassword } = resolveAdminSeedCredentials({
    ADMIN_SEED_EMAIL: process.env.ADMIN_SEED_EMAIL,
    ADMIN_SEED_PASSWORD: process.env.ADMIN_SEED_PASSWORD,
  });
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "BMV Admin", active: true },
    create: {
      email: adminEmail,
      passwordHash,
      name: "BMV Admin",
      role: "admin",
      active: true,
    },
  });

  const destinationIdByName = new Map<string, string>();
  let displayOrder = 1;

  for (const cityName of [...RAJASTHAN_TOURIST_CITIES, ...EXTRA_DESTINATION_NAMES]) {
    const slug = cityNameToSlug(cityName);
    const destination = await prisma.destination.upsert({
      where: { slug },
      update: {
        name: cityName,
        displayOrder,
        active: true,
        ...(slug === "udaipur" ? { imageUrl: SEED_IMAGES.destinationUdaipur } : {}),
      },
      create: {
        name: cityName,
        slug,
        displayOrder,
        active: true,
        imageUrl: slug === "udaipur" ? SEED_IMAGES.destinationUdaipur : null,
      },
    });
    destinationIdByName.set(cityName, destination.id);
    displayOrder += 1;
  }

  for (const pkg of PACKAGE_BIBLE_CATALOG) {
    const created = await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        title: pkg.title,
        categorySlug: pkg.categorySlug,
        categoryName: pkg.categoryName,
        displayOrder: pkg.displayOrder,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        shortDescription: pkg.shortDescription,
        priceFrom: pkg.priceFrom,
        priceIsFixed: false,
        images: pkg.images,
        active: true,
      },
      create: {
        title: pkg.title,
        slug: pkg.slug,
        categorySlug: pkg.categorySlug,
        categoryName: pkg.categoryName,
        displayOrder: pkg.displayOrder,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        shortDescription: pkg.shortDescription,
        priceFrom: pkg.priceFrom,
        priceIsFixed: false,
        images: pkg.images,
        active: true,
      },
    });

    const destinationNames = getPackageBibleDestinationNames(pkg);
    await prisma.packageDestination.deleteMany({ where: { packageId: created.id } });
    for (const destinationName of destinationNames) {
      const destinationId = destinationIdByName.get(destinationName);
      if (!destinationId) continue;
      await prisma.packageDestination.create({
        data: { packageId: created.id, destinationId },
      });
    }

    await prisma.itineraryDay.deleteMany({ where: { packageId: created.id } });
    for (const day of pkg.itinerary) {
      await prisma.itineraryDay.create({
        data: {
          packageId: created.id,
          dayNumber: day.dayNumber,
          title: day.title,
          cities: day.cities,
          summary: day.summary,
        },
      });
    }
  }

  const bibleSlugs = PACKAGE_BIBLE_CATALOG.map((pkg) => pkg.slug);
  await prisma.package.updateMany({
    where: { slug: { notIn: bibleSlugs } },
    data: { active: false },
  });

  const udaipur = destinationIdByName.get("Udaipur");
  if (!udaipur) throw new Error("Udaipur destination missing after seed");

  let meterConfig = await prisma.meterConfig.findFirst({ where: { name: "default" } });
  if (!meterConfig) {
    meterConfig = await prisma.meterConfig.create({
      data: {
        name: "default",
        active: true,
        currency: "INR",
        disclaimer:
          "This is an indicative estimate only. Final pricing is confirmed by our travel team after reviewing your itinerary.",
        outputMode: "range",
      },
    });
  } else {
    meterConfig = await prisma.meterConfig.update({
      where: { id: meterConfig.id },
      data: { active: true },
    });
  }
  await prisma.meterConfig.updateMany({
    where: { id: { not: meterConfig.id } },
    data: { active: false },
  });

  displayOrder = 1;
  for (const cityName of [...RAJASTHAN_TOURIST_CITIES, ...EXTRA_DESTINATION_NAMES]) {
    const destinationId = destinationIdByName.get(cityName);
    if (!destinationId) continue;
    await prisma.meterDestinationRate.upsert({
      where: {
        meterConfigId_destinationId: {
          meterConfigId: meterConfig.id,
          destinationId,
        },
      },
      update: { baseRatePerNight: 8500 },
      create: {
        meterConfigId: meterConfig.id,
        destinationId,
        baseRatePerNight: 8500,
      },
    });
    displayOrder += 1;
  }

  await prisma.meterVehicleTier.deleteMany({ where: { meterConfigId: meterConfig.id } });
  const tiers = [
    { name: "Sedan", multiplier: 1, displayOrder: 1 },
    { name: "SUV", multiplier: 1.15, displayOrder: 2 },
    { name: "Innova", multiplier: 1.25, displayOrder: 3 },
  ];
  for (const tier of tiers) {
    await prisma.meterVehicleTier.create({
      data: { meterConfigId: meterConfig.id, ...tier },
    });
  }

  await prisma.suggestion.deleteMany({ where: { type: "destination" } });
  for (const [index, cityName] of HOME_QUICK_PICK_CITIES.entries()) {
    const destinationId = destinationIdByName.get(cityName);
    if (!destinationId) {
      throw new Error(`Quick pick destination missing from seed: ${cityName}`);
    }
    await prisma.suggestion.create({
      data: {
        label: cityName,
        type: "destination",
        action: "filter",
        destinationId,
        displayOrder: index + 1,
        active: true,
      },
    });
  }

  console.log("Seed complete:", {
    adminEmail,
    destination: "udaipur",
    packages: PACKAGE_BIBLE_CATALOG.length,
    categories: [...new Set(PACKAGE_BIBLE_CATALOG.map((pkg) => pkg.categorySlug))].length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
