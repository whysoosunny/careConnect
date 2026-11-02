const SUGGESTIONS = [
  "How do I submit a support request?",
  "How can I volunteer?",
  "What can CareBot help with?",
  "What happens after I submit a form?",
  "How do I contact you?",
];

export function QuickActions({
  onPick,
  disabled,
}: {
  onPick: (q: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onPick(s)}
          className="rounded-full border border-teal-600/30 bg-teal-600/5 px-3 py-1.5 text-xs text-teal-700 transition hover:bg-teal-600/10 disabled:opacity-50 dark:text-teal-300"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

