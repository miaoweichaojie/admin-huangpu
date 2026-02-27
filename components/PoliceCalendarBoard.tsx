
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
    <div className={`tech-module-container h-full flex flex-col p-3 ${showFullCalendar ? '' : 'overflow-hidden'}`}>
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

      <div className="flex-1 flex flex-col gap-2 relative z-10">
        {/* 精简版节点列表 */}
        <div className="space-y-1.5 overflow-y-auto pr-1 tech-scrollbar h-full">
          {mockEvents.map((ev, i) => (
            <div key={i} className={`flex items-center gap-2 p-1.5 rounded-md border transition-all ${
              isNight ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'
            }`}>
              <span className={`text-[10px] digital-font font-black shrink-0 ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>{ev.date}</span>
              <h3 className={`text-[10px] font-bold truncate flex-1 transition-colors ${isNight ? 'text-white/80' : 'text-slate-700'}`}>{ev.title}</h3>
            </div>
          ))}
        </div>

        {/* 悬浮日历详情 - 优化为覆盖层并确保完整显示 */}
        {showFullCalendar && (
          <div className={`absolute -inset-1 -top-2 z-[100] flex flex-col p-4 animate-[fadeIn_0.2s_ease-out] border rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
            isNight ? 'bg-[#0a1631] border-indigo-500/60 backdrop-blur-2xl' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
               <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${isNight ? 'bg-indigo-400 animate-pulse' : 'bg-indigo-600'}`}></span>
                 <span className="text-[11px] font-black uppercase tracking-wider">2026年2月 勤务日历</span>
               </div>
               <button 
                 onClick={() => setShowFullCalendar(false)} 
                 className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                   isNight ? 'hover:bg-white/10 text-white/60' : 'hover:bg-slate-100 text-slate-400'
                 }`}
               >
                 ✕
               </button>
            </div>
            <div className="grid grid-cols-7 gap-1 flex-1">
              {['日','一','二','三','四','五','六'].map(d => (
                <span key={d} className="text-[9px] text-center opacity-40 font-black py-1">{d}</span>
              ))}
              {days.map(d => {
                const hasEvent = mockEvents.some(e => e.date === `02-${d < 10 ? '0' + d : d}`);
                return (
                  <div key={d} className={`relative h-8 flex items-center justify-center text-[10px] digital-font rounded-md cursor-pointer transition-all ${
                    d === new Date().getDate() 
                      ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                      : isNight ? 'hover:bg-white/10 text-white/70' : 'hover:bg-indigo-50 text-slate-600'
                  }`}>
                    {d}
                    {hasEvent && (
                      <span className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={`mt-3 pt-2 border-t border-white/5 text-[8px] italic opacity-50 ${isNight ? 'text-white' : 'text-slate-900'}`}>
              * 点击日期查看详细勤务排班
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceCalendarBoard;
