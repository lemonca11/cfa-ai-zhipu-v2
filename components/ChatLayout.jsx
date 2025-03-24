import React, { useState } from 'react';
import KnowledgePointCard from './KnowledgePointCard';

const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await fetch('/api/chat-zhipu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data }]);
    } catch (err) {
      console.error('调用智谱失败', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col space-y-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={msg.role === 'user' ? 'text-right' : 'flex items-start space-x-3'}>
          {msg.role === 'user' ? (
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-2 rounded-xl text-sm">
              {msg.content}
            </div>
          ) : (
            <>
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">🤖</div>
              <div className="flex-1">
                <KnowledgePointCard
                  title={msg.content.title}
                  explanations={msg.content.explanations}
                  onPracticeClick={() => alert('做练习功能待实现')}
                />
              </div>
            </>
          )}
        </div>
      ))}
      <div className="mt-4 flex space-x-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          type="text"
          placeholder="请输入你想学的知识点..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >发送</button>
      </div>
    </div>
  );
};

export default ChatLayout;
