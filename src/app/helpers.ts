import { darken, lighten } from "polished";
import {
  AUTHOR_ID_TO_DETAILS_MAP,
  BACKGROUND_PUBLIC_ID,
  CATEGORY_COLOR_MAP,
} from "./constants";

// manual way to create the URL
// gives you the most control over the image but requires
// you to build the URL yourself without types
export function generateCloudinaryUrl({
  title,
  category,
  author,
}: {
  title: string;
  category: string;
  author: number;
}) {
  // get the color and symbol for the category
  const { color: categoryColor, symbol: categorySymbol } =
    CATEGORY_COLOR_MAP[(category ?? "dev") as "dev" | "life"];
  // get the name and public ID for the author
  const { name, publicId } = AUTHOR_ID_TO_DETAILS_MAP[author];
  // darken the color a bit for the title so it has enough contrast
  const titleColor = darken(0.2, `#${categoryColor}`).replace("#", "");
  // lighten the color a bit for the symbol so it has enough contrast
  const symbolColor = lighten(0.3, `#${categoryColor}`).replace("#", "");

  // styles for the background image
  const baseImageProperties = `e_colorize:20,co_rgb:${categoryColor}`;

  // specify the root of the URL
  const root = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  // add the text and position it to the right 50ish percent
  const titleText = `l_text:arial_164:${encodeURIComponent(
    title
  )},g_west,co_rgb:${titleColor},x_832,y_0,w_1152,h_896,c_fit`;

  // add the author name and position it center aligned with gravity center to place it just under the avatar
  const authorName = `l_text:arial_62_center:${encodeURIComponent(
    name
  )},g_center,co_rgb:${titleColor},x_-601,y_384,w_640,h_512,c_fit`;

  // add the avatar and position it to the left of the background, rounded
  const avatar = `l_${encodeURIComponent(
    publicId.replace("/", ":")
  )},g_west,x_102,y_0,w_640,h_640,c_fit,r_max`;

  // add the symbol and position it on the top left of the avatar, rounded with background color
  const symbol = `l_text:arial_154_bold_center:${categorySymbol},g_north_west,x_140,y_140,w_192,h_192,c_scale,r_max,b_rgb:${categoryColor},co_rgb:${symbolColor},fl_text_no_trim`;

  // combine all the pieces into a single URL
  return `${root}/${baseImageProperties}/${avatar}/${authorName}/${symbol}/${titleText}/${BACKGROUND_PUBLIC_ID}`;
}

// config to pass to next-cloudinary utils
// pass into getCldImageUrl and getCldOgImageUrl
export function generateCldImageOptions({
  title,
  category,
  author,
}: {
  title: string;
  category: string;
  author: number;
}) {
  // get the color and symbol for the category
  const { color: categoryColor, symbol: categorySymbol } =
    CATEGORY_COLOR_MAP[(category ?? "dev") as "dev" | "life"];
  // darken the color a bit for the title so it has enough contrast
  const titleColor = darken(0.2, `#${categoryColor}`).replace("#", "");
  // lighten the color a bit for the symbol so it has enough contrast
  const symbolColor = lighten(0.3, `#${categoryColor}`).replace("#", "");

  // get the name and public ID for the author
  const { name, publicId } = AUTHOR_ID_TO_DETAILS_MAP[author];

  return {
    width: "2048",
    height: "1024",
    overlays: [
      {
        // avatar
        publicId,
        position: {
          gravity: "west",
          x: 102,
          y: 0,
        },
        effects: [{ width: 640, height: 640, crop: "fit", radius: "max" }],
      },
      {
        // author name
        text: {
          text: name,
          fontSize: 62,
          color: `#${titleColor}`,
          fontFamily: "Arial",
          textAlign: "center",
        },
        position: {
          gravity: "center",
          x: -601,
          y: 384,
        },
        effects: [{ width: 1152, height: 896, crop: "fit" }],
      },
      {
        // category symbol
        text: {
          text: categorySymbol,
          fontSize: 154,
          color: `#${symbolColor}`,
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
        },
        position: {
          gravity: "north_west",
          x: 140,
          y: 140,
        },
        effects: [
          {
            width: 192,
            height: 192,
            crop: "scale",
            background: `rgb:${categoryColor}`,
            radius: "max",
          },
        ],
      },
      {
        // title
        text: {
          text: title,
          fontSize: 164,
          color: `#${titleColor}`,
          fontFamily: "Arial",
        },
        position: {
          gravity: "west",
          x: 832,
          y: 0,
        },
        effects: [{ width: 1152, height: 896, crop: "fit" }],
      },
    ],
    alt: "Description of my image",
    sizes: "100vw",
    // background image and color styles
    src: BACKGROUND_PUBLIC_ID,
    effects: [
      {
        colorize: 20,
        color: `rgb:${categoryColor}`,
      },
    ],
  };
}
