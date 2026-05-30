import './App.css'
import { CinematicBackground } from './components/cinematic/CinematicBackground'
import { Header } from './components/cinematic/Header'
import { StatsPanel } from './components/StatsPanel'
import { story } from './game/story'
import { useGameState } from './game/useGameState'
import { BlockScreen } from './screens/BlockScreen'
import { FinalScreen } from './screens/FinalScreen'
import { PassportScreen } from './screens/PassportScreen'
import { SummaryScreen } from './screens/SummaryScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'

function App() {
  const game = useGameState()
  const isHero = game.phase === 'welcome' || game.phase === 'passport'
  const showStats = !isHero

  return (
    <>
      <CinematicBackground variant={isHero ? 'hero' : 'game'} />
      <div className={`app ${isHero ? 'app--hero' : ''}`}>
        {isHero ? (
          <header className="cinHeader cinHeader--welcome">
            <div className="cinHeader__brand">
              <svg className="cinHeader__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span className="cinHeader__title">Путь режиссёра</span>
            </div>
          </header>
        ) : (
          <Header title={story.meta.title} onRestart={game.actions.restart} />
        )}

        <main
          className={`main ${showStats ? 'main--withStats' : 'main--full'} ${game.phase === 'summary' ? 'main--summary' : ''}`}
        >
          <div className="content">
            {game.phase === 'welcome' && (
              <WelcomeScreen onNext={game.actions.toPassport} />
            )}
            {game.phase === 'passport' && (
              <PassportScreen onNext={game.actions.startStory} />
            )}
            {game.phase === 'block' && game.currentBlock && (
              <BlockScreen block={game.currentBlock} onChoose={game.actions.chooseInBlock} />
            )}
            {game.phase === 'final' && <FinalScreen onChoose={game.actions.chooseFinal} />}
            {game.phase === 'summary' && (
              <SummaryScreen
                stats={game.stats}
                history={game.history}
                onRestart={game.actions.restart}
              />
            )}
          </div>

          {showStats && <StatsPanel stats={game.stats} lastDelta={game.lastDelta} />}
        </main>
      </div>
    </>
  )
}

export default App
