/**
	*   A locale is a set of translations for a specific language
	*   @example
	*   ```ts
	*   {
	*     id: 'en_US',
	*     translations: {
	*       'hello_world': 'Hello, world!',
	*       'user_greeting': 'Hello, %%user%%!'
	*     }
	*   }
	*   ```
	*/
export type Locale = {
	/**
		*   The identifier of the locale. This value is case-sensitive
		*   @example `en_US`, `en_GB`, `zh_CN`, `en`, `de`
		*/
	id: string
	/**
		*   A list of key-value pairs with the translation key and value
		*   @example
		*   {
		*      "hello_world": "Hello, world!",
		*      "user_greeting": "Hello, %%user%%!"
		*   }
		*/
	translations: {
		[key: string]: string
	}
}

/**
	* Creates a locale from a JSON Object
	* @param id The identifier of the locale (i.e. `en_US`)
	* @param json The JSON Object
	* 
	* @example
	* ```ts
	*  import { localeFromJSON } from 'nextjs-translations'
	*  const locale = localeFromJSON('en_US', {
	*    'hello_world': 'Hello, world!',
	*    'user_greeting': 'Hello, %%user%%!'
	*  })
	* ```
	*/
export function localeFromJSON(id: string, json: { [key: string]: string} ): Locale {
	const allValuesString = Object.entries(json).reduce((prev, curr) => {
		return prev || typeof curr[1] !== "string";
	}, false);

	if (allValuesString) {
		throw new Error("All values in the JSON file must be strings");
	}

	return {
		id,
		translations: json
	};
}
