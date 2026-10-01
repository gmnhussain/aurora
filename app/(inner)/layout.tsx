import { InnerShell } from "@/components/inner/InnerShell";
import "../inner.css";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return <InnerShell>{children}</InnerShell>;
}
