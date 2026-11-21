import test from 'node:test'
import assert from 'node:assert/strict'
import { orderProjects, projectDate } from './projetos.js'

test('sorts projects from oldest to newest without changing the original list', () => {
  const projects = [{ id: 'new', startedAt: '2026-11-01' }, { id: 'unknown', startedAt: null }, { id: 'old', startedAt: '2025-02-10' }]
  assert.deepEqual(orderProjects(projects).map(item => item.id), ['old', 'new', 'unknown'])
  assert.equal(projects[0].id, 'new')
})

test('missing and invalid dates remain undated instead of showing invented dates', () => {
  assert.equal(projectDate(null), null)
  assert.equal(projectDate('invalid'), null)
  assert.equal(projectDate('2026-02-30'), null)
  assert.equal(projectDate('2026-02-10').toISOString(), '2026-02-10T12:00:00.000Z')
})
