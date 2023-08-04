# NextJS Translations

An internationalization library built for the Next.js 13 `app` directory, which aims to be simple to setup and use

## Features
* Simple setup
* Automatic language detection (for server-side components)
* Client-side components that don't rely on Node.js libraries
* Locales can be imported from any source (such as JSON files, databases, external APIs, etc.)

## Installation

```bash
npm install nextjs-translations
```

(For client-side components)
```bash
npm install nextjs-translations-client
```

## Usage

```ts
//src/translations.ts

import { Translations } from 'nextjs-translations'

export const translations = new Translations({
  locales: [
    localeFromJSON('en', {
      'hello': 'Hello!',
      'hello-name': 'Hello, %%name%%!',
    }),
    localeFromJSON('zh', {
      'hello': '你好！',
      'hello-name': '你好，%%name%%！',
    })
  ],
  defaultLocale: 'en', // optional
})
```

Now, in your components/pages:

```tsx
//src/app/page.tsx

import { getT } from 'nextjs-translations'
import { translations } from '../translations'

export default function Page() {
  const t = getT(translations)

  return (
    <div>
      <h1>{t('hello')}</h1>
      <h2>{t('hello-name', { name: 'John' })}</h2>
    </div>
  )
}
```

### Client-side Components
Client-side pages and components (that have `"use client"`), have to use the client-side version of the `t()` function. Since code used here is frontend-only code, it has to be in a separate package that doesn't depend on native Node.js packages:

```bash
npm install nextjs-translations-client
```

First, the corresponding backend route has to be created:

```ts
//src/app/api/[...translations]/route.ts
import { translations } from "@/translations";
import { TranslationRoute } from "nextjs-translations";

export const GET = TranslationRoute(translations)
```

Then, the client has to be wrapped in a `TranslationsProvider`:

```tsx
"use client"

import { TranslationProvider } from "nextjs-translations-client"

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
```

Finally, the `t()` function can be used:

```tsx
"use client"

import { t } from "nextjs-translations-client"

export default function Page() {
  return (
    <main className="overflow-auto">
      <ul>
        <li>Language: en_us</li>
        <li>Example: {t('hello')}</li>
        <li>Example (with variable): {t('hello-name', { name: 'World' })}</li>
      </ul>
    </main>
  )
}
```
