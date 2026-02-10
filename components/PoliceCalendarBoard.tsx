
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
];

const PoliceCalendarBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="tech-module-container h-full flex flex-col p-3 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-3 transition-colors ${isNight ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-indigo-600'}`}></div>
          <h2 className={`text-xs font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            勤务节点提醒
          </h2>
        </div>
        <button 
          onClick={() => setShowFullCalendar(!showFullCalendar)}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all text-[9px] font-black ${
            isNight ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100'
          }`}
        >
          <span>📅</span>
          <span>查看日历</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2 relative z-10 overflow-hidden">
        {/* 精简版节点列表 */}
        <div className="space-y-1.5 overflow-y-auto pr-1 tech-scrollbar">
          {mockEvents.map((ev, i) => (
            <div key={i} className={`flex items-center gap-2 p-1.5 rounded-md border transition-all ${
              isNight ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'
            }`}>
              <span className={`text-[10px] digital-font font-black shrink-0 ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>{ev.date}</span>
              <h3 className={`text-[10px] font-bold truncate flex-1 transition-colors ${isNight ? 'text-white/80' : 'text-slate-700'}`}>{ev.title}</h3>
            </div>
          ))}
        </div>

        {/* 悬浮日历详情 */}
        {showFullCalendar && (
          <div className={`absolute inset-0 z-50 flex flex-col p-3 animate-[fadeIn_0.2s_ease-out] border rounded-xl ${
            isNight ? 'bg-slate-900/95 border-indigo-500/50 backdrop-blur-xl' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-black uppercase">2026年2月</span>
               <button onClick={() => setShowFullCalendar(false)} className="text-xs">✕</button>
            </div>
            <div className="grid grid-cols-7 gap-1 flex-1">
              {['日','一','二','三','四','五','六'].map(d => (
                <span key={d} className="text-[7px] text-center opacity-40 font-black">{d}</span>
              ))}
              {days.map(d => (
                <div key={d} className={`h-6 flex items-center justify-center text-[9px] digital-font rounded cursor-pointer ${
                  d === new Date().getDate() ? 'bg-indigo-500 text-white' : 'hover:bg-white/10'
                }`}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceCalendarBoard;
