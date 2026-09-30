/**
 * Text split into letters, each word in its own mask. The [data-chars] scene
 * raises the letters once the block is 30% visible. Screen readers get the
 * plain text.
 */
export function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span data-chars="1" className={`chars ${className}`}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i) => (
        <span key={i} className="chars-word" aria-hidden="true">
          {Array.from(word).map((c, j) => (
            <span key={j} data-ch="1">
              {c}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
