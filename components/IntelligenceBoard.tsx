import React, { useState, useEffect } from 'react';

const initialData = [
  { subject: '警情指数', A: 85, tag: '效能良好', status: 'success' },
  { subject: '打击指数', A: 92, tag: '覆盖严密', status: 'info' },
  { subject: '防控指数', A: 78, tag: '总体平稳', status: 'normal' },
  { subject: '稳定指数', A: 88, tag: '覆盖严密', status: 'info' },
  { subject: '交通指数', A: 65, tag: '压力最高', status: 'danger' },
  { subject: '舆情指数', A: 72, tag: '关注升温', status: 'warning' },
];

const IntelligenceBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [displayData, setDisplayData] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayData(prev => prev.map(item => ({
        ...item,
        A: Math.min(100, Math.max(10, item.A + (Math.random() - 0.5) * 1.5))
      })));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColors = (status: string) => {
    if (isNight) {
        switch (status) {
          case 'success': return { text: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/10' };
          case 'info': return { text: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-400/10' };
          case 'warning': return { text: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10' };
          case 'danger': return { text: 'text-red-400', border: 'border-red-400/30', bg: 'bg-red-400/10' };
          default: return { text: 'text-sky-400', border: 'border-sky-400/30', bg: 'bg-sky-400/10' };
        }
    } else {
        switch (status) {
          case 'success': return { text: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50' };
          case 'info': return { text: 'text-sky-600', border: 'border-sky-200', bg: 'bg-sky-50' };
          case 'warning': return { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50' };
          case 'danger': return { text: 'text-red-600', border: 'border-red-200', bg: 'bg-red-50' };
          default: return { text: 'text-slate-600', border: 'border-slate-200', bg: 'bg-slate-50' };
        }
    }
  };

  return (
    <div className="tech-module-container h-full flex flex-col p-5 overflow-hidden group">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 背景动态数字流装饰 - 提亮 */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isNight ? 'opacity-[0.06]' : 'opacity-[0.05]'} pointer-events-none select-none overflow-hidden font-mono text-[8px] leading-none break-all p-2`}>
        {Array(20).fill(0).map((_, i) => (
          <div key={i} className={`animate-[shimmer_12s_linear_infinite] ${isNight ? 'text-cyan-400' : 'text-sky-600'}`} style={{ animationDelay: `${i * 0.6}s` }}>
            10100101011101010101010101101010101010101010101010101111000101010
          </div>
        ))}
      </div>

      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-4 rounded-full transition-colors ${isNight ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'bg-sky-500'}`}></div>
          <h2 className={`text-base font-black italic tracking-widest uppercase transition-colors ${isNight ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-slate-800'}`}>城区态势 · 智能体征</h2>
        </div>
      </div>

      {/* 核心指标区域 */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto tech-scrollbar pr-1 relative z-10">
        {displayData.map((item, i) => {
          const colors = getStatusColors(item.status);
          const percent = Math.round(item.A);
          
          return (
            <div key={i} className={`relative flex flex-row items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-500 group/card overflow-hidden ${
              isNight ? 'bg-[#0a1f46]/40 border-cyan-400/10 hover:bg-[#0ea5e9]/20 hover:border-cyan-400/40' : 'bg-white border-slate-100 hover:border-sky-300 shadow-sm'
            }`}>
              {/* 左侧：标题 */}
              <div className="flex flex-col gap-1">
                <span className={`text-[14px] font-black tracking-widest transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>{item.subject}</span>
                <span className={`text-[7px] font-black uppercase tracking-[0.4em] opacity-40 ${isNight ? 'text-cyan-400' : 'text-slate-900'}`}>System Index</span>
              </div>

              {/* 右侧：数值 */}
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className={`text-3xl digital-font font-black tracking-tighter transition-all duration-1000 ${colors.text} ${isNight ? 'drop-shadow-[0_0_15px_currentColor]' : ''}`}>
                    {percent}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                   <div className={`px-2.5 py-0.5 w-max rounded-sm border transition-all ${isNight ? 'border-cyan-400/20 bg-black/40' : 'border-sky-100 bg-sky-50'}`}>
                     <span className={`${colors.text} text-[10px] font-black uppercase tracking-widest whitespace-nowrap`}>{item.tag}</span>
                   </div>
                   <span className={`text-[7px] font-black uppercase tracking-[0.2em] text-right ${isNight ? 'text-cyan-400/30' : 'text-slate-400'}`}>POINTS</span>
                </div>
                
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isNight ? 'bg-cyan-400/10 border-cyan-400/20' : 'bg-slate-50 border-slate-100'}`}>
                    <div className={`text-[12px] transition-transform duration-500 ${item.A > 80 ? 'text-emerald-400 animate-bounce' : 'text-cyan-400'}`}>
                    {item.A > 80 ? '▲' : '▶'}
                    </div>
                </div>
              </div>

              {/* 装饰边框 */}
              <div className={`absolute top-0 left-0 w-[2.5px] h-full transition-colors ${isNight ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-sky-500/40'}`}></div>
              
              {/* 微光效果提亮 */}
              <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover/card:opacity-30 transition-opacity pointer-events-none ${isNight ? 'bg-cyan-400' : 'bg-sky-400'}`}></div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 pt-2 flex justify-between items-center opacity-60 text-[7px] font-black transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-400'}`}>
        <span className="tracking-[0.5em] uppercase">Status: Nominal Matrix Active</span>
        <div className="flex gap-2">
            <span>CORE_SYNC: OK</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#10b981]"></div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceBoard;