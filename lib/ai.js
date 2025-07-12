import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuestionsBatch(topic, mode) {
  const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

  const prompt = `
      You are a highly intelligent and focused quiz generator AI.
      
      Your task is to create FIVE (5) **unique and non-repetitive** multiple-choice questions strictly related to the topic: "${topic}".
      
      Style:
      - Mode = "${mode}" → ${
    mode === "fooling"
      ? "Make the questions humorous, tricky, or ironic, but still RELEVANT to the topic."
      : "Make the questions educational, well-structured, and informative."
  }
      
      Guidelines:
      - ❗ Stick STRICTLY to the topic "${topic}" — do NOT include unrelated fields like history, politics, or general trivia unless they are directly relevant.
      - 💡 Vary the subtopics, question types (definition, logic, example), and difficulty.
      - 🤖 Do NOT copy or repeat wording, structure, or facts across the questions.
      - ✅ Ensure each question has only ONE clear correct answer.
      
      Format EXACTLY like this:
      
      Question 1: <question text>
      a) <option A>
      b) <option B>
      c) <option C>
      d) <option D>
      Answer: <a/b/c/d>
      
      Repeat until Question 5.
      Keep the language fluent and avoid unnecessary explanation.
      `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}
