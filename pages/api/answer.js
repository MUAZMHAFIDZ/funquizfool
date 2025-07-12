import { getLastAnswers } from "./generate";

export default function handler(req, res) {
  const { userAnswer, index } = req.body;
  const correctAnswer = getLastAnswers()[index];

  const result = userAnswer === correctAnswer ? "correct" : "incorrect";
  res.status(200).json({ result, correctAnswer });
}
