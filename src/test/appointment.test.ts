import { describe, expect, it } from "vitest";
import { appointmentWhatsAppUrl, contact } from "@/components/site/content";

describe("WhatsApp appointment enquiries", () => {
  it("sends appointment enquiries to 77957 89428 with the Indian country code", () => {
    const url = new URL(appointmentWhatsAppUrl({ name: "Anita", phone: "9000000000", email: "anita@example.com", date: "2026-12-01", message: "Health coaching & nutrition" }));
    expect(url.origin + url.pathname).toBe("https://wa.me/917795789428");
    expect(contact.whatsappDigits).toBe("917795789428");
  });
  it("includes the completed appointment details in the WhatsApp message", () => {
    const url = new URL(appointmentWhatsAppUrl({ name: "Anita", phone: "9000000000", email: "anita@example.com", date: "2026-12-01", message: "Health coaching & nutrition" }));
    expect(url.searchParams.get("text")).toBe("Hello Dr. Amruta, I'd like to book an appointment.\nName: Anita\nPhone: 9000000000\nEmail: anita@example.com\nPreferred date: 2026-12-01\nMessage: Health coaching & nutrition");
  });
});