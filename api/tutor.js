// api/tutor.js
//
// Vercel Serverless Function — securely proxies AI Tutor chat requests
// to Anthropic's API. Your real API key lives only here, on the server.
// The browser never sees it, so it can't be stolen from your site's code.
//
// SETUP:
// 1. Place this file at  api/tutor.js  in the ROOT of your project
//    (same level as package.json — NOT inside src/).
// 2. Get an API key at https://console.anthropic.com
// 3. In your Vercel project: Settings → Environment Variables →
//    add a variable named  ANTHROPIC_API_KEY  with your key as the value.
// 4. Redeploy. That's it — the AI Tutor in LearnHub.jsx will automatically
//    start using this endpoint once direct calls from the browser fail.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "Server is missing ANTHROPIC_API_KEY. Add it under your Vercel project's Settings → Environment Variables, then redeploy.",
    });
    return;
  }

  try {
    const { system, messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Request must include a non-empty 'messages' array." });
      return;
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      // Pass Anthropic's own error message through so issues
      // (bad key, rate limit, etc.) are easy to diagnose.
      res.status(anthropicRes.status).json({ error: data });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("AI Tutor proxy error:", err);
    res.status(500).json({ error: "Something went wrong reaching the AI tutor. Please try again." });
  }
};
