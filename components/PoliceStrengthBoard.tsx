import React from 'react';

const PoliceStrengthBoard: React.FC = () => {
  const stats = [
    { label: '在线警员', val: '1,248', unit: '人', icon: '👮', color: 'from-cyan-500/20' },
    { label: '巡逻民警', val: '856', unit: '人', icon: '🚔', color: 'from-sky-500/20' },
    { label: '在线待警', val: '42', unit: '件', icon: '⏳', color: 'from-amber-500/20' },
    { label: '在线交警', val: '350', unit: '人', icon: '🚦', color: 'from-emerald-500/20' },
  ];

  return (
    <div className="tech-module-container h-full flex flex-col p-3 module-entry-anim">
      {/* 装饰角 */}
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="w-1 h-3 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
        <h2 className="text-sm font-black text-white italic tracking-tighter uppercase">警力部署</h2>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-1 relative z-10">
        {stats.map((item, idx) => (
          <div 
            key={idx} 
            className={`relative p-1.5 bg-gradient-to-br ${item.color} to-transparent border border-white/5 rounded flex flex-col items-center justify-between group transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/5`}
          >
            <div className="text-center">
               <span className="text-lg block drop-shadow-md mb-0.5">{item.icon}</span>
               <p className="text-[7px] text-cyan-400/60 font-black tracking-tighter uppercase truncate leading-none mb-1">{item.label}</p>
            </div>
            
            <div className="text-center">
              <span className="text-xs digital-font font-black text-white glow-text leading-none">{item.val}</span>
              <p className="text-[6px] text-white/30 font-bold uppercase mt-0.5">{item.unit}</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/30 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-1.5 border-t border-sky-900/20 flex items-center justify-between relative z-10">
         <span className="text-[7px] text-cyan-800 font-black uppercase tracking-widest">Protocol 1.0</span>
         <div className="w-8 h-1 bg-cyan-500/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-cyan-400 animate-[hud-scan_2s_linear_infinite]"></div>
         </div>
      </div>
    </div>
  );
};

export default PoliceStrengthBoard;