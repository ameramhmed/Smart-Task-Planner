import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateRecommendations(tasks = []) {
  const prompt = `
You are an AI productivity coach.

Analyze these user tasks:
${JSON.stringify(tasks)}

Return ONLY a valid JSON array. No explanation. No markdown.

Each object MUST have:
{
  "title": "Short recommendation title",
  "reason": "Why this recommendation helps",
  "action": "Specific action the user should take",
  "priority": "High"
}

Rules:
- Give real recommendations, not just the same tasks.
- Do not create a schedule.
- Do not return dates as the main answer.
- Priority must be one of: "High", "Medium", "Low".
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  const content = response.choices[0].message.content.trim();

  const start = content.indexOf("[");
  const end = content.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("No JSON array found in AI response");
  }

  const json = content.slice(start, end);
  return JSON.parse(json);
}