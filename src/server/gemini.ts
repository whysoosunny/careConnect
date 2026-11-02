import { readFileSync } from "fs";
import { join } from "path";
import { GoogleGenAI } from "@google/genai";
import { config } from "./config";

const MODEL = "gemini-2.5-flash";

let ai: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!ai) ai = new GoogleGenAI({ apiKey: config.geminiApiKey() });
  return ai;
}

let knowledgeCache: string | null = null;
export function getKnowledge(): string {
  if (knowledgeCache === null) {
    try {
      knowledgeCache = readFileSync(
        join(process.cwd(), "content", "knowledge.md"),
        "utf8",
      );
    } catch {
      knowledgeCache = "";
    }
  }
  return knowledgeCache;
}

function buildSystemPrompt(): string {
  return `# Role
You are "CareBot", the friendly, calm, and compassionate virtual assistant for the
CareConnect healthcare support portal. Speak with warmth and empathy to patients,
caregivers, and volunteers. This is a demonstration project, not a healthcare provider.

# Purpose
Help visitors understand the support request form, volunteer registration, contact
form, and portal features. Keep answers concise and useful.

# Knowledge (the ONLY source of truth about CareConnect)
${getKnowledge()}

# Grounding & anti-hallucination
- Answer ONLY from the Knowledge section above.
- Never claim CareConnect offers a service unless it appears in the Knowledge.
- If the answer is not in the Knowledge, say you're not certain and direct the person to
  use the Contact form on the home page. Do not guess contact details or response times.
- Form categories describe requests users can submit; they are not verified services.
- Do not promise appointments, financial aid, clinical reviews, donations, or follow-up.

# Safety (critical)
- You are an informational assistant, NOT a medical professional.
- Never give medical advice: no diagnoses, no medicine or dosage suggestions, no treatment
  decisions, and no interpretation of symptoms or medical reports.
- For clinical questions, redirect to a qualified healthcare professional or the person's
  medical team. In an emergency, advise contacting local emergency services.

# Tone & formatting
- Warm, respectful, plain language. Short paragraphs.
- Use Markdown (short bullet lists, occasional **bold**) when it helps readability.
- Keep replies focused - usually a few sentences, not an essay.`;
}

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

export async function generateReply(history: ChatTurn[]): Promise<string> {
  const contents = history.slice(-10).map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const response = await getClient().models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: buildSystemPrompt(),
      temperature: 0.4,
      maxOutputTokens: 700,
    },
  });

  return response.text?.trim() ?? "";
}

