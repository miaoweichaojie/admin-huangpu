
import React, { useEffect, useRef, useState } from 'react';

// 声明 Leaflet 类型
declare const L: any;

const CATEGORIES = [
  { id: 'people', label: '警力布控', icon: '👮', color: '#22d3ee' },
  { id: 'event', label: '实时警情', icon: '⚡', color: '#f43f5e' },
  { id: 'place', label: '重点区域', icon: '📍', color: '#6366f1' },
  { id: 'object', label: '感知设备', icon: '📷', color: '#0ea5e9' },
  { id: 'network', label: '应急网络', icon: '🌐', color: '#818cf8' },
  { id: 'org', label: '联动单位', icon: '🏢', color: '#1e40af' },
];

const HUANGPU_BOUNDARY: [number, number][] = [
  [31.2468, 121.4820], [31.2512, 121.4890], [31.2482, 121.5000], [31.2355, 121.5100],
  [31.2150, 121.5020], [31.2010, 121.4850], [31.2050, 121.4680], [31.2280, 121.4650],
  [31.2420, 121.4720]
];

const MOCK_DATA: Record<string, any[]> = {
  people: [
    { id: 'p1', lat: 31.235, lng: 121.485, label: '外滩步巡1组', status: '巡逻中' },
    { id: 'p2', lat: 31.238, lng: 121.492, label: '南京路哨位', status: '值勤中' },
    { id: 'p3', lat: 31.228, lng: 121.478, label: '人广警卫组', status: '定点' },
  ],
  event: [
    { id: 'e1', lat: 31.231, lng: 121.481, label: '客流密集预警', status: '高密度' },
    { id: 'e2', lat: 31.242, lng: 121.488, label: '交通异常拥堵', status: '核查中' },
  ],
  place: [
    { id: 'pl1', lat: 31.2317, lng: 121.4813, label: '指挥中心', status: '核心' },
  ],
  object: [], network: [], org: []
};

const Map3D: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerLayerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('people');

  // 使用标准的 OpenStreetMap 瓦片源
  const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = () => {
      if (typeof L === 'undefined') {
        setTimeout(initMap, 200);
        return;
      }

      if (mapInstance.current) return;

      const center: [number, number] = [31.2317, 121.4813];
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      // 加载 OSM 瓦片
      L.tileLayer(OSM_TILE_URL, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // 黄浦区区域描边 - 增加动态发光类
      L.polygon(HUANGPU_BOUNDARY, {
        className: isNight ? 'animated-boundary' : '',
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 3,
        opacity: 0.8,
        fillColor: isNight ? 'rgba(34, 211, 238, 0.05)' : 'transparent',
        fillOpacity: 0.2,
      }).addTo(map);

      markerLayerRef.current = L.layerGroup().addTo(map);
      mapInstance.current = map;
      setIsReady(true);
    };

    initMap();
    return () => { if (mapInstance.current) mapInstance.current.remove(); };
  }, []);

  useEffect(() => {
    if (!isReady || !mapInstance.current || !markerLayerRef.current) return;

    const layer = markerLayerRef.current;
    layer.clearLayers();

    const data = MOCK_DATA[activeCategory] || [];
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    const themeColor = cat?.color || '#38bdf8';

    data.forEach(p => {
      const h = 40;
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative flex flex-col items-center">
            <div class="absolute bottom-0 w-[1.5px]" style="height:${h}px; background:${themeColor}; box-shadow:0 0 10px ${themeColor};"></div>
            <div style="transform:translateY(-${h+5}px);">
                <div class="px-4 py-2 ${isNight ? 'bg-slate-950/90' : 'bg-white/95'} border-2 rounded-xl flex items-center gap-2" 
                     style="border-color:${themeColor}; box-shadow:0 10px 25px rgba(0,0,0,0.4);">
                  <span class="text-sm">${cat?.icon}</span>
                  <span class="text-[12px] ${isNight ? 'text-white' : 'text-slate-800'} font-black whitespace-nowrap">${p.label}</span>
                </div>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      L.marker([p.lat, p.lng], { icon }).addTo(layer);
    });

    if (data.length > 0) {
        const bounds = L.latLngBounds(data.map(p => [p.lat, p.lng]));
        mapInstance.current.flyToBounds(bounds, { padding: [120, 120], duration: 1.5 });
    }
  }, [activeCategory, isReady, isNight]);

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-[#010411]' : 'bg-[#f1f5f9]'}`}>
      
      {/* 中心视觉框 - 动态发光流光效果 */}
      {isNight && (
        <div className="absolute inset-x-[15%] inset-y-[10%] z-10 pointer-events-none">
          {/* 四角高亮 */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>
          
          {/* 循环流体线 (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
             <rect x="0" y="0" width="100" height="100" fill="none" stroke="url(#flowGradient)" strokeWidth="0.5" />
             <defs>
               <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="transparent" />
                 <stop offset="50%" stopColor="#22d3ee" />
                 <stop offset="100%" stopColor="transparent" />
               </linearGradient>
             </defs>
          </svg>
          
          {/* 边缘动态光点 */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_infinite_reverse]"></div>
        </div>
      )}

      {/* 倾斜的 3.5D 视角地图层 */}
      <div 
        className={`w-full h-full transform-gpu transition-all duration-1000 ease-out origin-center pointer-events-auto ${isNight ? 'tech-map-theme' : 'day-map-theme'}`}
        style={{ perspective: '1400px', transform: 'perspective(1400px) rotateX(32deg) translateY(-50px) scale(1.4)' }}
      >
        <div ref={mapContainerRef} className="w-full h-full" style={{ cursor: 'crosshair' }} />
      </div>

      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010411] z-[1000]">
          <div className="w-16 h-16 border-4 border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
          <p className="text-cyan-400 font-black tracking-widest animate-pulse uppercase">正在同步 OpenStreetMap 核心矩阵数据...</p>
        </div>
      )}

      {/* 底部功能切换栏 */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div className={`flex items-center gap-2 p-2 border backdrop-blur-3xl rounded-[2.5rem] transition-all duration-700 ${
          isNight ? 'bg-slate-950/80 border-cyan-500/30' : 'bg-white/90 border-sky-400/30 shadow-2xl'
        }`}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id 
                  ? `${isNight ? 'bg-cyan-500/20 border border-cyan-400' : 'bg-sky-500/10 border border-sky-400'}` 
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              <span className="text-xl" style={{ color: activeCategory === cat.id ? cat.color : 'inherit' }}>{cat.icon}</span>
              <span className={`text-[8px] font-black mt-1 ${isNight ? 'text-white' : 'text-slate-800'}`}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map3D;
