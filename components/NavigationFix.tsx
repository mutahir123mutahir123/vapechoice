"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationFix() {
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);
  const isFirstRender = useRef(true);

  const handleBackNavigation = useCallback(() => {
    const currentPath = window.location.pathname;
    
    if (lastPathRef.current === currentPath && !isFirstRender.current) {
      window.location.reload();
    }
    
    lastPathRef.current = currentPath;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastPathRef.current = pathname;
      window.scrollTo(0, 0);
      return;
    }

    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handlePopstate = () => {
      handleBackNavigation();
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [handleBackNavigation]);

  return null;
}