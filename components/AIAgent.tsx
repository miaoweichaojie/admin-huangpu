import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ExquisiteBubbleBot = ({ isThinking, isNight }: { isThinking: boolean, isNight: boolean }) => {
  const [mood, setMood] = useState<'happy' | 'blink' | 'thinking' | 'love' | 'sleep'>('happy');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moodInterval = setInterval(() => {
      if (isThinking) {
        setMood('thinking');
      } else {
        const moods: Array<'happy' | 'blink' | 'love' | 'sleep'> = ['happy', 'blink', 'love', 'sleep', 'happy', 'blink'];
        setMood(moods[Math.floor(Math.random() * moods.length)]);
      }
    }, 4500);
    return () => clearInterval(moodInterval);
  }, [isThinking]);

  return (
    <div 
      className={`relative w-64 h-72 group cursor-pointer flex items-center justify-center transition-all duration-1000 ${
        mood === 'sleep' ? 'animate-[float-slow_6s_infinite_ease-in-out] opacity-90' : 'animate-[float-lively_5s_infinite_ease-in-out]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(5px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes drift-z {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translate(30px, -60px) scale(1.5); opacity: 0; }
          }
        `}
      </style>

      {/* 睡觉时的 Z 字动画 - 尺寸放大 */}
      {mood === 'sleep' && (
        <div className="absolute top-8 right-8 pointer-events-none">
          <span className="absolute text-[#22d3ee] font-black text-3xl animate-[drift-z_3s_infinite_linear] drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Z</span>
          <span className="absolute text-[#22d3ee] font-black text-xl animate-[drift-z_3s_infinite_linear_1s] drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]" style={{ top: '15px', right: '-25px' }}>Z</span>
          <span className="absolute text-[#22d3ee] font-black text-lg animate-[drift-z_3s_infinite_linear_2s] drop-shadow-[0_0_3px_rgba(34,211,238,0.3)]" style={{ top: '30px', right: '-45px' }}>Z</span>
        </div>
      )}

      {/* 底部全息投影底座 */}
      <div className="absolute bottom-8 w-40 h-16 flex items-center justify-center pointer-events-none">
        <div className={`absolute w-full h-full rounded-[100%] border-[1px] transition-all duration-1000 animate-[rotate-slow_8s_linear_infinite] ${
          isNight ? 'border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_40px_rgba(34,211,238,0.25)]' : 'border-sky-400/30 bg-sky-400/5 shadow-[0_0_20px_rgba(14,165,233,0.1)]'
        }`}></div>
        <div className={`absolute w-24 h-24 rounded-full blur-3xl animate-pulse ${isNight ? 'bg-cyan-500/20' : 'bg-sky-400/10'}`}></div>
      </div>
      
      {/* 机器人主体容器 */}
      <div className={`relative w-40 h-48 transition-all duration-700 ${isThinking ? 'scale-105' : 'group-hover:-translate-y-5'}`}>
        
        {/* 精致左侧浮板 */}
        <div className={`absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-16 rounded-2xl border-2 transition-all duration-500 animate-[float-lively_3s_infinite] shadow-xl ${
          isNight ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-400' : 'bg-white border-sky-300'
        }`}>
           <div className={`w-full h-1/2 rounded-t-xl bg-gradient-to-b ${isNight ? 'from-cyan-500/20 to-transparent' : 'from-sky-100 to-transparent'}`}></div>
           <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${mood === 'sleep' ? 'bg-cyan-900 opacity-20' : 'animate-ping ' + (isNight ? 'bg-cyan-500' : 'bg-sky-500')}`}></div>
        </div>

        {/* 挥手的小手手臂 - 睡觉时不挥手 */}
        <div className={`absolute -right-8 top-[55%] w-12 h-8 origin-left transition-all duration-500 z-30 ${mood === 'sleep' ? 'rotate-[30deg] opacity-60' : 'animate-[wave_1.8s_infinite_ease-in-out]'}`}>
           <div className={`w-full h-full rounded-full border-2 shadow-xl flex items-center justify-center transition-colors ${
             isNight ? 'bg-slate-900/95 border-cyan-400/50 text-cyan-400' : 'bg-white border-sky-300'
           }`}>
             <span className="text-sm">{mood === 'sleep' ? '💤' : '👋'}</span>
           </div>
        </div>

        <svg viewBox="0 0 100 130" className={`w-full h-full transition-all overflow-visible ${isNight ? 'drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]'}`}>
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor={isNight ? "#e0f2fe" : "#f8fafc"} />
              <stop offset="100%" stopColor={isNight ? "#bae6fd" : "#e2e8f0"} />
            </linearGradient>
            <filter id="eyeGlow">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          
          {/* 身体 - 圆润蛋形 */}
          <path d="M10 50 Q10 10 50 10 Q90 10 90 50 L90 85 Q90 125 50 125 Q10 125 10 85 Z" fill="url(#bodyGradient)" stroke={isNight ? "rgba(34,211,238,0.3)" : "rgba(14,165,233,0.15)"} strokeWidth="1" />
          
          {/* 高级反光感 */}
          <path d="M25 25 Q50 18 75 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

          {/* 黑色面罩区域 */}
          <rect x="18" y="38" width="64" height="46" rx="20" fill={isNight ? "#020617" : "#1e293b"} />
          
          {/* 腮红 */}
          <circle cx="28" cy="70" r="3.5" fill="#fb7185" fillOpacity={mood === 'sleep' ? "0.1" : "0.25"} />
          <circle cx="72" cy="70" r="3.5" fill="#fb7185" fillOpacity={mood === 'sleep' ? "0.1" : "0.25"} />

          {/* 表情绘制 */}
          <g transform="translate(30, 52)" filter="url(#eyeGlow)">
            {mood === 'happy' && (
              <>
                <path d="M0 6 Q5 -2 10 6" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
                <path d="M30 6 Q35 -2 40 6" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
                <path d="M15 24 Q20 30 25 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              </>
            )}
            {mood === 'love' && (
              <>
                <path d="M0 10 L5 2 L10 10 L5 18 Z" fill="#fb7185" />
                <path d="M30 10 L35 2 L40 10 L35 18 Z" fill="#fb7185" />
                <path d="M10 26 Q20 34 30 26" fill="none" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
            {mood === 'thinking' && (
              <g>
                <circle cx="5" cy="10" r="3" fill="#22d3ee" className="animate-pulse" />
                <circle cx="20" cy="10" r="3" fill="#22d3ee" className="animate-pulse delay-75" />
                <circle cx="35" cy="10" r="3" fill="#22d3ee" className="animate-pulse delay-150" />
                <rect x="12" y="24" width="16" height="3" rx="1.5" fill="#22d3ee" opacity="0.3" />
              </g>
            )}
            {mood === 'blink' && (
              <>
                <rect x="0" y="8" width="12" height="3" rx="1.5" fill="#22d3ee" />
                <rect x="28" y="8" width="12" height="3" rx="1.5" fill="#22d3ee" />
              </>
            )}
            {mood === 'sleep' && (
              <>
                <path d="M0 10 Q5 16 10 10" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                <path d="M30 10 Q35 16 40 10" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              </>
            )}
          </g>

          {/* 底部能量指示 */}
          <circle cx="50" cy="108" r="3.5" fill={isNight ? "#22d3ee" : "#38bdf8"} className={mood === 'sleep' ? "opacity-20" : "animate-pulse"} />
        </svg>
      </div>
      
      {/* 侧边气泡预览 */}
      <div className={`absolute top-0 left-full ml-14 px-8 py-6 border rounded-[2.5rem] transition-all transform origin-left whitespace-nowrap z-[100] ${
        isHovered && mood !== 'sleep' ? 'scale-100 opacity-100 translate-x-0' : 'scale-90 opacity-0 -translate-x-4'
      } backdrop-blur-3xl shadow-2xl ${
        isNight ? 'bg-slate-900/80 border-cyan-400/40 text-white' : 'bg-white/80 border-sky-400 text-slate-800'
      }`}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-ping ${isNight ? 'bg-cyan-400' : 'bg-sky-500'}`}></div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>指挥官，智豆待命！</span>
          </div>
          <span className="text-base font-black italic">正在同步黄浦区感知矩阵...</span>
        </div>
        <div className={`absolute -left-2 top-8 w-4 h-4 rotate-45 border-l border-b transition-all ${
          isNight ? 'bg-slate-900/80 border-cyan-400/40' : 'bg-white/80 border-sky-400'
        }`}></div>
      </div>
    </div>
  );
};

