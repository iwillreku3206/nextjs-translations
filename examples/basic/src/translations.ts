import { Translations, localeFromJSON } from "nextjs-translations";

export const translations = new Translations({
  locales: [
    localeFromJSON('en', {
      'hello': 'Hello!',
      'hello-name': 'Hello, %%name%%!',
    }),
    localeFromJSON('zh', {
      'hello': '你好！',
      'hello-name': '你好，%%name%%！',
    })
  ]
})
