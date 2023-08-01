import { cookies, headers } from 'next/headers'
import alParser from 'accept-language-parser'
import { Translations } from '..'

export function getUserLanguageFromRequest(t: Translations) {
  const acceptLanguage = headers().get('accept-language')
  let preferredLanguage = t.defaultLocale
  if (acceptLanguage) {
    const languages = alParser.parse(acceptLanguage)
    for (const language of languages) {
      const findLanguage = t.findLanguage(language)
      if (findLanguage) {
        preferredLanguage = findLanguage
        break
      }
    }
  }

  const languageCookie = cookies().get('_nextjs_translations_locale')?.value
  if (languageCookie) {
    const languages = alParser.parse(languageCookie)
    for (const language of languages) {
      const findLanguage = t.findLanguage(language)
      if (findLanguage) {
        preferredLanguage = findLanguage
        break
      }
    }
  }

  return preferredLanguage
}
