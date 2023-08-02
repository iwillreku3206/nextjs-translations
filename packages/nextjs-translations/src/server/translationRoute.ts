import { Translations } from "..";
import { NextRequest, NextResponse } from "next/server";
import alParser from 'accept-language-parser'

export default function TranslationRoute(translations: Translations) {
  return (req: NextRequest) => {
    const lang = req.nextUrl.searchParams.get('lang')
    if (!lang) {
      return NextResponse.json({ "error": "No locale provided" })
    }

    const localeId = translations.findLanguage(alParser.parse(lang)[0])

    if (!localeId) {
      return NextResponse.json({ "error": "Locale not found" }, { status: 404 })
    }

    const locale = translations.locales.find((l) => l.id === localeId)

    if (!locale) {
      return NextResponse.json({ "error": "Locale not found" }, { status: 404 })
    }

    return NextResponse.json(locale.translations)
  }
}
