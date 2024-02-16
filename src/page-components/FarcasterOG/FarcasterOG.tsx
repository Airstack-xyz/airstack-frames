import { STARTING_FRAME_IMAGE_URL } from "./constants";

export function FarcasterOG() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#061523]">
      <div className="absolute top-[-260px] h-[308px] w-[95%] bg-[#ABD7D8] opacity-50 blur-[250px]" />
      <img
        alt="FrameImage"
        className="z-10 mx-4 max-h-[306px] rounded-md border border-[#3D3041]"
        src={STARTING_FRAME_IMAGE_URL}
      />
    </div>
  );
}
