import { Module } from "@nestjs/common";
import { AdminMeterConfigController } from "./admin-meter-config.controller";
import { MeterController } from "./meter.controller";
import { MeterService } from "./meter.service";

@Module({
  controllers: [MeterController, AdminMeterConfigController],
  providers: [MeterService],
  exports: [MeterService],
})
export class MeterModule {}
