const themes = [
  { id: 'paper', label: 'Paper' },
  { id: 'github', label: 'GitHub' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'sepia', label: 'Sepia' },
];

export default function ThemeSwitcher({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-paper-border bg-paper-bg p-1">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onChange(theme.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            value === theme.id
              ? 'bg-teal text-white'
              : 'text-paper-dim hover:text-paper-text'
          }`}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}
