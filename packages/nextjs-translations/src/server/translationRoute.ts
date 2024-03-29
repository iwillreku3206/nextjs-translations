import { Locale, Translations } from "..";
import { NextRequest, NextResponse } from "next/server";
import alParser from "accept-language-parser";

/**
  * @function
  * Adds various routes to your Next.js application to allow you to access your translations from the client-side
  * @param translations The translations instance
  * @returns A Next.js route handler
  * @example
  * `app/api/[...translations]/route.ts`
  * ```ts
  * import { TranslationRoute } from 'nextjs-translations'
  * import { translations } from '@/translations'
  *
  * export const GET = TranslationRoute(translations)
  * ````
  */
export default function TranslationRoute(translations: Translations) {
	return (req: NextRequest, context: { params: { translations: string[] } }) => {
		const route = context.params.translations;
		if (route.length === 1) {

			const lang = req.nextUrl.searchParams.get("lang");
			if (!lang) {
				return NextResponse.json({ "error": "No locale provided" });
			}

			const localeId = translations.findLanguage(alParser.parse(lang)[0]);

			if (!localeId) {
				return NextResponse.json({ "error": "Locale not found" }, { status: 404 });
			}

			const locale = translations.locales.find((l) => l.id === localeId);

			if (!locale) {
				return NextResponse.json({ "error": "Locale not found" }, { status: 404 });
			}

			return NextResponse.json(locale.translations);
		}

		if (route[1] === "list") {
			return NextResponse.json(translations.getLocaleList());
		}

		if (route[1] === "default") {
			return NextResponse.json((translations.locales.find((l) => l.id === translations.defaultLocale) as Locale).translations);
		}

		return NextResponse.json({ "error": "Not found" }, { status: 404 });
	};
}
