const usedQuestions = new Set();

export function addQuestion(question) {
  usedQuestions.add(question.trim().toLowerCase());
}

export function isDuplicate(question) {
  return usedQuestions.has(question.trim().toLowerCase());
}

export function getAllQuestionsText() {
  return Array.from(usedQuestions)
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");
}
