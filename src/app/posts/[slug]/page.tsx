import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getCldImageUrl, getCldOgImageUrl } from "next-cloudinary";
import { generateCldImageOptions } from "@/app/helpers";
import Image from "next/image";
import { Avatar } from "./Avatar";
import { AUTHOR_ID_TO_DETAILS_MAP } from "@/app/constants";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const { title, category, author } = post;

  return {
    title,
    openGraph: {
      images: [
        getCldOgImageUrl(generateCldImageOptions({ title, category, author })),
      ],
    },
  };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const { title, category, author, coverImage } = post;

  const { name, publicId } = AUTHOR_ID_TO_DETAILS_MAP[author];

  const resolvedImage =
    coverImage ??
    getCldImageUrl(generateCldImageOptions({ title, category, author }));

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="flex flex-col gap-3 mb-8 text-center">
        {resolvedImage ? (
          <Image
            src={resolvedImage}
            className="mb-2"
            alt={title}
            width={800}
            height={400}
          />
        ) : null}
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2 items-center justify-center">
          <Avatar publicId={publicId} alt={`author ${name}`} />
          <p className="text-sm text-gray-600">
            {`By ${name} in category, ${category} on`}
          </p>
          <time dateTime={post.date} className="text-sm text-gray-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
      </div>
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </article>
  );
};

export default PostLayout;
