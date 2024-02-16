import satori from "satori";
import type { SatoriOptions } from "satori";
import sharp from "sharp";
import { ReactElement } from "react";

export async function getBase64JpegImage(
  element: ReactElement,
  options: SatoriOptions
) {
  const svg = await satori(element, options);
  const svgBuffer = Buffer.from(svg);

  const jpeg = sharp(svgBuffer).jpeg();
  const jpegBuffer = await jpeg.toBuffer();
  const jpegBase64 = jpegBuffer.toString("base64");

  return `data:image/jpeg;base64,${jpegBase64}`;
}
