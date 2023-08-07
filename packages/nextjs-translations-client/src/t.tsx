import React from "react";
import { LocaleContext } from "./localeContext";

/**
	*   @function
	*   Client-side `t` function.
	*   Only use in client-side components (with `"use client"`).
	*   Gets translated text from the given key.
	*
	*   @param key Key from the translation file
	*   @param args Object that contains the values of template variables
	*
	*   @example `t('hello-name', { name: 'World' })`
	*
	*/
export default function t(key: string, args?: { [key: string]: string }) {
	const locale = React.useContext(LocaleContext);
	let value = locale?.translations[key] || key;
	if (!args) return value;
	for (const arg of Object.keys(args)) {
		value = value.replace(`%%${arg.trim()}%%`, args[arg]);
	}
	return value;
}
