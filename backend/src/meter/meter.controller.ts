import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { calculateMeterSchema } from "@bmv/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { MeterService } from "./meter.service";

@Controller("meter")
export class MeterController {
  constructor(private readonly meter: MeterService) {}

  @Get("options")
  getOptions(): Promise<unknown> {
    return this.meter.getOptions();
  }

  @Post("calculate")
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 30, ttl: 3600000 } })
  @UsePipes(new ZodValidationPipe(calculateMeterSchema))
  calculate(@Body() body: ReturnType<typeof calculateMeterSchema.parse>): Promise<unknown> {
    return this.meter.calculate(body);
  }
}
