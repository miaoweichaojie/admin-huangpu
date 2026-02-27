
import React, { useState } from 'react';
import CalendarOverlay from './CalendarOverlay';

// 量子矩阵中心动态背景
const QuantumMatrixBackground = ({ isNight }: { isNight: boolean }) => (
  <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
    <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-[#020b1c]' : 'bg-transparent'}`}></div>
    <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
          <path d="M25 0 L50 14.4 L50 43.4 L25 57.8 L0 43.4 L0 14.4 Z" fill="none" stroke={isNight ? "#22d3ee" : "#0ea5e9"} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
    <div className="absolute flex items-center justify-center">
      <div className={`absolute w-[500px] h-[500px] rounded-full border-[1px] border-dashed animate-[rotate-slow_40s_linear_infinite] opacity-20 ${isNight ? 'border-cyan-400' : 'border-sky-400'}`}></div>
      <div className={`absolute w-[380px] h-[380px] rounded-full border-[2px] animate-[rotate-slow_20s_linear_infinite_reverse] opacity-30 ${isNight ? 'border-blue-500' : 'border-sky-300'}`} style={{ borderDasharray: '40, 120' }}></div>
      <div className={`absolute w-[280px] h-[280px] rounded-full border-[1px] animate-[rotate-slow_10s_linear_infinite] opacity-40 ${isNight ? 'border-cyan-300' : 'border-sky-500'}`} style={{ borderDasharray: '10, 20' }}></div>
      <div className={`absolute w-80 h-32 blur-[60px] animate-pulse ${isNight ? 'bg-cyan-500/20' : 'bg-sky-400/5'}`}></div>
    </div>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 flex items-center justify-between px-[10%]">
      <div className="w-[35%] h-[2px] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_infinite] ${!isNight && 'opacity-30'}`}></div>
        <div className={`absolute right-0 w-2 h-2 rounded-full blur-[2px] animate-pulse ${isNight ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-sky-500'}`}></div>
      </div>
      <div className="w-[35%] h-[2px] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_infinite] ${!isNight && 'opacity-30'}`}></div>
        <div className={`absolute left-0 w-2 h-2 rounded-full blur-[2px] animate-pulse ${isNight ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-sky-500'}`}></div>
      </div>
    </div>
  </div>
);

const ModelWarehouseButton = ({ isNight }: { isNight: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-2 border rounded-xl transition-all group ${
    isNight ? 'bg-cyan-500/10 border-cyan-400/40 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-white border-sky-200 shadow-sm hover:border-sky-400'
  }`}>
    <div className="relative w-5 h-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`${isNight ? 'text-cyan-400' : 'text-sky-600'} group-hover:scale-110 transition-transform`}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    </div>
    <div className="flex flex-col items-start">
        <span className={`text-[11px] font-black tracking-widest uppercase ${isNight ? 'text-white' : 'text-slate-800'}`}>模型仓库</span>
        <span className={`text-[7px] font-black uppercase tracking-tighter ${isNight ? 'text-cyan-400/80' : 'text-sky-500/60'}`}>Model Base</span>
    </div>
  </button>
);

const DataBaseButton = ({ isNight }: { isNight: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-2 border rounded-xl transition-all group ${
    isNight ? 'bg-indigo-500/10 border-indigo-400/40 hover:bg-indigo-500/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white border-slate-200 shadow-sm hover:border-slate-400'
  }`}>
    <div className="relative w-5 h-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`${isNight ? 'text-indigo-400' : 'text-indigo-600'} group-hover:scale-110 transition-transform`}>
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
    </div>
    <div className="flex flex-col items-start">
        <span className={`text-[11px] font-black tracking-widest uppercase ${isNight ? 'text-white' : 'text-slate-800'}`}>数据基座</span>
        <span className={`text-[7px] font-black uppercase tracking-tighter ${isNight ? 'text-indigo-400/80' : 'text-indigo-500/60'}`}>Data Foundation</span>
    </div>
  </button>
);

const WeatherWidget = ({ isNight }: { isNight: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-2 border rounded-2xl backdrop-blur-md transition-all ${
    isNight ? 'bg-cyan-900/10 border-cyan-400/20' : 'bg-white/50 border-sky-200 shadow-sm'
  }`}>
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>上海 · 黄浦区</span>
        <div className={`w-1 h-1 rounded-full animate-pulse transition-colors ${isNight ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-sky-500'}`}></div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl digital-font font-black leading-none transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>18</span>
        <span className={`text-xs font-bold transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-500'}`}>°C</span>
      </div>
    </div>
  </div>
);

const Header: React.FC<{ time: Date, isNight: boolean, onToggleTheme: () => void }> = ({ time, isNight, onToggleTheme }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const formatTime = (date: Date) => date.toLocaleTimeString('zh-CN', { hour12: false });
  const formatDate = (date: Date) => date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className={`relative h-32 w-full flex items-center justify-between px-12 select-none overflow-hidden border-b transition-all duration-1000 ${
      isNight ? 'bg-transparent border-cyan-400/20' : 'bg-white/70 border-slate-200 shadow-sm'
    }`}>
      <QuantumMatrixBackground isNight={isNight} />

      {/* 左侧：天气与时间 */}
      <div className="flex items-center gap-8 w-[38%] relative z-20">
        <WeatherWidget isNight={isNight} />
        <div className="flex items-center gap-6">
          <div className={`flex flex-col border-l-2 pl-6 py-1 transition-colors ${isNight ? 'border-cyan-400/40' : 'border-sky-300'}`}>
            <span className={`text-4xl digital-font font-black tracking-widest leading-none transition-all ${isNight ? 'glow-text text-white' : 'text-slate-800'}`}>{formatTime(time)}</span>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 transition-colors opacity-80 ${isNight ? 'text-cyan-400' : 'text-sky-500'}`}>{formatDate(time)}</span>
          </div>
          <a 
            href="https://zuozhanzhongxin.netlify.app/"
            title="返回作战中心"
            className={`flex items-center justify-center w-10 h-10 border rounded-lg transition-all group hover:scale-105 active:scale-95 ${
              isNight ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20' : 'bg-white border-sky-200 text-sky-600 shadow-sm hover:border-sky-400'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>
        </div>
      </div>

      {/* 中间：标题 */}
      <div className="relative z-10 flex flex-col items-center w-[24%] h-full justify-center">
        <h1 className={`text-4xl font-black italic tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-b transition-all drop-shadow-xl ${
          isNight ? 'from-white via-cyan-50 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,1.0)]' : 'from-slate-800 via-sky-900 to-sky-600'
        } uppercase`}>
          情指智慧大屏
        </h1>
        <div className="mt-4 flex items-center justify-center w-full">
            <span className={`text-[9px] font-black tracking-[0.8em] uppercase italic px-8 py-1.5 border rounded-full transition-all ${
              isNight ? 'text-cyan-400 bg-cyan-900/20 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-sky-600 bg-sky-50 border-sky-200'
            }`}>
              MATRIX SYSTEM V4.5
            </span>
        </div>
      </div>

      {/* 右侧：功能按钮 */}
      <div className="flex items-center justify-end gap-10 w-[38%] relative z-20">
        <div className={`flex items-center gap-4 pr-6 border-r transition-colors ${isNight ? 'border-slate-500/20' : 'border-slate-200'}`}>
           <div className="flex items-center gap-3">
             <ModelWarehouseButton isNight={isNight} />
             <DataBaseButton isNight={isNight} />
           </div>
           <div className="flex items-center gap-3">
             <div 
               onClick={() => setShowCalendar(true)}
               className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                 isNight ? 'bg-slate-900 border-cyan-400/40 text-cyan-400 hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-white border-sky-200 text-sky-600 shadow-sm hover:border-sky-400'
               }`}
             >
               <span className="text-xl">📅</span>
             </div>
             <div 
               onClick={onToggleTheme}
               className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                 isNight ? 'bg-slate-900 border-cyan-400/40 text-cyan-400 hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-sky-50 border-sky-200 text-sky-600 shadow-sm hover:border-sky-400'
               }`}
             >
               <span className="text-xl">{isNight ? '🌙' : '☀️'}</span>
             </div>
           </div>
        </div>
        <div className="flex flex-col text-right">
            <span className={`text-lg font-black tracking-widest glow-text uppercase italic transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>指挥官 001</span>
            <div className="flex items-center justify-end gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className={`text-[8px] font-black tracking-widest uppercase ${isNight ? 'text-emerald-400' : 'text-sky-600'}`}>ONLINE</span>
            </div>
        </div>
      </div>
      {showCalendar && <CalendarOverlay isNight={isNight} onClose={() => setShowCalendar(false)} />}
    </div>
  );
};

export default Header;
