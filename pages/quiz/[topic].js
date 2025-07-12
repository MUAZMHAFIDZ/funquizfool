import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizPage() {
  const router = useRouter();
  const { topic } = router.query;
  const mode = router.query.mode || "serious";

  const TOTAL_QUESTIONS = 5;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionData, setQuestionData] = useState(null);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    if (!topic) return;
    loadQuestionWithDelay();
  }, [topic, mode, questionNumber]);

  const loadQuestionWithDelay = async () => {
    setLoading(true);
    setQuestionData(null);
    setResult(null);
    setSelected("");
    setDisableOptions(false);

    setTimeout(async () => {
      const res = await axios.get(`/api/generate?topic=${topic}&mode=${mode}`);
      setQuestionData(res.data);
      setLoading(false);
    }, 8000);
  };

  const handleAnswer = async (choice) => {
    if (disableOptions || result) return;
    setSelected(choice);
    setDisableOptions(true);

    const res = await axios.post("/api/answer", { userAnswer: choice });
    setResult(res.data.result);
    if (res.data.result === "correct") {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      router.push(
        `/quiz/${topic}/result?score=${score}&total=${TOTAL_QUESTIONS}`
      );
    } else {
      setQuestionNumber((prev) => prev + 1);
    }
  };

  const handleGiveUp = () => {
    router.push(
      `/quiz/${topic}/result?score=${score}&total=${TOTAL_QUESTIONS}`
    );
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        🎭 FunQuizFool
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Topic: <b>{topic}</b> | Mode: <b>{mode}</b> | Question {questionNumber}{" "}
        / {TOTAL_QUESTIONS}
      </p>

      {loading ? (
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full animate-pulse flex flex-col items-center">
          <div className="text-4xl mb-4">🧠🤪📚</div>
          <p className="text-gray-600 font-semibold text-lg">
            Thinking of a crazy question...
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Please wait 8 seconds while AI generates magic ✨
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow max-w-xl w-full">
          <h2 className="mb-4 text-lg font-semibold">
            Q{questionNumber}: {questionData.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {["a", "b", "c", "d"].map((key) => (
              <button
                key={key}
                disabled={disableOptions}
                onClick={() => handleAnswer(key)}
                className={`border px-4 py-2 rounded transition-all duration-200 ${
                  selected === key
                    ? result === "correct" && key === selected
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-white hover:bg-yellow-100"
                }`}
              >
                {key}) {questionData.options[key]}
              </button>
            ))}
          </div>

          {result && (
            <div className="mt-4">
              <p
                className={`text-lg font-bold ${
                  result === "correct" ? "text-green-600" : "text-red-600"
                }`}
              >
                {result === "correct" ? "✅ Correct!" : "❌ Incorrect!"}
              </p>
              <button
                onClick={handleNext}
                className="mt-3 px-5 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-600"
              >
                {questionNumber >= TOTAL_QUESTIONS
                  ? "🎉 See Result"
                  : "➡️ Next Question"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2">
          Score: {score} / {TOTAL_QUESTIONS}
        </p>
        <button
          onClick={handleGiveUp}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          ❌ Give up and see result
        </button>
      </div>
    </div>
  );
}
