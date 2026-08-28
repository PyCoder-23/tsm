import React, { useEffect, useState } from 'react';

export const ArchitecturalCursor: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [cadUnits, setCadUnits] = useState({ uX: '0.00', uY: '0.00' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom subtle coordinate overlay on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      // Generate simulated CAD architectural survey coordinates
      const uX = ((e.clientX / window.innerWidth) * 48.0 - 24.0).toFixed(2);
      const uY = (((window.innerHeight - e.clientY) / window.innerHeight) * 36.0).toFixed(2);
      setCadUnits({ uX, uY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-opacity duration-150 select-none hidden lg:block"
      style={{
        left: `${coords.x + 14}px`,
        top: `${coords.y + 14}px`,
      }}
    >
      <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-400 flex items-center space-x-1.5 shadow-lg">
        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
        <span>
          X:{cadUnits.uX}m Y:{cadUnits.uY}m
        </span>
      </div>
    </div>
  );
};
