import Link from "next/link";
import Image from "next/image";
import { darken, lighten } from "polished";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import {
  AUTHOR_ID_TO_DETAILS_MAP,
  BACKGROUND_PUBLIC_ID,
  CATEGORY_COLOR_MAP,
} from "./constants";

function generateCloudinaryUrl({
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
  const text = `l_text:arial_164:${encodeURIComponent(
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
  return `${root}/${baseImageProperties}/${avatar}/${authorName}/${symbol}/${text}/${BACKGROUND_PUBLIC_ID}`;
}

function PostCard({
  title,
  category,
  author,
  url,
  date,
  coverImage,
  body,
}: Post) {
  const resolvedImage =
    coverImage ?? generateCloudinaryUrl({ title, category, author });

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

      {resolvedImage ? (
        <Image
          src={resolvedImage}
          className="mb-2"
          alt={title}
          width={600}
          height={200}
        />
      ) : null}

      <div
        className="mt-4 text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: body.html }}
      />
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Using Next Image</h1>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </div>
  );
}
