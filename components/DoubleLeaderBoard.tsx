
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

interface Instruction {
  id: string;
  leader: string;
  content: string;
  time: string;
  isUrgent: boolean;
}

const instructions: Instruction[] = [
  { id: '1', leader: '分局主要领导', content: '针对外滩区域客流回升，务必加强无人机高空巡视与地面警力联动，确保绝对安全。', time: '14:20', isUrgent: true },
  { id: '2', leader: '值班局领导', content: '南京路步行街周边交通秩序需持续优化。', time: '13:45', isUrgent: false },
];

const closedLoopData = [
  { stage: '指令下达', val: 100, color: '#38bdf8' },
  { stage: '接收确认', val: 98, color: '#6366f1' },
  { stage: '实战核处', val: 85, color: '#f59e0b' },
  { stage: '反馈归档', val: 82, color: '#10b981' },
];

const DoubleLeaderBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-4 transition-colors ${isNight ? 'bg-sky-500 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            双长盯办 · 闭环指控
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 tech-scrollbar relative z-10 space-y-6">
        {/* 新增：警情盯办闭环情况 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>警情盯办闭环情况</span>
            <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-slate-100'}`}></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {closedLoopData.map((item, i) => (
              <div key={i} className={`relative flex flex-col items-center p-2 rounded-lg border ${
                isNight ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100 shadow-sm'
              }`}>
                <span className={`text-[8px] font-black mb-1 opacity-60`}>{item.stage}</span>
                <span className={`text-sm digital-font font-black`} style={{ color: item.color }}>{item.val}%</span>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[10px] opacity-20">▶</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 新增：一周研判工作汇总 */}
        <section className={`p-3 rounded-xl border ${isNight ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-sky-50/50 border-sky-100'}`}>
           <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-300' : 'text-indigo-700'}`}>一周研判工作汇总</span>
              <span className="text-[8px] font-bold opacity-40">02.01 - 02.07</span>
           </div>
           <div className="grid grid-cols-3 gap-2">
              {[
                { label: '线索流转', count: 124, unit: '条' },
                { label: '报告产出', count: 18, unit: '份' },
                { label: '实战转化', count: 92, unit: '%' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                   <span className="text-[14px] digital-font font-black">{stat.count}<span className="text-[8px] ml-0.5">{stat.unit}</span></span>
                   <span className="text-[7px] font-black uppercase opacity-40 tracking-tighter">{stat.label}</span>
                </div>
              ))}
           </div>
        </section>

        {/* 领导批示意见 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>实时批示指令</span>
            <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-slate-100'}`}></div>
          </div>
          <div className="space-y-3">
            {instructions.map((ins) => (
              <div 
                key={ins.id} 
                className={`relative p-3 rounded-xl border transition-all duration-300 group ${
                  isNight 
                    ? 'bg-slate-900/60 border-white/5 hover:border-sky-400/40' 
                    : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                     <div className={`w-1.5 h-1.5 rounded-full ${ins.isUrgent ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500'}`}></div>
                     <span className={`text-[10px] font-black transition-colors ${isNight ? 'text-sky-300' : 'text-sky-800'}`}>{ins.leader}</span>
                  </div>
                  <span className={`text-[8px] digital-font font-bold transition-colors ${isNight ? 'text-white/30' : 'text-slate-400'}`}>{ins.time}</span>
                </div>
                <div className={`relative px-3 py-2 rounded-lg border-l-2 text-[10px] leading-relaxed italic transition-colors ${
                  isNight ? 'bg-black/20 border-sky-500/30 text-sky-100/80' : 'bg-slate-50 border-sky-200 text-slate-600'
                }`}>
                   {ins.content}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={`mt-auto pt-3 border-t flex justify-between items-center transition-colors ${isNight ? 'border-sky-900/30' : 'border-slate-100'}`}>
         <span className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors ${isNight ? 'text-sky-500/40' : 'text-slate-300'}`}>
           Command Chain Integrity: OK
         </span>
         <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-1 rounded-full ${isNight ? 'bg-emerald-500/30 animate-pulse' : 'bg-slate-200'}`} style={{ animationDelay: `${i * 0.2}s` }}></div>)}
         </div>
      </div>
    </div>
  );
};

export default DoubleLeaderBoard;
