import { useRef } from 'react'
import { Button } from '../components/Button'
import { FormattedText } from '../components/FormattedText'
import { ProjectorHero } from '../components/cinematic/ProjectorHero'
import { story } from '../game/story'

export function WelcomeScreen({ onNext }: { onNext: () => void }) {
  const aboutRef = useRef<HTMLElement>(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="screen screen--welcome">
      <section className="welcomeHero">
        <div className="welcomeHero__projector">
          <ProjectorHero />
        </div>

        <div className="welcomeHero__projection">
          <div className="welcomeHero__projectionInner">
            <p className="welcomeHero__eyebrow">{story.meta.title}</p>
            <h1 className="welcomeHero__title">{story.welcome.headline}</h1>
            <p className="welcomeHero__tagline">
              Интерактивная игра о производстве, выборе и профессиональном взрослении
            </p>

            <div className="welcomeHero__actions">
              <Button onClick={onNext}>Начать путь</Button>
              <Button variant="ghost" onClick={scrollToAbout}>
                О проекте
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="welcomeAbout card">
        <h2 className="welcomeAbout__heading">О проекте</h2>
        <div className="welcomeAbout__body">
          <FormattedText text={story.welcome.body} />
        </div>
        <div className="actions">
          <Button onClick={onNext}>Начать путь</Button>
        </div>
      </section>
    </div>
  )
}
