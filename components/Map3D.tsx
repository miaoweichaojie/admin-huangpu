
import React, { useEffect, useRef, useState } from 'react';

// Leaflet 全局变量由 index.html 引入
declare const L: any;

// 六大维度定义
const CATEGORIES = [
  { id: 'people', label: '人', fullLabel: '实有人口', icon: '👤', color: '#22d3ee' },
  { id: 'incident', label: '事', fullLabel: '实时警情', icon: '⚡', color: '#f43f5e' },
  { id: 'place', label: '地', fullLabel: '重点区域', icon: '📍', color: '#6366f1' },
  { id: 'object', label: '物', fullLabel: '感知设备', icon: '📹', color: '#10b981' },
  { id: 'network', label: '网', fullLabel: '网络节点', icon: '🌐', color: '#f59e0b' },
  { id: 'org', label: '组织', fullLabel: '社会组织', icon: '🏢', color: '#a855f7' },
];

// 模拟撒点数据
const MOCK_POINTS: Record<string, any[]> = {
  people: [
    { name: '民警-张伟', pos: [31.235, 121.475], status: '在线' },
    { name: '民警-李娜', pos: [31.242, 121.485], status: '巡逻中' },
    { name: '辅警-王强', pos: [31.228, 121.492], status: '在线' },
    { name: '重点人员-陈某', pos: [31.215, 121.465], status: '受控' },
  ],
  incident: [
    { name: '交通事故', pos: [31.245, 121.478], status: '处理中' },
    { name: '治安纠纷', pos: [31.231, 121.489], status: '待核查' },
    { name: '火警上报', pos: [31.205, 121.482], status: '处置中' },
  ],
  place: [
    { name: '外滩观景台', pos: [31.240, 121.493], status: '正常' },
    { name: '南京东路步行街', pos: [31.238, 121.480], status: '拥挤' },
    { name: '豫园商城', pos: [31.227, 121.492], status: '平稳' },
  ],
  object: [
    { name: '4K超清球机-001', pos: [31.232, 121.471], status: '运行中' },
    { name: '人脸识别门禁-A', pos: [31.248, 121.484], status: '运行中' },
    { name: '烟感传感器-B1', pos: [31.212, 121.475], status: '在线' },
  ],
  network: [
    { name: '基站-黄浦01', pos: [31.251, 121.472], status: '5G覆盖' },
    { name: '公共Wi-Fi-AP', pos: [31.234, 121.481], status: '异常' },
  ],
  org: [
    { name: '分局指挥中心', pos: [31.226, 121.485], status: '指挥中' },
    { name: '社区志愿者协会', pos: [31.218, 121.468], status: '在线' },
  ]
};

const HUANGPU_BOUNDARY = [
  [31.2505, 121.4682], [31.2535, 121.4825], [31.2465, 121.4998], [31.2320, 121.5065],
  [31.2185, 121.5112], [31.2015, 121.5025], [31.1965, 121.4865], [31.2005, 121.4685],
  [31.2185, 121.4612], [31.2355, 121.4635], [31.2455, 121.4665]
];

