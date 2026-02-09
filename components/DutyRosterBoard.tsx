
import React from 'react';

interface DutyStaff {
  dept: string;
  leader: string;
  contact: string;
  status: 'online' | 'busy' | 'offline';
  role: string;
}

const dutyData: DutyStaff[] = [
  { dept: '指挥中心', leader: '陈志远', contact: '68201', status: 'online', role: '值班长' },
  { dept: '督察支队', leader: '王晓明', contact: '68215', status: 'online', role: '实地督查' },
  { dept: '网安支队', leader: '李嘉豪', contact: '68302', status: 'busy', role: '舆情监测' },
  { dept: '特巡警', leader: '张铁柱', contact: '68119', status: 'online', role: '武装巡逻' },
  { dept: '分局办公室', leader: '刘思佳', contact: '68004', status: 'online', role: '综合协调' },
];

const DutyRosterBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden group">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-4 transition-colors ${isNight ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-emerald-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            实战值班席位 · 实时在岗
          </h2>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-[9px] font-black transition-colors ${isNight ? 'text-emerald-400' : 'text-emerald-600'}`}>在岗率 92%</span>
           <div className={`w-12 h-1.5 rounded-full transition-colors ${isNight ? 'bg-white/10' : 'bg-slate-100'}`}>
              <div className="w-[92%] h-full bg-emerald-500 rounded-full"></div>
           </div>
        </div>
      </div>

      {/* 席位矩阵概览 */}
      <div className="grid grid-cols-6 gap-1.5 mb-4 relative z-10">
         {Array.from({ length: 12 }).map((_, i) => (
           <div key={i} className={`h-1.5 rounded-sm transition-all duration-1000 ${
             i < 11 ? isNight ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-emerald-500' : isNight ? 'bg-slate-700' : 'bg-slate-200'
           }`}></div>
         ))}
      </div>

      {/* 详细列表区域 */}
      <div className="flex-1 overflow-y-auto pr-1 tech-scrollbar relative z-10 space-y-3">
        {dutyData.map((item, i) => (
          <div 
            key={i} 
            className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              isNight 
                ? 'bg-slate-900/40 border-white/5 hover:bg-emerald-500/5 hover:border-emerald-500/30' 
                : 'bg-white border-slate-100 shadow-sm hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                  isNight ? 'bg-black/60 border-cyan-500/30 text-cyan-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  {item.leader.charAt(0)}
                </div>
                {item.status === 'online' && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse"></div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-black transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>{item.dept}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded transition-colors ${isNight ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'}`}>{item.role}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[12px] font-bold ${isNight ? 'text-emerald-400/80' : 'text-emerald-600'}`}>{item.leader}</span>
                  <div className={`w-px h-3 ${isNight ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                  <span className={`text-[10px] digital-font transition-colors ${isNight ? 'text-cyan-400/60' : 'text-sky-600'}`}>{item.contact}</span>
                </div>
              </div>
            </div>

            <button className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
              isNight ? 'bg-black/40 border-white/10 text-cyan-400 hover:bg-cyan-500/20' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-sky-50 hover:text-sky-600'
            }`}>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </button>
          </div>
        ))}
      </div>

      {/* 底部装饰 */}
      <div className={`mt-4 pt-3 border-t flex justify-between items-center transition-colors ${isNight ? 'border-emerald-900/30' : 'border-slate-100'}`}>
         <div className="flex items-center gap-2">
            <span className={`text-[8px] font-black uppercase tracking-widest ${isNight ? 'text-emerald-500/40' : 'text-slate-300'}`}>Security Protocol Alpha</span>
         </div>
         <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-1 rounded-full ${isNight ? 'bg-emerald-500/30 animate-pulse' : 'bg-slate-200'}`} style={{ animationDelay: `${i * 0.2}s` }}></div>)}
         </div>
      </div>
    </div>
  );
};

export default DutyRosterBoard;
