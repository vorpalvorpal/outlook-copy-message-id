/**
 * The text copied for one email: enough for Claude to know which message is
 * meant before looking, and a Message-ID that `ow` resolves in a single call.
 *
 * The Message-ID is used rather than the API's item id because it survives
 * the message being moved or archived; the item id does not.
 *
 * TWIN CODE: this is the twin of `formatEmailReference` in
 * ~/dev/pkm-obsidian/plugin/src/pa-triage.ts (the Obsidian triage block's ID
 * chips). The repos deploy separately and share no code, so any change to the
 * block's format must be made in both. The plugin's
 * test/pa-email-ref.test.mjs has a drift guard that compares them.
 */
function formatReference(item) {
  const from = item.from
    ? `${item.from.displayName || ''} <${item.from.emailAddress || ''}>`.trim()
    : '(unknown sender)';
  const lines = [
    `Email: "${item.subject || '(no subject)'}"`,
    `From: ${from}`,
  ];
  if (item.dateTimeCreated) lines.push(`Received: ${localStamp(new Date(item.dateTimeCreated))}`);
  lines.push(`Message-ID: ${item.internetMessageId}`);
  return lines.join('\n');
}

/** 2026-10-21 14:05, in the viewer's time zone. */
function localStamp(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

if (typeof module !== 'undefined') module.exports = { formatReference, localStamp };
