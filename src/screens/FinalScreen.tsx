import { Card } from '../components/Card'
import { FormattedText } from '../components/FormattedText'
import { ChoiceCard } from '../components/cinematic/ChoiceCard'
import { story } from '../game/story'
import { choicesInShuffledSlots } from '../utils/shuffle'

export function FinalScreen({ onChoose }: { onChoose: (choiceId: string) => void }) {
  const final = story.final
  if (!final) return null
  const slots = choicesInShuffledSlots(final.choices, 1337)

  return (
    <div className="screen screen--game">
      <Card className="gameCard">
        <div className="blockTop">
          <div className="blockNo">Финал</div>
          <div className="blockTitle">Финальная развилка</div>
        </div>

        <div className="blockSection">
          <div className="sectionLabel">Ситуация</div>
          <div className="sectionBody">
            <FormattedText text={final.situation} />
          </div>
          <div className="thinkInline">Думай, думай, думай....</div>
        </div>

        <div className="choices">
          {slots.map(({ choice, displayId }) => (
            <ChoiceCard
              key={choice.id}
              displayId={displayId}
              label={choice.label}
              text={choice.text}
              onClick={() => onChoose(choice.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
