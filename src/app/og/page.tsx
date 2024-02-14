import { getFrameFlattened } from "frames.js";
import type { Metadata } from "next";
import { FarcasterOG } from "../../page-components/FarcasterOG/FarcasterOG";
import { STARTING_FRAME_IMAGE_URL } from "../../page-components/FarcasterOG/constants";
import { getStartingFrame } from "../../page-components/FarcasterOG/StartingFrame";

const startingFrame = getStartingFrame();

export const metadata: Metadata = {
  title: "Farcaster OG Frame",
  description:
    "This frame showcases airstack's token details apis, explorer and api-studio",
  openGraph: {
    images: [
      {
        url: `${STARTING_FRAME_IMAGE_URL}`,
      },
    ],
  },
  other: getFrameFlattened(startingFrame),
};

export default function FarcasterOGPage() {
  return <FarcasterOG />;
}
