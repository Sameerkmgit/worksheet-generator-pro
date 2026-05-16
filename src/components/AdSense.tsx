// AdSense ad slots are temporarily disabled while the site is under AdSense review.
// The verification script in index.html stays so Google can crawl the site for approval.
// After approval, restore this component from git history to re-enable ad slots.

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "horizontal" | "vertical" | "rectangle";
  fullWidthResponsive?: boolean;
  className?: string;
}

const AdSense = (_props: AdSenseProps) => null;

export default AdSense;
