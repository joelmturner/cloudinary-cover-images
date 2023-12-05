import Link from "next/link";
import Image from "next/image";
import { generateCldImageOptions } from "../helpers";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { getCldImageUrl } from "next-cloudinary";

function PostCard({
  title,
  category,
  author,
  url,
  date,
  coverImage,
  body,
}: Post) {
  // using next-cloudinary to generate the image URL
  // this can also be used for the OG image
  // see src/app/posts/[slug]/page.tsx generateMetadata()
  const resolvedImage =
    coverImage ??
    getCldImageUrl(generateCldImageOptions({ title, category, author }));

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
          width={800}
          height={400}
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
