import React, { useState } from 'react';

const CalendarView = ({ onClose, isNight }: { onClose: () => void, isNight: boolean }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className={`absolute inset-0 z-[60] backdrop-blur-xl p-4 flex flex-col animate-[fadeInScale_0.3s_ease-out] rounded-xl border transition-all ${
      isNight ? 'bg-slate-950/98 border-cyan-500/30' : 'bg-white border-sky-300 shadow-2xl'
    }`}>
       <div className={`flex justify-between items-center mb-4 border-b pb-3 transition-colors ${isNight ? 'border-cyan-500/30' : 'border-slate-100'}`}>
         <div className="flex flex-col">
            <span className={`font-black digital-font text-lg tracking-widest transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>{year} / {month + 1}</span>
         </div>
         <button onClick={onClose} className={`p-1.5 rounded-full transition-colors ${isNight ? 'hover:bg-white/10 text-cyan-400' : 'hover:bg-slate-100 text-slate-400'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
         </button>
       </div>
       <div className="grid grid-cols-7 gap-1">
         {days.map((d, i) => (
           <div key={i} className={`relative h-10 flex items-center justify-center text-xs rounded transition-all ${!d ? 'invisible' : 'cursor-pointer'} ${
             d === today ? isNight ? 'bg-cyan-500/30 border border-cyan-400 text-white font-black' : 'bg-sky-500 text-white shadow-md' : isNight ? 'text-white/60 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
           }`}>{d}</div>
         ))}
       </div>
    </div>
  );
};

const DoubleLeaderBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const items = [
    { type: '分局重复', count: 4, desc: '关键路口扰民投诉', status: 'pending' },
    { type: '市局重复', count: 7, desc: '重点区域非法经营预警', status: 'urgent' },
    { type: '重点盯办', count: 2, desc: '商业区纠纷调解', status: 'normal' },
  ];

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-sky-500 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>双长盯办</h2>
        </div>
        <button onClick={() => setShowCalendar(true)} className={`group relative p-1.5 rounded-lg border transition-all ${
          isNight ? 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-400' : 'border-sky-200 bg-white shadow-sm hover:border-sky-400'
        }`}><span className="text-base">📅</span></button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 tech-scrollbar relative z-10">
        {items.map((item, i) => (
          <div key={i} className={`group relative border p-2.5 rounded-lg transition-all duration-300 ${
            isNight ? 'bg-gradient-to-r from-slate-900/60 to-transparent border-white/5 hover:border-sky-400/50' : 'bg-white border-slate-100 shadow-sm hover:border-sky-300'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest ${item.status === 'urgent' ? 'bg-red-500 text-white' : 'bg-sky-600 text-white'}`}>{item.type}</span>
              <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>{item.count}</span>
            </div>
            <p className={`text-[10px] font-bold truncate transition-colors ${isNight ? 'text-sky-100/70' : 'text-slate-500'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
      {showCalendar && <CalendarView isNight={isNight} onClose={() => setShowCalendar(false)} />}
    </div>
  );
};

export default DoubleLeaderBoard;