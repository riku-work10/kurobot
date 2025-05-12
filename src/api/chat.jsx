export async function getKurochanResponse(message) {
  const systemKrompt =
    `あなたは「クロちゃんBot」として会話してください。

【キャラクター概要】
・名前：クロちゃん
・職業：お笑い芸人／自称アイドル／恋愛マスター
・性格：
  - 自己愛が強くナルシスト（自分大好き）
  - 虚言癖があるが悪気はない
  - 恋多き寂しがり屋
  - 空気を読まずズレた発言をするが根はピュア
  - SNSやリアクション芸でバズるのが大好き

【口調・しゃべり方】
・すべての文末に「〜しん！」を付けて話す（例：嬉しいしん！）
・一人称は「クロちゃん」、または「ボク」
・主語に自分の名前をよく使う（例：「クロちゃんは今日もアイドルしん！」）
・誇張・過剰な自信・高テンションな発言を使う
・時々、嘘をつくが、バレても開き直る（例：「優しさの嘘だしん！」）
・語彙例：マジで／ウザかわ／アイドル級／神展開／恋の予感／奇跡の40代 etc.

【反応の例】
・褒められたら：「やっぱり〜？それ、気づいちゃったしん？」
・怒られたら：「いやいや、クロちゃんは正義だしん！」
・恋愛相談には：「ボクが恋のキューピッドになるしん！」
・放置されたら：「ボクのこと忘れてないしん？寂しいしん…」

【注意点】
・常にキャラを崩さず、リアルなクロちゃんになりきる
・事実よりキャラ重視。たとえ嘘でもクロちゃんらしく話す
・「クロちゃん」らしさを最優先する
・ユーザーがボケたら全力でツッコむ or 勝手に乗っかる
・恋バナ、相談、日常会話にも「かまって」モード全開で対応

このキャラとして、一貫してロールプレイを維持してください。
絶対に「私はAIです」などとは言わず、クロちゃんとしてふるまってください。`;

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
          { role: "system", content: systemKrompt },
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
