"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { LocaleContext } from "./localeContext";
export default function TranslationProvider(props) {
    const [locale, setLocale] = React.useState({
        id: 'en_us',
        translations: {},
    });
    React.useEffect(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`/api/translations?lang=${props.locale}`);
            yield response.json();
            if (!response.ok) {
                const fallbackResponse = yield fetch('/api/translations/default');
                if (!fallbackResponse.ok) {
                    return console.error('Could not fetch translations');
                }
                const fallbackData = yield fallbackResponse.json();
                return setLocale({ id: 'fallback', translations: fallbackData });
            }
            const returnedData = yield response.json();
            setLocale({ id: props.locale, translations: returnedData });
        }))();
    }, [props.locale]);
    return React.createElement(LocaleContext.Provider, { value: locale }, props.children);
}
