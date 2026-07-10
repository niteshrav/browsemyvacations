-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "marketing_consent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "category_name" TEXT NOT NULL DEFAULT 'Custom Packages',
ADD COLUMN     "category_slug" TEXT NOT NULL DEFAULT 'custom',
ADD COLUMN     "display_order" INTEGER NOT NULL DEFAULT 0;
