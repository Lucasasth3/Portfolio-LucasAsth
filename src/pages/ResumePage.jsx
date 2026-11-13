import { useLanguage } from '../languageContext'
function ResumePage() {
  const { text } = useLanguage()
  return (
    <>
      <section className="resume-toolbar">
        <a
          className="button button-primary resume-download"
          href="/curriculo-lucas-asth.pdf"
          download="Lucas_Araujo_Asth_Curriculo.pdf"
        >
          {text('Download résumé (PDF, Portuguese)', 'Baixar currículo PDF')}
        </a>
      </section>
      <section className="resume-document" aria-label={text("Résumé preview", "Visualização do currículo")}>
        <img
          className="resume-preview"
          src="/curriculo-lucas-asth.png"
          alt={text("Preview of Lucas Asth’s résumé", "Pré-visualização do currículo de Lucas Asth")}
        />
        <p className="resume-fallback">
          {text("To save a copy, ", "Para salvar o documento, ")}<a href="/curriculo-lucas-asth.pdf" download="Lucas_Araujo_Asth_Curriculo.pdf">{text("download the résumé PDF", "baixe o currículo em PDF")}</a>.
        </p>
      </section>
    </>
  )
}

export default ResumePage
