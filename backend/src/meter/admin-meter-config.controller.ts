import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { updateMeterConfigSchema } from "@bmv/shared";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { MeterService } from "./meter.service";

@Controller("admin/meter-config")
@UseGuards(JwtAuthGuard)
export class AdminMeterConfigController {
  constructor(private readonly meter: MeterService) {}

  @Get()
  get(): Promise<unknown> {
    return this.meter.getAdminConfig();
  }

  @Patch()
  update(
    @Body(new ZodValidationPipe(updateMeterConfigSchema))
    body: ReturnType<typeof updateMeterConfigSchema.parse>,
  ): Promise<unknown> {
    return this.meter.updateConfig(body);
  }
}
