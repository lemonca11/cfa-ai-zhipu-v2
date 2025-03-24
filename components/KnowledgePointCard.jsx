import React, { useState } from 'react';

const KnowledgePointCard = ({ title, explanations, onPracticeClick }) => {
  const [activeTab, setActiveTab] = useState('professional');

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
      <div className="flex space-x-2 mb-3">
        <button
          className={`px-3 py-1 rounded-full text-sm border ${activeTab === 'professional' ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
          onClick={() => setActiveTab('professional')}
        >专业版</button>
        <button
          className={`px-3 py-1 rounded-full text-sm border ${activeTab === 'beginner' ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
          onClick={() => setActiveTab('beginner')}
        >小白版</button>
        <button
          className={`px-3 py-1 rounded-full text-sm border ${activeTab === 'case' ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
          onClick={() => setActiveTab('case')}
        >案例版</button>
      </div>
      <div className="text-gray-700 text-sm leading-relaxed mb-4">
        {explanations[activeTab]}
      </div>
      <button
        onClick={onPracticeClick}
        className="w-full mt-2 bg-yellow-500 text-white font-medium py-2 rounded-xl hover:bg-yellow-600 transition"
      >做练习</button>
    </div>
  );
};

export default KnowledgePointCard;
