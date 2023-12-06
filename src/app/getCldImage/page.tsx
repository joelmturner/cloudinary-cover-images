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
          className="text-orange-200 hover:text-orange-400 dark:text-orange-200"
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
      <p className="prose bg-gray-700 p-4 mb-4">
        The post images below are using the <code>getCldImageUrl</code> utility
        from{" "}
        <a
          href="https://next.cloudinary.dev/"
          target="_blank"
          className="no-underline hover:underline text-purple-400"
        >
          next-cloudinary
        </a>
        . This utility makes it easy to create an image config that can be used
        in an image component/element and the{" "}
        <a
          href="https://next.cloudinary.dev/cldogimage/basic-usage"
          target="_blank"
          className="no-underline hover:underline text-purple-400"
        >
          CldOgImage
        </a>
        .
      </p>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </div>
  );
}
