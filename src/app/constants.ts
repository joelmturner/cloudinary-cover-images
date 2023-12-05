// some category colors and symbols
export const CATEGORY_COLOR_MAP: Record<
  "dev" | "life",
  { color: string; symbol: string }
> = {
  dev: {
    color: "ff9900",
    symbol: encodeURIComponent(` < > `),
  },
  life: {
    color: "f463f4",
    symbol: encodeURIComponent(` ~ `),
  },
};

// some author details
export const AUTHOR_ID_TO_DETAILS_MAP: Record<
  number,
  { name: string; publicId: string }
> = {
  1: {
    name: "Marla Peterson",
    // replace with your author portrait public id
    publicId: "demo blog cover images/author-avatar-1",
  },
  2: {
    name: "David Nix",
    // replace with your author portrait public id
    publicId: "demo blog cover images/author-avatar-2",
  },
};

export const BACKGROUND_PUBLIC_ID = "demo blog cover images/cover-image-bg"