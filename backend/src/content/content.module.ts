import { Module } from "@nestjs/common";
import { AdminSiteContentController } from "./admin-site-content.controller";
import { PublicSiteContentController } from "./public-site-content.controller";
import { SiteContentService } from "./site-content.service";

@Module({
  controllers: [AdminSiteContentController, PublicSiteContentController],
  providers: [SiteContentService],
  exports: [SiteContentService],
})
export class ContentModule {}
