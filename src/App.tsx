import VerseCard from "./components/VerseCard";

export default function App() {
  return (
    <main className=" bg-gray-100">
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="px-8 mb-6">
          <VerseCard />
        </div>
        <footer>
          <p className="text-center text-xs text-gray-500 font-[var(--font-ui)]">
            - Built by Jastine
          </p>
        </footer>
      </div>
    </main>
  );
}
