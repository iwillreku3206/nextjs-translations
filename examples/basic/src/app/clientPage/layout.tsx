"use client"

import TranslationProvider from "nextjs-translations-client/dist/src/translationProvider"

export default function ClientLayour({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TranslationProvider locale="test">
      {children}
    </TranslationProvider>
  )
}
