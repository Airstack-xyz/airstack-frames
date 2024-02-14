import { BASE_URL } from "../../constants";

export const FRAME_ENDPOINT = `${BASE_URL}/og/frame`;

export const STARTING_FRAME_IMAGE_URL = `${BASE_URL}/images/FarcasterOG/starting-frame.png`;

export const FRAMES = {
  STARTING: "1",
  NFT_INFO: "2",
} as const;

export const NFT_INFO_ACTIONS = {
  SHUFFLE: "1",
  DOWNLOAD_CSV: "2",
  GET_API: "3",
} as const;
