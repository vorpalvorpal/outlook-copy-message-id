const test = require('node:test');
const assert = require('node:assert');
const { formatReference, localStamp } = require('./format.js');

test('a full item gives subject, sender, time and Message-ID', () => {
  const when = new Date(2026, 9, 21, 9, 5);
  const text = formatReference({
    subject: 'Leachate results',
    from: { displayName: 'Jo Bloggs', emailAddress: 'jo@example.org' },
    dateTimeCreated: when,
    internetMessageId: '<abc123@example.org>',
  });
  assert.strictEqual(text, [
    'Email: "Leachate results"',
    'From: Jo Bloggs <jo@example.org>',
    'Received: 2026-10-21 09:05',
    'Message-ID: <abc123@example.org>',
  ].join('\n'));
});

test('missing subject, sender and date still give a usable reference', () => {
  const text = formatReference({ internetMessageId: '<x@y>' });
  assert.strictEqual(text, 'Email: "(no subject)"\nFrom: (unknown sender)\nMessage-ID: <x@y>');
});

test('localStamp pads single digits', () => {
  assert.strictEqual(localStamp(new Date(2026, 0, 2, 3, 4)), '2026-01-02 03:04');
});
