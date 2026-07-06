import { Module } from "@nestjs/common";
import { MediaModule } from "../media/media.module";
import { AdminDestinationsController } from "./admin-destinations.controller";
import { AdminPackagesController } from "./admin-packages.controller";
import { DestinationsService } from "./destinations.service";
import { PackagesService } from "./packages.service";
import { PublicCatalogController } from "./public-catalog.controller";

@Module({
  imports: [MediaModule],
  controllers: [PublicCatalogController, AdminDestinationsController, AdminPackagesController],
  providers: [DestinationsService, PackagesService],
  exports: [DestinationsService, PackagesService],
})
export class CatalogModule {}
