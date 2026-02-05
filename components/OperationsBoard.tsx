
import React from 'react';

const OperationsBoard: React.FC = () => {
  const ops = [
    { label: '无人机管控', icon: '🚁', desc: '低空域实时监控', color: 'from-emerald-500/20' },
    { label: '联勤联动', icon: '🔗', desc: '跨部门协作指控', color: 'from-amber-500/20' }
  ];

  return (
    <div className="tech-border h-full flex flex-col p-5 overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-5 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></div>
        <h2 className="text-lg font-black text-white italic tracking-tighter uppercase">实时行动指控 / COMMAND</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {ops.map((op, idx) => (
          <button 
            key={idx}
            className={`group relative flex items-center gap-4 p-4 bg-gradient-to-r ${op.color} to-transparent border border-white/5 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-left overflow-hidden`}
          >
            <div className="absolute inset-y-0 left-0 w-[2px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
            <div className="w-12 h-12 flex items-center justify-center bg-slate-900/80 rounded-lg border border-white/10 text-2xl group-hover:scale-110 group-hover:border-cyan-500/50 transition-all shadow-lg">
              {op.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-cyan-100 tracking-widest">{op.label}</span>
              <span className="text-[10px] text-cyan-600 font-bold uppercase tracking-tighter opacity-70 group-hover:opacity-100">{op.desc}</span>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-cyan-950/20 border border-cyan-900/30 rounded-lg flex items-center justify-between">
         <span className="text-[10px] text-cyan-600 font-black uppercase tracking-widest">Sys Integrity</span>
         <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>)}
         </div>
      </div>
    </div>
  );
};

export default OperationsBoard;
