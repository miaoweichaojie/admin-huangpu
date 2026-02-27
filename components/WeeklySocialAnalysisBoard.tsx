
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const indices = [
  { name: '警情指数', value: 82, status: '总体平稳', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { name: '打击指数', value: 91, status: '效能良好', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { name: '防控指数', value: 88, status: '管控严密', color: 'text-sky-400', bg: 'bg-sky-400/10' },
  { name: '稳定指数', value: 95, status: '高度稳定', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: '交通指数', value: 74, status: '压力升高', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { name: '舆情指数', value: 68, status: '关注升温', color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

const WeeklySocialAnalysisBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-sky-500'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            一周社会面分析 · 综合指数
          </h2>
        </div>
        <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-all ${
          isNight ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'
        }`}>
          Status: Optimized
        </div>
      </div>

      {/* 指数网格 */}
      <div className="flex-1 grid grid-cols-3 gap-3 overflow-y-auto tech-scrollbar pr-1 relative z-10">
        {indices.map((idx, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-xl border transition-all group flex flex-col justify-between ${
              isNight ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-slate-200 shadow-sm hover:border-sky-300'
            }`}
          >
            <div className="flex flex-col gap-1 mb-2">
              <span className={`text-[10px] font-black tracking-widest transition-colors truncate ${isNight ? 'text-white/60' : 'text-slate-500'}`}>
                {idx.name}
              </span>
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all self-start whitespace-nowrap ${
                isNight ? idx.bg + ' ' + idx.color : 'bg-slate-100 text-slate-600'
              }`}>
                {idx.status}
              </span>
            </div>
            
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-2xl digital-font font-black transition-colors ${isNight ? idx.color : (idx.color.replace('400', '600'))}`}>
                {idx.value}
              </span>
              <span className="text-[8px] font-bold opacity-30">/100</span>
            </div>

            {/* 进度条 */}
            <div className={`h-1 w-full rounded-full overflow-hidden transition-colors ${isNight ? 'bg-white/5' : 'bg-slate-100'}`}>
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${isNight ? idx.color.replace('text-', 'bg-') : 'bg-sky-500'}`}
                style={{ width: `${idx.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WeeklySocialAnalysisBoard;
