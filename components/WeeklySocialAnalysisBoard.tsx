
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const weeklyData = [
  { day: '02-01', index: 88 },
  { day: '02-02', index: 82 },
  { day: '02-03', index: 95 },
  { day: '02-04', index: 78 },
  { day: '02-05', index: 84 },
  { day: '02-06', index: 91 },
  { day: '今日', index: 89, isToday: true },
];

const WeeklySocialAnalysisBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-sky-500'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            一周社会面分析 · 态势感知
          </h2>
        </div>
        <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-all ${
          isNight ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'
        }`}>
          Stability: High
        </div>
      </div>

      {/* 指标卡片 */}
      <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
        <div className={`p-2 rounded-lg border transition-all ${isNight ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <p className={`text-[8px] font-bold uppercase transition-colors ${isNight ? 'text-white/40' : 'text-slate-400'}`}>平均处警用时</p>
          <div className="flex items-baseline gap-1">
             <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>04:12</span>
             <span className="text-[7px] font-bold opacity-40">MIN</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg border transition-all ${isNight ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <p className={`text-[8px] font-bold uppercase transition-colors ${isNight ? 'text-white/40' : 'text-slate-400'}`}>社会面安全感</p>
          <div className="flex items-baseline gap-1">
             <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-emerald-400' : 'text-emerald-600'}`}>98.2</span>
             <span className="text-[7px] font-bold opacity-40">%</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="flex-1 min-h-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isNight ? "rgba(34,211,238,0.05)" : "rgba(14,165,233,0.1)"} vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isNight ? '#475569' : '#94a3b8', fontSize: 8, fontWeight: 'bold' }} 
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isNight ? '#475569' : '#94a3b8', fontSize: 8, fontWeight: 'bold' }} 
            />
            <Tooltip 
              cursor={{ fill: isNight ? 'rgba(34,211,238,0.05)' : 'rgba(14,165,233,0.05)' }}
              contentStyle={{ 
                backgroundColor: isNight ? 'rgba(2, 6, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                border: isNight ? '1px solid #22d3ee' : '1px solid #0ea5e9', 
                borderRadius: '8px', 
                fontSize: '9px', 
                color: isNight ? '#fff' : '#1e293b' 
              }}
            />
            <Bar dataKey="index" radius={[4, 4, 0, 0]} barSize={20}>
              {weeklyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isToday 
                    ? (isNight ? '#22d3ee' : '#0ea5e9') 
                    : (isNight ? 'rgba(34,211,238,0.3)' : 'rgba(14,165,233,0.2)')
                  } 
                  className={entry.isToday ? 'animate-pulse' : ''}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 底部装饰 */}
      <div className={`mt-3 pt-2 border-t flex justify-between items-center transition-colors ${isNight ? 'border-cyan-900/30' : 'border-slate-100'}`}>
         <span className={`text-[7px] font-black uppercase tracking-[0.4em] transition-colors ${isNight ? 'text-cyan-400/40' : 'text-slate-400'}`}>
           Analysis Cycle: 7D Rolling
         </span>
         <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${isNight ? 'bg-cyan-500/10' : 'bg-sky-50'}`}>
            <div className={`w-1 h-1 rounded-full animate-ping ${isNight ? 'bg-cyan-400' : 'bg-sky-500'}`}></div>
            <span className={`text-[7px] font-black transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>LIVE AI INSIGHT</span>
         </div>
      </div>
    </div>
  );
};

export default WeeklySocialAnalysisBoard;
