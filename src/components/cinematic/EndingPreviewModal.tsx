import { useEffect } from 'react'
import { getAllEndingPreviews } from '../../game/endings'
import type { EndingId } from '../../game/endings'

export function EndingPreviewModal({
  currentId,
  onClose,
}: {
  currentId: EndingId
  onClose: () => void
}) {
  const previews = getAllEndingPreviews()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="endingModal" role="dialog" aria-modal="true" aria-labelledby="endingModalTitle">
      <button type="button" className="endingModal__backdrop" onClick={onClose} aria-label="Закрыть" />
      <div className="endingModal__panel">
        <h2 id="endingModalTitle" className="endingModal__title">
          Другие концовки
        </h2>
        <p className="endingModal__hint">
          Каждый путь собирает свою финальную историю. Пройдите игру с другими решениями, чтобы
          увидеть их вживую.
        </p>
        <ul className="endingModal__list">
          {previews.map((item) => (
            <li
              key={item.id}
              className={`endingModal__item ${item.id === currentId ? 'endingModal__item--current' : ''}`}
            >
              <span className="endingModal__badge">Концовка {item.id}</span>
              <span className="endingModal__itemTitle">{item.title.replace(/^Концовка \d\. /, '')}</span>
              <span className="endingModal__itemTagline">{item.tagline}</span>
              {item.id === currentId && (
                <span className="endingModal__currentMark">Ваш итог</span>
              )}
            </li>
          ))}
        </ul>
        <button type="button" className="btn ghost endingModal__close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}
