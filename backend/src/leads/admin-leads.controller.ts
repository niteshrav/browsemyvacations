import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import type { LeadStatus } from "@bmv/database";
import { createLeadNoteSchema, leadStatusSchema, updateLeadStatusSchema } from "@bmv/shared";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { LeadsService } from "./leads.service";

@Controller("admin/leads")
@UseGuards(JwtAuthGuard)
export class AdminLeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Get()
  list(@Query("status") status?: string): Promise<unknown> {
    const parsed = status ? leadStatusSchema.safeParse(status) : null;
    return this.leads.listAdmin(parsed?.success ? { status: parsed.data as LeadStatus } : undefined);
  }

  @Get("export")
  @Header("Content-Type", "text/csv; charset=utf-8")
  @Header("Content-Disposition", 'attachment; filename="leads.csv"')
  exportCsv(): Promise<string> {
    return this.leads.exportCsv();
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<unknown> {
    return this.leads.findByIdOrThrow(id);
  }

  @Patch(":id")
  updateStatus(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateLeadStatusSchema))
    body: ReturnType<typeof updateLeadStatusSchema.parse>,
  ): Promise<unknown> {
    return this.leads.updateStatus(id, body);
  }

  @Post(":id/notes")
  addNote(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(createLeadNoteSchema))
    body: ReturnType<typeof createLeadNoteSchema.parse>,
  ): Promise<unknown> {
    return this.leads.addNote(id, body);
  }
}
