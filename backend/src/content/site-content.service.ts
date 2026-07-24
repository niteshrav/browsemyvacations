import { Injectable, NotFoundException } from "@nestjs/common";
import {
  SITE_CONTENT_DEFAULTS,
  SITE_CONTENT_KEYS,
  type SiteContentKey,
  type UpdateSiteContentInput,
  type UpsertSiteContentInput,
} from "@bmv/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SiteContentService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureDefaults() {
    await Promise.all(
      SITE_CONTENT_KEYS.map(async (key) => {
        const defaults = SITE_CONTENT_DEFAULTS[key];
        await this.prisma.client.siteContent.upsert({
          where: { key },
          create: { key, title: defaults.title, body: defaults.body },
          update: {},
        });
      }),
    );
  }

  async listAdmin() {
    await this.ensureDefaults();
    return this.prisma.client.siteContent.findMany({ orderBy: { key: "asc" } });
  }

  async listPublic() {
    await this.ensureDefaults();
    const rows = await this.prisma.client.siteContent.findMany({
      where: { key: { in: [...SITE_CONTENT_KEYS] } },
      orderBy: { key: "asc" },
    });
    return Object.fromEntries(rows.map((row) => [row.key, row.body])) as Record<SiteContentKey, string>;
  }

  async getByKey(key: string) {
    await this.ensureDefaults();
    const row = await this.prisma.client.siteContent.findUnique({ where: { key } });
    if (!row) throw new NotFoundException("Site content not found");
    return row;
  }

  async upsert(input: UpsertSiteContentInput) {
    const defaults = SITE_CONTENT_DEFAULTS[input.key];
    return this.prisma.client.siteContent.upsert({
      where: { key: input.key },
      create: {
        key: input.key,
        title: input.title ?? defaults.title,
        body: input.body,
      },
      update: {
        title: input.title === undefined ? undefined : input.title,
        body: input.body,
      },
    });
  }

  async update(key: string, input: UpdateSiteContentInput) {
    await this.getByKey(key);
    return this.prisma.client.siteContent.update({
      where: { key },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.body !== undefined ? { body: input.body } : {}),
      },
    });
  }

  async reset(key: SiteContentKey) {
    const defaults = SITE_CONTENT_DEFAULTS[key];
    return this.prisma.client.siteContent.upsert({
      where: { key },
      create: { key, title: defaults.title, body: defaults.body },
      update: { title: defaults.title, body: defaults.body },
    });
  }
}
