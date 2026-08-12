// The decorative FloatingPaths background animates pathLength/pathOffset, which
// are stroke geometry — they can't be GPU-composited, so each visible path costs
// main-thread work every frame. The homepage renders two of these sections (hero
// + grill), each with two mirrored instances, so the full-fat count is 4x this.
//
// Phones have the least headroom and the smallest canvas to show the texture on,
// so they get a reduced set. Read once at module load: this is purely decorative,
// and re-deriving it on resize isn't worth a listener on every instance.
export const FLOATING_PATH_COUNT =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
    ? 12
    : 36;
