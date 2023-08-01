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

export function localeFromJSON(id: string, json: any): Locale {
  const allValuesString = Object.entries(json).reduce((prev, curr) => {
    return prev || typeof curr[1] !== 'string'
  }, false)

  if (allValuesString) {
    throw new Error('All values in the JSON file must be strings')
  }

  return {
    id,
    translations: json
  }
}
