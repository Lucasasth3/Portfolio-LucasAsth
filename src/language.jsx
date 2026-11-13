import { useEffect, useState } from 'react'
import { LanguageContext } from './languageContext'
const storageKey = 'portfolio-language'

function readLanguage() {
  try {
    return localStorage.getItem(storageKey) === 'pt' ? 'pt' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage)
  const locale = language === 'pt' ? 'pt-BR' : 'en-US'

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = language === 'pt' ? 'Lucas Asth — Portfólio' : 'Lucas Asth — Portfolio'
    try {
      localStorage.setItem(storageKey, language)
    } catch {
      // The selected language still works for this visit.
    }
  }, [language])

  const text = (english, portuguese) => language === 'pt' ? portuguese : english

  return (
    <LanguageContext.Provider value={{ language, locale, setLanguage, text }}>
      {children}
    </LanguageContext.Provider>
  )
}
