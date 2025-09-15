import { useEffect, useMemo, useState } from "react";
import versesData from "../data/verses.json";
import { BookOpen, Copy } from "lucide-react";

type Verse = {
  id: number;
  reference: string;
  meaning: string;
  description?: string;
};

function getRandomIndex(max: number, exclude?: number) {
  if (max <= 1) return 0;
  let idx = Math.floor(Math.random() * max);
  while (exclude !== undefined && idx === exclude) {
    idx = Math.floor(Math.random() * max);
  }
  return idx;
}

export default function VerseCard() {
  const verses = useMemo<Verse[]>(() => versesData as Verse[], []);
  const [copied, setCopied] = useState(false);

  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    const savedId = localStorage.getItem("verseId");
    if (savedId) {
      const idx = verses.findIndex((v) => String(v.id) === savedId);
      if (idx !== -1) return idx;
    }
    return getRandomIndex(verses.length);
  });

  useEffect(() => {
    const current = verses[currentIdx];
    if (current) localStorage.setItem("verseId", String(current.id));
  }, [currentIdx, verses]);

  if (!verses.length) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-6 text-center text-sm text-gray-600">
        No verses found.
      </div>
    );
  }

  const verse = verses[currentIdx];

  function nextRandom() {
    setCurrentIdx((prev) => getRandomIndex(verses.length, prev));
    setCopied(false);
  }

  async function copyVerse() {
    const payload = `${verse.meaning}\n— ${verse.reference}`;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-2xl bg-white rounded-xl p-6 shadow-2xl ring-1 ring-gray-100 transition ">
      <div className="mb-2 text-xs uppercase tracking-wide font-[var(--font-verse)] text-gray-600">
        {verse.reference}
      </div>

      <div className="mb-3 text-xl text-gray-900 font-[var(--font-verse)]">
        {verse.meaning}
      </div>

      {verse.description && (
        <p className="mb-6 text-sm font-[var(--font-ui)] text-gray-700">
          <span className="font-semibold">Meaning: </span>
          {verse.description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={nextRandom}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-3 text-xs font-[var(--font-ui)] text-white shadow-xl"
        >
          <BookOpen className="h-4 w-4" />
          New verse
        </button>

        <button
          onClick={copyVerse}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-3 text-xs font-[var(--font-ui)] text-gray-800 shadow-xl hover:shadow-2xl"
          title="Copy (shortcut: C)"
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>

        <div
          aria-live="polite"
          className={[
            "pointer-events-none absolute inset-0 bottom-6 flex items-center justify-center transition-opacity",
            copied ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Copied to clipboard
          </div>
        </div>
      </div>
    </div>
  );
}
