// Wraps or prefixes the current selection in a textarea with markdown syntax,
// then restores focus and selection so typing can continue naturally.

function applyWrap(textarea, before, after = before, placeholder = '') {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.slice(selectionStart, selectionEnd) || placeholder;

  const newValue =
    value.slice(0, selectionStart) +
    before +
    selected +
    after +
    value.slice(selectionEnd);

  const cursorStart = selectionStart + before.length;
  const cursorEnd = cursorStart + selected.length;

  return { newValue, cursorStart, cursorEnd };
}

function applyLinePrefix(textarea, prefix) {
  const { selectionStart, selectionEnd, value } = textarea;

  // Find the start of the line containing the selection
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;

  const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
  const offset = prefix.length;

  return {
    newValue,
    cursorStart: selectionStart + offset,
    cursorEnd: selectionEnd + offset,
  };
}

export const markdownActions = {
  bold: (textarea) => applyWrap(textarea, '**', '**', 'bold text'),
  italic: (textarea) => applyWrap(textarea, '_', '_', 'italic text'),
  strikethrough: (textarea) => applyWrap(textarea, '~~', '~~', 'strikethrough'),
  code: (textarea) => applyWrap(textarea, '`', '`', 'code'),
  codeBlock: (textarea) => applyWrap(textarea, '```\n', '\n```', 'code block'),
  link: (textarea) => applyWrap(textarea, '[', '](https://)', 'link text'),
  image: (textarea) => applyWrap(textarea, '![', '](https://)', 'alt text'),
  h1: (textarea) => applyLinePrefix(textarea, '# '),
  h2: (textarea) => applyLinePrefix(textarea, '## '),
  h3: (textarea) => applyLinePrefix(textarea, '### '),
  quote: (textarea) => applyLinePrefix(textarea, '> '),
  bulletList: (textarea) => applyLinePrefix(textarea, '- '),
  numberedList: (textarea) => applyLinePrefix(textarea, '1. '),
  taskList: (textarea) => applyLinePrefix(textarea, '- [ ] '),
  table: (textarea) => {
    const snippet =
      '| Column A | Column B |\n| --- | --- |\n| value | value |\n';
    const { selectionStart, value } = textarea;
    const newValue =
      value.slice(0, selectionStart) + snippet + value.slice(selectionStart);
    const cursor = selectionStart + snippet.length;
    return { newValue, cursorStart: cursor, cursorEnd: cursor };
  },
  horizontalRule: (textarea) => {
    const snippet = '\n---\n';
    const { selectionStart, value } = textarea;
    const newValue =
      value.slice(0, selectionStart) + snippet + value.slice(selectionStart);
    const cursor = selectionStart + snippet.length;
    return { newValue, cursorStart: cursor, cursorEnd: cursor };
  },
};
