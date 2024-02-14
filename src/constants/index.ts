export const AIRSTACK_API_KEY = process.env["AIRSTACK_API_KEY"] || "";

export const FARCASTER_HUB_ENDPOINT =
  process.env["FARCASTER_HUB_ENDPOINT"] || "https://nemes.farcaster.xyz:2281";

export const BASE_URL = process.env["BASE_URL"] || "http://localhost:3000";

export const IS_DEV = process.env.NODE_ENV === "development";
