import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  SITE_CONTENT_KEYS,
  type SiteContentKey,
  updateSiteContentSchema,
  upsertSiteContentSchema,
} from "@bmv/shared";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { SiteContentService } from "./site-content.service";

@Controller("admin/content")
@UseGuards(JwtAuthGuard)
export class AdminSiteContentController {
  constructor(private readonly content: SiteContentService) {}

  @Get()
  list(): Promise<unknown> {
    return this.content.listAdmin();
  }

  @Get(":key")
  get(@Param("key") key: string): Promise<unknown> {
    return this.content.getByKey(decodeURIComponent(key));
  }

  @Post()
  upsert(
    @Body(new ZodValidationPipe(upsertSiteContentSchema))
    body: ReturnType<typeof upsertSiteContentSchema.parse>,
  ): Promise<unknown> {
    return this.content.upsert(body);
  }

  @Patch(":key")
  update(
    @Param("key") key: string,
    @Body(new ZodValidationPipe(updateSiteContentSchema))
    body: ReturnType<typeof updateSiteContentSchema.parse>,
  ): Promise<unknown> {
    return this.content.update(decodeURIComponent(key), body);
  }

  @Post(":key/reset")
  reset(@Param("key") key: string): Promise<unknown> {
    const decoded = decodeURIComponent(key);
    if (!SITE_CONTENT_KEYS.includes(decoded as SiteContentKey)) {
      return this.content.getByKey(decoded);
    }
    return this.content.reset(decoded as SiteContentKey);
  }
}
