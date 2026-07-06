import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { createLeadSchema } from "@bmv/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { LeadsService } from "./leads.service";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 3600000 } })
  @UsePipes(new ZodValidationPipe(createLeadSchema))
  create(@Body() body: ReturnType<typeof createLeadSchema.parse>): Promise<unknown> {
    return this.leads.create(body);
  }
}
