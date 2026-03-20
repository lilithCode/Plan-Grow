import { getFallbackPlan, parsePlanAIResponse } from "@/lib/planner";
import type { NextRequest } from "next/server";

function extractFirstJsonObject(text: string): unknown | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const candidate = text.slice(start, end + 1).trim();
  try {
    return JSON.parse(candidate) as unknown;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { prompt?: string }
    | null;

  const prompt = body?.prompt?.trim();
  if (!prompt) {
    return Response.json(
      { error: "Missing prompt. Tell me what you want to plan." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    const fallback = getFallbackPlan(prompt);
    return Response.json({ plan: fallback, source: "fallback" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const systemPrompt = [
      "You are a friendly, calming daily planner for focus and well-being.",
      "Create a simple plan with three sections: Morning, Afternoon, Evening.",
      "Write short, human-friendly tasks (no more than 2 sentences each).",
      "Use motivational, non-robotic language.",
      "Return ONLY valid JSON with this shape:",
      "{",
      '  "motivationalLine": string,',
      '  "sections": [',
      '    { "timeOfDay": "Morning" | "Afternoon" | "Evening", "tasks": string[] }',
      "  ]",
      "}",
      "Total tasks should be around 9-12.",
    ].join("\n");

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          temperature: 0.7,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        }),
      },
    );

    if (!response.ok) {
      return Response.json(
        {
          error: "AI planning failed. Try again in a moment.",
          status: response.status,
        },
        { status: 502 },
      );
    }

    type OpenAIChatResponse = {
      choices?: Array<{
        message?: { content?: unknown };
      }>;
    };

    const data = (await response.json()) as OpenAIChatResponse;
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      const fallback = getFallbackPlan(prompt);
      return Response.json({ plan: fallback, source: "fallback" });
    }

    const extracted = extractFirstJsonObject(content);
    const parsed = parsePlanAIResponse(extracted);
    if (!parsed) {
      const fallback = getFallbackPlan(prompt);
      return Response.json({ plan: fallback, source: "fallback" });
    }

    return Response.json({ plan: parsed, source: "groq" });
  } catch (e) {
    const fallback = getFallbackPlan(prompt);
    return Response.json({ plan: fallback, source: "fallback", warning: String(e) });
  } finally {
    clearTimeout(timeout);
  }
}

