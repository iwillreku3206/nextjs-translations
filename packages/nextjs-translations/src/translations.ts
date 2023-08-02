import { Language } from "accept-language-parser";
import { Locale } from "./locale";

export interface TranslationInitializationOptions {
  /**
    *   A list of locales/languages in your application
    *   @see Locale
    */
  locales: Locale[];
  /**
    *   The ID of the default locale
    */
  defaultLocale?: string;
}

export class Translations {
  public locales: Locale[];
  public defaultLocale: string;
  private localeIds: string[]
  _instance: Translations;

  public constructor(options: TranslationInitializationOptions) {
    if (!options.locales || options.locales.length === 0) {
      throw new Error('You must provide at least one locale');
    }

    if (!options.defaultLocale) {
      options.defaultLocale = options.locales[0].id;
    }

    if (!options.locales.find((l) => l.id === options.defaultLocale)) {
      throw new Error('The default locale must be included in the locales array');
    }

    this.locales = options.locales;
    this.localeIds = this.locales.map(locale => locale.id)
    this.defaultLocale = options.defaultLocale;
    this._instance = this;
  }

  public findLanguage(language: Language) {
    if (!language.region) {
      return this.localeIds.includes(language.code) ? language.code : null
    }
    const withDash = `${language.code.toLowerCase()}-${language.region.toLowerCase()}`
    const withUnderscore = `${language.code.toLowerCase()}_${language.region.toLowerCase()}`
    if (this.localeIds.includes(withDash)) {
      return withDash
    } else if (this.localeIds.includes(withUnderscore)) {
      return withUnderscore
    } else {
      return this.localeIds.includes(language.code) ? language.code : null
    }
  }

  public getLocaleList(): string[] {
    return this.localeIds
  }
}
