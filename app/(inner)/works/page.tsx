import type { Metadata } from "next";
import { WorksIndex } from "@/components/inner/WorksIndex";

export const metadata: Metadata = {
  title: "Works — G. M. Nazmul Hussain",
  description: "Major projects and case studies from my recent work, from access control to commerce.",
};

export default function WorksPage() {
  return <WorksIndex />;
}
