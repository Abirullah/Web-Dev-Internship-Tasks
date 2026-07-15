import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const themeBg = {
  paper: 'bg-paper-bg',
  github: 'bg-white',
  dusk: 'bg-ink-bg',
  sepia: 'bg-[#f6ecd6]',
};

export default function Preview({ content, theme }) {
  return (
    <div className={`h-full overflow-y-auto scroll-thin ${themeBg[theme]}`}>
      <div
        className={`md-preview theme-${theme} max-w-2xl mx-auto px-8 py-10 font-body`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
