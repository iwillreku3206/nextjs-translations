"use client"

import t from "nextjs-translations-client/dist/src/t"

export default function Page() {
  return (
    <main className="overflow-auto">
      <ul>
        <li>Language: en_us</li>
        <li>Example: {t('hello')}</li>
      </ul>
    </main>
  )
}
