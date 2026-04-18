"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useRefreshOnMount() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.refresh();
    };
  }, []);
}

export function refreshGSAP() {
  if (typeof window !== "undefined") {
    ScrollTrigger.refresh();
  }
}