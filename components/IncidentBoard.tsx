import React, { useState } from 'react';

interface TaskItem {
  title: string;
  unit: string;
  status: '进行中' | '已完成' | '核查中' | '待处理';
}

const IncidentBoard: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [activeTab, setActiveTab] = useState<'special' | 'clue' | 'research'>('special');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState('全部状态');

  const categories = {
    // ... items remain same, but I'll add a 'details' field to some for simulation
    special: {
      label: '专项整治',
      items: [
        { title: '外滩拥挤踩踏风险整治', unit: '外滩治安派出所', status: '进行中', details: '当前外滩区域客流密度 0.4人/平米，已出动警力 45 人，设置导流围栏 200 米。' },
        { title: '南京东路非法拉客治理', unit: '南东派出所', status: '已完成', details: '本周累计抓获非法拉客人员 12 人，收缴宣传卡片 5000 余张，治安处罚 8 人。' },
        { title: '瑞金医院周边交通整治', unit: '瑞金二路派出所', status: '进行中', details: '重点治理违停车辆，已拖移违停车辆 5 辆，现场处罚 15 起。' },
        { title: '淮海中路非机动车乱停放专项', unit: '瑞金派出所', status: '待处理', details: '计划于明日开展联合执法，重点清理共享单车乱停放区域。' },
        { title: '重点商圈扒窃拎包专项打击', unit: '刑侦支队', status: '进行中', details: '便衣警力已布控，通过视频监控锁定 2 名嫌疑人，正在跟进。' },
        { title: '豫园商城周边无证摊贩整治', unit: '豫园派出所', status: '进行中', details: '联合城管部门开展整治，已劝离无证摊贩 8 处。' },
        { title: '老旧小区消防通道占用清理', unit: '消防支队', status: '待处理', details: '排查发现 3 处严重占用消防通道点位，已下达整改通知书。' },
        { title: '校园周边“黑车”非法营运打击', unit: '交警支队', status: '进行中', details: '已查扣疑似非法营运车辆 2 辆，移交交通执法部门处理。' },
        { title: '娱乐场所违规经营专项检查', unit: '治安支队', status: '已完成', details: '检查娱乐场所 15 家，发现安全隐患 2 处，已现场整改。' },
        { title: '外滩江堤救生设施专项检查', unit: '水上派出所', status: '进行中', details: '检查救生圈、救生绳等设施 50 处，更换损坏设施 3 处。' },
        { title: '南京东路步行街共享单车乱停放治理', unit: '南东派出所', status: '待处理', details: '协调共享单车企业增加清运频次，设置临时停放区。' },
        { title: '重点商圈反诈宣传周活动', unit: '刑侦支队', status: '进行中', details: '发放宣传手册 2000 份，现场解答群众咨询 100 余人次。' },
      ] as TaskItem[]
    },
    clue: {
      label: '线索核处',
      items: [
        { title: '涉诈黑灰产窝点摸排', unit: '刑侦支队', status: '核查中', details: '通过技术手段定位疑似窝点，正在进行实地走访摸排。' },
        { title: '重点地区人员异常聚集', unit: '瑞金派出所', status: '待处理', details: '监控发现某写字楼内有大量人员频繁出入，疑似传销活动。' },
        { title: '夜间娱乐场所噪音举报', unit: '打浦桥派出所', status: '进行中', details: '已约谈相关场所负责人，要求加强隔音措施，降低音量。' },
        { title: '非法行医线索核查', unit: '治安支队', status: '核查中', details: '接到群众举报，某民房内存在非法行医行为，正在核实。' },
        { title: '疑似地下赌博窝点举报', unit: '治安支队', status: '待处理', details: '线索显示某棋牌室深夜活动异常，计划进行突击检查。' },
        { title: '网络赌博平台引流线索', unit: '网安支队', status: '核查中', details: '发现多个社交群组发布赌博平台链接，正在溯源追踪。' },
        { title: '非法集资风险企业排查', unit: '经侦支队', status: '进行中', details: '对辖区内高风险投资理财公司进行实地核查，调取财务数据。' },
        { title: '走私冻品运输线索核实', unit: '治安支队', status: '待处理', details: '接到线索某冷链物流车装载不明来源冻品，准备拦截检查。' },
        { title: '虚假身份信息办理窝点', unit: '人口管理支队', status: '核查中', details: '发现网上有售卖虚假身份证件信息，正在锁定发货地址。' },
        { title: '违规销售烟花爆竹线索', unit: '治安支队', status: '待处理', details: '排查沿街店铺，防止违规存储和销售烟花爆竹。' },
        { title: '疑似传销组织活动线索', unit: '经侦支队', status: '核查中', details: '对举报的传销窝点进行外围侦查，摸清人员结构。' },
      ] as TaskItem[]
    },
    research: {
      label: '全源搜研',
      items: [
        { title: '豫园周边风险趋势分析', unit: '指挥中心', status: '已完成', details: '基于历史数据建模，预测未来一周豫园区域客流平稳。' },
        { title: '跨区域流动人口特征建模', unit: '人口管理支队', status: '进行中', details: '分析跨省流动人口就业分布，为精准管理提供支撑。' },
        { title: '敏感时期舆情风险研判', unit: '网安支队', status: '进行中', details: '全网监测相关关键词，及时发现并处置负面舆情。' },
        { title: '重大活动周边交通压力评估', unit: '交警支队', status: '已完成', details: '评估结果显示活动期间周边路网压力巨大，已制定分流方案。' },
        { title: '辖区内重点人员活动轨迹研判', unit: '情报中心', status: '进行中', details: '利用多维数据分析重点人员活动规律，发现异常行为。' },
        { title: '大型商场消防安全隐患排查', unit: '消防支队', status: '核查中', details: '对商场自动喷淋系统、防火分区进行全面测试。' },
        { title: '校园周边治安环境综合治理', unit: '治安支队', status: '进行中', details: '清理校园周边违规摊点，加强放学时段护校勤务。' },
        { title: '节假日景区人流量精准预测', unit: '指挥中心', status: '已完成', details: '预测准确率达 95%，有效指导了现场警力部署。' },
        { title: '特定群体异常资金往来研判', unit: '经侦支队', status: '进行中', details: '追踪可疑账户资金流向，发现多笔跨国异常转账。' },
        { title: '无人机非法飞行风险评估', unit: '特巡警支队', status: '进行中', details: '评估核心区无人机反制系统覆盖范围，查漏补缺。' },
        { title: '重点单位网络安全漏洞扫描', unit: '网安支队', status: '进行中', details: '对政府部门网站进行渗透测试，发现 2 处高危漏洞。' },
        { title: '辖区治安热点区域动态分析', unit: '情报中心', status: '已完成', details: '分析显示近期入室盗窃案件集中在老旧小区，建议加强巡逻。' },
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
        {/* 下拉筛选功能 */}
        <div className="relative group">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`text-[9px] font-black px-2 py-1 rounded border focus:outline-none transition-all cursor-pointer appearance-none pr-6 ${
              isNight ? 'bg-slate-900 border-cyan-500/30 text-cyan-400' : 'bg-white border-sky-200 text-sky-600'
            }`}
          >
            <option>全部状态</option>
            <option>进行中</option>
            <option>已完成</option>
            <option>核查中</option>
            <option>待处理</option>
          </select>
          <div className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* 110警情统计 */}
      <div className={`mb-4 p-3 rounded-xl border relative z-10 transition-all ${
        isNight ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'
      }`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>110警情总数</span>
            {/* 时间维度下拉 */}
            <div className="relative mt-1">
              <select className={`text-[7px] font-black bg-transparent border-none focus:outline-none appearance-none pr-4 cursor-pointer ${isNight ? 'text-white/40' : 'text-slate-400'}`}>
                <option>今日 (24H)</option>
                <option>昨日</option>
                <option>本周</option>
                <option>本月</option>
              </select>
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none ${isNight ? 'text-white/20' : 'text-slate-300'}`}>
                <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <span className={`text-xl digital-font font-black ${isNight ? 'text-white glow-text' : 'text-slate-800'}`}>1,248</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '重点类', val: 142, color: 'text-rose-500' },
            { label: '报警类', val: 586, color: 'text-cyan-500' },
            { label: '矛盾纠纷', val: 324, color: 'text-amber-500' },
            { label: '交通类', val: 196, color: 'text-indigo-500' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className={`text-[8px] font-black mb-1 ${isNight ? 'text-white/40' : 'text-slate-400'}`}>{stat.label}</span>
              <span className={`text-xs digital-font font-black ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 mb-4 relative z-10">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setExpandedIdx(null); }}
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
        {categories[activeTab].items
          .filter(item => filter === '全部状态' || item.status === filter)
          .map((item, idx) => (
          <div
            key={idx}
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            className={`p-3 border rounded-lg group transition-all duration-300 cursor-pointer ${
              isNight ? 'bg-gradient-to-r from-slate-900/80 to-slate-950/40 border-white/5 hover:border-cyan-500/30' : 'bg-white border-slate-100 hover:border-sky-300 shadow-sm'
            } ${expandedIdx === idx ? (isNight ? 'border-cyan-500/50 ring-1 ring-cyan-500/20' : 'border-sky-400 ring-1 ring-sky-100') : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-[11px] font-black transition-colors leading-tight flex-1 mr-2 ${
                isNight ? 'text-white group-hover:text-cyan-400' : 'text-slate-700 group-hover:text-sky-600'
              }`}>
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] px-1.5 py-0.5 border rounded-sm font-black whitespace-nowrap ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>
                <svg className={`w-3 h-3 transition-transform ${expandedIdx === idx ? 'rotate-180' : ''} ${isNight ? 'text-white/20' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-tighter ${isNight ? 'text-white/30' : 'text-slate-400'}`}>涉及单位:</span>
                <span className={`text-[9px] font-black ${isNight ? 'text-sky-400' : 'text-sky-600'}`}>{item.unit}</span>
              </div>
            </div>

            {/* 下拉详情内容 */}
            {expandedIdx === idx && (
              <div className={`mt-3 pt-3 border-t animate-[fadeIn_0.3s_ease-out] ${isNight ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] leading-relaxed italic ${isNight ? 'text-cyan-100/60' : 'text-slate-500'}`}>
                  {item.details || '暂无详细研判信息。'}
                </p>
                <div className="mt-2 flex gap-2">
                  <button className={`text-[8px] font-black px-2 py-1 rounded transition-colors ${isNight ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'}`}>查看详情</button>
                  <button className={`text-[8px] font-black px-2 py-1 rounded transition-colors ${isNight ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>导出报告</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`mt-4 pt-3 border-t grid grid-cols-3 gap-2 relative z-10 transition-colors ${isNight ? 'border-cyan-900/30' : 'border-slate-200'}`}>
        <div className="text-center">
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-500'}`}>当前在办</p>
          <span className={`text-sm digital-font font-black transition-colors ${isNight ? 'text-white' : 'text-slate-800'}`}>12</span>
        </div>
        <div className={`text-center border-x transition-colors ${isNight ? 'border-cyan-900/30' : 'border-slate-200'}`}>
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-500'}`}>待核线索</p>
          <span className="text-sm digital-font font-black text-amber-500">08</span>
        </div>
        <div className="text-center">
          <p className={`text-[7px] font-black uppercase mb-0.5 ${isNight ? 'text-white/40' : 'text-slate-500'}`}>研判结论</p>
          <span className="text-sm digital-font font-black text-emerald-500">24</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentBoard;