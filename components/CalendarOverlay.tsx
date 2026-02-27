
import React from 'react';

interface CalendarOverlayProps {
  isNight: boolean;
  onClose: () => void;
}

const CalendarOverlay: React.FC<CalendarOverlayProps> = ({ isNight, onClose }) => {
  const today = new Date(2026, 1, 26); // Feb 26, 2026
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const keyTasks: Record<string, string[]> = {
    '2026-02-26': ['09:00 晨会', '14:00 巡逻检查', '20:00 舆情研判'],
    '2026-02-27': ['10:00 专项整治行动'],
    '2026-03-01': ['08:00 月度总结'],
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      <div 
        className={`relative w-[450px] p-6 rounded-3xl border transition-all duration-500 ${
          isNight 
            ? 'bg-[#0a1f46] border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)]' 
            : 'bg-white border-slate-200 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 装饰角 */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-3xl ${isNight ? 'border-cyan-400' : 'border-sky-500'}`}></div>
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-3xl ${isNight ? 'border-cyan-400' : 'border-sky-500'}`}></div>
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-3xl ${isNight ? 'border-cyan-400' : 'border-sky-500'}`}></div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-3xl ${isNight ? 'border-cyan-400' : 'border-sky-500'}`}></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-black italic tracking-widest uppercase ${isNight ? 'text-white' : 'text-slate-800'}`}>
            勤务日历 · 2026年2月
          </h2>
          <button 
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isNight ? 'hover:bg-white/10 text-cyan-400' : 'hover:bg-slate-100 text-slate-400'
            }`}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <span key={d} className={`text-[10px] font-black opacity-40 ${isNight ? 'text-cyan-400' : 'text-slate-500'}`}>{d}</span>
          ))}
          {days.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} />;
            
            const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;
            const hasTasks = !!keyTasks[dateStr];
            const isToday = day === 26;

            return (
              <div 
                key={day}
                className={`relative h-12 flex flex-col items-center justify-center rounded-xl border transition-all group cursor-pointer ${
                  isToday 
                    ? (isNight ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'bg-sky-500 border-sky-600 text-white')
                    : (isNight ? 'bg-white/5 border-white/5 hover:border-cyan-400/40' : 'bg-slate-50 border-slate-100 hover:border-sky-300')
                }`}
              >
                <span className={`text-sm font-black ${
                  isToday ? (isNight ? 'text-white' : 'text-white') : (isNight ? 'text-white/80' : 'text-slate-700')
                }`}>
                  {day}
                </span>
                {hasTasks && (
                  <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]`}></div>
                )}
                
                {/* 悬浮任务提示 */}
                {hasTasks && (
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${
                    isNight ? 'bg-slate-900 border-cyan-400/40 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-xl'
                  }`}>
                    <div className="text-[9px] font-black mb-1 border-b border-white/10 pb-1">关键任务</div>
                    {keyTasks[dateStr].map((t, i) => (
                      <div key={i} className="text-[8px] leading-relaxed">• {t}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`pt-4 border-t flex items-center justify-between ${isNight ? 'border-cyan-400/20' : 'border-slate-100'}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400/60' : 'text-slate-400'}`}>关键勤务</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-cyan-400' : 'bg-sky-500'}`}></div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400/60' : 'text-slate-400'}`}>今日</span>
            </div>
          </div>
          <span className={`text-[8px] font-black italic opacity-30 ${isNight ? 'text-white' : 'text-slate-900'}`}>MATRIX CALENDAR V1.0</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarOverlay;
