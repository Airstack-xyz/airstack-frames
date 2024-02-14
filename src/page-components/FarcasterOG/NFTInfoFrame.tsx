import { fetchQuery, init } from "@airstack/node";
import { Frame } from "frames.js";
import { readFileSync } from "fs";
import { join } from "path";
import { AIRSTACK_API_KEY, BASE_URL } from "../../constants";
import { tokenDetailsQuery } from "../../queries/tokenDetails";
import { capitalizeFirstLetter, getEllipsisText } from "../../utils";
import { getBase64FrameImage } from "../../utils/getBase64FrameImage";
import { BlockchainIcon, CalendarIcon, MintsIcon } from "./Icons";
import { TOKENS } from "./data";
import { TokenDetailsQueryResponse } from "./types";

init(AIRSTACK_API_KEY);

const placeholderImageUrl = `${BASE_URL}/images/placeholder.svg`;

const concertOneFontPath = join(
  process.cwd(),
  "public/fonts/ConcertOne-Regular.ttf"
);
const concertOneFontData = readFileSync(concertOneFontPath);

export const getNFTInfoFrameImage = async ({
  tokenIndex,
}: {
  tokenIndex: number;
}) => {
  const nftItem = TOKENS[tokenIndex] || TOKENS[0];

  const { data } = await fetchQuery(tokenDetailsQuery, {
    address: nftItem.address,
    blockchain: nftItem.blockchain,
  });

  const queryData = data as TokenDetailsQueryResponse;

  const token = queryData?.Token;
  const tokenTransfer = queryData?.TokenTransfers?.TokenTransfer?.[0];

  const blockTimestamp = tokenTransfer?.blockTimestamp || "";

  const tokenNft = token?.tokenNfts?.[0];

  const tokenName = token?.name;

  const tokenBlockchain = capitalizeFirstLetter(nftItem.blockchain);

  const tokenSupply = token?.totalSupply;

  const tokenImageUrl =
    tokenNft?.contentValue?.image?.small ||
    token?.logo?.small ||
    token?.contractMetaData?.image ||
    token?.projectDetails?.imageUrl ||
    placeholderImageUrl;

  const description =
    tokenNft?.metaData?.description ||
    token?.contractMetaData?.description ||
    token?.projectDetails?.description ||
    "";

  const tokenDescription = description.startsWith("Released on")
    ? ""
    : getEllipsisText(description, 210);

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
        background: "#061523",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "160%",
          height: 342,
          top: -262,
          background: "#ABD7D8",
          opacity: 0.5,
          filter: "blur(250px)",
        }}
      />
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
          <div style={{ fontSize: 26 }}>{tokenName}</div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <CalendarIcon />
            <span style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 22 }}>
              Released on {tokenReleaseDate}
            </span>
          </div>
          {!!tokenDescription && (
            <div style={{ color: "#FFFFFF99", fontSize: 22, lineHeight: 2 }}>
              {tokenDescription}
            </div>
          )}
          {tokenSupply ? (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <MintsIcon />
              <span
                style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 22 }}
              >
                {tokenSupply} mints on {tokenBlockchain}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <BlockchainIcon />
              <span
                style={{ marginLeft: 10, color: "#FFFFFF99", fontSize: 22 }}
              >
                Deployed on {tokenBlockchain}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const base64Image = await getBase64FrameImage(component, {
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

export const getNFTInfoFrame = ({
  image,
  postUrl,
  downloadCSVLink,
  getAPILink,
}: {
  image: string;
  postUrl: string;
  downloadCSVLink: string;
  getAPILink: string;
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
        target: downloadCSVLink,
      },
      {
        label: "Get API",
        action: "link",
        target: getAPILink,
      },
    ],
    ogImage: image,
    postUrl,
  };

  return frame;
};
