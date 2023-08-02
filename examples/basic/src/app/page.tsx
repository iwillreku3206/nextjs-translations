import { translations } from '../translations'
import { getUserLanguageFromRequest, getT } from 'nextjs-translations'

export default function Home() {
  const t = getT(translations)

  return (
    <main className="overflow-auto">
      <ul>
        <li>Language: {getUserLanguageFromRequest(translations)}</li>
        <li>Example: {t('hello')}</li>
        <li>Example (with variable): {t('hello-name', { name: 'World' })}</li>
      </ul>
    </main>
  )
}
