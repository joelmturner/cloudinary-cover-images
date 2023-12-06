"use client";

import { CldImage } from "next-cloudinary";

export function Avatar({ publicId, alt }: { publicId: string; alt: string }) {
  return (
    <CldImage
      src={publicId}
      className="rounded-full"
      width={24}
      height={24}
      crop="fill"
      gravity="face"
      alt="Avatar"
    />
  );
}
