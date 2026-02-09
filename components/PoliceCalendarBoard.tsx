
import React, { useState } from 'react';

interface PoliceEvent {
  date: string;
  title: string;
  type: 'security' | 'action' | 'meeting';
  level: 'high' | 'normal';
}

const mockEvents: PoliceEvent[] = [
  { date: '02-06', title: '元宵节大型活动安保', type: 'security', level: 'high' },
  { date: '02-08', title: '打击黑灰产专项结项', type: 'action', level: 'normal' },
  { date: '02-12', title: '全市情指一体化视频会', type: 'meeting', level: 'normal' },
];

const PoliceCalendarBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  
  // 简易日历逻辑
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-indigo-600'}`}></div>
          <h2 className={`text-sm font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            公安日历 · 勤务节点
          </h2>
        </div>
        <div className="flex gap-2">
           <button className={`p-1 rounded transition-colors ${isNight ? 'hover:bg-white/10 text-cyan-400' : 'hover:bg-slate-100 text-sky-600'}`}>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 overflow-hidden">
        {/* 微型日历视图 */}
        <div className={`p-2 rounded-xl border transition-all ${isNight ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['日','一','二','三','四','五','六'].map(d => (
              <span key={d} className={`text-[8px] font-black opacity-40 ${isNight ? 'text-white' : 'text-slate-400'}`}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map(d => (
              <div 
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`h-6 flex items-center justify-center text-[10px] digital-font rounded-md cursor-pointer transition-all ${
                  d === selectedDay 
                    ? isNight ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-indigo-600 text-white'
                    : isNight ? 'hover:bg-white/5 text-white/40' : 'hover:bg-white text-slate-400'
                } ${[6, 8, 12].includes(d) ? 'relative' : ''}`}
              >
                {d}
                {[6, 8, 12].includes(d) && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 节点提醒列表 */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-1 tech-scrollbar max-h-[120px]">
          {mockEvents.map((ev, i) => (
            <div key={i} className={`flex items-start gap-3 p-2 rounded-lg border transition-all ${
              isNight ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <div className={`shrink-0 w-8 text-center flex flex-col border-r transition-colors ${isNight ? 'border-white/10' : 'border-slate-100'}`}>
                <span className={`text-[10px] digital-font font-black ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>{ev.date.split('-')[1]}</span>
                <span className={`text-[7px] font-black opacity-30 ${isNight ? 'text-white' : 'text-slate-400'}`}>FEB</span>
              </div>
              <div className="flex-1">
                 <h3 className={`text-[10px] font-black transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>{ev.title}</h3>
                 <span className={`text-[7px] font-black uppercase tracking-tighter ${ev.level === 'high' ? 'text-red-500' : 'text-sky-500'}`}>
                   {ev.type.toUpperCase()} / {ev.level === 'high' ? 'PRIORITY' : 'NORMAL'}
                 </span>
              </div>
            </div>
          ))}
        </div>

        {/* 功能操作区 */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
           <button className={`flex items-center justify-center gap-2 py-2 rounded-xl border transition-all group ${
             isNight ? 'bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'
           }`}>
              <span className="text-xs">📝</span>
              <span className={`text-[10px] font-black transition-colors ${isNight ? 'text-indigo-300' : 'text-indigo-700'}`}>事件录入</span>
           </button>
           <button className={`flex items-center justify-center gap-2 py-2 rounded-xl border transition-all group ${
             isNight ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100'
           }`}>
              <span className="text-xs">🌐</span>
              <span className={`text-[10px] font-black transition-colors ${isNight ? 'text-emerald-300' : 'text-emerald-700'}`}>共享查看</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default PoliceCalendarBoard;
