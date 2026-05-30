import { FormattedText } from '../FormattedText'

export function ChoiceCard({
  displayId,
  label,
  text,
  onClick,
}: {
  displayId: string
  label: string
  text: string
  onClick: () => void
}) {
  return (
    <button type="button" className="choiceCard" onClick={onClick}>
      <span className="choiceCard__badge">{displayId}</span>
      <span className="choiceCard__body">
        <span className="choiceCard__label">{label}</span>
        <span className="choiceCard__text">
          <FormattedText text={text} className="prose--compact" />
        </span>
      </span>
      <span className="choiceCard__arrow" aria-hidden="true">
        →
      </span>
    </button>
  )
}
