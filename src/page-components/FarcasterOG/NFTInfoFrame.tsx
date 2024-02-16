import { Frame } from "frames.js";
import { concertOneFontData } from "../../assets/concertOneFont";
import { PLACEHOLDER_IMAGE_URL } from "../../constants/image";
import { getBase64JpegImage } from "../../utils/getBase64JpegImage";
import { readImageAsBase64 } from "../../utils/readImageAsBase64";
import {
  capitalizeFirstLetter,
  truncateWithEllipsis,
} from "../../utils/stringUtils";
import { TokenData } from "./types";

const calendarIconBase64 = readImageAsBase64(
  "./src/assets/FarcasterOG/calendar-icon.png",
  "image/png"
);

const blockchainIconBase64 = readImageAsBase64(
  "./src/assets/FarcasterOG/blockchain-icon.png",
  "image/png"
);

const usersIconBase64 = readImageAsBase64(
  "./src/assets/FarcasterOG/users-icon.png",
  "image/png"
);

export const getNftInfoFrameImage = async (tokenData: TokenData) => {
  const token = tokenData?.Token;
  const tokenTransfer = tokenData?.TokenTransfers?.TokenTransfer?.[0];

  const blockTimestamp = tokenTransfer?.blockTimestamp || "";

  const tokenNft = token?.tokenNfts?.[0];

  const tokenName = token?.name;

  const tokenBlockchain = capitalizeFirstLetter(token.blockchain);

  const tokenSupply = token?.totalSupply;

  const tokenImageUrl =
    tokenNft?.contentValue?.image?.small ||
    token?.logo?.small ||
    token?.contractMetaData?.image ||
    token?.projectDetails?.imageUrl ||
    PLACEHOLDER_IMAGE_URL;

  const description =
    tokenNft?.metaData?.description ||
    token?.contractMetaData?.description ||
    token?.projectDetails?.description ||
    "";

  const tokenDescription = description.startsWith("Released on")
    ? ""
    : truncateWithEllipsis(description, 210);

  const tokenReleaseDate = blockTimestamp.substring(0, 10);

  const component = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 30,
        width: "100%",
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom, #2c414b, #0f202d)",
        color: "white",
      }}
    >
      <div style={{ fontSize: 40 }}>Find the Farcaster OG&apos;s</div>
      <div
        style={{
          marginTop: 40,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <img
          alt="NftImage"
          src={tokenImageUrl}
          style={{ borderRadius: 18, objectFit: "cover" }}
          height={305}
          width={305}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 550,
            gap: 15,
          }}
        >
          <div style={{ fontSize: 30 }}>{tokenName}</div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <img alt="CalendarIcon" src={calendarIconBase64} height={24} />
            <span style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 24 }}>
              Released on {tokenReleaseDate}
            </span>
          </div>
          {!!tokenDescription && (
            <div style={{ color: "#FFFFFF99", fontSize: 24, lineHeight: 2 }}>
              {tokenDescription}
            </div>
          )}
          {tokenSupply ? (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <img alt="UsersIcon" src={usersIconBase64} height={24} />
              <span
                style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 24 }}
              >
                {tokenSupply} mints on {tokenBlockchain}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <img
                alt="BlockchainIcon"
                src={blockchainIconBase64}
                height={24}
              />
              <span
                style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 24 }}
              >
                Deployed on {tokenBlockchain}
              </span>
            </div>
          )}
        </div>
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

export const getNftInfoFrame = ({
  image,
  postUrl,
  downloadCsvLink,
  getApiLink,
}: {
  image: string;
  postUrl: string;
  downloadCsvLink: string;
  getApiLink: string;
}): Frame => {
  const frame: Frame = {
    version: "vNext",
    image,
    imageAspectRatio: "1.91:1",
    buttons: [
      {
        label: "Shuffle",
        action: "post",
      },
      {
        label: "Download CSV",
        action: "link",
        target: downloadCsvLink,
      },
      {
        label: "Get API",
        action: "link",
        target: getApiLink,
      },
    ],
    ogImage: image,
    postUrl,
  };

  return frame;
};
