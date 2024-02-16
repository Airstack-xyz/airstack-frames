import { readFileSync } from "fs";

export function readImageAsBase64(
  path: string,
  type: "image/png" | "image/jpeg" | "image/gif" = "image/png"
) {
  const fileBase64 = readFileSync(path, {
    encoding: "base64",
  });
  return `data:${type};base64,${fileBase64}`;
}
