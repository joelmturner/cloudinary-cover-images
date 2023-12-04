# Cloudinary Blog Cover Images

This is an example of how to create blog cover images on the fly with Next.js and Cloudinary

****

## Getting Started

First, create `.env.local` or `.env` and add your `cloudname` like the following, replacing "your-cloudname-here" with yours.

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudname-here"
```

Second, you will need a background image and avatars uploaded your Cloudinary media library. You can replace the avatar public ids in `AUTHOR_ID_TO_DETAILS_MAP` in `app/constants.ts`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Examples

`app/page.tsx` is an example of how to build the Cloudinary url for and image element/component.

`app/next-cloudinary/page.tsx` is an example of how to use the [next-cloudinary](https://github.com/colbyfayock/next-cloudinary) component to build and render the url.
