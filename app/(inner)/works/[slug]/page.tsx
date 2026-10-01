import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/inner/CaseStudy";
import { WORKS, workBySlug } from "@/lib/works";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = workBySlug((await params).slug);
  if (!work) return {};
  return { title: `${work.title} — G. M. Nazmul Hussain`, description: work.sub };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!workBySlug(slug)) notFound();
  // Keyed so moving to the next project starts the page fresh.
  return <CaseStudy key={slug} slug={slug} />;
}
