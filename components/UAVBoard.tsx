import React from 'react';

const uavMissions = [
  { id: 'U-082', time: '14:25:30', unit: '特巡警支队', route: '外滩-金陵东路', type: '治安巡查' },
  { id: 'U-115', time: '14:30:12', unit: '黄浦交警', route: '南浦大桥-中山南路', type: '流量监测' },
];

const UAVBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-indigo-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>无人机作战指控</h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative z-10 space-y-2">
        {uavMissions.map((mission, idx) => (
          <div key={idx} className={`p-2 border rounded-lg transition-all ${
            isNight ? 'bg-indigo-950/20 border-indigo-500/10 hover:border-indigo-400' : 'bg-white border-slate-100 shadow-sm hover:border-indigo-300'
          }`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[9px] digital-font font-black transition-colors ${isNight ? 'text-indigo-300' : 'text-indigo-600'}`}>{mission.time}</span>
              <span className={`text-[8px] px-1.5 py-0.5 rounded transition-all ${isNight ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>{mission.type}</span>
            </div>
            <p className={`text-[10px] font-black truncate transition-colors ${isNight ? 'text-white/80' : 'text-slate-700'}`}>{mission.route}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UAVBoard;