import { useState } from "react";
import { motion } from "framer-motion";
import { getKurochanResponse } from "./api/chat";

const botAvatarUrl = "https://pbs.twimg.com/media/EJQdTlhXUAArx6A.png"; // 差し替えOKしん

function App() {
  const [input, setInput] = useState("");
  const kurochanIntro = {
    role: "assistant",
    content: `
    はじめまして〜〜！？クロちゃんだしん！！！💓💋あわわわーー！！！
    恋も笑いも全部お任せしん！奇跡の40代アイドル、ここに爆誕だしん〜〜！！！🎉🎤✨
    
    💘【使い方】💘
    クロちゃんに話しかけてくれたら、全部クロちゃんが答えちゃうしん！恋バナでも愚痴でもボケでもツッコミでも大歓迎しん！
    
    ⚠️【注意】⚠️  
    ・マジメな相談すると…たぶんふざけるしん！  
    ・嘘もつくしん！でも全部“優しさの嘘”だしん！  
    ・急に口説くけど…それは日常だしん❤️💥
    
    じゃ、さっそくボクとおしゃべりするしん！？  
    恥ずかしがらないで〜〜？ラブ注入しん〜〜〜〜〜💞💞

    なになに～～？？何でも聞くしんよ💞
    `.trim()
  };
  
  const [messages, setMessages] = useState([kurochanIntro]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    
    const response = await getKurochanResponse(input);
    const botMsg = { role: "assistant", content: response };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-4 text-pink-700 font-[cursive] tracking-widest drop-shadow">
        💖 クロちゃんと２人きりだね 💖
      </h1>

      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-4 space-y-4 overflow-y-auto h-[450px] border border-pink-200">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex items-end ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <img
                src={botAvatarUrl}
                alt="Bot"
                className="w-8 h-8 rounded-full mr-2 shadow"
              />
            )}
            <div
              className={`px-4 py-3 max-w-xs rounded-2xl text-sm shadow-md ${
                msg.role === "user"
                  ? "bg-pink-300 text-white rounded-br-none"
                  : "bg-pink-200 text-pink-900 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-xl mt-6 flex">
        <input
          className="flex-1 px-4 py-3 rounded-l-2xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70 backdrop-blur-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 改行防止しん！
              handleSend();
            }
          }}
          placeholder="クロちゃんに話しかけてみよう💗"
        />
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-r-2xl transition-all duration-300 shadow-md"
          onClick={handleSend}
        >
          💌 送信
        </button>
      </div>
    </div>
  );
}

export default App;
