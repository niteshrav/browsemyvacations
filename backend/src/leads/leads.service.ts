import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import {
  stripHtmlTags,
  type CreateLeadInput,
  type CreateLeadNoteInput,
  type UpdateLeadStatusInput,
  LEAD_QUOTE_CONFIRMATION_MESSAGE,
} from "@bmv/shared";
import { LeadSource, LeadStatus, Prisma } from "@bmv/database";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { LEAD_NOTIFICATION_QUEUE, LEAD_ALERT_JOB } from "./leads.constants";

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue(LEAD_NOTIFICATION_QUEUE) private readonly notificationQueue: Queue,
  ) {}

  async create(input: CreateLeadInput) {
    let packageId: string | undefined;
    if (input.packageSlug) {
      const pkg = await this.prisma.client.package.findFirst({
        where: { slug: input.packageSlug, active: true },
      });
      if (!pkg) throw new NotFoundException("Package not found");
      packageId = pkg.id;
    }

    const lead = await this.prisma.client.lead.create({
      data: {
        fullName: stripHtmlTags(input.fullName),
        email: input.email.trim().toLowerCase(),
        phone: input.phone,
        travelDate: input.travelDate ? new Date(input.travelDate) : null,
        startCity: input.startCity ? stripHtmlTags(input.startCity) : null,
        endCity: input.endCity ? stripHtmlTags(input.endCity) : null,
        persons: input.persons ?? null,
        rooms: input.rooms ?? null,
        vehiclePreference: input.vehiclePreference
          ? stripHtmlTags(input.vehiclePreference)
          : null,
        message: input.message ? stripHtmlTags(input.message) : null,
        marketingConsent: input.marketingConsent ?? false,
        source: input.source as LeadSource,
        packageId: packageId ?? null,
        meterSnapshot: input.meterSnapshot
          ? (input.meterSnapshot as Prisma.InputJsonValue)
          : undefined,
        status: LeadStatus.new,
      },
      include: { package: { select: { id: true, title: true, slug: true } } },
    });

    await this.notificationQueue.add(LEAD_ALERT_JOB, { leadId: lead.id });

    return this.mapPublic(lead);
  }

  listAdmin(params?: { status?: LeadStatus }) {
    const where: Prisma.LeadWhereInput = {};
    if (params?.status) where.status = params.status;

    return this.prisma.client.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        package: { select: { id: true, title: true, slug: true } },
        notes: { orderBy: { createdAt: "desc" }, take: 5 },
      },
    });
  }

  async findByIdOrThrow(id: string) {
    const lead = await this.prisma.client.lead.findUnique({
      where: { id },
      include: {
        package: { select: { id: true, title: true, slug: true } },
        notes: { orderBy: { createdAt: "desc" } },
      },
    });
    if (!lead) throw new NotFoundException("Lead not found");
    return lead;
  }

  async updateStatus(id: string, input: UpdateLeadStatusInput) {
    await this.findByIdOrThrow(id);
    return this.prisma.client.lead.update({
      where: { id },
      data: { status: input.status as LeadStatus },
      include: { package: { select: { id: true, title: true, slug: true } } },
    });
  }

  async addNote(id: string, input: CreateLeadNoteInput) {
    await this.findByIdOrThrow(id);
    return this.prisma.client.leadNote.create({
      data: { leadId: id, author: input.author, content: input.content },
    });
  }

  async exportCsv(): Promise<string> {
    const rows = await this.prisma.client.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { package: { select: { title: true, slug: true } } },
    });

    const header = [
      "id",
      "createdAt",
      "status",
      "source",
      "fullName",
      "email",
      "phone",
      "package",
      "travelDate",
      "persons",
      "rooms",
      "marketingConsent",
    ];
    const lines = rows.map((r) =>
      [
        r.id,
        r.createdAt.toISOString(),
        r.status,
        r.source,
        csvEscape(r.fullName),
        csvEscape(r.email),
        csvEscape(r.phone),
        csvEscape(r.package?.title ?? ""),
        r.travelDate?.toISOString().slice(0, 10) ?? "",
        r.persons ?? "",
        r.rooms ?? "",
        r.marketingConsent ? "yes" : "no",
      ].join(","),
    );
    return [header.join(","), ...lines].join("\n");
  }

  private mapPublic(lead: {
    id: string;
    fullName: string;
    email: string;
    status: string;
    source: string;
    createdAt: Date;
    package: { id: string; title: string; slug: string } | null;
  }) {
    return {
      id: lead.id,
      fullName: lead.fullName,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt.toISOString(),
      package: lead.package,
      message: LEAD_QUOTE_CONFIRMATION_MESSAGE,
    };
  }
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
