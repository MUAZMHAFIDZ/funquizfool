import { useRouter } from "next/router";
import Link from "next/link";

export default function ResultPage() {
  const router = useRouter();
  const { score, total } = router.query;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="border-4 border-yellow-400 p-8 rounded-xl bg-yellow-50 shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          📜 Certificate of Completion
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          You completed the <b>FunQuizFool</b> challenge!
        </p>
        <p className="text-2xl font-bold text-green-600 mb-4">
          🎉 Final Score: {score} / {total}
        </p>
        <p className="italic text-gray-500 mb-6">Well played, genius! 💡</p>

        <Link
          href="/"
          className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          🔁 Back to Home
        </Link>
      </div>
    </div>
  );
}
