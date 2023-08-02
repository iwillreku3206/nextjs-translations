"use client"

import TranslationProvider from "nextjs-translations-client/dist/src/translationProvider"

export default function ClientLayout({
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
