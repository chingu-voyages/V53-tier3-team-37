import { NextRequest } from "next/server";
import { xssMiddleware } from "@/app/api/middlewares/xss";

export default async function middleware(req: NextRequest) {
  return xssMiddleware(req);
}
