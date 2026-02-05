import React, { useEffect, useRef, useState } from 'react';

// 声明 Leaflet 类型
declare const L: any;

const CATEGORIES = [
  { id: 'people', label: '人', icon: '👮', color: '#22d3ee' }, // 极光青
  { id: 'event', label: '事', icon: '⚡', color: '#38bdf8' },  // 天空蓝
  { id: 'place', label: '地', icon: '📍', color: '#6366f1' },  // 靛青蓝
  { id: 'object', label: '物', icon: '📷', color: '#0ea5e9' }, // 宝石蓝
  { id: 'network', label: '网', icon: '🌐', color: '#818cf8' }, // 丁香蓝
  { id: 'org', label: '组织', icon: '🏢', color: '#1e40af' }, // 深邃蓝
];

const HUANGPU_BOUNDARY: [number, number][] = [
  [31.2468, 121.4820], [31.2512, 121.4890], [31.2482, 121.5000], [31.2355, 121.5100],
  [31.2150, 121.5020], [31.2010, 121.4850], [31.2050, 121.4680], [31.2280, 121.4650],
  [31.2420, 121.4720]
];

const MOCK_DATA: Record<string, any[]> = {
  people: [
    { id: 'p1', lat: 31.235, lng: 121.485, label: '外滩步巡1组', status: '巡逻中', type: 'bodycam', officer: '张警官' },
    { id: 'p2', lat: 31.238, lng: 121.492, label: '南京路特警哨位', status: '停留点', type: 'bodycam', officer: '李警官' },
    { id: 'p3', lat: 31.228, lng: 121.478, label: '人民广场警卫组', status: '定点值守', type: 'bodycam', officer: '王警官' },
    { id: 'p4', lat: 31.222, lng: 121.488, label: '豫园机动巡逻组', status: '在线', type: 'bodycam', officer: '赵警官' },
    { id: 'p5', lat: 31.215, lng: 121.482, label: '中山南路快骑组', status: '动态巡逻', type: 'bodycam', officer: '孙警官' },
  ],
  event: [
    { id: 'e1', lat: 31.231, lng: 121.481, label: '客流密集管控', status: '常态监测' },
    { id: 'e2', lat: 31.242, lng: 121.488, label: '非机动车整治', status: '核查中' },
    { id: 'e3', lat: 31.238, lng: 121.498, label: '交通节点导流', status: '运行中' },
  ],
  place: [
    { id: 'pl1', lat: 31.2317, lng: 121.4813, label: '人民广场区域', status: '正常' },
    { id: 'pl2', lat: 31.238, lng: 121.492, label: '外滩观景台', status: '高负载' },
    { id: 'pl3', lat: 31.225, lng: 121.472, label: '新天地中心', status: '稳定' },
  ],
  object: [
    { id: 'obj1', lat: 31.234, lng: 121.486, label: '外滩核心点', status: '视频在线', type: 'camera' },
    { id: 'obj2', lat: 31.236, lng: 121.489, label: '南东1号位', status: '录像正常', type: 'camera' },
  ],
  network: [
    { id: 'n1', lat: 31.230, lng: 121.475, label: '应急通信矩阵', status: '稳定' },
  ],
  org: [
    { id: 'o1', lat: 31.228, lng: 121.465, label: '分局合成指挥', status: '在线' },
  ]
};

