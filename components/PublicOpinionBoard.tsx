import React from 'react';

interface OpinionItem {
  id: string;
  source: '网安' | '网信办' | '市局';
  content: string;
  time: string;
  level: 'high' | 'medium' | 'low';
}

const mockOpinions: OpinionItem[] = [
  { id: '1', source: '网安', content: '发现某社交平台涉及本辖区敏感话题讨论，热度持续上升。', time: '20:45', level: 'high' },
  { id: '2', source: '网信办', content: '监测到本地论坛关于某民生问题的负面舆情，已通报相关部门。', time: '20:30', level: 'medium' },
  { id: '3', source: '市局', content: '转发部级通报：注意防范针对特定群体的网络诈骗舆情引导。', time: '20:15', level: 'low' },
  { id: '4', source: '网安', content: '某短视频平台出现涉及辖区景点的误导性视频，播放量破万。', time: '19:50', level: 'medium' },
  { id: '5', source: '网信办', content: '关于某老旧小区改造的投诉在社交媒体引发关注。', time: '19:30', level: 'low' },
  { id: '6', source: '市局', content: '紧急通报：发现针对本市公共交通系统的虚假恐怖信息。', time: '19:10', level: 'high' },
];

const PublicOpinionBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-purple-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>舆情监测分析</h2>
        </div>
        <div className="flex gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-[7px] font-black uppercase opacity-40">今日</span>
            <span className="text-[12px] digital-font font-black text-purple-500">12</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[7px] font-black uppercase opacity-40">处置</span>
            <span className="text-[12px] digital-font font-black text-emerald-500">10</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 overflow-hidden">
        <div 
          className="space-y-3 animate-[scroll-vertical_20s_linear_infinite] hover:[animation-play-state:paused]"
          style={{
            animationName: 'scroll-vertical',
            animationDuration: '30s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          {/* 第一组数据 */}
          {mockOpinions.map((item) => (
            <div key={`first-${item.id}`} className={`p-3 rounded-xl border transition-all ${
              isNight ? 'bg-purple-900/10 border-purple-500/10 hover:border-purple-500/30' : 'bg-white border-slate-100 shadow-sm hover:border-purple-200'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                    item.source === '网安' ? 'bg-blue-500/20 text-blue-500' : 
                    item.source === '网信办' ? 'bg-emerald-500/20 text-emerald-500' : 
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {item.source}
                  </span>
                  <span className={`text-[8px] font-bold px-1 rounded ${
                    item.level === 'high' ? 'bg-red-500/20 text-red-500' :
                    item.level === 'medium' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-sky-500/20 text-sky-500'
                  }`}>
                    {item.level === 'high' ? '紧急' : item.level === 'medium' ? '关注' : '常规'}
                  </span>
                </div>
                <span className="text-[9px] digital-font opacity-40">{item.time}</span>
              </div>
              <p className={`text-[10px] font-bold leading-relaxed ${isNight ? 'text-white/80' : 'text-slate-700'}`}>
                {item.content}
              </p>
            </div>
          ))}
          {/* 第二组数据（用于无缝滚动） */}
          {mockOpinions.map((item) => (
            <div key={`second-${item.id}`} className={`p-3 rounded-xl border transition-all ${
              isNight ? 'bg-purple-900/10 border-purple-500/10 hover:border-purple-500/30' : 'bg-white border-slate-100 shadow-sm hover:border-purple-200'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                    item.source === '网安' ? 'bg-blue-500/20 text-blue-500' : 
                    item.source === '网信办' ? 'bg-emerald-500/20 text-emerald-500' : 
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {item.source}
                  </span>
                  <span className={`text-[8px] font-bold px-1 rounded ${
                    item.level === 'high' ? 'bg-red-500/20 text-red-500' :
                    item.level === 'medium' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-sky-500/20 text-sky-500'
                  }`}>
                    {item.level === 'high' ? '紧急' : item.level === 'medium' ? '关注' : '常规'}
                  </span>
                </div>
                <span className="text-[9px] digital-font opacity-40">{item.time}</span>
              </div>
              <p className={`text-[10px] font-bold leading-relaxed ${isNight ? 'text-white/80' : 'text-slate-700'}`}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll-vertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}</style>
      </div>

      <div className={`mt-3 pt-2 border-t flex justify-end items-center ${isNight ? 'border-purple-900/30' : 'border-slate-200'}`}>
        <span className={`text-[7px] font-black uppercase tracking-[0.2em] ${isNight ? 'text-purple-500/40' : 'text-slate-500'}`}>
          Opinion Monitor Active
        </span>
      </div>
    </div>
  );
};

export default PublicOpinionBoard;
