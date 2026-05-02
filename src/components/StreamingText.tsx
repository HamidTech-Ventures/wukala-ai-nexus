import { useEffect, useState } from 'react';

interface StreamingTextProps {
  text: string;
  speed?: number; // ms per character
  onDone?: () => void;
  className?: string;
}

/**
 * Reveals text character-by-character to simulate a streaming AI response.
 * When the backend later sends real SSE/streaming chunks, replace the
 * setInterval with chunk appends — the rendering layer stays the same.
 */
export default function StreamingText({
  text,
  speed = 12,
  onDone,
  className,
}: StreamingTextProps) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  const isDone = shown.length >= text.length;

  return (
    <span className={className}>
      {shown}
      {!isDone && (
        <span className="inline-block w-[2px] h-[1em] align-middle ml-0.5 bg-current animate-pulse" />
      )}
    </span>
  );
}
