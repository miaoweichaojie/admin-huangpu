import React from 'react';

const dataResources = [
  { name: '实有人口库', update: '2026-02-04', status: '已授权' },
  { name: '车辆通行记录', update: '2026-02-05', status: '需申请' },
  { name: '重点场所档案', update: '2026-02-03', status: '申请中' },
  { name: '行业场所动态', update: '2026-02-05', status: '已授权' },
];

const DataBaseBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const getStatusColor = (status: string) => {
    if (isNight) {
        switch (status) {
          case '已授权': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
          case '需申请': return 'text-red-400 border-red-500/40 bg-red-500/10';
          case '申请中': return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
          default: return 'text-slate-400 border-slate-500/40 bg-slate-500/10';
        }
    } else {
        switch (status) {
          case '已授权': return 'text-emerald-600 border-emerald-200 bg-emerald-50';
          case '需申请': return 'text-red-600 border-red-200 bg-red-50';
          case '申请中': return 'text-amber-600 border-amber-200 bg-amber-50';
          default: return 'text-slate-500 border-slate-200 bg-slate-50';
        }
    }
  };

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-500'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>数据基座 · 核心库</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto tech-scrollbar relative z-10 space-y-2">
        {dataResources.map((item, idx) => (
          <div key={idx} className={`group relative overflow-hidden flex items-center justify-between p-2.5 border rounded-lg transition-all ${
            isNight ? 'bg-slate-900/40 border-white/5 hover:border-sky-500/30' : 'bg-white border-slate-100 hover:border-sky-300 shadow-sm'
          }`}>
            <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none ${isNight ? 'bg-gradient-to-r from-transparent via-sky-400/5 to-transparent' : 'bg-gradient-to-r from-transparent via-sky-400/10 to-transparent'}`}></div>
            <div className="flex flex-col">
              <span className={`text-[11px] font-black transition-colors ${isNight ? 'text-white group-hover:text-sky-400' : 'text-slate-700 group-hover:text-sky-600'}`}>{item.name}</span>
              <div className="flex items-center gap-1.5 mt-1">
                 <span className={`text-[8px] font-bold uppercase tracking-tighter ${isNight ? 'text-white/30' : 'text-slate-400'}`}>更新时间:</span>
                 <span className={`text-[9px] digital-font ${isNight ? 'text-sky-500/70' : 'text-sky-600/70'}`}>{item.update}</span>
              </div>
            </div>
            <div className={`px-2 py-0.5 border rounded text-[9px] font-black tracking-widest transition-all ${getStatusColor(item.status)}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataBaseBoard;