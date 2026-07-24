import { Controller, Get } from "@nestjs/common";
import { SiteContentService } from "./site-content.service";

@Controller("content")
export class PublicSiteContentController {
  constructor(private readonly content: SiteContentService) {}

  @Get()
  list(): Promise<unknown> {
    return this.content.listPublic();
  }
}
