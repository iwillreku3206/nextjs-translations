"use client"

import { t } from "nextjs-translations"

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
