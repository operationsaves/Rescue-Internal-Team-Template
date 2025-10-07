import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { fetchAIChatResponse } from '../services/mockApiService';

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', text: "Hello! I'm your AI assistant. How can I help you find information about our animals, events, or applications today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await fetchAIChatResponse(input);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem-1rem)]">
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`rounded-2xl p-3 max-w-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white/80 backdrop-blur-md text-gray-800 rounded-bl-none shadow-md'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="rounded-2xl p-3 bg-white/80 backdrop-blur-md text-gray-800 rounded-bl-none shadow-md">
              <div className="flex items-center space-x-1">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about records, schedules..."
          className="flex-1 bg-transparent border-none focus:ring-0 outline-none px-4 text-gray-700"
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChatPage;
