
import React from 'react';

interface Instruction {
  id: string;
  leader: string;
  content: string;
  time: string;
  isUrgent: boolean;
}

const instructions: Instruction[] = [
  { id: '1', leader: '分局主要领导', content: '针对外滩区域客流回升，务必加强无人机高空巡视与地面警力联动，确保绝对安全。', time: '14:20', isUrgent: true },
  { id: '2', leader: '值班局领导', content: '南京路步行街周边交通秩序需持续优化，特别关注非机动车乱停放对行人流线的影响。', time: '13:45', isUrgent: false },
  { id: '3', leader: '指挥中心主任', content: '各联动单位即刻检查应急通讯设备，保持24小时通讯畅通。', time: '11:10', isUrgent: false },
];

const DoubleLeaderBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const items = [
    { type: '分局重复', count: 4, status: 'pending' },
    { type: '市局重复', count: 7, status: 'urgent' },
    { type: '重点盯办', count: 2, status: 'normal' },
  ];

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      {/* 模块标题 */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-sky-500 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            双长盯办 · 领导批示
          </h2>
        </div>
      </div>

      {/* 上半部分：盯办事项统计 */}
      <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
        {items.map((item, i) => (
          <div key={i} className={`p-2 rounded-lg border text-center transition-all ${
            isNight ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-sm'
          }`}>
            <p className={`text-[8px] font-black mb-1 transition-colors ${isNight ? 'text-white/40' : 'text-slate-400'}`}>{item.type}</p>
            <span className={`text-xl digital-font font-black transition-colors ${
              item.status === 'urgent' ? 'text-red-500' : isNight ? 'text-sky-400' : 'text-sky-600'
            }`}>{item.count}</span>
          </div>
        ))}
      </div>

      {/* 分割线 */}
      <div className="flex items-center gap-2 mb-3 relative z-10 opacity-30">
        <div className={`flex-1 h-px ${isNight ? 'bg-sky-500/30' : 'bg-slate-300'}`}></div>
        <span className="text-[8px] font-black uppercase tracking-widest">Instructions</span>
        <div className={`flex-1 h-px ${isNight ? 'bg-sky-500/30' : 'bg-slate-300'}`}></div>
      </div>

      {/* 下半部分：领导批示意见 */}
      <div className="flex-1 overflow-y-auto pr-1 tech-scrollbar relative z-10 space-y-3">
        {instructions.map((ins) => (
          <div 
            key={ins.id} 
            className={`relative p-3 rounded-xl border transition-all duration-300 group ${
              isNight 
                ? 'bg-slate-900/60 border-white/5 hover:border-sky-400/40' 
                : 'bg-white border-slate-100 shadow-sm hover:border-sky-300'
            } ${ins.isUrgent && isNight ? 'animate-[pulse_4s_infinite]' : ''}`}
          >
            {/* 批示领导标识 */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${ins.isUrgent ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500'}`}></div>
                 <span className={`text-[10px] font-black transition-colors ${isNight ? 'text-sky-300' : 'text-sky-800'}`}>{ins.leader}</span>
              </div>
              <span className={`text-[8px] digital-font font-bold transition-colors ${isNight ? 'text-white/30' : 'text-slate-400'}`}>{ins.time}</span>
            </div>

            {/* 批示内容 */}
            <div className={`relative px-3 py-2 rounded-lg border-l-2 text-[11px] leading-relaxed italic transition-colors ${
              isNight 
                ? 'bg-black/20 border-sky-500/30 text-sky-100/80' 
                : 'bg-slate-50 border-sky-200 text-slate-600'
            }`}>
               {ins.content}
               
               {/* 装饰性电子签章微缩影 */}
               <div className={`absolute bottom-1 right-2 opacity-10 font-serif italic text-[18px] pointer-events-none select-none transition-colors ${isNight ? 'text-sky-400' : 'text-sky-600'}`}>
                 Confirmed
               </div>
            </div>

            {/* 加急标记 */}
            {ins.isUrgent && (
              <div className="absolute -top-1.5 -right-1.5">
                 <span className="flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                 </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部汇总装饰 */}
      <div className={`mt-3 pt-2 border-t flex justify-between items-center transition-colors ${isNight ? 'border-sky-900/30' : 'border-slate-100'}`}>
         <span className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors ${isNight ? 'text-sky-500/40' : 'text-slate-300'}`}>
           Command Chain Status: Online
         </span>
         <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse"></div>
            <span className={`text-[7px] font-black ${isNight ? 'text-sky-400/40' : 'text-slate-300'}`}>AI Syncing</span>
         </div>
      </div>
    </div>
  );
};

export default DoubleLeaderBoard;
