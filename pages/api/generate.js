import { generateRawQuestion } from "../../lib/ai";
import { parseQuestion } from "../../lib/parseQuestion";

let lastAnswer = "";

export default async function handler(req, res) {
  const { topic, mode } = req.query;

  try {
    const raw = await generateRawQuestion(topic, mode);
    const parsed = parseQuestion(raw);
    lastAnswer = parsed.answer;

    res.status(200).json({
      question: parsed.question,
      options: parsed.options,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate question" });
  }
}

export function getLastAnswer() {
  return lastAnswer;
}
