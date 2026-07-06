import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { EmailService } from "./email.service";
import { LEAD_ALERT_JOB, LEAD_NOTIFICATION_QUEUE } from "./leads.constants";

@Processor(LEAD_NOTIFICATION_QUEUE)
export class LeadNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(LeadNotificationProcessor.name);

  constructor(private readonly email: EmailService) {
    super();
  }

  async process(job: Job<{ leadId: string }>): Promise<void> {
    if (job.name !== LEAD_ALERT_JOB) return;
    try {
      await this.email.sendLeadAlert(job.data.leadId);
    } catch (e) {
      this.logger.error(`Failed to send lead alert for ${job.data.leadId}`, e);
      throw e;
    }
  }
}
