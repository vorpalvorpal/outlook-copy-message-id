# Copy Message ID

An Outlook add-in that copies the open email's reference to the clipboard,
ready to paste to Claude:

```
Email: "Leachate results"
From: Jo Bloggs <jo@example.org>
Received: 2026-10-21 09:05
Message-ID: <abc123@example.org>
```

The `ow` tool (`~/dev/utils/outlookweb`) takes a Message-ID directly
(`ow show "<abc123@example.org>"`) and resolves it in the same call. The
Message-ID is copied rather than the API's item id because it still finds the
message after it has been moved or archived. Subject, sender and time tell
Claude which email is meant before it looks anything up.

It works in Outlook on the web, new Outlook for Mac and new Outlook for
Windows. The page is served by GitHub Pages from this repo.

## Install

1. Download `manifest.xml`.
2. Open <https://aka.ms/olksideload> (Outlook on the web → Add-ins → My add-ins).
3. Under **Custom Addins**, choose **Add a custom add-in → Add from file…** and
   pick `manifest.xml`.

It then shows as **Copy Message ID** on a message's toolbar or under its
**Apps** / **…** menu. Pin the pane to keep it open: it follows the selected
email, and the **Copy** button copies whichever one is showing.

## Test

```
node --test
```
