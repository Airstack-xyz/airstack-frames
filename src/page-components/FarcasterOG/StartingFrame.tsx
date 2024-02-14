import { Frame } from "frames.js";
import { FRAME_ENDPOINT, STARTING_FRAME_IMAGE_URL } from "./constants";

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
