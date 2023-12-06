import Link from "next/link";
import Image from "next/image";
import { generateCloudinaryUrl } from "./helpers";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";

function PostCard({
  title,
  category,
  author,
  url,
  date,
  coverImage,
  body,
}: Post) {
  // using a manually generated Cloudinary URL
  // gives us more control over the image
  // but can be more brittle
  const resolvedImage =
    coverImage ?? generateCloudinaryUrl({ title, category, author });

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
      <p className="prose bg-gray-700 p-4 mb-4">
        The post images below are using a manually generated Cloudinary URL. The
        URL is then passed to Next&apos;s image component. This gives us more
        control over the image but can be more brittle if we get something wrong
        in our template.
      </p>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </div>
  );
}
