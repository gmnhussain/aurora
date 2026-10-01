import type { Metadata } from "next";
import { InnerShell } from "@/components/inner/InnerShell";
import { NotFound } from "@/components/inner/NotFound";
import "./inner.css";

export const metadata: Metadata = {
  title: "Not found — G. M. Nazmul Hussain",
};

export default function NotFoundPage() {
  return (
    <InnerShell notFound>
      <NotFound />
    </InnerShell>
  );
}
