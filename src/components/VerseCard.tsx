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

    if (current) {
      localStorage.setItem("verseId", String(current.id));
    }
  }, [currentIdx, verses]);

  if (!verses.length) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
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
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        {/* Subtle decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gray-200/50 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <BookOpen className="h-4 w-4 text-gray-600" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Daily Verse
              </span>
            </div>

            <button
              onClick={copyVerse}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              title="Copy verse"
              aria-label="Copy verse"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Verse */}
          <div className="text-center">
            <blockquote className="mx-auto max-w-xl font-[var(--font-verse)] text-2xl leading-[1.7] text-gray-800 sm:text-[1.7rem]">
              “{verse.meaning}”
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gray-300" />

              <p className="text-sm font-semibold tracking-wide text-gray-600">
                {verse.reference}
              </p>

              <span className="h-px w-8 bg-gray-300" />
            </div>
          </div>

          {/* Reflection */}
          {verse.description && (
            <div className="mx-auto mt-10 max-w-xl border-t border-gray-200 pt-7">
              <p className="font-[var(--font-ui)] text-sm leading-7 text-gray-600">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Reflection
                </span>

                {verse.description}
              </p>
            </div>
          )}

          {/* Action */}
          <div className="mt-9 flex justify-center">
            <button
              onClick={nextRandom}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md active:translate-y-0"
            >
              <BookOpen className="h-4 w-4" />
              New verse
            </button>
          </div>
        </div>
      </div>

      {/* Copied toast */}
      <div
        aria-live="polite"
        className={[
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          Copied to clipboard
        </div>
      </div>
    </div>
  );
}
