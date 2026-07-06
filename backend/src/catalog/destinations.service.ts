import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateDestinationInput, UpdateDestinationInput } from "@bmv/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DestinationsService {
  constructor(private readonly prisma: PrismaService) {}

  listPublic() {
    return this.prisma.client.destination.findMany({
      where: { active: true },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });
  }

  listAdmin() {
    return this.prisma.client.destination.findMany({
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });
  }

  async findByIdOrThrow(id: string) {
    const row = await this.prisma.client.destination.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Destination not found");
    return row;
  }

  async create(data: CreateDestinationInput) {
    try {
      return await this.prisma.client.destination.create({ data });
    } catch (e: unknown) {
      if (this.isUniqueViolation(e)) throw new ConflictException("Destination slug already exists");
      throw e;
    }
  }

  async update(id: string, data: UpdateDestinationInput) {
    await this.findByIdOrThrow(id);
    try {
      return await this.prisma.client.destination.update({ where: { id }, data });
    } catch (e: unknown) {
      if (this.isUniqueViolation(e)) throw new ConflictException("Destination slug already exists");
      throw e;
    }
  }

  private isUniqueViolation(e: unknown): boolean {
    return typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2002";
  }
}
