import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "horizontal" | "vertical" | "rectangle";
  fullWidthResponsive?: boolean;
  className?: string;
}

const AdSense = ({ adSlot, adFormat = "auto", fullWidthResponsive = true, className = "" }: AdSenseProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const el = adRef.current;
    if (!el || typeof window === "undefined") return;

    const pushAd = () => {
      if (pushedRef.current) return;
      try {
        const availableWidth = el.offsetWidth;
        if (availableWidth > 0) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    // Wait for the next layout tick so the parent has had a chance to render
    // with a real width before we push the ad request.
    const rafId = requestAnimationFrame(() => {
      pushAd();
    });

    // Watch for the container to gain a nonzero width (e.g. inside a flex/grid
    // parent that lays out asynchronously).
    let resizeObserver: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect?.width ?? (entry.target as HTMLElement).offsetWidth;
          if (width > 0) {
            pushAd();
          }
        }
      });
      resizeObserver.observe(el);
    }

    // Final fallback in case ResizeObserver isn't supported or fires early.
    const timeoutId = setTimeout(pushAd, 500);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", width: "100%", minWidth: "250px", minHeight: "90px" }}
      data-ad-client="ca-pub-3449344307223523"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
};

export default AdSense;
