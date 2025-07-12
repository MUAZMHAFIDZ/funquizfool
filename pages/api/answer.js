import { getLastAnswer } from "./generate";

export default function handler(req, res) {
  const { userAnswer } = req.body;
  const correctAnswer = getLastAnswer();

  const result = userAnswer === correctAnswer ? "correct" : "incorrect";
  res.status(200).json({ result, correctAnswer });
}
