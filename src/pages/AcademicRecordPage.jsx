import { useLanguage } from '../languageContext'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { academicRecord } from '../data/academicRecord'
import './AcademicRecordPage.css'

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
  const classes = courses.reduce((total, course) => total + course.classes, 0)
  const average = gradedCourses.reduce((total, course) => total + course.grade, 0) / gradedCourses.length

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
                  <td>{classes}</td>
                  <td>{absences}</td>
                  <td>{attendanceFormat.format(attendance / 100)}</td>
                  <td className="semester-grade">{grade == null ? '—' : gradeFormat.format(grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dl className="semester-totals">
        <div><dt>{text("Total classes", "Total de aulas")}</dt><dd>{classes}</dd></div>
        <div><dt>{text("Unweighted average", "Média simples")}</dt><dd>{gradedCourses.length ? gradeFormat.format(average) + ' / 100' : '—'}</dd></div>
      </dl>
    </article>
  )
}

export default function AcademicRecordPage() {
  const { text } = useLanguage()
  const title = useRef(null)
  const courses = academicRecord.flatMap((semester) => semester.courses)
  const gradeCount = courses.filter(({ grade }) => grade != null).length

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
          <label htmlFor="grades-progress">{text("Grades in this record", "Notas no histórico exibido")}</label>
          <span>{text(gradeCount + ' of ' + courses.length + ' courses', gradeCount + ' de ' + courses.length + ' disciplinas')}</span>
        </div>
        <progress id="grades-progress" value={gradeCount} max={courses.length} />
      </div>

      <div className="semester-grid">
        {academicRecord.map((term) => <SemesterCard key={term.year + '-' + term.semester} {...term} />)}
      </div>
    </div>
  )
}
