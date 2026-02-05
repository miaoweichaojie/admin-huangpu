import React, { useState, useEffect, useMemo } from 'react';

// 全新：量子矩阵中心动态背景
const QuantumMatrixBackground = ({ isNight }: { isNight: boolean }) => (
  <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
    {/* 1. 基础深色背景 */}
    <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-[#020b1c]' : 'bg-transparent'}`}></div>

    {/* 2. 蜂窝矩阵底纹 (SVG Pattern) */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
          <path d="M25 0 L50 14.4 L50 43.4 L25 57.8 L0 43.4 L0 14.4 Z" fill="none" stroke={isNight ? "#22d3ee" : "#0ea5e9"} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>

    {/* 3. 中心旋转科技环 */}
    <div className="absolute flex items-center justify-center">
      {/* 外环 - 慢速 */}
      <div className={`absolute w-[500px] h-[500px] rounded-full border-[1px] border-dashed animate-[rotate-slow_40s_linear_infinite] opacity-20 ${
        isNight ? 'border-cyan-400' : 'border-sky-400'
      }`}></div>
      {/* 中环 - 反向 */}
      <div className={`absolute w-[380px] h-[380px] rounded-full border-[2px] animate-[rotate-slow_20s_linear_infinite_reverse] opacity-30 ${
        isNight ? 'border-blue-500' : 'border-sky-300'
      }`} style={{ borderDasharray: '40, 120' }}></div>
      {/* 内环 - 快速 */}
      <div className={`absolute w-[280px] h-[280px] rounded-full border-[1px] animate-[rotate-slow_10s_linear_infinite] opacity-40 ${
        isNight ? 'border-cyan-300' : 'border-sky-500'
      }`} style={{ borderDasharray: '10, 20' }}></div>
      
      {/* 核心扩散光辉 */}
      <div className={`absolute w-80 h-32 blur-[60px] animate-pulse ${isNight ? 'bg-cyan-500/20' : 'bg-sky-400/5'}`}></div>
    </div>

    {/* 4. 横向能量流线 (取代侧翼) */}
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 flex items-center justify-between px-[10%]">
      {/* 左流线 */}
      <div className="w-[35%] h-[2px] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_infinite] ${!isNight && 'opacity-30'}`}></div>
        <div className={`absolute right-0 w-2 h-2 rounded-full blur-[2px] animate-pulse ${isNight ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-sky-500'}`}></div>
      </div>
      {/* 右流线 */}
      <div className="w-[35%] h-[2px] relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_infinite] ${!isNight && 'opacity-30'}`}></div>
        <div className={`absolute left-0 w-2 h-2 rounded-full blur-[2px] animate-pulse ${isNight ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-sky-500'}`}></div>
      </div>
    </div>

    {/* 5. 漂浮的数据节点 */}
    <div className="absolute inset-0 pointer-events-none">
       {Array.from({ length: 15 }).map((_, i) => (
         <div 
           key={i}
           className={`absolute w-1.5 h-1.5 rounded-full animate-pulse transition-opacity ${isNight ? 'bg-cyan-400' : 'bg-sky-500 opacity-20'}`}
           style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`,
             opacity: isNight ? Math.random() * 0.4 : 0.1
           }}
         />
       ))}
    </div>
  </div>
);

const YuyuanAvatar = () => (
  <div className="w-full h-full flex items-center justify-center p-1.5 bg-slate-900 rounded-full">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
      <path d="M32 12 L16 28 L48 28 Z" fill="#FACC15" />
      <path d="M20 28 L20 45 L44 45 L44 28" fill="#B45309" />
      <rect x="24" y="32" width="16" height="13" fill="#78350F" />
      <path d="M8 50 L18 45 L28 52 L40 46 L52 54 L60 48" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="10" r="2" fill="#FDE047" className="animate-pulse" />
      <path d="M16 28 Q32 24 48 28" stroke="#78350F" strokeWidth="1" />
    </svg>
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
        <div className={`absolute inset-0 blur-md opacity-0 group-hover:opacity-100 transition-opacity ${isNight ? 'bg-cyan-400/40' : 'bg-sky-400/10'}`}></div>
    </div>
    <div className="flex flex-col items-start">
        <span className={`text-[11px] font-black tracking-widest uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>模型仓库</span>
        <span className={`text-[7px] font-black uppercase tracking-tighter transition-colors ${isNight ? 'text-cyan-400/80' : 'text-sky-500/60'}`}>Model Base</span>
    </div>
  </button>
);

const ThemeToggle = ({ isNight, onToggle }: { isNight: boolean, onToggle: () => void }) => (
  <div 
    onClick={onToggle}
    className={`group relative flex items-center justify-between w-16 h-8 px-1 rounded-full cursor-pointer transition-all duration-500 border overflow-hidden ${
      isNight ? 'bg-slate-900 border-cyan-400/50 shadow-[inset_0_0_10px_rgba(34,211,238,0.3)]' : 'bg-sky-100 border-sky-400/50 shadow-[inset_0_0_5px_rgba(0,0,0,0.05)]'
    }`}
  >
    <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-500 ${isNight ? 'from-cyan-400/20 to-transparent opacity-100' : 'from-sky-400/20 to-transparent opacity-0'}`}></div>
    <div className={`relative z-10 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-500 transform shadow-md ${
      isNight ? 'translate-x-8 bg-slate-900 text-cyan-400' : 'translate-x-0 bg-white text-amber-500'
    }`}>
      <span className="text-[12px]">{isNight ? '🌙' : '☀️'}</span>
    </div>
  </div>
);

const WeatherWidget = ({ isNight }: { isNight: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-2 border rounded-2xl backdrop-blur-md animate-[fadeIn_1s_ease-out] transition-all ${
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
    <div className={`w-px h-8 transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-sky-200'}`}></div>
    <div className="flex items-center gap-3">
       <div className="flex flex-col items-center">
          <span className="text-xl">☀️</span>
          <span className={`text-[8px] font-black transition-colors ${isNight ? 'text-white/50' : 'text-slate-400'}`}>晴朗</span>
       </div>
       <div className="flex flex-col">
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>AQI 32</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${isNight ? 'text-emerald-400' : 'text-emerald-600'}`}>空气优</span>
       </div>
    </div>
  </div>
);

const AtmosphericHuangpuLogo = ({ isNight }: { isNight: boolean }) => (
  <div className="relative w-24 h-24 flex items-center justify-center mr-8">
    <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-colors ${isNight ? 'bg-cyan-400/20' : 'bg-sky-500/5'}`}></div>
    <div className={`absolute inset-[-12px] border rounded-full animate-[rotate-slow_20s_linear_infinite] transition-colors ${isNight ? 'border-cyan-400/30' : 'border-sky-300/30'}`}></div>
    <div className={`absolute inset-0 border-[2px] rounded-full transition-colors ${isNight ? 'border-cyan-400/20' : 'border-sky-400/10'}`}></div>

    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
      isNight ? 'bg-[#0a1f46]/60 border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.3)]' : 'bg-white border-sky-300/50 shadow-md'
    }`}>
      <div className={`absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] transition-colors ${isNight ? 'bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent' : 'bg-gradient-to-tr from-transparent via-sky-400/10 to-transparent'}`}></div>
      
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`relative z-10 transition-all ${isNight ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]' : 'drop-shadow-[0_2px_5px_rgba(0,0,0,0.1)]'}`}>
        <defs>
          <linearGradient id="3dGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isNight ? "#22d3ee" : "#38bdf8"} />
            <stop offset="100%" stopColor={isNight ? "#0ea5e9" : "#0284c7"} />
          </linearGradient>
          <linearGradient id="3dGradSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isNight ? "#0ea5e9" : "#bae6fd"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isNight ? "#0369a1" : "#0ea5e9"} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M20 75 L50 60 L80 75 L50 90 Z" fill="url(#3dGradSecondary)" />
        <path d="M20 75 L20 80 L50 95 L50 90 Z" fill={isNight ? "#0369a1" : "#0284c7"} />
        <path d="M80 75 L80 80 L50 95 L50 90 Z" fill={isNight ? "#0c4a6e" : "#0369a1"} />
        <path d="M40 70 L40 30 L50 25 L60 30 L60 70 L50 75 Z" fill="url(#3dGradPrimary)" />
        <path d="M40 30 L50 25 L60 30 L50 35 Z" fill="#fff" fillOpacity="0.2" />
        <path d="M40 70 L40 30 L50 35 L50 75 Z" fill="white" fillOpacity="0.1" />
        <circle cx="50" cy="20" r="4" fill={isNight ? "#22d3ee" : "#38bdf8"} className="animate-pulse" />
      </svg>
    </div>
  </div>
);

const Header: React.FC<{ time: Date, isNight: boolean, onToggleTheme: () => void }> = ({ time, isNight, onToggleTheme }) => {
  const formatTime = (date: Date) => date.toLocaleTimeString('zh-CN', { hour12: false });
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  return (
    <div className={`relative h-32 w-full flex items-center justify-between px-12 select-none overflow-hidden border-b transition-all duration-1000 ${
      isNight ? 'bg-transparent border-cyan-400/20' : 'bg-white/70 border-slate-200 shadow-sm'
    }`}>
      
      {/* 全新的量子矩阵风格动态底座 */}
      <QuantumMatrixBackground isNight={isNight} />

      {/* 左侧：天气与时间 */}
      <div className="flex items-center gap-8 w-[35%] relative z-20">
        <WeatherWidget isNight={isNight} />
        <div className={`flex flex-col border-l-2 pl-6 py-1 transition-colors ${isNight ? 'border-cyan-400/40' : 'border-sky-300'}`}>
          <span className={`text-4xl digital-font font-black tracking-widest leading-none transition-all ${isNight ? 'glow-text text-white' : 'text-slate-800'}`}>{formatTime(time)}</span>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 transition-colors opacity-80 ${isNight ? 'text-cyan-400' : 'text-sky-500'}`}>{formatDate(time)}</span>
        </div>
      </div>

      {/* 中间：标题与 Logo */}
      <div className="relative z-10 flex flex-col items-center w-[30%] h-full justify-center">
        <div className="relative flex items-center">
            <AtmosphericHuangpuLogo isNight={isNight} />
            <div className="flex flex-col items-center">
              <h1 className={`relative text-4xl font-black italic tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-b transition-all drop-shadow-xl ${
                isNight ? 'from-white via-cyan-50 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,1.0)]' : 'from-slate-800 via-sky-900 to-sky-600'
              } uppercase`}>
                某分局情指智慧大屏
              </h1>
              <div className="mt-4 flex items-center justify-center w-full">
                 <span className={`text-[9px] font-black tracking-[0.8em] uppercase italic px-8 py-1.5 border rounded-full transition-all ${
                   isNight ? 'text-cyan-400 bg-cyan-900/20 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-sky-600 bg-sky-50 border-sky-200'
                 }`}>
                    INTELLIGENT MATRIX SYSTEM V4.5
                 </span>
              </div>
            </div>
        </div>
      </div>

      {/* 右侧：功能按钮与头像 */}
      <div className="flex items-center justify-end gap-10 w-[35%] relative z-20">
        <div className={`flex items-center gap-6 pr-6 border-r transition-colors ${isNight ? 'border-slate-500/20' : 'border-slate-200'}`}>
           <ModelWarehouseButton isNight={isNight} />
           <div className="flex flex-col text-right">
              <span className={`text-[8px] font-black uppercase tracking-widest mb-1 transition-colors ${isNight ? 'text-cyan-600' : 'text-slate-400'}`}>Map Theme</span>
              <ThemeToggle isNight={isNight} onToggle={onToggleTheme} />
           </div>
        </div>

        <div className="flex flex-col text-right">
            <span className={`text-[9px] font-black tracking-widest uppercase mb-1 transition-colors ${isNight ? 'text-cyan-600' : 'text-slate-400'}`}>On-Duty Commander</span>
            <span className={`text-lg font-black tracking-widest glow-text uppercase italic transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>总指挥官 001</span>
            <div className="flex items-center justify-end gap-2 mt-2">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors ${isNight ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-sky-500'}`}></div>
                <span className={`text-[8px] font-black tracking-widest uppercase transition-colors ${isNight ? 'text-emerald-400' : 'text-sky-600'}`}>NETWORK: STABLE</span>
            </div>
        </div>
        <div className="relative group cursor-pointer">
            <div className={`absolute inset-0 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 ${isNight ? 'bg-amber-400/30' : 'bg-sky-400/10'}`}></div>
            <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-yellow-500 to-orange-600 shadow-2xl overflow-hidden border border-white/20">
               <YuyuanAvatar />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;