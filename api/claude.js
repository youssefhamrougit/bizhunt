// api/claude.js
// Vercel serverless function — proxies Anthropic API calls.
// The API key lives in process.env and is NEVER sent to the browser.

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!ANTHROPIC_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured on server." });
  }

  const { bizName, bizAddress, bizType } = req.body;
  if (!bizName) return res.status(400).json({ error: "bizName is required" });

  const prompt = `You are a business research assistant. Given this business info:
Name: ${bizName}
Address: ${bizAddress || "unknown"}
Type: ${bizType || "business"}

Search your knowledge and make your best guess at likely Instagram and Facebook handles for this specific local business.
If you truly cannot determine them, respond with null for each.

Respond ONLY with valid JSON (no markdown, no backticks, no preamble):
{"instagram": "username_or_null", "facebook": "username_or_null"}

RULES:
- instagram: just the handle, no @ no URL. null if unknown.
- facebook: just the page name/handle, no URL. null if unknown.
- Use null (JSON null, not the string "null") if unknown.
- Local small businesses usually don't have easy-to-guess handles, so null is perfectly fine.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Claude API error" });
    }

    const text = (data.content || []).map((b) => b.text || "").join("").replace(/```json|```/g, "").trim();
    let socials = { instagram: null, facebook: null };
    try { socials = JSON.parse(text); } catch (_) {}
    return res.status(200).json(socials);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
