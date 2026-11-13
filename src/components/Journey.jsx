import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../languageContext'
import { journey } from '../data/journey'
import JourneyStage from './JourneyStage'

export default function Journey() {
  const { language, text } = useLanguage()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const title = useRef(null)
  const nextStep = useRef(null)
  const finished = step === journey.length
  const chapter = journey[step]
  const answer = chapter?.choices[answers[step]]

  function navigate(index) {
    setStep(index)
    title.current?.focus()
  }

  function choose(index) {
    setAnswers(previous => {
      const updated = [...previous]
      updated[step] = index
      return updated
    })
    nextStep.current?.focus()
  }

  function restart() {
    setAnswers([])
    navigate(0)
  }

  return (
    <section className="journey-board" aria-label={text('Entrepreneurship game', 'Jogo de empreendedorismo')}>
      <div className="journey-status">
        <span>{text('Journey map', 'Mapa da jornada')}</span>
        <span>{text(answers.length + ' / ' + journey.length + ' completed', answers.length + ' / ' + journey.length + ' concluídas')}</span>
      </div>
      <ol className="journey-map">
        {journey.map((entry, index) => (
          <li key={entry.title.en}>
            <button type="button" aria-current={step === index ? 'step' : undefined}
              disabled={index > answers.length} onClick={() => navigate(index)}>
              <span className="journey-marker" aria-hidden="true">{index < answers.length ? '✓' : index + 1}</span>
              <span>{entry.time[language]}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="journey-playfield">
        <JourneyStage scene={step} reacting={Boolean(answer) || finished} />
        <div className="journey-scene">
          <p className="journey-speaker">Lucas</p>
          <h2 ref={title} tabIndex={-1}>
            {finished ? text('See what I’m building now', 'Veja o que estou construindo hoje') : chapter.title[language]}
          </h2>
          {finished ? (
            <>
              <p>{text('Explore my software projects or get in touch to talk about an idea.', 'Explore meus projetos de software ou entre em contato para conversar sobre uma ideia.')}</p>
              <div className="journey-actions">
                <Link className="button button-primary" to="/#projects">{text('Explore projects', 'Explorar projetos')}</Link>
                <Link className="button button-secondary" to="/contact">{text('Get in touch', 'Entrar em contato')}</Link>
                <button className="journey-reset" type="button" onClick={restart}>{text('Play again', 'Jogar de novo')}</button>
              </div>
            </>
          ) : (
            <>
              <p className="journey-dialogue">{(answer?.outcome ?? chapter.story)[language]}</p>
              <fieldset className="journey-choices">
                <legend>{chapter.question[language]}</legend>
                {chapter.choices.map((choice, index) => (
                  <button key={choice.label.en} type="button" aria-pressed={answers[step] === index} onClick={() => choose(index)}>
                    <span aria-hidden="true">{index === 0 ? 'A' : 'B'}</span>
                    {choice.label[language]}
                  </button>
                ))}
              </fieldset>
              <div className="journey-announcement" role="status">{answer?.outcome[language]}</div>
              <div className="journey-actions">
                <button ref={nextStep} className="button button-primary" type="button"
                  aria-disabled={!answer} onClick={() => { if (answer) navigate(step + 1) }}>
                  {step === journey.length - 1 ? text('Finish journey', 'Concluir jornada') : text('Next chapter', 'Próxima fase')} <span aria-hidden="true">→</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
