import React from "react";
import { LocaleContext } from "./localeContext";
import { Locale } from "..";

export default function TranslationProvider(props: React.PropsWithChildren<{ locale: string }>) {
  const [locale, setLocale] = React.useState<Locale>({
    id: 'en_us',
    translations: {},
  });
  React.useEffect(() => {
    fetch(`/locales/${props.locale}.json`)
      .then((response) => response.json())
      .then((translations) => {
        setLocale({
          id: props.locale,
          translations,
        });
      });
  }, [props.locale])
  return <LocaleContext.Provider value={locale}>{props.children}</LocaleContext.Provider>;
}
