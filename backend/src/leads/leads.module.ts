import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AdminLeadsController } from "./admin-leads.controller";
import { EmailService } from "./email.service";
import { LeadNotificationProcessor } from "./lead-notification.processor";
import { LEAD_NOTIFICATION_QUEUE } from "./leads.constants";
import { LeadsController } from "./leads.controller";
import { LeadsService } from "./leads.service";

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: { url: config.get("REDIS_URL", "redis://localhost:6379") },
      }),
    }),
    BullModule.registerQueue({ name: LEAD_NOTIFICATION_QUEUE }),
  ],
  controllers: [LeadsController, AdminLeadsController],
  providers: [LeadsService, EmailService, LeadNotificationProcessor],
  exports: [LeadsService],
})
export class LeadsModule {}
