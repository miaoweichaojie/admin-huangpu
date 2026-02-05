import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Map3D from './components/Map3D';
import IntelligenceBoard from './components/IntelligenceBoard';
import IncidentBoard from './components/IncidentBoard';
import CommandActionBoard from './components/CommandActionBoard';
import DoubleLeaderBoard from './components/DoubleLeaderBoard';
import UAVBoard from './components/UAVBoard';
import AIAgent from './components/AIAgent';
import MapOverlayStats from './components/MapOverlayStats';
import DataBaseBoard from './components/DataBaseBoard';

const ParticleBackground = ({ isNight }: { isNight: boolean }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100 + 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle transition-all duration-1000"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${-p.delay}s`,
            opacity: isNight ? 0.5 : 0.2,
            backgroundColor: isNight ? '#22d3ee' : '#0ea5e9',
            boxShadow: isNight ? '0 0 15px #22d3ee' : '0 0 8px #0ea5e9',
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const body = document.getElementById('main-body');
    if (isNight) {
      body?.classList.remove('day-mode');
    } else {
      body?.classList.add('day-mode');
    }
  }, [isNight]);

  return (
    <div className={`relative w-screen h-screen overflow-hidden flex flex-col font-sans transition-all duration-1000 ${isNight ? 'bg-[#020b1c]' : 'bg-[#f1f5f9]'}`}>
      <ParticleBackground isNight={isNight} />
      
      {/* 底部微弱的亮蓝遮罩增加深度感 */}
      {isNight && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,31,70,0.4)_0%,transparent_100%)] z-0 pointer-events-none"></div>
      )}

      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Map3D isNight={isNight} />
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none select-none">
        <header className="pointer-events-auto">
          <Header time={currentTime} isNight={isNight} onToggleTheme={() => setIsNight(!isNight)} />
        </header>

        <main className="flex-1 grid grid-cols-12 gap-6 px-8 py-4 overflow-hidden pointer-events-none">
          <div className="col-span-3 flex flex-col gap-4 overflow-hidden animate-[fadeIn_0.8s_ease-out] pointer-events-auto">
            <div className="flex-[2.5] min-h-0 overflow-hidden drop-shadow-2xl">
              <DataBaseBoard isNight={isNight} />
            </div>
            <div className="flex-[3.5] min-h-0 overflow-hidden drop-shadow-2xl">
              <IncidentBoard isNight={isNight} />
            </div>
            <div className="flex-[4] min-h-0 overflow-hidden drop-shadow-2xl">
              <CommandActionBoard isNight={isNight} />
            </div>
          </div>

          <div className="col-span-6 relative flex flex-col items-center justify-start pt-2 pointer-events-none">
            <div className="absolute top-2 left-2 z-[100] pointer-events-auto scale-75 origin-top-left">
              <AIAgent isNight={isNight} />
            </div>
            <div className="pointer-events-auto mt-4">
              <MapOverlayStats isNight={isNight} />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-4 overflow-hidden animate-[fadeIn_0.8s_ease-out_delay-200ms] pointer-events-auto">
            <div className="flex-[4.5] min-h-0 overflow-hidden drop-shadow-2xl">
              <IntelligenceBoard isNight={isNight} />
            </div>
            <div className="flex-[2.5] min-h-0 overflow-hidden drop-shadow-2xl">
              <UAVBoard isNight={isNight} />
            </div>
            <div className="flex-[3] min-h-0 overflow-hidden drop-shadow-2xl">
              <DoubleLeaderBoard isNight={isNight} />
            </div>
          </div>
        </main>

        <footer className={`h-10 border-t flex items-center justify-between px-16 relative z-20 pointer-events-auto transition-all duration-1000 ${isNight ? 'bg-gradient-to-t from-[#020b1c]/90 to-transparent border-sky-500/20' : 'bg-white/80 border-slate-200 backdrop-blur-md'}`}>
          <p className={`text-[10px] uppercase tracking-[0.6em] font-black italic transition-colors ${isNight ? 'text-cyan-400' : 'text-slate-400'}`}>某分局情指中心智慧矩阵系统 v4.5</p>
          <div className={`flex gap-10 text-[10px] font-black transition-colors ${isNight ? 'text-cyan-400' : 'text-sky-600'}`}>
              <div className="flex items-center gap-3">
                <span className={isNight ? "text-cyan-800" : "text-slate-300"}>维度</span>
                <span className={`digital-font transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>31.23356 N</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={isNight ? "text-cyan-800" : "text-slate-300"}>经度</span>
                <span className={`digital-font transition-colors ${isNight ? 'text-white' : 'text-slate-700'}`}>121.48821 E</span>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;