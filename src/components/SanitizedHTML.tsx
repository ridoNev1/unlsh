import { useMemo } from "react"
import type { ComponentPropsWithoutRef, ElementType } from "react"
import DOMPurify from "dompurify"

type SanitizedHTMLProps<T extends ElementType = "div"> = {
  html?: string | null
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, "children" | "dangerouslySetInnerHTML">

export const SanitizedHTML = <T extends ElementType = "div">({
  html,
  as,
  ...rest
}: SanitizedHTMLProps<T>) => {
  const Component = (as ?? "div") as ElementType
  const sanitized = useMemo(() => {
    if (!html) return ""
    const cleaned = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_TAGS: ["ul", "ol", "li", "br"],
      ADD_ATTR: ["style"],
    })
    return stripBackgroundStyles(cleaned)
  }, [html])

  if (!sanitized) return null

  return (
    <Component
      data-sanitized-html
      {...rest}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}

const stripBackgroundStyles = (value: string) =>
  value
    .replace(/background(?:-color)?\s*:[^;"']*;?/gi, "")
    .replace(/color\s*:[^;"']*;?/gi, "")

export default SanitizedHTML
