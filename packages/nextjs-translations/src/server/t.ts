import { Translations } from "..";
import { getUserLanguageFromRequest } from "./getUserLanguage";

export default function getT(translations: Translations) {
  return function t(key: string, args?: { [key: string]: any }) {
    const language = getUserLanguageFromRequest(translations)
    const locale = translations.locales.find(locale => locale.id === language)
    let value = locale?.translations[key] || key
    if (!args) return value
    for (const arg of Object.keys(args)) {
      value = value.replace(`%%${arg.trim()}%%`, args[arg])
    }
    return value
  }
}
