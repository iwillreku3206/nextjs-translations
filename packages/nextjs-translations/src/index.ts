import { Translations } from "./translations"
import { Locale, localeFromJSON } from "./locale"
import { getUserLanguageFromRequest } from './server/getUserLanguage'
import getT from './server/t'

const server = {
  getUserLanguageFromRequest,
  getT
}

export {
  Translations,
  Locale,
  localeFromJSON,
  server
}
