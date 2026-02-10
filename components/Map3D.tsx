
import React, { useEffect, useRef, useState } from 'react';

// Leaflet 全局变量由 index.html 引入
declare const L: any;

const CATEGORIES = [
  { id: 'people', label: '警力布控', icon: '👮', color: '#22d3ee' },
  { id: 'event', label: '实时警情', icon: '⚡', color: '#f43f5e' },
  { id: 'place', label: '重点区域', icon: '📍', color: '#6366f1' },
];

// 黄浦区近似行政边界坐标 (Lat, Lng)
const HUANGPU_BOUNDARY = [
  [31.2505, 121.4682], // 苏州河西北角
  [31.2535, 121.4825], // 苏州河北岸外白渡桥附近
  [31.2465, 121.4998], // 黄浦江外滩弯道
  [31.2320, 121.5065], // 黄浦江十六铺
  [31.2185, 121.5112], // 董家渡
  [31.2015, 121.5025], // 半淞园
  [31.1965, 121.4865], // 南浦大桥区域
  [31.2005, 121.4685], // 五里桥/打浦桥南部
  [31.2185, 121.4612], // 瑞金二路陕西南路
  [31.2355, 121.4635], // 人民广场西侧
  [31.2455, 121.4665]  // 回到起点附近
];

const STATIONS = [
  { name: '南京东路派出所', center: [31.2428, 121.4820], color: '#38bdf8' },
  { name: '人民广场治安派出所', center: [31.2330, 121.4750], color: '#6366f1' },
  { name: '外滩派出所', center: [31.2410, 121.4920], color: '#0ea5e9' },
  { name: '外滩治安派出所', center: [31.2380, 121.4880], color: '#22d3ee' },
  { name: '瑞金二路派出所', center: [31.2180, 121.4680], color: '#818cf8' },
  { name: '淮海中路派出所', center: [31.2220, 121.4750], color: '#a5b4fc' },
  { name: '新天地派出所', center: [31.2250, 121.4780], color: '#34d399' },
  { name: '豫园派出所', center: [31.2280, 121.4910], color: '#fbbf24' },
  { name: '老西门派出所', center: [31.2210, 121.4850], color: '#f87171' },
  { name: '打浦桥派出所', center: [31.2050, 121.4650], color: '#f472b6' },
  { name: '小东门派出所', center: [31.2180, 121.4980], color: '#fb923c' },
  { name: '半淞园派出所', center: [31.2010, 121.4920], color: '#94a3b8' },
  { name: '五里桥派出所', center: [31.2020, 121.4750], color: '#4ade80' },
  { name: '南浦治安派出所', center: [31.2150, 121.5050], color: '#c084fc' },
];

const generateBoundary = (center: number[]) => {
  const [lat, lng] = center;
  const radius = 0.005; // 缩小派出所围栏半径，使区级边界更显眼
  return [
    [lat + radius, lng - radius],
    [lat + radius + 0.001, lng + radius],
    [lat - radius * 0.5, lng + radius * 1.3],
    [lat - radius * 1.3, lng + radius * 0.3],
    [lat - radius * 0.8, lng - radius * 1.1],
  ];
};

const Map3D: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('people');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let retryCount = 0;
    const maxRetries = 20;

    const initMap = () => {
      if (typeof L === 'undefined') {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initMap, 200);
        }
        return;
      }

      if (mapInstance.current) return;

      const map = L.map(containerRef.current, {
        center: [31.226, 121.485], // 稍微调整中心点，平衡全区视觉
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      mapInstance.current = map;

      L.tileLayer('https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        minZoom: 10
      }).addTo(map);

      // 1. 绘制全区行政边界蓝框 (最底层)
      // 使用双层 Polygon 模拟发光效果
      L.polygon(HUANGPU_BOUNDARY, {
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 6,
        opacity: 0.15, // 外层淡蓝模糊
        fillColor: '#0c4a6e',
        fillOpacity: isNight ? 0.08 : 0.03,
      }).addTo(map);

      L.polygon(HUANGPU_BOUNDARY, {
        color: isNight ? '#22d3ee' : '#0ea5e9',
        weight: 2,
        opacity: 1, // 内层实线
        fillOpacity: 0,
      }).addTo(map);

      // 2. 绘制各派出所辖区 (中层)
      STATIONS.forEach(station => {
        const polygon = L.polygon(generateBoundary(station.center), {
          color: station.color,
          weight: 1,
          fillColor: station.color,
          fillOpacity: isNight ? 0.1 : 0.04,
          dashArray: '4, 6'
        }).addTo(map);

        const labelIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="map-label" style="border-color: ${station.color}aa; text-shadow: 0 0 10px ${station.color}66">${station.name.replace('派出所', '')}</div>`,
          iconSize: [80, 24],
          iconAnchor: [40, 12]
        });

        L.marker(station.center, { icon: labelIcon }).addTo(map);
      });

      setTimeout(() => {
        map.invalidateSize();
        setIsReady(true);
      }, 100);
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isNight]);

  return (
    <div className="relative w-full h-full bg-[#020b1c]">
      <div ref={containerRef} className="w-full h-full" style={{ minHeight: '100%' }} />
      
      {/* 科技感遮罩 */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(2,11,28,0.8)_100%)]" />

      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-[1000]">
          <div className="w-12 h-12 border-2 border-cyan-500/10 border-t-cyan-400 rounded-full animate-spin"></div>
          <span className="mt-6 text-cyan-400 text-[10px] font-black tracking-[0.5em] animate-pulse uppercase">正在同步地理信息矩阵...</span>
        </div>
      )}

      {/* 控制面板 */}
      <div className="absolute top-32 right-12 flex flex-col gap-3 z-50 pointer-events-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-3xl transition-all duration-300 ${
              activeCategory === cat.id
                ? (isNight ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] scale-105' : 'bg-sky-500 border-sky-600 text-white shadow-lg scale-105')
                : (isNight ? 'bg-slate-950/60 border-white/5 text-white/40 hover:text-white hover:border-white/20' : 'bg-white/80 border-slate-200 text-slate-400 hover:text-slate-800')
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="text-[11px] font-black tracking-[0.2em] uppercase">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Map3D;
