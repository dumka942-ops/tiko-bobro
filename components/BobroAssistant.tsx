
import React, { useState, useRef, useEffect } from 'react';
import { bobroService } from '../services/geminiService';
import { BobroMessage } from '../types';

interface BobroAssistantProps {
  currentVideoContext?: string;
}

const BobroAssistant: React.FC<BobroAssistantProps> = ({ currentVideoContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BobroMessage[]>([
    { role: 'assistant', content: 'Wood-hello! I am Bobro-Bot. Want to talk about this video or learn some beaver facts?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: BobroMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await bobroService.askBobro(input, currentVideoContext);
    const botMsg: BobroMessage = { role: 'assistant', content: response, timestamp: Date.now() };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const getFact = async () => {
    setIsLoading(true);
    const fact = await bobroService.getBeaverFact();
    setMessages(prev => [...prev, { role: 'assistant', content: `Did you know? ${fact}`, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 border-4 border-orange-900"
      >
        <span className="text-2xl">🦫</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-[#1a1a1a] border border-orange-500/30 rounded-2xl flex flex-col shadow-2xl z-50 overflow-hidden">
      <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦫</span>
          <span className="font-bold">Bobro-Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-fixed">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-100 rounded-tl-none border border-white/5'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-2xl animate-pulse text-xs text-orange-400">
              Bobro is thinking... 🪵
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 flex flex-col gap-2">
        <div className="flex gap-2 mb-1 overflow-x-auto pb-1">
          <button onClick={getFact} className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-orange-300 border border-orange-500/20 transition-colors">
            Random Fact ✨
          </button>
          <button onClick={() => setInput("What's in this video?")} className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-orange-300 border border-orange-500/20 transition-colors">
            Summarize video 🎥
          </button>
        </div>
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your beaver friend..."
            className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-orange-600 rounded-xl hover:bg-orange-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BobroAssistant;
