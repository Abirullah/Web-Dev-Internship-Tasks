const defaultContent = `# Marginale

> A split-view Markdown editor with live preview and one-click README export.

## Why this exists

Writing documentation shouldn't require switching tabs to check whether your
formatting actually rendered right. Marginale keeps the source and the
rendered page side by side, so the margin between "what you typed" and
"what people will read" disappears.

## Features

- **Live preview** — every keystroke updates the rendered pane instantly
- **Formatting toolbar** — bold, italic, headings, links, lists, code, tables
- **Four preview themes** — Paper, GitHub, Dusk, and Sepia
- **One-click export** — download your work as \`README.md\`
- **Autosave** — your draft persists in this browser between visits

## Quick example

Here's a bit of everything this editor understands:

1. Ordered lists work as you'd expect
2. So do nested bullet points:
   - like this
   - and this

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

| Shortcut | Action |
| --- | --- |
| Ctrl/Cmd + B | Bold |
| Ctrl/Cmd + I | Italic |

- [x] Draft the README
- [ ] Ship it

---

Start typing on the left. Everything shows up on the right.
`;

export default defaultContent;
