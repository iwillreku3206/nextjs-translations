"use client"

import { TranslationProvider } from "nextjs-translations"

export default function ClientLayour({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TranslationProvider locale="en_us">
      {children}
    </TranslationProvider>
  )
}
