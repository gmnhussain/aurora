import type { Metadata } from "next";
import { ContactPage } from "@/components/inner/ContactPage";

export const metadata: Metadata = {
  title: "Contact — G. M. Nazmul Hussain",
  description: "Get in touch for a full-time role, a freelance project or just to say hello.",
};

export default function Contact() {
  return <ContactPage />;
}
