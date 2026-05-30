import type { GameHistoryEntry, Stats } from './types'
import {
  buildEnding,
  endingRulesSummary,
  formatStatNotes,
  resolveEndingId,
  sumStats,
} from './endings'

export type EpilogueSection = {
  title: string
  body: string
}

export type Epilogue = {
  headline: string
  intro: string
  sections: EpilogueSection[]
  endingId: 1 | 2 | 3
  sum: number
}

export function buildEpilogue(stats: Stats, _history: GameHistoryEntry[]): Epilogue {
  const ending = buildEnding(stats)
  const sum = sumStats(stats)

  return {
    headline: ending.title,
    intro: ending.tagline,
    endingId: resolveEndingId(stats),
    sum,
    sections: [
      {
        title: '',
        body: ending.body,
      },
      {
        title: 'Что означают ваши показатели',
        body: formatStatNotes(stats, ending.statNotes),
      },
      {
        title: 'Как считалась концовка',
        body: `${endingRulesSummary()}\n\nВаша сумма: ${sum}.`,
      },
    ],
  }
}
