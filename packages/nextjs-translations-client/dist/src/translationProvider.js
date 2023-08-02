import React from "react";
import { LocaleContext } from "./localeContext";
export default function TranslationProvider(props) {
    const [locale, setLocale] = React.useState({
        id: 'en_us',
        translations: {},
    });
    React.useEffect(() => {
        fetch(`/api/translations?lang=${props.locale}`)
            .then((response) => response.json())
            .then((translations) => {
            setLocale({
                id: props.locale,
                translations,
            });
        });
    }, [props.locale]);
    return React.createElement(LocaleContext.Provider, { value: locale }, props.children);
}
