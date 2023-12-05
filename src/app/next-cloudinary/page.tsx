"use client";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { darken, lighten } from "polished";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import {
  AUTHOR_ID_TO_DETAILS_MAP,
  BACKGROUND_PUBLIC_ID,
  CATEGORY_COLOR_MAP,
} from "../constants";

function PostCard({
  title,
  category,
  author,
  url,
  date,
  coverImage,
  body,
}: Post) {
  // get the color and symbol for the category
  const { color: categoryColor, symbol: categorySymbol } =
    CATEGORY_COLOR_MAP[(category ?? "dev") as "dev" | "life"];
  // darken the color a bit for the title so it has enough contrast
  const titleColor = darken(0.2, `#${categoryColor}`).replace("#", "");
  // lighten the color a bit for the symbol so it has enough contrast
  const symbolColor = lighten(0.3, `#${categoryColor}`).replace("#", "");

  // get the name and public ID for the author
  const { name, publicId } = AUTHOR_ID_TO_DETAILS_MAP[author];

  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {title}
        </Link>
      </h2>
      <time dateTime={date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(date), "LLLL d, yyyy")}
      </time>

      {coverImage ? (
        <CldImage
          width="800"
          height="400"
          src={coverImage}
          alt="Description of my image"
          sizes="100vw"
          preserveTransformations={true}
        />
      ) : (
        <CldImage
          width="2048"
          height="1024"
          overlays={[
            {
              // avatar
              publicId,
              position: {
                gravity: "west",
                x: 102,
                y: 0,
              },
              effects: [
                { width: 640, height: 640, crop: "fit", radius: "max" },
              ],
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
          ]}
          alt="Description of my image"
          sizes="100vw"
          // background image and color styles
          src={BACKGROUND_PUBLIC_ID}
          effects={[
            {
              colorize: 20,
              color: `rgb:${categoryColor}`,
            },
          ]}
        />
      )}

      <div
        className="mt-4 text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: body.html }}
      />
    </div>
  );
}

export default function PostImage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Using next-cloudinary
      </h1>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </div>
  );
}
