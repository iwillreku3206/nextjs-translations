import { NextApiHandler } from "next";
import { Translations } from "..";
import { NextRequest, NextResponse } from "next/server";

export default function TranslationRoute(translations: Translations) {
  return (req: NextRequest) => {
    const lang = req.nextUrl.searchParams.get('lang')
    if (!lang) {
      return NextResponse.json({ "error": "No locale provided" })
    }

    const locale = translations.locales.find(loc => loc.id === lang)

    if (!locale) {
      return NextResponse.json({ "error": "Locale not found" })
    }

    return NextResponse.json(locale.translations)
  }
}
