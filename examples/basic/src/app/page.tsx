import getConfig from 'next/config'
import Image from 'next/image'
import { translations } from './translations'
import { getUserLanguageFromRequest } from 'nextjs-translations/dist/server/getUserLanguage'
import getT from 'nextjs-translations/dist/server/t'

export default function Home() {
  const cfg = getConfig()
  const t = getT(translations)
  console.log()

  return (
    <main className="overflow-auto">
      <ul>
        <li>Language: {getUserLanguageFromRequest(translations)}</li>
        <li>Example: {t('hello')}</li>
      </ul>
    </main>
  )
}
