import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { FormattedText } from '../components/FormattedText'
import { EndingPreviewModal } from '../components/cinematic/EndingPreviewModal'
import { buildEpilogue } from '../game/epilogue'
import { story } from '../game/story'
import type { GameHistoryEntry, StatKey, Stats } from '../game/types'

const statLabels: Record<StatKey, string> = {
  talent: 'Талант',
  craft: 'Ремесло',
  watching: 'Насмотренность',
  teamTrust: 'Доверие команды',
  audienceContact: 'Контакт со зрителем',
  projectViability: 'Жизнеспособность',
  staminaEnergy: 'Выносливость',
}

export function SummaryScreen({
  stats,
  history,
  onRestart,
}: {
  stats: Stats
  history: GameHistoryEntry[]
  onRestart: () => void
}) {
  const epilogue = buildEpilogue(stats, history)
  const [showOtherEndings, setShowOtherEndings] = useState(false)

  return (
    <div className="screen screen--ending">
      <Card className="epilogueCard endingCard">
        <div className="endingCard__badge">Концовка {epilogue.endingId}</div>
        <h1 className="title endingCard__title">{epilogue.headline}</h1>
        <p className="lead epilogueIntro">{epilogue.intro}</p>
        <div className="epilogueSumMeta">
          <span className="epilogueSumMeta__icon" aria-hidden="true">
            ◎
          </span>
          Сумма показателей: {epilogue.sum}
        </div>

        <div className="epilogueSections">
          {epilogue.sections.map((section, index) => (
            <article
              key={section.title || `section-${index}`}
              className="epilogueSection"
            >
              {section.title ? (
                <h2 className="epilogueSectionTitle">{section.title}</h2>
              ) : null}
              <div className="epilogueSectionBody">
                <FormattedText text={section.body} />
              </div>
            </article>
          ))}
        </div>

        <div className="blockSection epilogueStats">
          <div className="sectionLabel">Финальные показатели</div>
          <p className="epilogueStatsHint">
            Они не «оценка в школе», а срез того, как вы вели проект: ремесло, команду,
            контакт со зрителем, выносливость.
          </p>
          <div className="statsSummary">
            {Object.entries(stats).map(([k, v]) => (
              <div className="statsSummaryItem" key={k}>
                <div className="statsSummaryKey">{statLabels[k as StatKey] ?? k}</div>
                <div className="statsSummaryVal">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <details className="history">
          <summary>Показать все выборы по шагам</summary>
          <ol>
            {history.map((h, idx) => {
              if (h.kind === 'final') {
                return <li key={idx}>Финал: {h.choiceId}</li>
              }
              const block = story.blocks.find((b) => b.id === h.blockId)
              const choice = block?.choices.find((c) => c.id === h.choiceId)
              return (
                <li key={idx}>
                  {block?.title ?? `Блок ${h.blockId}`}: {choice?.label ?? h.choiceId}
                </li>
              )
            })}
          </ol>
        </details>

        <p className="epilogueClosing">
          Думай, думай, думай — и если захотите, пройдите путь иначе. Другой порядок
          ответов соберёт другую жизнь того же фильма.
        </p>

        <div className="actions endingCard__actions">
          <Button onClick={onRestart}>Пройти заново</Button>
          <Button variant="ghost" onClick={() => setShowOtherEndings(true)}>
            Посмотреть другие концовки
          </Button>
        </div>
      </Card>

      {showOtherEndings && (
        <EndingPreviewModal
          currentId={epilogue.endingId}
          onClose={() => setShowOtherEndings(false)}
        />
      )}
    </div>
  )
}
