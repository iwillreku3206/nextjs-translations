import { NextRequest, NextResponse } from "next/server";
import { getUserLanguageFromRequest } from "nextjs-translations";

export async function GET(req: NextRequest) {
  return NextResponse.json({ 'text': getUserLanguageFromRequest() })
}
