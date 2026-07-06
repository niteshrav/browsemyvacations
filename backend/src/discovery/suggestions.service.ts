import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateSuggestionInput, UpdateSuggestionInput } from "@bmv/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SuggestionsService {
  constructor(private readonly prisma: PrismaService) {}

  listPublic() {
    return this.prisma.client.suggestion
      .findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" },
        include: {
          destination: { select: { slug: true } },
          package: { select: { slug: true } },
        },
      })
      .then((rows) => rows.map((row) => this.mapPublic(row)));
  }

  listAdmin() {
    return this.prisma.client.suggestion.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        destination: { select: { id: true, name: true, slug: true } },
        package: { select: { id: true, title: true, slug: true } },
      },
    });
  }

  async create(input: CreateSuggestionInput) {
    const row = await this.prisma.client.suggestion.create({ data: input });
    return row;
  }

  async update(id: string, input: UpdateSuggestionInput) {
    await this.findByIdOrThrow(id);
    return this.prisma.client.suggestion.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findByIdOrThrow(id);
    await this.prisma.client.suggestion.delete({ where: { id } });
  }

  private async findByIdOrThrow(id: string) {
    const row = await this.prisma.client.suggestion.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Suggestion not found");
    return row;
  }

  private mapPublic(row: {
    id: string;
    label: string;
    type: string;
    action: string;
    destination: { slug: string } | null;
    package: { slug: string } | null;
  }) {
    return {
      id: row.id,
      label: row.label,
      type: row.type,
      action: row.action,
      destinationSlug: row.destination?.slug ?? null,
      packageSlug: row.package?.slug ?? null,
    };
  }
}
