import { useEffect } from 'react'

interface PageHeadProps {
  title: string
  description: string
  lang?: string
}

/**
 * Sets per-page <head> metadata. Under React 19, <title> and <meta> are
 * hoisted into <head> natively wherever they're rendered, so we simply return
 * them. The <html lang> attribute can't be hoisted (the element already
 * exists), so it's applied directly via an effect.
 */
const PageHead = ({ title, description, lang = 'en' }: PageHeadProps) => {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}

export default PageHead
