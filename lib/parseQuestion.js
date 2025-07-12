// lib/parseQuestion.js
export function parseQuestion(text) {
  const question = text.match(/Question:\s*(.+)/i)?.[1] || "";
  const options = {
    a: text.match(/a\)\s*(.+)/i)?.[1] || "",
    b: text.match(/b\)\s*(.+)/i)?.[1] || "",
    c: text.match(/c\)\s*(.+)/i)?.[1] || "",
    d: text.match(/d\)\s*(.+)/i)?.[1] || "",
  };
  const answer = text.match(/Answer:\s*([a-d])/i)?.[1] || "";

  return { question, options, answer };
}
