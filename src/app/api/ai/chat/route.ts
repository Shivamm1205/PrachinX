import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || "";

    const openaiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!openaiKey) {
      // Return a helpful fallback so frontend shows a useful message
      return NextResponse.json({
        success: true,
        data: {
          reply: "AI Engine not connected yet. To enable chat, set OPENAI_API_KEY in your environment and restart the server.",
        },
      });
    }

    // Forward to OpenAI Chat Completions (if API key is configured)
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
        max_tokens: 300,
      }),
    });

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || "(no reply)";

    return NextResponse.json({ success: true, data: { reply } });
  } catch (err) {
    return NextResponse.json({ success: false, error: "AI Engine error" }, { status: 500 });
  }
}