const AIAgent: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: '指挥官您好！我是您的AI助手“智豆”。外滩核心区、南京东路步行街及周边警力布控已全维可视，数据矩阵运行良好。请问有什么可以帮您？' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { 
          systemInstruction: '你是一个名叫“智豆”的可爱专家机器人助理。你的外表是一个圆润精致的球形机器人。你的性格：活泼、专业、贴心。你负责协助指挥官管理上海市黄浦区的情报与指挥系统。', 
          temperature: 0.8 
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || '智豆刚才分心了，能再说一遍吗？' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: '对不起指挥官，核心矩阵连接扰动，请重试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-10">
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            20% { transform: rotate(15deg); }
            50% { transform: rotate(-8deg); }
            80% { transform: rotate(10deg); }
          }
        `}
      </style>
      <div onClick={() => setIsOpen(!isOpen)} className="shrink-0 transition-all active:scale-95 z-[150]">
        <ExquisiteBubbleBot isThinking={isLoading} isNight={isNight} />
      </div>

      {/* 对话窗口 - 基于上次位置再右移100px (从 114px 增至 214px) 且保持下移状态 (bottom-[-302px]) */}
      {isOpen && (
        <div className={`fixed left-[214px] bottom-[-302px] w-[352px] h-[512px] flex flex-col transition-all duration-700 rounded-[2.5rem] overflow-hidden border-2 z-[2000] animate-[fadeIn_0.5s_ease-out] shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl ${
          isNight ? 'bg-slate-900/80 border-cyan-500/50' : 'bg-white/80 border-sky-400'
        }`}>
          {/* 对话框头部 */}
          <div className={`p-6 border-b flex justify-between items-center transition-colors ${isNight ? 'bg-slate-950/40 border-cyan-500/20' : 'bg-sky-50/60 border-sky-100'}`}>
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isNight ? 'bg-black/60 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.3)]' : 'bg-white border-sky-300'}`}>
                  <span className="text-xl">🍬</span>
               </div>
               <div className="flex flex-col">
                  <span className={`font-black text-base tracking-wider transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>智豆 · 智慧勤务助手</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>Smart Shield Active</span>
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isNight ? 'text-cyan-400/60 hover:text-white hover:bg-red-500' : 'text-slate-400 hover:text-white hover:bg-red-500'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {/* 消息区域 */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 tech-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
                {msg.role === 'bot' && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 border shrink-0 ${isNight ? 'bg-slate-950 border-cyan-500/30' : 'bg-sky-100 border-sky-200'}`}>
                    <span className="text-[9px]">🍬</span>
                  </div>
                )}
                <div className={`px-4 py-2.5 rounded-[1.5rem] text-xs font-medium leading-relaxed max-w-[85%] transition-all ${
                  msg.role === 'user' 
                    ? (isNight ? 'bg-cyan-600 text-white rounded-tr-none border border-cyan-400/30 shadow-lg' : 'bg-sky-500 text-white rounded-tr-none shadow-md') 
                    : (isNight ? 'bg-slate-800/80 text-cyan-50 rounded-tl-none border border-cyan-500/20' : 'bg-white border border-sky-100 text-slate-700 rounded-tl-none shadow-sm')
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start pl-8">
                  <div className={`px-3 py-1.5 rounded-full flex gap-1 ${isNight ? 'bg-slate-800/40' : 'bg-slate-100'}`}>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
                  </div>
               </div>
            )}
          </div>

          {/* 输入框区域 */}
          <div className={`p-6 border-t flex gap-3 transition-colors ${isNight ? 'bg-slate-950/40 border-cyan-900/50' : 'bg-white/60 border-slate-100'}`}>
            <div className="relative flex-1 group">
               <input 
                 value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 className={`w-full px-5 py-3 text-xs font-bold rounded-xl focus:outline-none transition-all border-2 ${
                   isNight 
                   ? 'bg-black/40 border-cyan-900/40 text-white placeholder:text-cyan-900/40 focus:border-cyan-500/60' 
                   : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-400'
                 }`}
                 placeholder="请输入指令..."
               />
            </div>
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 ${
                isNight ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-900/40' : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-900/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          
          {/* 指向机器人的装饰小尖角 - 移至顶部指向机器人位置 */}
          <div className={`absolute -top-2.5 left-8 w-5 h-5 rotate-45 border-t-2 border-l-2 transition-all ${
            isNight ? 'bg-slate-950 border-cyan-500/50' : 'bg-white border-sky-400'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;