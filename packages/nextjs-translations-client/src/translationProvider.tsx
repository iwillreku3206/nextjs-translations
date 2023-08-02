"use client"

import React from "react";
import { LocaleContext } from "./localeContext";
import { Locale } from "nextjs-translations";

export default function TranslationProvider(props: React.PropsWithChildren<{ locale: string }>) {
  const [locale, setLocale] = React.useState<Locale>({
    id: 'en_us',
    translations: {},
  });
  React.useEffect(() => {
    (async () => {
      const response = await fetch(`/api/translations?lang=${props.locale}`)
      await response.json()

      if (!response.ok) {
        const fallbackResponse = await fetch('/api/translations/default')

        if (!fallbackResponse.ok) {
          return console.error('Could not fetch translations')
        }

        const fallbackData = await fallbackResponse.json()
        return setLocale({ id: 'fallback', translations: fallbackData })
      }

      const returnedData = await response.json()
      setLocale({ id: props.locale, translations: returnedData })
    })()
  }, [props.locale])
  return <LocaleContext.Provider value={locale}>{props.children}</LocaleContext.Provider>;
}
