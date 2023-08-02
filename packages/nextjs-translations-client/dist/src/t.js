import React from "react";
import { LocaleContext } from "./localeContext";
export default function t(key, args) {
    const locale = React.useContext(LocaleContext);
    let value = (locale === null || locale === void 0 ? void 0 : locale.translations[key]) || key;
    if (!args)
        return value;
    for (const arg of Object.keys(args)) {
        value = value.replace(`%%${arg.trim()}%%`, args[arg]);
    }
    return value;
}
