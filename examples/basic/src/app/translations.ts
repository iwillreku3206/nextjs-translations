import { Translations, localeFromJSON } from "nextjs-translations";

export const translations = new Translations({
  locales: [
    localeFromJSON('en', {
      'hello': 'Hello!'
    }),
    localeFromJSON('zh', {
      'hello': '你好！'
    })
  ]
})
