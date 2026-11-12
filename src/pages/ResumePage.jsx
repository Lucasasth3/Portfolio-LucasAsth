function ResumePage() {
  return (
    <>
      <section className="resume-toolbar">
        <a
          className="button button-primary resume-download"
          href="/curriculo-lucas-asth.pdf"
          download="Lucas_Araujo_Asth_Curriculo.pdf"
        >
          Baixar currículo PDF
        </a>
      </section>
      <section className="resume-document" aria-label="Visualização do currículo">
        <img
          className="resume-preview"
          src="/curriculo-lucas-asth.png"
          alt="Pré-visualização do currículo de Lucas Asth"
        />
        <p className="resume-fallback">
          Para salvar o documento, <a href="/curriculo-lucas-asth.pdf" download="Lucas_Araujo_Asth_Curriculo.pdf">baixe o currículo em PDF</a>.
        </p>
      </section>
    </>
  )
}

export default ResumePage
