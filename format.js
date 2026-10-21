/**
 * The text copied for one email: enough for Claude to know which message is
 * meant before looking, and a Message-ID that `ow` resolves in a single call.
 *
 * The Message-ID is used rather than the API's item id because it survives
 * the message being moved or archived; the item id does not.
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