const Map3D: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const scatterLayer = useRef<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('people');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let retryCount = 0;
    const initMap = () => {
      if (typeof L === 'undefined') {
        if (retryCount < 20) { retryCount++; setTimeout(initMap, 200); }
        return;
      }

      if (mapInstance.current) return;

      const map = L.map(containerRef.current, {
        center: [31.226, 121.485],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      mapInstance.current = map;
      scatterLayer.current = L.layerGroup().addTo(map);

      L.tileLayer('https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        maxZoom: 18, minZoom: 10
      }).addTo(map);

      L.polygon(HUANGPU_BOUNDARY, {
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 6, opacity: 0.15, fillColor: '#0c4a6e', fillOpacity: 0.08,
      }).addTo(map);

      L.polygon(HUANGPU_BOUNDARY, {
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 2, opacity: 1, fillOpacity: 0,
      }).addTo(map);

      setTimeout(() => { map.invalidateSize(); setIsReady(true); }, 100);
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !scatterLayer.current) return;

    scatterLayer.current.clearLayers();
    const points = MOCK_POINTS[activeCategory] || [];
    const color = CATEGORIES.find(c => c.id === activeCategory)?.color || '#22d3ee';

    points.forEach(p => {
      const pulseIcon = L.divIcon({
        className: 'custom-pulse-container',
        html: `
          <div class="pulse-marker" style="color: ${color}"></div>
          <div class="map-label" style="position: absolute; left: 20px; top: -10px; border-color: ${color}aa; font-size: 9px; padding: 1px 5px;">
            <span style="opacity: 0.6; margin-right: 4px;">${CATEGORIES.find(c => c.id === activeCategory)?.icon}</span>
            ${p.name}
          </div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      L.marker(p.pos, { icon: pulseIcon }).addTo(scatterLayer.current);
    });
  }, [activeCategory, isReady]);

  return (
    <div className={`relative w-full h-full transition-colors duration-1000 ${isNight ? 'bg-[#020b1c]' : 'bg-[#f1f5f9]'}`}>
      <div ref={containerRef} className="w-full h-full" style={{ minHeight: '100%' }} />
      
      {/* 全球扫光装饰 */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-all duration-1000 ${
        isNight 
          ? 'bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(2,11,28,0.8)_100%)]' 
          : 'bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(241,245,249,0.5)_100%)]'
      }`} />

      {!isReady && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-[1000] transition-colors duration-1000 ${isNight ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}>
          <div className={`w-12 h-12 border-2 border-t-cyan-400 rounded-full animate-spin ${isNight ? 'border-cyan-500/10' : 'border-sky-500/10'}`}></div>
          <span className={`mt-6 text-[10px] font-black tracking-[0.5em] animate-pulse uppercase ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>指挥要素矩阵加载中...</span>
        </div>
      )}

      {/* 顶部指挥要素操作台 - 新位置：地图上方中心 */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-start gap-1.5 z-50 pointer-events-auto">
        {/* 背景底座装饰 */}
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-[110%] h-12 blur-xl pointer-events-none opacity-50 transition-all duration-1000 ${
          isNight ? 'bg-gradient-to-b from-cyan-500/20 to-transparent' : 'bg-gradient-to-b from-sky-500/10 to-transparent'
        }`}></div>
        
        <div className={`flex gap-4 p-2.5 rounded-2xl border backdrop-blur-3xl transition-all duration-1000 ${
          isNight 
            ? 'bg-[#020b1c]/60 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
            : 'bg-white/90 border-sky-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
        }`}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all duration-300 group overflow-hidden ${
                activeCategory === cat.id
                  ? (isNight ? 'bg-white/5 border-white/40 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'bg-sky-50 border-sky-400 shadow-lg') + ' translate-y-2'
                  : (isNight ? 'bg-slate-900/60 border-white/5 opacity-50' : 'bg-slate-50 border-slate-100 opacity-60') + ' hover:opacity-100 hover:border-white/20'
              }`}
            >
              {/* 激活时的背景发光 */}
              {activeCategory === cat.id && (
                <div 
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-500" 
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 15px ${cat.color}` }}
                ></div>
              )}
              
              <span className={`text-2xl mb-1 transition-transform duration-500 ${activeCategory === cat.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'group-hover:scale-105'}`}>
                {cat.icon}
              </span>
              
              <div className="flex flex-col items-center">
                <span className={`text-[12px] font-black tracking-[0.2em] ${activeCategory === cat.id ? (isNight ? 'text-white' : 'text-sky-900') : (isNight ? 'text-slate-400' : 'text-slate-500')}`}>
                   {cat.label}
                </span>
                <span className={`text-[7px] font-black uppercase tracking-tighter opacity-40 transition-opacity ${activeCategory === cat.id ? (isNight ? 'opacity-80 text-white' : 'opacity-80 text-sky-700') : (isNight ? 'text-slate-500' : 'text-slate-400')}`}>
                   {cat.id}
                </span>
              </div>

              {/* 装饰边角 */}
              <div className={`absolute bottom-1 left-1 w-1 h-1 border-l border-b transition-colors ${activeCategory === cat.id ? 'border-cyan-400' : 'border-transparent'}`}></div>
              <div className={`absolute bottom-1 right-1 w-1 h-1 border-r border-b transition-colors ${activeCategory === cat.id ? 'border-cyan-400' : 'border-transparent'}`}></div>
            </button>
          ))}
        </div>
        
        {/* 侧边信息指示装饰 */}
        <div className="flex flex-col gap-1 ml-4 self-center">
           <div className={`w-12 h-0.5 ${isNight ? 'bg-cyan-400/40' : 'bg-sky-400/40'}`}></div>
           <span className={`text-[8px] font-black uppercase tracking-widest italic ${isNight ? 'text-cyan-400/60' : 'text-sky-600/60'}`}>Matrix Dimension</span>
        </div>
      </div>
    </div>
  );
};

export default Map3D;
