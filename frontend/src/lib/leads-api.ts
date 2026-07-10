import { getApiUrl } from "./api";

export const API_UNREACHABLE_MESSAGE =
  "Unable to reach our booking server. Please call us or message on WhatsApp — your details are safe to try again once the server is back.";

export type CreateLeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  travelDate?: string;
  startCity?: string;
  endCity?: string;
  persons?: number;
  rooms?: number;
  vehiclePreference?: string;
  message?: string;
  source: "package_card" | "package_detail" | "vacation_meter" | "contact" | "mice";
  packageSlug?: string;
  meterSnapshot?: Record<string, unknown>;
  marketingConsent?: boolean;
};

export type CreateLeadResponse = {
  id: string;
  message: string;
};

export async function submitLead(payload: CreateLeadPayload): Promise<CreateLeadResponse> {
  let res: Response;
  try {
    res = await fetch(getApiUrl("/leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(API_UNREACHABLE_MESSAGE);
    }
    throw error;
  }
  const data = (await res.json().catch(() => ({}))) as CreateLeadResponse & {
    message?: unknown;
  };
  if (!res.ok) {
    let msg = "Could not submit your request. Please check the form and try again.";
    if (res.status >= 500) {
      msg = "Our server is temporarily unavailable. Please try again in a moment or contact us directly.";
    } else if (typeof data.message === "string") {
      msg = data.message;
    } else if (data.message && typeof data.message === "object") {
      const flat = data.message as { formErrors?: string[]; fieldErrors?: Record<string, string[]> };
      const parts = [
        ...(flat.formErrors ?? []),
        ...Object.values(flat.fieldErrors ?? {}).flat(),
      ];
      if (parts.length) msg = parts.join(". ");
    }
    throw new Error(msg);
  }
  return data;
}
