-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "packages"
ADD COLUMN "discount_price" DECIMAL(12,2),
ADD COLUMN "cover_image" TEXT,
ADD COLUMN "why_book" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN "hotel_details" TEXT,
ADD COLUMN "meal_plan" TEXT,
ADD COLUMN "transport_details" TEXT,
ADD COLUMN "activities" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN "cancellation_policy" TEXT,
ADD COLUMN "terms_and_conditions" TEXT,
ADD COLUMN "faq" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN "pickup_location" TEXT,
ADD COLUMN "drop_location" TEXT,
ADD COLUMN "seo_title" TEXT,
ADD COLUMN "seo_description" TEXT,
ADD COLUMN "status" "PackageStatus" NOT NULL DEFAULT 'published',
ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "popular" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "suggestions" ADD COLUMN "image_url" TEXT;

-- CreateIndex
CREATE INDEX "packages_status_active_idx" ON "packages"("status", "active");

-- CreateIndex
CREATE INDEX "packages_featured_idx" ON "packages"("featured");
