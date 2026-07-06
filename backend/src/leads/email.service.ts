import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend | null;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const apiKey = this.config.get<string>("RESEND_API_KEY");
    this.resend = apiKey ? new Resend(apiKey) : null;
  }

  async sendLeadAlert(leadId: string): Promise<boolean> {
    const lead = await this.prisma.client.lead.findUnique({
      where: { id: leadId },
      include: { package: { select: { title: true, slug: true } } },
    });
    if (!lead) {
      this.logger.warn(`Lead ${leadId} not found for email alert`);
      return false;
    }

    const to = this.config.get<string>("OPS_EMAIL_TO", "sales@browsemyvacations.com");
    const from = this.config.get<string>(
      "OPS_EMAIL_FROM",
      "Browse My Vacations <noreply@browsemyvacations.com>",
    );

    const subject = `New lead: ${lead.fullName} (${lead.source})`;
    const html = `
      <h2>New quote / inquiry</h2>
      <p><strong>Name:</strong> ${lead.fullName}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
      ${lead.package ? `<p><strong>Package:</strong> ${lead.package.title}</p>` : ""}
      ${lead.travelDate ? `<p><strong>Travel date:</strong> ${lead.travelDate.toISOString().slice(0, 10)}</p>` : ""}
      ${lead.startCity ? `<p><strong>Start city:</strong> ${lead.startCity}</p>` : ""}
      ${lead.endCity ? `<p><strong>End city:</strong> ${lead.endCity}</p>` : ""}
      ${lead.persons ? `<p><strong>Persons:</strong> ${lead.persons}</p>` : ""}
      ${lead.rooms ? `<p><strong>Rooms:</strong> ${lead.rooms}</p>` : ""}
      ${lead.vehiclePreference ? `<p><strong>Vehicle:</strong> ${lead.vehiclePreference}</p>` : ""}
      ${lead.message ? `<p><strong>Message:</strong><br/>${lead.message}</p>` : ""}
    `;

    if (!this.resend) {
      this.logger.log(`Resend not configured; skipped email for lead ${leadId}`);
      await this.prisma.client.lead.update({
        where: { id: leadId },
        data: { notificationSent: false },
      });
      return false;
    }

    const { error } = await this.resend.emails.send({ from, to, subject, html });
    if (error) {
      this.logger.error(`Resend error for lead ${leadId}: ${error.message}`);
      throw new Error(error.message);
    }

    await this.prisma.client.lead.update({
      where: { id: leadId },
      data: { notificationSent: true },
    });
    return true;
  }
}
