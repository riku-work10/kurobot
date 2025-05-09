import { useState } from "react";
import { getKurochanResponse } from "./api/chat";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">黒ちゃんBot 💬</h1>
      <div className="w-full max-w-xl bg-white shadow rounded p-4 space-y-2 overflow-y-auto h-[400px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="w-full max-w-xl mt-4 flex">
        <input
          className="flex-1 p-2 rounded-l border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="黒ちゃんに話しかけてみよう"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" onClick={handleSend}>
          送信
        </button>
      </div>
    </div>
  );
}

export default App;
