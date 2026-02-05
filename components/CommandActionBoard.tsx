import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Incident {
  level: number;
  content: string;
  color: string;
}

const crowdPredictionData = [
  { time: '10:00', short: 12000, long: 11000 },
  { time: '12:00', short: 18000, long: 16500 },
  { time: '14:00', short: 15000, long: 17000 },
  { time: '16:00', short: 22000, long: 21000 },
  { time: '18:00', short: 28000, long: 24000 },
  { time: '20:00', short: 21000, long: 22000 },
  { time: '22:00', short: 15000, long: 14000 },
];

const CommandActionBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [selectedLocation, setSelectedLocation] = useState('外滩观景平台');

  const incidents: Incident[] = [
    { level: 2, content: '外滩观景平台人员聚集，已达警戒密度', color: isNight ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' : 'text-orange-600 border-orange-200 bg-orange-50' },
    { level: 3, content: '南京东路近河南中路交通事故', color: isNight ? 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10' : 'text-amber-600 border-amber-200 bg-amber-50' },
  ];

  const policeStats = [
    { label: '总警力', val: '2540', unit: '人' },
    { label: '街面警力', val: '1280', unit: '人' },
  ];

  const crowdData: Record<string, { total: string; realTime: string }> = {
    '外滩观景平台': { total: '85,602', realTime: '12,450' },
    '豫园': { total: '42,100', realTime: '5,600' },
    '南京路步行街': { total: '120,400', realTime: '18,900' },
  };

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-red-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>指挥行动 · 实时指控</h2>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto tech-scrollbar pr-1 relative z-10">
        {/* 警情监控 */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>分级警情监控</span>
            <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-slate-100'}`}></div>
          </div>
          <div className="space-y-2">
            {incidents.map((inc, i) => (
              <div key={i} className={`flex items-start gap-3 p-2 border rounded-sm transition-all ${inc.color}`}>
                <div className="shrink-0 px-1.5 py-0.5 border border-current rounded text-[10px] font-black">{inc.level}级</div>
                <p className="text-[11px] font-bold leading-tight">{inc.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 警力概况 */}
        <section>
          <div className="grid grid-cols-2 gap-2">
            {policeStats.map((stat, i) => (
              <div key={i} className={`border p-2 rounded-lg flex items-center justify-between transition-all ${
                isNight ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'
              }`}>
                <span className={`text-[9px] font-bold transition-colors ${isNight ? 'text-white/50' : 'text-slate-400'}`}>{stat.label}</span>
                <div className="text-right">
                  <span className={`text-sm digital-font font-black transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>{stat.val}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 大客流预测图表 */}
        <section className={`border p-3 rounded-lg transition-all ${
          isNight ? 'bg-slate-900/60 border-cyan-500/20' : 'bg-sky-50/50 border-sky-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>大客流趋势预测</span>
              <div className="flex gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-cyan-400' : 'bg-sky-500'}`}></div>
                  <span className={`text-[8px] font-black uppercase ${isNight ? 'text-white/40' : 'text-slate-400'}`}>短期预测</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                  <span className={`text-[8px] font-black uppercase ${isNight ? 'text-white/40' : 'text-slate-400'}`}>长期预期</span>
                </div>
              </div>
            </div>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`border text-[9px] px-2 py-0.5 rounded focus:outline-none transition-colors ${
                isNight ? 'bg-slate-900 border-cyan-500/30 text-cyan-400' : 'bg-white border-sky-200 text-sky-600'
              }`}
            >
              {Object.keys(crowdData).map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdPredictionData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isNight ? "#22d3ee" : "#0ea5e9"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isNight ? "#22d3ee" : "#0ea5e9"} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLong" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isNight ? "rgba(34,211,238,0.05)" : "rgba(14,165,233,0.1)"} vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isNight ? '#475569' : '#64748b', fontSize: 8, fontWeight: 'bold' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isNight ? '#475569' : '#64748b', fontSize: 8, fontWeight: 'bold' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isNight ? 'rgba(2, 6, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                    border: isNight ? '1px solid #22d3ee' : '1px solid #0ea5e9', 
                    borderRadius: '8px', 
                    fontSize: '9px', 
                    color: isNight ? '#fff' : '#1e293b' 
                  }}
                />
                <Area type="monotone" dataKey="short" stroke={isNight ? "#22d3ee" : "#0ea5e9"} strokeWidth={2} fillOpacity={1} fill="url(#colorShort)" />
                <Area type="monotone" dataKey="long" stroke="#6366f1" strokeWidth={1.5} strokeDasharray="4 2" fillOpacity={1} fill="url(#colorLong)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className={`text-[8px] font-bold uppercase ${isNight ? 'text-white/40' : 'text-slate-400'}`}>当前累计值</span>
              <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-white glow-text' : 'text-sky-600'}`}>{crowdData[selectedLocation].total}</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className={`text-[8px] font-bold uppercase ${isNight ? 'text-white/40' : 'text-slate-400'}`}>预测峰值时段</span>
              <span className={`text-[11px] font-black ${isNight ? 'text-amber-400' : 'text-amber-600'}`}>18:30 - 19:15</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommandActionBoard;