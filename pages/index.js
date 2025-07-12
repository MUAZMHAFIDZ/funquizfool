import Link from "next/link";
import { useState } from "react";

const topics = ["Physics", "History", "Anime", "Math", "Surprise"];
const modes = ["serious", "fooling"];

export default function Home() {
  const [mode, setMode] = useState("serious");

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">
        🎭 FunQuizFool
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        Choose a topic and mode to begin the madness!
      </p>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Select Mode</h2>
        <div className="flex gap-4 justify-center">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded border ${
                mode === m
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-600 border-orange-500"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/quiz/${topic.toLowerCase()}?mode=${mode}`}
            className="bg-orange-300 text-orange-900 px-5 py-3 rounded shadow hover:bg-orange-400 font-semibold"
          >
            {topic}
          </Link>
        ))}
      </div>
    </div>
  );
}
