
import React from 'react';

const stationStaff = [
  { name: '南京东路派出所', staff: '张平安' },
  { name: '人民广场治安派出所', staff: '李建国' },
  { name: '外滩派出所', staff: '王志远' },
  { name: '外滩治安派出所', staff: '赵忠诚' },
  { name: '瑞金二路派出所', staff: '孙卫东' },
  { name: '淮海中路派出所', staff: '周正义' },
  { name: '新天地派出所', staff: '吴利民' },
  { name: '豫园派出所', staff: '郑向阳' },
  { name: '老西门派出所', staff: '冯德胜' },
  { name: '打浦桥派出所', staff: '褚加强' },
  { name: '小东门派出所', staff: '卫红兵' },
  { name: '半淞园派出所', staff: '蒋为民' },
  { name: '五里桥派出所', staff: '沈庆祥' },
  { name: '南浦治安派出所', staff: '韩立功' },
];

const DutyTopBar: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className={`relative h-12 w-full flex items-center border-y backdrop-blur-xl z-30 transition-all duration-1000 ${
      isNight ? 'bg-[#0a1f46]/60 border-cyan-500/20' : 'bg-white/80 border-slate-200'
    }`}>
      {/* 左侧：值班长固定区 */}
      <div className={`flex items-center gap-4 px-8 border-r h-full shrink-0 transition-colors ${
        isNight ? 'border-cyan-500/20 bg-cyan-500/5' : 'border-slate-200 bg-sky-50/50'
      }`}>
        <div className="flex flex-col">
          <span className={`text-[9px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>Chief Officer</span>
          <div className="flex items-center gap-3">
             <span className={`text-base font-black italic ${isNight ? 'text-white' : 'text-slate-800'}`}>今日值班长:</span>
             <span className={`text-lg digital-font font-black transition-colors ${isNight ? 'text-emerald-400 glow-text' : 'text-emerald-600'}`}>陈志远</span>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full animate-pulse ${isNight ? 'bg-emerald-400' : 'bg-emerald-500'}`}></div>
      </div>

      {/* 中间：派出所滚动跑马灯 */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 40s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="animate-marquee flex gap-12 px-12 items-center">
          {/* 渲染两遍实现无缝循环 */}
          {[...stationStaff, ...stationStaff].map((item, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className={`text-[10px] font-black opacity-40 uppercase tracking-tighter ${isNight ? 'text-cyan-400' : 'text-slate-400'}`}>
                {item.name}
              </span>
              <span className={`text-sm font-black transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>
                {item.staff}
              </span>
              <div className={`w-1 h-1 rounded-full ${isNight ? 'bg-cyan-500/30' : 'bg-slate-200'}`}></div>
            </div>
          ))}
        </div>

        {/* 边缘遮罩渐变 */}
        <div className={`absolute inset-y-0 left-0 w-20 pointer-events-none transition-all ${
          isNight ? 'bg-gradient-to-r from-[#0a1f46] to-transparent' : 'bg-gradient-to-r from-white/80 to-transparent'
        }`}></div>
        <div className={`absolute inset-y-0 right-0 w-20 pointer-events-none transition-all ${
          isNight ? 'bg-gradient-to-l from-[#0a1f46] to-transparent' : 'bg-gradient-to-l from-white/80 to-transparent'
        }`}></div>
      </div>

      {/* 右侧：同步状态 */}
      <div className={`px-8 border-l h-full flex items-center gap-3 transition-colors ${
        isNight ? 'border-cyan-500/20' : 'border-slate-200'
      }`}>
         <span className={`text-[8px] font-black uppercase tracking-[0.4em] ${isNight ? 'text-cyan-500/40' : 'text-slate-300'}`}>
           Command Sync
         </span>
         <div className="flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className={`w-1 h-3 rounded-full ${isNight ? 'bg-cyan-500/20' : 'bg-slate-200'}`}>
                <div className={`w-full bg-cyan-400 rounded-full animate-[shimmer_2s_infinite]`} style={{ height: `${20 + i * 30}%`, animationDelay: `${i * 0.2}s` }}></div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DutyTopBar;
