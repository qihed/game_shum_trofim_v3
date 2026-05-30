function joinLines(lines: string[]): string {
  return lines.join(' ').replace(/\s+/g, ' ').trim()
}

function shouldStartNewParagraph(previous: string, line: string): boolean {
  const prevEndsBlock = /[.!?…:»")]\s*$/.test(previous)
  const startsNewBlock = /^[А-ЯЁ«"(\[]/.test(line) || /^\d+[\.)]/.test(line)
  return prevEndsBlock && startsNewBlock
}

function nextNonEmptyLine(lines: string[], fromIndex: number): string {
  for (let i = fromIndex; i < lines.length; i += 1) {
    const line = lines[i]?.trim()
    if (line) return line
  }
  return ''
}

/** Turns PDF line breaks into readable paragraphs. */
export function toParagraphs(text: string): string[] {
  if (!text?.trim()) return []

  const lines = text.split('\n')
  const paragraphs: string[] = []
  let current: string[] = []

  const flush = () => {
    const joined = joinLines(current)
    if (joined) paragraphs.push(joined)
    current = []
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]?.trim() ?? ''

    if (!line) {
      const next = nextNonEmptyLine(lines, i + 1)
      if (next && /^[a-zа-яё]/.test(next) && current.length > 0) {
        continue
      }
      flush()
      continue
    }

    if (current.length === 0) {
      current.push(line)
      continue
    }

    const previous = current[current.length - 1]!
    if (shouldStartNewParagraph(previous, line)) {
      flush()
    }

    current.push(line)
  }

  flush()
  return paragraphs
}
