import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { DestinationsService } from "./destinations.service";
import { PackagesService } from "./packages.service";

@Controller()
export class PublicCatalogController {
  constructor(
    private readonly destinations: DestinationsService,
    private readonly packages: PackagesService,
  ) {}

  @Get("destinations")
  listDestinations(): Promise<unknown> {
    return this.destinations.listPublic();
  }

  @Get("packages")
  listPackages(@Query("destination") destination?: string): Promise<unknown> {
    return this.packages.listPublic(
      destination ? { destinationSlug: destination } : undefined,
    );
  }

  @Get("packages/:slug")
  async getPackage(@Param("slug") slug: string): Promise<unknown> {
    const pkg = await this.packages.findPublicBySlug(slug);
    if (!pkg) throw new NotFoundException("Package not found");
    return pkg;
  }
}
