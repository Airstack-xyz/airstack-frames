import { getFrameHtml, validateFrameMessage } from "frames.js";
import { NextRequest } from "next/server";
import {
  AIRSTACK_API_KEY,
  FARCASTER_HUB_ENDPOINT,
} from "../../constants/config";
import { getNftOwnersQuery } from "../../queries/nftOwnersQuery";
import { createApiStudioUrl } from "../../utils/createApiStudioUrl";
import { createTokenHoldersUrl } from "../../utils/createTokenHoldersUrl";
import { getRandomInteger } from "../../utils/numberUtils";
import { getNftInfoFrame, getNftInfoFrameImage } from "./NFTInfoFrame";
import { FRAMES, FRAME_ENDPOINT, NFT_INFO_BUTTONS } from "./constants";
import { TOKENS } from "./data";
import { fetchQuery, init } from "@airstack/node";
import { tokenDetailsQuery } from "../../queries/tokenDetails";

init(AIRSTACK_API_KEY);

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
    (framePage === FRAMES.NFT_INFO && buttonIndex === NFT_INFO_BUTTONS.SHUFFLE)
  ) {
    const nextTokenIndex =
      (tokenIndex + getRandomInteger(1, 5)) % TOKENS.length;

    const postUrl = `${FRAME_ENDPOINT}?f=${FRAMES.NFT_INFO}&i=${nextTokenIndex}`;

    const token = TOKENS[tokenIndex] || TOKENS[0];

    const { data, error } = await fetchQuery(tokenDetailsQuery, {
      address: token.address,
      blockchain: token.blockchain,
    });

    if (error) {
      return new Response("Fetch Error", { status: 500 });
    }

    const image = await getNftInfoFrameImage(data);

    const downloadCsvLink = createTokenHoldersUrl({
      label: token.name,
      address: token.address,
      type: token.tokenType,
      blockchain: token.blockchain,
    });

    const nftOwnersQuery = getNftOwnersQuery({
      tokenAddress: token.address,
      blockchain: token.blockchain,
    });

    const getApiLink = createApiStudioUrl(nftOwnersQuery, {
      limit: 20,
    });

    const frame = getNftInfoFrame({
      image,
      postUrl,
      downloadCsvLink,
      getApiLink,
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
