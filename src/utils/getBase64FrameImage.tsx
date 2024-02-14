import { ImageResponse } from "@vercel/og";
import { ImageResponseOptions } from "next/server";
import { ReactElement } from "react";

export async function getBase64FrameImage(
  element: ReactElement,
  options?: ImageResponseOptions
) {
  const imgResponse = new ImageResponse(element, {
    width: 955,
    height: 500,
    ...options,
  });

  const imgBuffer = await imgResponse.arrayBuffer();

  const imgBase64 = Buffer.from(imgBuffer).toString("base64");

  return `data:image/png;base64,${imgBase64}`;
}
