type Variant = 'hero' | 'game'

export function CinematicBackground({ variant = 'game' }: { variant?: Variant }) {
  return (
    <div className={`cinematicBg cinematicBg--${variant}`} aria-hidden="true">
      <div className="cinematicBg__base" />
      <div className="cinematicBg__spotlight" />
      <div className="cinematicBg__beam" />
      <div className="cinematicBg__beamHaze" />
      <div className="cinematicBg__beamDust" />
      <div className="cinematicBg__texture cinematicBg__texture--strip" />
      <div className="cinematicBg__texture cinematicBg__texture--burnFrame" />
      <div className="cinematicBg__texture cinematicBg__texture--dustBurn" />
      <div className="cinematicBg__texture cinematicBg__texture--bokeh" />
      <div className="cinematicBg__lightLeak cinematicBg__lightLeak--left" />
      <div className="cinematicBg__lightLeak cinematicBg__lightLeak--right" />
      <div className="cinematicBg__halation" />
      <div className="cinematicBg__glow cinematicBg__glow--warm" />
      <div className="cinematicBg__glow cinematicBg__glow--cool" />
      <div className="cinematicBg__frame" />
      <div className="cinematicBg__scratches" />
      <div className="cinematicBg__scanlines" />
      <div className="cinematicBg__vignette" />
      <div className="cinematicBg__grain" />
      <div className="cinematicBg__grain cinematicBg__grain--fine" />
      <div className="cinematicBg__dust" />
    </div>
  )
}
