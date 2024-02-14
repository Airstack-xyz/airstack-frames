import { NextRequest } from "next/server";
import { handleFrameRequest } from "../../../page-components/FarcasterOG/routeHandlers";

export async function POST(req: NextRequest) {
  return handleFrameRequest(req);
}
