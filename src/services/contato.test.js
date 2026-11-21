import test from 'node:test'
import assert from 'node:assert/strict'
import { sendContact, getWhatsAppLink } from './contato.js'

function message() {
  return Object.entries({ name: ' Lucas ', email: ' teste@example.com ', subject: ' Projeto ', message: ' Uma mensagem de teste. ' }).reduce((form, [key, value]) => { form.append(key, value); return form }, new FormData())
}

test('missing configuration never reports that an email was sent', async () => {
  await assert.rejects(sendContact(message(), { endpoint: '' }), /not_configured/)
})

test('only a successful server response counts as a sent message', async () => {
  let received
  await sendContact(message(), { endpoint: 'https://example.test/contact', fetcher: async (url, options) => {
    assert.equal(url, 'https://example.test/contact')
    assert.equal(options.method, 'POST')
    received = Object.fromEntries(options.body)
    return new Response(null, { status: 204 })
  } })
  assert.equal(received.name, 'Lucas')
  assert.equal(received.email, 'teste@example.com')
  await assert.rejects(sendContact(message(), { endpoint: '/contact', fetcher: async () => new Response(null, { status: 500 }) }), /send_failed/)
})

test('blank fields and malformed email are rejected before reaching the service', async () => {
  for (const [key, value] of [['message', '   '], ['email', 'not-an-email']]) {
    const form = message()
    form.set(key, value)
    await assert.rejects(sendContact(form, { endpoint: '/contact', fetcher: async () => { assert.fail('Invalid data must not be sent') } }), /invalid_form/)
  }
})

test('WhatsApp requires a configured international number', () => {
  assert.equal(getWhatsAppLink(''), '')
  assert.equal(getWhatsAppLink('123'), '')
  assert.equal(getWhatsAppLink('+55 (31) 99999-9999'), 'https://wa.me/5531999999999')
})
