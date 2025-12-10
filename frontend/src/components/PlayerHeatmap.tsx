import React, { useRef, useEffect } from 'react';

interface PlayerHeatmapProps {
  playerTracks: any[];
  videoSize: { width: number; height: number } | any;
  playerFilter?: any;
  enabled?: boolean;
  currentTime?: number;
  fps?: number;
}

export const PlayerHeatmap: React.FC<PlayerHeatmapProps> = ({ 
  playerTracks, 
  videoSize, 
  playerFilter,
  enabled = false, // 默認關閉熱區圖
  currentTime = 0,
  fps = 30
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!enabled || !videoSize?.width || !videoSize?.height || !canvasRef.current) {
      if (enabled) {
        console.log('PlayerHeatmap: Disabled or missing requirements', {
          enabled,
          hasCanvas: !!canvasRef.current,
          videoSize,
          tracksCount: playerTracks?.length || 0
        });
      }
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Ensure canvas size matches video size
    const canvas = canvasRef.current;
    if (canvas.width !== videoSize.width || canvas.height !== videoSize.height) {
      canvas.width = videoSize.width;
      canvas.height = videoSize.height;
    }
    
    ctx.clearRect(0, 0, videoSize.width, videoSize.height);
    
    if (!playerTracks || playerTracks.length === 0) {
      console.log('PlayerHeatmap: No player tracks available');
      return;
    }
    
    const currentFrame = Math.round(currentTime * fps);
    
    // 累積熱區圖：顯示從視頻開始到當前時間的所有玩家位置
    // 使用時間窗口來顯示累積效果（顯示當前時間之前的所有軌跡）
    const timeWindow = 10.0; // 顯示過去 10 秒的累積熱區圖
    const minFrame = Math.max(0, currentFrame - Math.round(timeWindow * fps));
    
    // 過濾出當前時間之前的軌跡（用於累積熱區圖）
    const relevantTracks = playerTracks.filter((track: any) => {
      if (track.frame === undefined) return false;
      return track.frame >= minFrame && track.frame <= currentFrame;
    });
    
    if (relevantTracks.length === 0) {
      console.log('PlayerHeatmap: No relevant tracks found', {
        currentFrame,
        minFrame,
        totalTracks: playerTracks.length,
        firstTrackFrame: playerTracks[0]?.frame,
        lastTrackFrame: playerTracks[playerTracks.length - 1]?.frame
      });
      return;
    }
    
    // 統計每個位置的訪問次數（用於累積效果）
    // 使用更精細的網格來提高精度
    const gridSize = 20; // 20 像素網格
    const positionCounts: Map<string, { count: number; frames: number[] }> = new Map();
    
    relevantTracks.forEach((track: any) => {
      if (!track.players || !Array.isArray(track.players)) return;
      
      track.players
        .filter((p: any) => !playerFilter || playerFilter === p.id)
        .forEach((p: any) => {
          if (!p.bbox || !Array.isArray(p.bbox) || p.bbox.length < 4) return;
          
          const [x1, y1, x2, y2] = p.bbox;
          const centerX = Math.round((x1 + x2) / 2);
          const centerY = Math.round((y1 + y2) / 2);
          
          // 使用網格化位置來累積計數
          const gridX = Math.floor(centerX / gridSize);
          const gridY = Math.floor(centerY / gridSize);
          const key = `${gridX},${gridY}`;
          
          const existing = positionCounts.get(key) || { count: 0, frames: [] };
          existing.count += 1;
          if (track.frame !== undefined) {
            existing.frames.push(track.frame);
          }
          positionCounts.set(key, existing);
        });
    });
    
    // 找到最大計數（用於歸一化）
    const maxCount = Math.max(...Array.from(positionCounts.values()).map(v => v.count));
    
    if (maxCount === 0) {
      console.log('PlayerHeatmap: No position counts found');
      return;
    }
    
    // 繪製累積熱區圖
    positionCounts.forEach((data, key) => {
      const [gridX, gridY] = key.split(',').map(Number);
      const centerX = gridX * gridSize + gridSize / 2;
      const centerY = gridY * gridSize + gridSize / 2;
      
      // 根據訪問次數計算強度（0.2 到 0.7，更明顯）
      const intensity = 0.2 + (data.count / maxCount) * 0.5;
      
      // 根據距離當前時間的遠近調整透明度
      // 使用該位置最後一次出現的幀來計算時間距離
      const lastFrame = Math.max(...data.frames);
      const frameDiff = currentFrame - lastFrame;
      // 距離當前時間越遠，透明度越低（但不會完全消失）
      const timeAlpha = Math.max(0.4, 1.0 - (frameDiff / (timeWindow * fps)) * 0.6);
      
      const alpha = intensity * timeAlpha;
      // 半徑根據訪問次數調整（15-40 像素）
      const radius = 15 + (data.count / maxCount) * 25;
      
      // 使用漸變效果，顏色從紅色到橙色
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.8})`);
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    console.log('PlayerHeatmap: Rendered successfully', {
      relevantTracksCount: relevantTracks.length,
      positionCounts: positionCounts.size,
      maxCount,
      currentFrame,
      minFrame,
      timeWindow
    });
  }, [playerTracks, videoSize, playerFilter, enabled, currentTime, fps]);
  
  if (!enabled) return null;
  
  return (
    <canvas
      ref={canvasRef}
      width={videoSize.width || 640}
      height={videoSize.height || 360}
      className="absolute left-0 top-0 pointer-events-none z-5"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
};
