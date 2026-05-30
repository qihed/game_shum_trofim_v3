import fs from 'node:fs'
import path from 'node:path'
import { PDFParse } from 'pdf-parse'

/**
 * Usage:
 *   node scripts/extractStoryFromPdf.mjs "D:\path\Сценарий.pdf" "src/game/story.json"
 */

const [pdfPath, outPath = 'src/game/story.json'] = process.argv.slice(2)
if (!pdfPath) {
  console.error('Missing PDF path.\nExample: node scripts/extractStoryFromPdf.mjs "D:\\\\Загрузки браузера\\\\Сценарий.pdf"')
  process.exit(1)
}

const normalize = (s) =>
  s
    .replace(/\r/g, '')
    .replace(/\n--\s*\d+\s+of\s+\d+\s*--\n/g, '\n')
    .replace(/--\s*\d+\s+of\s+\d+\s*--/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

const stats = [
  'talent',
  'craft',
  'watching',
  'teamTrust',
  'audienceContact',
  'projectViability',
  'staminaEnergy',
]

const statRuToKey = (ru) => {
  const t = ru
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[«»"]/g, '')
    .trim()
  if (t.startsWith('талант')) return 'talent'
  if (t.startsWith('ремесло')) return 'craft'
  if (t.startsWith('насмотр')) return 'watching'
  if (t.startsWith('доверие команды')) return 'teamTrust'
  if (t.startsWith('контакт со зрителем')) return 'audienceContact'
  if (t.startsWith('жизнеспособ')) return 'projectViability'
  if (t.startsWith('вынослив')) return 'staminaEnergy'
  return null
}

const parseDeltaStatsFromPdfChoice = (choiceBody) => {
  /** @type {Record<string, number>} */
  const delta = Object.fromEntries(stats.map((k) => [k, 0]))
  const m = choiceBody.match(/Показатели:\s*([\s\S]*?)(?:\n|$)/i)
  const line = normalize((m?.[1] ?? '').replace(/\.$/, ''))
  if (!line) return delta

  for (const part of line.split(',').map((p) => p.trim()).filter(Boolean)) {
    const mm = part.match(/^(.+?)\s*([+-]\d+)\s*$/)
    if (!mm) continue
    const key = statRuToKey(mm[1])
    if (!key) continue
    delta[key] = clamp(Number(mm[2]), -10, 10)
  }

  return delta
}

const parseNumberedBlocks = (fullText) => {
  const blocks = []
  // Important: split ONLY on real section headers like "4. ...", not on "0." inside stats.
  const chunkRe = /(?:^|\n)(\d+)\.\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\d+\.[ \t]+)|$)/g
  let m
  while ((m = chunkRe.exec(fullText))) {
    const rawId = Number(m[1])
    const title = normalize(m[2])
    const body = normalize(m[3])

    const question =
      normalize(
        (body.split(/Вопросы?:\s*/i)[1] ?? '')
          .split(/\nИстория:\s*/i)[0]
          .trim(),
      ) || ''

    const situation =
      normalize(
        (body.split(/История:\s*/i)[1] ?? '')
          .split(/\nВыбор игрока\s*:?\s*/i)[0]
          .trim(),
      ) || ''

    // Choices: "А./Б./В." with optional "Выбор игрока" header.
    const afterChoicesStart = body.split(/Выбор игрока\s*:?\s*/i)[1] ?? ''
    const choiceRe =
      /(?:^|\n)([АБВA-C])\.\s*([^\n]+)\n([\s\S]*?)(?=(?:\n[АБВA-C]\.)|(?:\n\d+\.[ \t]+)|$)/g
    const choices = []
    let cm
    while ((cm = choiceRe.exec(afterChoicesStart))) {
      const idRaw = cm[1]
      const id = idRaw === 'A' ? 'А' : idRaw === 'B' ? 'B' : idRaw === 'C' ? 'C' : idRaw
      const label = normalize(cm[2])
      const rest = normalize(cm[3])

      // Remove "Тип выбора: ..." and keep the narrative text.
      const text = normalize((rest.split(/Тип выбора:\s*/i)[0] ?? '').trim())
      const deltaStats = parseDeltaStatsFromPdfChoice(rest)

      choices.push({
        id,
        label,
        text,
        consequence: '',
        analysis: '',
        reflectionQuestion: '',
        deltaStats,
      })
    }

    if (choices.length) {
      blocks.push({
        id: rawId,
        title,
        question,
        situation,
        choices,
      })
    }
  }
  return blocks
}

const pdfBuf = fs.readFileSync(pdfPath)
const parser = new PDFParse({ data: pdfBuf })
const textResult = await parser.getText()
await parser.destroy()
const fullText = normalize(textResult.text ?? '')

const story = {
  meta: {
    title: 'Не финальный дубль',
    subtitle: 'Большой сценарий игры с развилками',
    sourcePdf: path.basename(pdfPath),
    stats,
  },
  welcome: {
    headline: 'Добро пожаловать в продакшен',
    body: `Перед вами ролевая игра для участников ШУМ.Производство — история о начинающем режиссере, который пытается собрать свой первый серьезный проект и довести его до финального результата. Это путь внутрь настоящего производства, где идея сталкивается со сроками, бюджетом, командой, правками, техническими сбоями и ответственностью за каждый выбор.

На этом пути не будет идеальных условий. Производство потребует не только креативности, но и дисциплины, умения слышать команду, принимать решения в моменте и сохранять авторский замысел, когда обстоятельства начинают давить. В ключевых точках игры вам предстоит выбирать, как действовать: отстаивать идею или идти на компромисс, слушать команду или брать ответственность на себя, спасать сцену или пересобирать весь подход.

Каждый выбор влияет на проект, отношения внутри группы и профессиональный путь героя. Это не просто история о съемках. Это игра о взрослении в профессии, где режиссерская позиция проверяется не громкими словами, а решениями, которые двигают производство вперед.`,
  },
  heroProfile: {
    name: 'Максим',
    age: 21,
    dream:
      'Хочет снимать поистине классное кино, которое находит отклик у множества зрителей и несет глубокий ценностный смысл.',
    education: 'Неоконченное высшее юридическое образование',
    experience: 'Небольшие студенческие проекты, короткометражные фильмы',
    family: 'Не женат; родители негативно относятся к кинематографу как месту работы',
    allies:
      'Пока не сформировал большой профессиональный круг; есть маленькая рабочая команда, другие друзья не поддерживают выбор',
    socialCapital: 'Ниже среднего',
    financialCapital: 'Как у среднестатистических студентов',
    character:
      'Амбициозный, но ощущает кризис и разочарование в выборе образования и невозможности реализовать мечту',
    topGoal: 'Попасть в крутой продакшн / получить крупный проект с хорошим финансированием',
  },
  initialStats: Object.fromEntries(stats.map((k) => [k, 5])),
  blocks: parseNumberedBlocks(fullText),
  final: null,
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(story, null, 2), 'utf8')
console.log(`Wrote ${outPath} with ${story.blocks.length} blocks.`)
