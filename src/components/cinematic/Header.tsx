export function Header({
  title,
  onRestart,
}: {
  title: string
  onRestart: () => void
}) {
  return (
    <header className="cinHeader">
      <div className="cinHeader__brand">
        <FilmIcon />
        <span className="cinHeader__title">{title}</span>
      </div>
      <button type="button" className="cinHeader__reset" onClick={onRestart}>
        <ResetIcon />
        <span>Сбросить прогресс</span>
      </button>
    </header>
  )
}

function FilmIcon() {
  return (
    <svg
      className="cinHeader__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 5v14M11 5v14M15 5v14M19 5v14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="cinHeader__resetIcon">
      <path
        d="M2.5 8a5.5 5.5 0 0 1 9.3-4M13.5 8a5.5 5.5 0 0 1-9.3 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M11 2.5h2v2M5 13.5H3v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
