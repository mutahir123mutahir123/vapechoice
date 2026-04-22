"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationFix() {
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}