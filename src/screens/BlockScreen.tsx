import { Card } from '../components/Card'
import { FormattedText } from '../components/FormattedText'
import { ChoiceCard } from '../components/cinematic/ChoiceCard'
import type { Block } from '../game/types'
import { choicesInShuffledSlots } from '../utils/shuffle'

export function BlockScreen({
  block,
  onChoose,
}: {
  block: Block
  onChoose: (choiceId: string) => void
}) {
  const slots = choicesInShuffledSlots(block.choices, block.id)
  return (
    <div className="screen screen--game">
      <Card className="gameCard">
        <div className="blockTop">
          <div className="blockNo">Блок {block.id}</div>
          <div className="blockTitle">{block.title}</div>
        </div>

        <div className="blockSection">
          <div className="sectionLabel">Вопрос</div>
          <div className="sectionBody">
            <FormattedText text={block.question} />
          </div>
        </div>

        <div className="blockSection">
          <div className="sectionLabel">Ситуация</div>
          <div className="sectionBody">
            <FormattedText text={block.situation} />
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
