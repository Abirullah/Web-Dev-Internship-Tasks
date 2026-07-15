import { useEffect, useRef, useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemeSwitcher from './components/ThemeSwitcher';
import SplitDivider from './components/SplitDivider';
import defaultContent from './defaultContent';
import { downloadTextFile } from './utils/download';

const STORAGE_KEY = 'marginale:draft';
const THEME_KEY = 'marginale:theme';

function loadInitialContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ?? defaultContent;
  } catch {
    return defaultContent;
  }
}

function loadInitialTheme() {
  try {
    return localStorage.getItem(THEME_KEY) ?? 'paper';
  } catch {
    return 'paper';
  }
}

export default function App() {
  const [content, setContent] = useState(loadInitialContent);
  const [theme, setTheme] = useState(loadInitialTheme);
  const [splitPct, setSplitPct] = useState(50);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, content);
      } catch {
        /* storage unavailable, ignore */
      }
    }, 300);
    return () => clearTimeout(id);
  }, [content]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable, ignore */
    }
  }, [theme]);

  const handleDrag = (clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.min(80, Math.max(20, pct)));
  };

  const handleDownload = () => downloadTextFile('README.md', content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  const handleReset = () => {
    if (confirm('Reset the editor to the starter template? This clears your current draft.')) {
      setContent(defaultContent);
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="flex flex-col h-screen bg-paper-bg">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 px-5 py-3 border-b border-paper-border bg-paper-panel shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-teal text-white font-display font-semibold text-sm">
            M
          </div>
          <div>
            <h1 className="font-display font-semibold text-paper-text text-lg leading-none">
              Marginale
            </h1>
            <p className="text-[11px] text-paper-dim leading-none mt-1">
              Markdown editor &amp; README generator
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-paper-dim font-mono">
          <span>{wordCount} words</span>
          <span className="text-paper-border">·</span>
          <span>{charCount} chars</span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher value={theme} onChange={setTheme} />
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-paper-dim hover:text-paper-text hover:bg-black/5 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-paper-border text-paper-text hover:bg-black/5 transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber text-paper-bg hover:bg-amber-dim transition-colors"
          >
            Download README.md
          </button>
        </div>
      </header>

      {/* Editor / Preview split */}
      <div ref={containerRef} className="flex flex-1 min-h-0 flex-col md:flex-row">
        <div
          className="min-h-0 h-1/2 md:h-full"
          style={{ flexBasis: `${splitPct}%` }}
        >
          <Editor value={content} onChange={setContent} />
        </div>

        <SplitDivider onDrag={handleDrag} />

        <div
          className="min-h-0 h-1/2 md:h-full flex-1 border-t md:border-t-0 border-paper-border"
        >
          <Preview content={content} theme={theme} />
        </div>
      </div>
    </div>
  );
}