const SimulatedVideo: React.FC<{ 
  label: string; 
  type: 'camera' | 'bodycam';
  officer?: string;
  onClose: () => void; 
  isNight: boolean 
}> = ({ label, type, officer, onClose, isNight }) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => setTimestamp(new Date().toLocaleString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className={`relative w-[900px] aspect-video border-2 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] transition-all ${
        isNight ? 'border-cyan-500/50 bg-slate-950' : 'border-sky-500 bg-white'
      }`}>
        {/* 顶部标题栏 */}
        <div className={`absolute top-0 inset-x-0 h-14 flex items-center justify-between px-8 z-20 backdrop-blur-xl ${isNight ? 'bg-slate-900/80 border-b border-white/5' : 'bg-white/90 border-b border-slate-200'}`}>
           <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full animate-pulse bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]`}></div>
              <span className={`text-xs font-black tracking-[0.2em] uppercase ${isNight ? 'text-white' : 'text-slate-800'}`}>
                {type === 'bodycam' ? 'MOBILE_FORCE_TRANSMISSION' : 'FIXED_MATRIX_MONITORING'}
              </span>
              <div className={`w-px h-4 transition-colors mx-2 ${isNight ? 'bg-white/10' : 'bg-slate-200'}`}></div>
              <span className={`text-[10px] font-black tracking-widest ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>
                {label}
              </span>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all group">
              <svg className={`w-6 h-6 transition-colors ${isNight ? 'text-white/40 group-hover:text-white' : 'text-slate-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        {/* 模拟视频画面 */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden pt-14">
          <div className="absolute inset-0 scan-line opacity-10 pointer-events-none z-10"></div>
          <div className="w-full h-full flex flex-col items-center justify-center relative">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,31,70,0.3)_0%,#000_100%)]`}></div>
                <div className="absolute text-cyan-400/5 text-[220px] font-black pointer-events-none select-none italic tracking-tighter">
                  {type === 'bodycam' ? 'FORCE' : 'SENSE'}
                </div>
             </div>
             
             {/* OSD 信息 */}
             <div className="absolute inset-0 p-10 flex flex-col justify-between font-mono text-cyan-400 text-[10px] tracking-widest pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                         <span className="font-black text-sm bg-cyan-400 text-black px-2 py-0.5">STREAM_A</span>
                         <span className="font-bold text-xs">LOCATION: {label}</span>
                      </div>
                      {type === 'bodycam' && (
                        <div className="flex flex-col gap-1.5">
                          <div className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 rounded">FORCE_ID: B-SH-741</div>
                          <div className="px-3 py-1 bg-blue-400/10 border border-blue-400/30 text-blue-300 rounded">OFFICER: {officer || 'UNASSIGNED'}</div>
                        </div>
                      )}
                   </div>
                   <div className="text-right">
                      <div className="font-black italic text-2xl mb-1 digital-font">{timestamp}</div>
                      <div className="opacity-70">LAT: 31.23356 LON: 121.48821</div>
                      <div className="opacity-70 mt-1 flex items-center justify-end gap-2">
                         <span>STABILITY: [ EXCELLENT ]</span>
                         <div className="flex gap-0.5">
                            {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-emerald-400"></div>)}
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="flex justify-between items-end">
                   <div className="flex flex-col gap-2">
                      <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                         <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 animate-[shimmer_2s_infinite]" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-[9px] opacity-60">BITRATE: 8.4MBPS | LATENCY: 12MS</span>
                   </div>
                   <div className="flex gap-4">
                      {['ZOOM', 'INFRA', 'AI_SCAN', 'LOCK'].map(ctrl => (
                        <div key={ctrl} className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-1 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all pointer-events-auto cursor-pointer group/btn">
                            <span className="text-[9px] font-black group-hover/btn:text-white">{ctrl}</span>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Map3D: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerLayerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('people');
  const [selectedVideo, setSelectedVideo] = useState<{label: string, type: 'camera' | 'bodycam', officer?: string} | null>(null);

  useEffect(() => {
    (window as any).openVideoFeed = (label: string, type: 'camera' | 'bodycam', officer?: string) => {
      setSelectedVideo({ label, type, officer });
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initLeaflet = () => {
      if (typeof L === 'undefined') {
        setTimeout(initLeaflet, 100);
        return;
      }

      const center: [number, number] = [31.2317, 121.4813];
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

      // 地图边界：采用高光青色
      L.polygon(HUANGPU_BOUNDARY, {
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 4,
        opacity: 0.6,
        fillColor: 'transparent',
        fillOpacity: 0,
        dashArray: '10, 10',
      }).addTo(map);

      markerLayerRef.current = L.layerGroup().addTo(map);
      mapInstance.current = map;
      setIsReady(true);
    };

    initLeaflet();
    return () => { if (mapInstance.current) mapInstance.current.remove(); };
  }, []);

  useEffect(() => {
    if (!isReady || !mapInstance.current || !markerLayerRef.current) return;

    const map = mapInstance.current;
    const layer = markerLayerRef.current;
    layer.clearLayers();

    const data = MOCK_DATA[activeCategory] || [];
    const categoryInfo = CATEGORIES.find(c => c.id === activeCategory);
    const themeColor = categoryInfo?.color || '#38bdf8';
    const themeIcon = categoryInfo?.icon || '📍';

    if (data.length === 0) return;

    const bounds = L.latLngBounds([]);

    data.forEach(p => {
      const height = 50 + Math.random() * 20;
      bounds.extend([p.lat, p.lng]);

      const isClickable = activeCategory === 'object' || activeCategory === 'people';
      const typeParam = p.type || (activeCategory === 'people' ? 'bodycam' : 'camera');
      const officerParam = p.officer || '';
      const onClickAttr = isClickable ? `onclick="window.openVideoFeed('${p.label}', '${typeParam}', '${officerParam}')"` : '';

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative flex flex-col items-center" style="transform-style: preserve-3d;">
            <!-- 全息光束连接线 -->
            <div class="absolute bottom-0 w-[1.5px] opacity-70" 
                 style="height: ${height}px; background: linear-gradient(to top, ${themeColor}, transparent); box-shadow: 0 0 15px ${themeColor};">
            </div>
            
            <!-- 标注容器 -->
            <div class="map-label-wrapper" style="transform: translateY(-${height + 5}px);">
                <div class="relative whitespace-nowrap px-6 py-4 ${isNight ? 'bg-slate-950/95' : 'bg-white/95'} border-[2px] rounded-2xl flex flex-col items-start gap-1 transition-all duration-700 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] ${isClickable ? 'cursor-pointer active:scale-95' : ''}" 
                     ${onClickAttr}
                     style="border-color: ${themeColor}; animation: border-pulse 3s infinite; transform: rotateX(-35deg); transform-origin: bottom center; min-width: 140px;">
                  
                  <div class="scan-line" style="background: linear-gradient(90deg, transparent, ${themeColor}, transparent); opacity: 0.3;"></div>

                  <div class="flex items-center gap-3 relative z-10 w-full mb-1">
                    <span class="text-xl drop-shadow-md">${themeIcon}</span>
                    <span class="text-[15px] ${isNight ? 'text-white' : 'text-slate-900'} font-black tracking-widest">${p.label}</span>
                  </div>

                  <div class="w-full h-[1.5px] opacity-10 relative z-10" style="background: ${themeColor};"></div>

                  <div class="flex items-center gap-2 relative z-10 mt-1">
                    <div class="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style="background: ${themeColor}; color: ${themeColor};"></div>
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] ${isNight ? 'text-white/60' : 'text-slate-500'}">
                      ${p.status}
                    </span>
                  </div>
                  
                  <div class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]" 
                       style="border-t-color: ${themeColor};"></div>
                </div>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      L.marker([p.lat, p.lng], { icon }).addTo(layer);
    });

    map.flyToBounds(bounds, { padding: [180, 180], duration: 1.8 });

  }, [activeCategory, isReady, isNight]);

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-500 ${isNight ? 'bg-[#020b1c]' : 'bg-[#f1f5f9]'}`}>
      <div 
        className={`w-full h-full transform-gpu transition-all duration-700 ease-out origin-center pointer-events-auto ${isNight ? 'tech-map-theme' : 'day-map-theme'}`}
        style={{ perspective: '1500px', transform: 'perspective(1500px) rotateX(36deg) translateY(-60px) scale(1.6)' }}
      >
        <div ref={mapContainerRef} className="w-full h-full" style={{ cursor: 'crosshair' }} />
      </div>

      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020b1c] z-50">
          <div className="w-24 h-24 border-[4px] border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin mb-8 shadow-[0_0_50px_rgba(34,211,238,0.2)]"></div>
          <p className="text-sm font-black tracking-[1em] text-cyan-400 uppercase animate-pulse italic">正在调取黄浦全维感知矩阵...</p>
        </div>
      )}

      {/* 底部 Dock - 升级为全蓝风格 */}
      <div className="absolute bottom-[64px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className={`flex items-center gap-3 p-2 border backdrop-blur-3xl rounded-[2rem] transition-all duration-500 ${
          isNight ? 'bg-slate-950/90 border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)]' : 'bg-white/90 border-sky-400/30 shadow-2xl'
        }`}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative flex flex-col items-center justify-center w-16 h-16 rounded-[1.5rem] transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id 
                  ? `${isNight ? 'bg-cyan-500/20 border border-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.4)]' : 'bg-sky-500/15 border border-sky-400'}` 
                  : 'hover:bg-white/5 opacity-40 hover:opacity-80'
              }`}
            >
              <span className={`text-2xl mb-1 transition-transform duration-500 ${activeCategory === cat.id ? 'scale-110' : 'scale-90'}`} style={{ color: cat.color }}>
                {cat.icon}
              </span>
              <span className={`text-[9px] font-black tracking-widest transition-colors ${activeCategory === cat.id ? (isNight ? 'text-white' : 'text-slate-800') : 'text-white/40'}`}>
                {cat.label}
              </span>
              {activeCategory === cat.id && (
                <div className="absolute -bottom-1 w-6 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 视频弹窗 */}
      {selectedVideo && (
        <SimulatedVideo 
          label={selectedVideo.label} 
          type={selectedVideo.type}
          officer={selectedVideo.officer}
          isNight={isNight} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default Map3D;