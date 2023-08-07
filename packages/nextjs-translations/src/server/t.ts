import { Translations } from "..";
import { getUserLanguageFromRequest } from "./getUserLanguage";

/**
	*   @function
	*   Returns a `t` function that can be used in server-side components.
	*
	*   @param translations Translations Object
	*   @example
	*   ```ts
	*   import { getT, Translations } from 'nextjs-translations'
	*   const translations = new Translations({ ... }) // Your translations
	*   const t = getT(translations)
	*   ```
	*
	*/
export default function getT(translations: Translations) {
	/**
		*   @function
		*   Client-side `t` function.
		*   Only use in server-side components.
		*   Gets translated text from the given key. Locale is determined from the request.
		*
		*   @param key Key from the translation file
		*   @param args Object that contains the values of template variables
		*
		*   @example `t('hello-name', { name: 'World' })`
		*/
	function t(key: string, args?: { [key: string]: string }) {
		const language = getUserLanguageFromRequest(translations);
		const locale = translations.locales.find(locale => locale.id === language);
		let value = locale?.translations[key] || key;
		if (!args) return value;
		for (const arg of Object.keys(args)) {
			value = value.replace(`%%${arg.trim()}%%`, args[arg]);
		}
		return value;
	}

	return t;
}
