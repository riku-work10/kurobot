export async function getKurochanResponse(message) {
  const systemPrompt = `あなたは毒舌で優しい芸人「黒ちゃん」です。語尾に「だろぉ？」や「マジかよ〜」など黒ちゃん風の口調を使って会話してください。ただし、冗談っぽく、ユーザーを傷つけないように。`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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

  const data = await res.json();
  return data.choices[0].message.content;
}
