import { generateQuestionsBatch } from "../../lib/ai";
import { parseQuestionsBatch } from "../../lib/parseQuestion";

let lastAnswers = [];

export default async function handler(req, res) {
  const { topic, mode } = req.query;

  try {
    const raw = await generateQuestionsBatch(topic, mode);
    const parsedQuestions = parseQuestionsBatch(raw);
    lastAnswers = parsedQuestions.map((q) => q.answer);

    res.status(200).json({ questions: parsedQuestions });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

export function getLastAnswers() {
  return lastAnswers;
}
