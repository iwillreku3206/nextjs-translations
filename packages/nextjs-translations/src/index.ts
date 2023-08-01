import { Translations } from "./translations"
import { Locale, localeFromJSON } from "./locale"
import { getUserLanguageFromRequest } from "./server/getUserLanguage"
import getT from "./server/t"
import TranslationRoute from "./server/translationRoute"
import TranslationProvider from "./client/translationProvider"
import t from "./client/t"

export {
  Translations,
  Locale,
  localeFromJSON,
  getUserLanguageFromRequest,
  getT,
  TranslationRoute,
  TranslationProvider,
  t
}
