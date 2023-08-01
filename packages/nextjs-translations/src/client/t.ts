import React from "react"
import { LocaleContext } from "./localeContext"

export default function t(key: string, args?: { [key: string]: any }) {
  const locale = React.useContext(LocaleContext)
  let value = locale?.translations[key] || key
  if (!args) return value
  for (const arg of Object.keys(args)) {
    value = value.replace(`%%${arg.trim()}%%`, args[arg])
  }
  return value
}
