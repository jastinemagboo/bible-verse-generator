import VerseCard from "./components/VerseCard";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <VerseCard />

        <footer className="mt-6">
          <p className="text-center font-[var(--font-ui)] text-xs text-gray-500">
            — Built by Jastine
          </p>
        </footer>
      </div>
    </main>
  );
}
