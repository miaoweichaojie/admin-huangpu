import React from 'react';

const MapOverlayStats: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className={`flex items-center gap-6 px-6 py-2.5 backdrop-blur-md border rounded-full transition-all duration-1000 ${
      isNight ? 'bg-slate-950/40 border-cyan-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'bg-white/80 border-sky-200 shadow-lg shadow-sky-900/5'
    }`}>
      <div className={`flex items-center gap-2 pr-4 border-r transition-colors ${isNight ? 'border-cyan-500/20' : 'border-sky-100'}`}>
        <div className={`w-2 h-2 rounded-full animate-pulse transition-all ${isNight ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-sky-500 shadow-md shadow-sky-400/30'}`}></div>
        <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>实时态势</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xl">🚨</span>
        <div className="flex flex-col">
          <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${isNight ? 'text-white/50' : 'text-slate-400'}`}>今日警情</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-white glow-text' : 'text-slate-800'}`}>748</span>
            <span className={`text-[8px] font-bold uppercase transition-colors ${isNight ? 'text-cyan-500' : 'text-sky-500'}`}>起</span>
          </div>
        </div>
      </div>

      <div className={`w-px h-6 transition-colors ${isNight ? 'bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent' : 'bg-sky-100'}`}></div>

      <div className="flex items-center gap-3">
        <span className="text-xl">🚔</span>
        <div className="flex flex-col">
          <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${isNight ? 'text-white/50' : 'text-slate-400'}`}>在巡警力</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-white glow-text' : 'text-slate-800'}`}>856</span>
            <span className={`text-[8px] font-bold uppercase transition-colors ${isNight ? 'text-cyan-500' : 'text-sky-500'}`}>人</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapOverlayStats;