// lib/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateRawQuestion(topic, mode) {
  const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

  const prompt = `
You are an intelligent quiz generator.

Generate a **multiple choice question** in the topic of "${topic}" only.

The style must be:
- "${mode}" → If it's "fooling", make it funny, absurd, or a trick. If it's "serious", make it factual and educational.
- Stick STRICTLY to the topic. DO NOT switch to history unless it's history itself.

Respond ONLY in this exact format:

Question: <the question text>
a) <option A>
b) <option B>
c) <option C>
d) <option D>
Answer: <a/b/c/d>

Examples:
Topic = Math
→ Ask about equations, numbers, logic, but NOT mathematicians or history.

Topic = Anime
→ Ask about anime characters, plot, studio, or opening songs. DO NOT ask about history of anime or Japan.

Now generate one question in topic "${topic}".
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}
