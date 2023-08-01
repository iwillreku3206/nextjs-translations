import { translations } from '../translations'
import { getUserLanguageFromRequest } from 'nextjs-translations/dist/server/getUserLanguage'
import { getT } from 'nextjs-translations'

export default function Home() {
  const t = getT(translations)

  return (
    <main className="overflow-auto">
      <ul>
        <li>Language: {getUserLanguageFromRequest(translations)}</li>
        <li>Example: {t('hello')}</li>
      </ul>
    </main>
  )
}
