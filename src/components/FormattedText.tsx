import { toParagraphs } from '../utils/narrativeText'

export function FormattedText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const paragraphs = toParagraphs(text)
  if (!paragraphs.length) return null

  return (
    <div className={['prose', className].filter(Boolean).join(' ')}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}
