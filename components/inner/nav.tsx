"use client";

import Link from "next/link";
import { createContext, useContext, type ComponentProps } from "react";

type InnerNav = { go: (href: string, label: string) => void };

/** Provided by InnerShell; null outside it, where links behave normally. */
export const InnerNavContext = createContext<InnerNav | null>(null);

export const useInnerNav = () => useContext(InnerNavContext);

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Shown on the curtain while the route changes. */
  label: string;
};

/**
 * next/link that runs the curtain transition before navigating. Modified
 * clicks (new tab etc.) keep the browser's default behaviour.
 */
export function InnerLink({ href, label, onClick, ...rest }: Props) {
  const nav = useInnerNav();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!nav || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        nav.go(href, label);
      }}
    />
  );
}
