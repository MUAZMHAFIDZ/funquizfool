export function parseQuestionsBatch(text) {
  const regex =
    /Question\s\d+:\s*(.*?)\na\)\s*(.*?)\nb\)\s*(.*?)\nc\)\s*(.*?)\nd\)\s*(.*?)\nAnswer:\s*([a-d])/gi;
  const questions = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    questions.push({
      question: match[1],
      options: {
        a: match[2],
        b: match[3],
        c: match[4],
        d: match[5],
      },
      answer: match[6].toLowerCase(),
    });
  }

  return questions;
}
