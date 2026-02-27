
import React, { useState } from 'react';

interface RiskAlert {
  id: string;
  type: string;
  location: string;
  time: string;
  status: 'pending' | 'processing' | 'resolved';
  severity: 'high' | 'medium' | 'low';
}

interface AbnormalMovement {
  id: string;
  category: string;
  detail: string;
  time: string;
  hasVideo: boolean;
}

const riskAlerts: RiskAlert[] = [
  { id: '1', type: '风险人员防控', location: '外滩观景台', time: '20:15', status: 'processing', severity: 'high' },
  { id: '2', type: '风险车辆预警', location: '南京东路河南中路', time: '20:08', status: 'pending', severity: 'medium' },
];

const abnormalMovements: AbnormalMovement[] = [
  { id: 'm1', category: '区域入侵', detail: '湖泊入侵 + 核心区域', time: '20:25', hasVideo: true },
  { id: 'm2', category: '人员聚集', detail: '天桥区域人员异常聚集', time: '20:22', hasVideo: true },
  { id: 'm3', category: '人员聚集', detail: '校园周边人员聚集', time: '20:18', hasVideo: true },
  { id: 'm4', category: '徘徊滞留', detail: '重点部位人员长时间徘徊', time: '20:12', hasVideo: true },
  { id: 'm5', category: '异常行为', detail: '拉横幅/翻越围栏报警', time: '20:05', hasVideo: true },
];

const DoubleLeaderBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [activeTab, setActiveTab] = useState<'risk' | 'movement'>('movement');

  return (
    <div className="tech-module-container h-full flex flex-col p-4 overflow-hidden">
      <div className="tech-module-corner corner-tl"></div>
      <div className="tech-module-corner corner-tr"></div>
      <div className="tech-module-corner corner-bl"></div>
      <div className="tech-module-corner corner-br"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-4 transition-colors ${isNight ? 'bg-sky-500 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-600'}`}></div>
          <h2 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>
            圈层防护 · 风险感知
          </h2>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('movement')}
            className={`px-2 py-0.5 text-[9px] font-black rounded transition-all ${
              activeTab === 'movement' 
                ? (isNight ? 'bg-sky-500 text-white' : 'bg-sky-600 text-white')
                : (isNight ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400')
            }`}
          >
            异动分析
          </button>
          <button 
            onClick={() => setActiveTab('risk')}
            className={`px-2 py-0.5 text-[9px] font-black rounded transition-all ${
              activeTab === 'risk' 
                ? (isNight ? 'bg-sky-500 text-white' : 'bg-sky-600 text-white')
                : (isNight ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400')
            }`}
          >
            风险预警
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 tech-scrollbar relative z-10 space-y-4">
        {activeTab === 'risk' ? (
          <section className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>重点防控对象</span>
              <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-slate-100'}`}></div>
            </div>
            {riskAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-xl border transition-all ${
                isNight ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-100 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                      alert.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'
                    }`}>
                      {alert.type}
                    </span>
                    <span className={`text-[10px] font-bold ${isNight ? 'text-white/90' : 'text-slate-700'}`}>{alert.location}</span>
                  </div>
                  <span className="text-[9px] digital-font opacity-40">{alert.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className={`w-1 h-1 rounded-full ${alert.status === 'processing' ? 'bg-sky-500 animate-pulse' : 'bg-amber-500'}`}></div>
                    <span className="text-[9px] opacity-60">{alert.status === 'processing' ? '处置中' : '待处置'}</span>
                  </div>
                  <button className={`p-1 rounded hover:bg-white/10 transition-colors ${isNight ? 'text-sky-400' : 'text-sky-600'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>实时异动分析结果</span>
              <div className={`flex-1 h-px transition-colors ${isNight ? 'bg-cyan-500/20' : 'bg-slate-100'}`}></div>
            </div>
            {abnormalMovements.map((item) => (
              <div key={item.id} className={`group p-3 rounded-xl border transition-all ${
                isNight ? 'bg-slate-900/60 border-white/5 hover:border-sky-500/30' : 'bg-white border-slate-100 shadow-sm hover:border-sky-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        isNight ? 'bg-sky-500/10 text-sky-400' : 'bg-sky-50 text-sky-600'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-[8px] digital-font opacity-40">{item.time}</span>
                    </div>
                    <p className={`text-[11px] font-bold ${isNight ? 'text-white/80' : 'text-slate-700'}`}>{item.detail}</p>
                  </div>
                  {item.hasVideo && (
                    <button 
                      title="调阅视频"
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        isNight ? 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 统计概览 */}
        <section className={`p-3 rounded-xl border ${isNight ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-sky-50/50 border-sky-100'}`}>
           <div className="grid grid-cols-3 gap-2">
              {[
                { label: '今日预警', count: 42, unit: '次' },
                { label: '自动核处', count: 38, unit: '次' },
                { label: '准确率', count: 98.2, unit: '%' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                   <span className="text-[14px] digital-font font-black">{stat.count}<span className="text-[8px] ml-0.5">{stat.unit}</span></span>
                   <span className="text-[7px] font-black uppercase opacity-40 tracking-tighter">{stat.label}</span>
                </div>
              ))}
           </div>
        </section>
      </div>

      <div className={`mt-auto pt-3 border-t flex justify-between items-center transition-colors ${isNight ? 'border-sky-900/30' : 'border-slate-200'}`}>
         <span className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors ${isNight ? 'text-sky-500/40' : 'text-slate-500'}`}>
           Risk Perception Engine: Active
         </span>
         <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-1 rounded-full ${isNight ? 'bg-emerald-500/30 animate-pulse' : 'bg-slate-300'}`} style={{ animationDelay: `${i * 0.2}s` }}></div>)}
         </div>
      </div>
    </div>
  );
};

export default DoubleLeaderBoard;

