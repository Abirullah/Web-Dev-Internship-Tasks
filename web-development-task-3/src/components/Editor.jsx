import { useRef } from 'react';
import Toolbar from './Toolbar';
import { markdownActions } from '../utils/markdownActions';

export default function Editor({ value, onChange }) {
  const textareaRef = useRef(null);

  const runAction = (actionName) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { newValue, cursorStart, cursorEnd } = markdownActions[actionName](
      textarea
    );
    onChange(newValue);

    // Restore selection after React re-renders the textarea value
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleKeyDown = (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (!meta) return;
    if (e.key === 'b') {
      e.preventDefault();
      runAction('bold');
    } else if (e.key === 'i') {
      e.preventDefault();
      runAction('italic');
    } else if (e.key === 'k') {
      e.preventDefault();
      runAction('link');
    }
  };

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join(
    '\n'
  );

  return (
    <div className="flex flex-col h-full bg-ink-bg text-ink-text">
      <Toolbar onAction={runAction} dark />
      <div className="flex flex-1 min-h-0">
        <div
          aria-hidden="true"
          className="select-none text-right pr-3 pt-4 pl-3 text-xs font-mono text-ink-dim/60 overflow-hidden shrink-0 border-r border-ink-border"
          style={{ lineHeight: '1.6rem' }}
        >
          <pre className="font-mono">{lineNumbers}</pre>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Start typing Markdown…"
          className="scroll-thin flex-1 resize-none bg-transparent px-4 pt-4 pb-8 text-sm font-mono text-ink-text placeholder-ink-dim/50 outline-none"
          style={{ lineHeight: '1.6rem' }}
        />
      </div>
    </div>
  );
}
