import { useLanguage } from '../contextoIdioma'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { academicRecord } from '../data/historicoAcademico'
import './PaginaHistoricoAcademico.css'

const ordinalSuffix = new Intl.PluralRules('en', { type: 'ordinal' })
const suffixes = { one: 'st', two: 'nd', few: 'rd', other: 'th' }

function SemesterCard({ year, semester, courses }) {
  const { language, locale, text } = useLanguage()
  const gradeFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const attendanceFormat = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 2,
  })
  const semesterLabel = text(
    semester + suffixes[ordinalSuffix.select(semester)] + ' semester of ' + year,
    semester + 'º semestre de ' + year,
  )
  const headingId = 'semester-' + year + '-' + semester
  const gradedCourses = courses.filter(({ grade }) => grade != null)
  const recordedClasses = courses.filter(({ classes }) => classes != null)
  const classes = recordedClasses.reduce((total, course) => total + course.classes, 0)
  const average = gradedCourses.length
    ? gradedCourses.reduce((total, course) => total + course.grade, 0) / gradedCourses.length
    : null

  if (!courses.length) {
    return (
      <article className="semester-card semester-card--planned" aria-labelledby={headingId}>
        <div className="semester-content">
          <div className="semester-heading">
            <h2 id={headingId}>{semesterLabel}</h2>
            <span className="semester-status">{text('Planned', 'Planejado')}</span>
          </div>
          <p className="semester-placeholder">
            {text('Courses and grades will be added here as they become available.', 'As disciplinas e notas serão adicionadas aqui conforme forem registradas.')}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className="semester-card" aria-labelledby={headingId}>
      <div className="semester-content">
        <h2 id={headingId}>{semesterLabel}</h2>
        <div className="semester-table-region" role="region" aria-labelledby={headingId} tabIndex={0}>
          <table aria-labelledby={headingId}>
            <thead>
              <tr>
                <th scope="col">{text("Course", "Disciplina")}</th>
                <th scope="col">{text("Classes", "Aulas")}</th>
                <th scope="col">{text("Absences", "Faltas")}</th>
                <th scope="col">{text("Attendance", "Frequência")}</th>
                <th scope="col">{text("Grade", "Nota")}</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(({ name, classes, absences, attendance, grade }) => (
                <tr key={name.pt}>
                  <th scope="row">{name[language]}</th>
                  <td>{classes ?? '—'}</td>
                  <td>{absences ?? '—'}</td>
                  <td>{attendance == null ? '—' : attendanceFormat.format(attendance / 100)}</td>
                  <td className="semester-grade">{grade == null ? '—' : gradeFormat.format(grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dl className="semester-totals">
        <div><dt>{text("Total classes", "Total de aulas")}</dt><dd>{recordedClasses.length ? classes : '—'}</dd></div>
        <div><dt>{text("Unweighted average", "Média simples")}</dt><dd>{average != null ? gradeFormat.format(average) + ' / 100' : '—'}</dd></div>
      </dl>
    </article>
  )
}

export default function AcademicRecordPage() {
  const { text } = useLanguage()
  const title = useRef(null)
  const periodsWithGrades = academicRecord.filter(({ courses }) => courses.some(({ grade }) => grade != null)).length

  useEffect(() => {
    window.scrollTo(0, 0)
    title.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="academic-record">
      <Link className="academic-back" to="/education"><span aria-hidden="true">←</span>{' '}{text("Back to education", "Voltar para Formação")}</Link>
      <header className="academic-intro">
        <h1 ref={title} tabIndex={-1}>{text("Academic record", "Histórico acadêmico")}</h1>
        <p>{text("Courses and grades from my Software Engineering degree at PUC Minas.", "Disciplinas e notas da graduação em Engenharia de Software na PUC Minas.")}</p>
      </header>

      <div className="academic-progress">
        <div className="academic-progress-label">
          <label htmlFor="grades-progress">{text("Semesters with grades", "Períodos com notas")}</label>
          <span>{text(periodsWithGrades + ' of ' + academicRecord.length, periodsWithGrades + ' de ' + academicRecord.length)}</span>
        </div>
        <progress id="grades-progress" value={periodsWithGrades} max={academicRecord.length} />
      </div>

      <div className="semester-grid">
        {academicRecord.map((term) => <SemesterCard key={term.year + '-' + term.semester} {...term} />)}
      </div>
    </div>
  )
}
