import React from 'react';

const UAVBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const illegalFlightStats = [
    { label: '今日黑飞', count: 3, unit: '起', color: 'text-rose-500' },
    { label: '本月累计', count: 24, unit: '起', color: 'text-amber-500' },
    { label: '拦截成功', count: 22, unit: '起', color: 'text-emerald-500' },
  ];

  const stationRanking = [
    { name: '外滩派出所', count: 8 },
    { name: '南东派出所', count: 6 },
    { name: '豫园派出所', count: 4 },
    { name: '瑞金派出所', count: 3 },
    { name: '打浦派出所', count: 3 },
  ];

  const clueVerification = [
    { title: '外滩江堤疑似违规飞行', status: '核查中', time: '10:20' },
    { title: '南京东路举报黑飞线索', status: '已查实', time: '09:15' },
  ];

  const policeUAVStats = [
    { label: '在空架数', count: 5, unit: '架' },
    { label: '今日航时', count: 12.5, unit: 'H' },
  ];

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-indigo-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>无人机安全监管工作</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto tech-scrollbar pr-1 space-y-5 relative z-10">
        {/* 黑飞警情情况 */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>黑飞警情概况</span>
            <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-indigo-500/20' : 'bg-slate-200'}`}></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {illegalFlightStats.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center p-2 rounded-lg border ${
                isNight ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-sm'
              }`}>
                <span className={`text-[14px] digital-font font-black ${stat.color}`}>
                  {stat.count}
                  <span className="text-[8px] ml-0.5 opacity-60 font-sans">{stat.unit}</span>
                </span>
                <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 ${isNight ? 'text-white/40' : 'text-slate-400'}`}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 派出所黑飞排行榜 */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>各所黑飞警情排行</span>
            <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-indigo-500/20' : 'bg-slate-200'}`}></div>
          </div>
          <div className="space-y-1.5">
            {stationRanking.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`text-[9px] font-black w-3 ${i < 3 ? 'text-amber-500' : 'text-slate-500'}`}>{i + 1}</span>
                <span className={`text-[9px] font-bold flex-1 ${isNight ? 'text-white/70' : 'text-slate-600'}`}>{item.name}</span>
                <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden max-w-[60px]">
                  <div className="h-full bg-indigo-500" style={{ width: `${(item.count / 8) * 100}%` }}></div>
                </div>
                <span className={`text-[9px] digital-font font-black ${isNight ? 'text-white' : 'text-slate-800'}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 线索核查 & 警用飞行 */}
        <div className="grid grid-cols-2 gap-4">
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>线索核查</span>
            </div>
            <div className="space-y-2">
              {clueVerification.map((clue, i) => (
                <div key={i} className={`p-2 rounded border ${isNight ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <p className={`text-[9px] font-bold truncate ${isNight ? 'text-white/80' : 'text-slate-700'}`}>{clue.title}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[8px] text-slate-500">{clue.time}</span>
                    <span className={`text-[8px] font-black ${clue.status === '已查实' ? 'text-emerald-500' : 'text-amber-500'}`}>{clue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-400' : 'text-indigo-600'}`}>警用飞行</span>
            </div>
            <div className="space-y-2">
              {policeUAVStats.map((stat, i) => (
                <div key={i} className={`p-2 rounded border flex flex-col items-center ${isNight ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <span className={`text-[12px] digital-font font-black ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>
                    {stat.count}<span className="text-[7px] ml-0.5 font-sans opacity-60">{stat.unit}</span>
                  </span>
                  <span className="text-[8px] font-black uppercase opacity-40">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 工作提示 & 领导批示 */}
        <section className="space-y-3">
          <div className={`p-3 rounded-lg border ${isNight ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs">💡</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-indigo-400' : 'text-indigo-700'}`}>近期工作提示</span>
            </div>
            <p className={`text-[10px] leading-relaxed italic ${isNight ? 'text-indigo-100/60' : 'text-indigo-900/70'}`}>
              加强外滩、豫园等重点区域无人机反制设备巡检，确保敏感时段“零黑飞”。
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${isNight ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs">✍️</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-emerald-400' : 'text-emerald-700'}`}>领导批示</span>
            </div>
            <p className={`text-[10px] leading-relaxed italic ${isNight ? 'text-emerald-100/60' : 'text-emerald-900/70'}`}>
              “要进一步完善无人机闭环管控机制，提升对低慢小目标的发现和处置能力。”
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UAVBoard;
