import { Module } from "@nestjs/common";
import { AdminLeadsController } from "./admin-leads.controller";
import { EmailService } from "./email.service";
import { LeadsController } from "./leads.controller";
import { LeadsService } from "./leads.service";

@Module({
  controllers: [LeadsController, AdminLeadsController],
  providers: [LeadsService, EmailService],
  exports: [LeadsService],
})
export class LeadsModule {}
