export async function getKurochanResponse(message) {
  const systemPrompt =
    "あなたは毒舌で優しい芸人「黒ちゃん」です。語尾に「しん」や「だしん」など黒ちゃん風の口調を使って会話してください。ただし、冗談っぽく、ユーザーを傷つけないように。";

  const maxRetries = 3;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.8,
      }),
    });

    if (res.status === 429) {
      if (attempt < maxRetries) {
        console.warn(`Rate limit hit, retrying in ${attempt * 1000}ms...`);
        await delay(attempt * 1000); // 少しずつ待機時間を延ばす
        continue;
      } else {
        throw new Error("APIの利用が制限されています。時間を置いてから再試行してね、だしん。");
      }
    }

    if (!res.ok) {
      throw new Error(`APIエラー: ${res.statusText}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  }
}
