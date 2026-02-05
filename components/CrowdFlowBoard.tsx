import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { time: '08:00', short: 4000, long: 3800 },
  { time: '10:00', short: 12000, long: 11000 },
  { time: '12:00', short: 15000, long: 16500 },
  { time: '14:00', short: 18000, long: 17000 },
  { time: '16:00', short: 22000, long: 21000 },
  { time: '18:00', short: 25000, long: 24000 },
  { time: '20:00', short: 21000, long: 22000 },
];

const CrowdFlowBoard: React.FC = () => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 module-entry-anim">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
          <h2 className="text-base font-black text-white italic tracking-tighter uppercase">大客流监测</h2>
        </div>
        <div className="flex gap-3 text-[8px] font-black uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></div>
            <span className="text-cyan-400 opacity-80">短期</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></div>
            <span className="text-indigo-400 opacity-80">长期</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 9, fontWeight: 'bold' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 9, fontWeight: 'bold' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.95)', border: '1px solid #22d3ee', borderRadius: '8px', fontSize: '9px', color: '#fff' }}
            />
            <Area type="monotone" dataKey="short" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorShort)" />
            <Area type="monotone" dataKey="long" stroke="#6366f1" strokeWidth={1} strokeDasharray="3 3" fillOpacity={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between p-2.5 bg-gradient-to-r from-cyan-900/20 to-transparent border border-cyan-500/10 rounded-lg relative z-10">
        <div className="flex flex-col">
          <span className="text-[8px] text-cyan-400 font-black tracking-widest uppercase mb-0.5 opacity-70">全域累计客流</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl digital-font font-black text-white glow-text">142,504</span>
            <span className="text-[8px] text-cyan-500/60 font-black italic tracking-tighter uppercase">人次</span>
          </div>
        </div>
        <div className="text-right">
          <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black rounded border border-emerald-500/20 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>安全良好</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdFlowBoard;