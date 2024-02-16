import { Frame } from "frames.js";
import { concertOneFontData } from "../../assets/concertOneFont";
import { getBase64JpegImage } from "../../utils/getBase64JpegImage";
import { readImageAsBase64 } from "../../utils/readImageAsBase64";
import { FRAME_ENDPOINT, STARTING_FRAME_IMAGE_URL } from "./constants";

const nftCollectionBase64 = readImageAsBase64(
  "./src/assets/FarcasterOG/nft-collection.png",
  "image/png"
);

export const getStartingFrameImage = async () => {
  const component = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        width: "100%",
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom, #2c414b, #0f202d)",
        color: "white",
      }}
    >
      <img alt="NftCollection" src={nftCollectionBase64} height={320} />
      <div style={{ marginTop: 12, marginBottom: 30, fontSize: 40 }}>
        Find the Farcaster OG&apos;s!
      </div>
    </div>
  );

  const base64Image = await getBase64JpegImage(component, {
    width: 955,
    height: 500,
    fonts: [
      {
        name: "Concert One",
        data: concertOneFontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  return base64Image;
};

export const getStartingFrame = (): Frame => {
  const frame: Frame = {
    version: "vNext",
    image: `${STARTING_FRAME_IMAGE_URL}`,
    imageAspectRatio: "1.91:1",
    buttons: [
      {
        label: "Go!",
        action: "post",
      },
    ],
    postUrl: `${FRAME_ENDPOINT}`,
  };

  return frame;
};
