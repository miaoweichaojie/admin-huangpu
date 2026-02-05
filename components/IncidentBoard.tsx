import React, { useState } from 'react';

interface TaskItem {
  title: string;
  unit: string;
  status: '进行中' | '已完成' | '核查中' | '待处理';
}

const IncidentBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [activeTab, setActiveTab] = useState<'special' | 'clue' | 'research'>('special');

  const categories = {
    special: {
      label: '专项整治',
      items: [
        { title: '外滩拥挤踩踏风险整治', unit: '外滩治安派出所', status: '进行中' },
        { title: '南京东路非法拉客治理', unit: '南东派出所', status: '已完成' },
        { title: '瑞金医院周边交通整治', unit: '瑞金二路派出所', status: '进行中' },
      ] as TaskItem[]
    },
    clue: {
      label: '线索核处',
      items: [
        { title: '涉诈黑灰产窝点摸排', unit: '刑侦支队', status: '核查中' },
        { title: '重点地区人员异常聚集', unit: '瑞金派出所', status: '待处理' },
        { title: '夜间娱乐场所噪音举报', unit: '打浦桥派出所', status: '进行中' },
      ] as TaskItem[]
    },
    research: {
      label: '全源搜研',
      items: [
        { title: '豫园周边风险趋势分析', unit: '指挥中心', status: '已完成' },
        { title: '跨区域流动人口特征建模', unit: '人口管理支队', status: '进行中' },
        { title: '敏感时期舆情风险研判', unit: '网安支队', status: '进行中' },
      ] as TaskItem[]
    }
  };

  const getStatusStyle = (status: TaskItem['status']) => {
    switch (status) {
      case '进行中': return isNight ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-sky-50 text-sky-600 border-sky-200';
      case '已完成': return isNight ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case '核查中': return isNight ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-amber-50 text-amber-600 border-amber-200';
      case '待处理': return isNight ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  return (
    <div className="tech-module-container h-full flex flex-col p-4">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-4 transition-colors ${isNight ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-sky-500'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>情专融合 · 协同指挥</h2>
        </div>
      </div>

      <div className="flex gap-1 mb-4 relative z-10">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-1.5 px-2 rounded-sm text-[10px] font-black transition-all border ${
              activeTab === key
                ? isNight ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' : 'bg-sky-500 border-sky-600 text-white'
                : isNight ? 'bg-white/5 border-transparent text-white/40' : 'bg-slate-100 border-transparent text-slate-400'
            }`}
          >
            {categories[key].label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto tech-scrollbar pr-1 relative z-10 space-y-2">
        {categories[activeTab].items.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 border rounded-lg group transition-all duration-300 ${
              isNight ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/40 border-white/5 hover:border-cyan-500/30' : 'bg-white border-slate-100 hover:border-sky-300 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-[11px] font-black transition-colors leading-tight ${
                isNight ? 'text-white group-hover:text-cyan-400' : 'text-slate-700 group-hover:text-sky-600'
              }`}>
                {item.title}
              </h3>
              <span className={`text-[8px] px-1.5 py-0.5 border rounded-sm font-black whitespace-nowrap ${getStatusStyle(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-tighter ${isNight ? 'text-white/30' : 'text-slate-400'}`}>涉及单位:</span>
                <span className={`text-[9px] font-black ${isNight ? 'text-sky-400' : 'text-sky-600'}`}>{item.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 pt-3 border-t grid grid-cols-3 gap-2 relative z-10 transition-colors ${isNight ? 'border-cyan-900/30' : 'border-slate-100'}`}>
        <div className="text-center">
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-400'}`}>当前在办</p>
          <span className={`text-sm digital-font font-black transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>12</span>
        </div>
        <div className={`text-center border-x transition-colors ${isNight ? 'border-cyan-900/30' : 'border-slate-100'}`}>
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-400'}`}>待核线索</p>
          <span className="text-sm digital-font font-black text-amber-500">08</span>
        </div>
        <div className="text-center">
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-400'}`}>研判结论</p>
          <span className="text-sm digital-font font-black text-emerald-500">24</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentBoard;