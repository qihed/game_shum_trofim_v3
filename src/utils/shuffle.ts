function mulberry32(seed: number) {
  let a = seed >>> 0
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffledStable<T>(items: readonly T[], seed: number): T[] {
  const rng = mulberry32(seed)
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Fixed slot labels on screen; content order is shuffled separately. */
const DISPLAY_SLOT_IDS = ['А', 'Б', 'В', 'Г'] as const

export type ChoiceSlot<T> = {
  choice: T
  /** Always А / Б / В by button position */
  displayId: string
}

export function choicesInShuffledSlots<T>(choices: readonly T[], seed: number): ChoiceSlot<T>[] {
  const shuffled = shuffledStable(choices, seed)
  return shuffled.map((choice, index) => ({
    choice,
    displayId: DISPLAY_SLOT_IDS[index] ?? String(index + 1),
  }))
}

