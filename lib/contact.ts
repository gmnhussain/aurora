/**
 * Contact form delivery.
 *
 * TODO: the site has no contact endpoint yet. Set CONTACT_ENDPOINT to a URL
 * that accepts a JSON POST of ContactMessage (your own API route, Formspree,
 * etc.) and the /contact form will start sending and show its success state.
 * Until then sendContact() rejects with ContactNotConfiguredError and the
 * form tells the visitor to use WhatsApp or the phone number instead.
 */
export const CONTACT_ENDPOINT: string | null = null;

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export class ContactNotConfiguredError extends Error {
  constructor() {
    super("No contact endpoint is configured.");
    this.name = "ContactNotConfiguredError";
  }
}

export async function sendContact(msg: ContactMessage): Promise<void> {
  if (!CONTACT_ENDPOINT) throw new ContactNotConfiguredError();
  const res = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(msg),
  });
  if (!res.ok) throw new Error(`Contact endpoint answered ${res.status}`);
}

export const CONTACT_TOPICS = ["a full-time role", "a freelance project", "a collaboration", "just saying hi"];

export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
