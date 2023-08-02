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

/**
  * @class
  * A class to manage translations in your Next.js application
  *
  * @example
  * ```ts
  * import { Translations, localeFromJSON } from "nextjs-translations";
  * export const translations = new Translations({
  *   locales: [
  *     localeFromJSON('en', {
  *       'hello': 'Hello!',
  *       'hello-name': 'Hello, %%name%%!',
  *     })
  *   ]
  * })
  * ```
  */
export class Translations {
  public locales: Locale[];
  public defaultLocale: string;
  private localeIds: string[]
  _instance: Translations;

  /**
    * @constructor
    * @param options The options for the translations instance
    * @see TranslationInitializationOptions
    * @example
    * ```ts
    * import { Translations, localeFromJSON } from "nextjs-translations";
    * export const translations = new Translations({
    *   locales: [
    *     localeFromJSON('en', {
    *       'hello': 'Hello!',
    *       'hello-name': 'Hello, %%name%%!',
    *     })
    *   ],
    *   defaultLocale: 'en'
    * })
    * ```
    */

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

  /**
    * @function
    * Finds a locale from a language object (from accept-language-parser)
    * @param language The language object
    * @returns The locale ID or null if not found
    *
    */
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

  /**
    * @function
    * Returns an array of all the locale IDs
    */
  public getLocaleList(): string[] {
    return this.localeIds
  }
}
