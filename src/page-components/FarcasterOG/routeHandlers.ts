import { getFrameHtml, validateFrameMessage } from "frames.js";
import { NextRequest } from "next/server";
import { FARCASTER_HUB_ENDPOINT } from "../../constants";
import { getNftOwnersQuery } from "../../queries/nftOwnersQuery";
import { getRandomInteger } from "../../utils";
import { createAppUrlWithQuery } from "../../utils/createAppUrlWithQuery";
import { getNFTInfoFrame, getNFTInfoFrameImage } from "./NFTInfoFrame";
import { FRAMES, FRAME_ENDPOINT, NFT_INFO_ACTIONS } from "./constants";
import { TOKENS } from "./data";

export const handleFrameRequest = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const body = await req.json();

  // Parse and validate the frame message
  const { isValid, message } = await validateFrameMessage(body, {
    hubHttpUrl: FARCASTER_HUB_ENDPOINT,
  });
  if (!isValid || !message) {
    return new Response("Invalid message", { status: 400 });
  }

  const framePage = searchParams.get("f") || FRAMES.STARTING;

  const tokenIndex = searchParams.has("i")
    ? Number(searchParams.get("i"))
    : getRandomInteger(0, TOKENS.length - 1);

  const buttonIndex = String(message.data.frameActionBody.buttonIndex);

  // Logic for handling starting frame page or shuffle action on NFT info frame
  if (
    framePage === FRAMES.STARTING ||
    (framePage === FRAMES.NFT_INFO && buttonIndex === NFT_INFO_ACTIONS.SHUFFLE)
  ) {
    const nextTokenIndex =
      (tokenIndex + getRandomInteger(1, 5)) % TOKENS.length;

    const nftToken = TOKENS[tokenIndex] || TOKENS[0];

    const postUrl = `${FRAME_ENDPOINT}?f=${FRAMES.NFT_INFO}&i=${nextTokenIndex}`;

    const image = await getNFTInfoFrameImage({ tokenIndex });

    const downloadCSVLink = nftToken.explorerLink;

    const nftOwnersQuery = getNftOwnersQuery({
      tokenAddress: nftToken.address,
      blockchain: nftToken.blockchain,
    });

    const getAPILink = createAppUrlWithQuery(nftOwnersQuery, {
      limit: 20,
    });

    const frame = getNFTInfoFrame({
      image,
      postUrl,
      downloadCSVLink,
      getAPILink,
    });

    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }

  return new Response("Invalid message", { status: 400 });
};
