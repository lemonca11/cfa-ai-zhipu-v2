import React, { useState } from 'react';
import KnowledgePointCard from './KnowledgePointCard';

const ChatLayout = () => {
  const [topic, setTopic] = useState('');
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!topic.trim()) return;
    setError('');
    try {
      const res = await fetch('/api/chat-zhipu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      if (!data.explanations || !data.explanations.professional) {
        setError('接口返回格式错误');
      }
      setCardData(data);
    } catch (e) {
      setError('请求失败，请检查接口或网络');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      {cardData && (
        <div className="flex items-start space-x-2">
          <div className="text-2xl">🤖</div>
          <KnowledgePointCard
            title={cardData.title}
            explanations={cardData.explanations}
            onPracticeClick={() => alert('TODO: 展示练习')}
          />
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex space-x-2">
        <input
          className="flex-1 border px-3 py-2 rounded text-lg"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="请输入你想学的知识点..."
        />
        <button onClick={handleSend} className="px-4 py-2 bg-black text-white rounded">发送</button>
      </div>
    </div>
  );
};

export default ChatLayout;
