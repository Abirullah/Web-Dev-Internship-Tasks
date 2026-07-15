const buttonGroups = [
  [
    { action: 'h1', label: 'H1', title: 'Heading 1' },
    { action: 'h2', label: 'H2', title: 'Heading 2' },
    { action: 'h3', label: 'H3', title: 'Heading 3' },
  ],
  [
    { action: 'bold', label: 'B', title: 'Bold', className: 'font-bold' },
    { action: 'italic', label: 'I', title: 'Italic', className: 'italic' },
    {
      action: 'strikethrough',
      label: 'S',
      title: 'Strikethrough',
      className: 'line-through',
    },
  ],
  [
    { action: 'link', label: 'Link', title: 'Insert link' },
    { action: 'image', label: 'Image', title: 'Insert image' },
    { action: 'code', label: 'Code', title: 'Inline code' },
    { action: 'codeBlock', label: 'Block', title: 'Code block' },
  ],
  [
    { action: 'bulletList', label: 'List', title: 'Bullet list' },
    { action: 'numberedList', label: '1.', title: 'Numbered list' },
    { action: 'taskList', label: 'Task', title: 'Task list' },
    { action: 'quote', label: 'Quote', title: 'Blockquote' },
  ],
  [
    { action: 'table', label: 'Table', title: 'Insert table' },
    { action: 'horizontalRule', label: 'HR', title: 'Horizontal rule' },
  ],
];

export default function Toolbar({ onAction, dark }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-1 px-3 py-2 border-b ${
        dark ? 'border-ink-border bg-ink-panel' : 'border-paper-border bg-paper-panel'
      }`}
    >
      {buttonGroups.map((group, i) => (
        <div key={i} className="flex items-center gap-0.5">
          {group.map(({ action, label, title, className = '' }) => (
            <button
              key={action}
              type="button"
              title={title}
              onClick={() => onAction(action)}
              className={`min-w-[30px] px-2 py-1 rounded text-xs font-mono transition-colors ${className} ${
                dark
                  ? 'text-ink-dim hover:text-ink-text hover:bg-white/5'
                  : 'text-paper-dim hover:text-paper-text hover:bg-black/5'
              }`}
            >
              {label}
            </button>
          ))}
          {i < buttonGroups.length - 1 && (
            <span
              className={`mx-1.5 h-4 w-px ${
                dark ? 'bg-ink-border' : 'bg-paper-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
