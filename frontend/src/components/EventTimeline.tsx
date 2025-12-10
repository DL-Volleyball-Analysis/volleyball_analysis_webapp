import React, { useMemo, useState } from 'react';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  actions: any[];
  scores: any[];
  gameStates: any[];
  duration: number; // total frames
  currentFrame?: number;
  onSeek: (sec: number) => void;
  fps?: number; // frames per second for time conversion
  playerNames?: Record<number, string>;
  playerTracks?: any[]; // 新增：用於 OCR 映射
  jerseyMappings?: Record<string, any>;  // 手動標記的球衣號碼映射
}

// Marker width in percentage of the timeline
const MARKER_MIN_WIDTH_PERCENT = 4; // Minimum width to prevent overlap

interface ActionWithRow extends Record<string, any> {
  row: number;
  position: number;
}



const getActionStyle = (action?: string) => {
  switch (action?.toLowerCase()) {
    case 'spike':
      return {
        bg: 'bg-red-500',
        bgHover: 'hover:bg-red-600',
        border: 'border-red-600',
        text: 'text-white',
        color: '#ef4444',
        image: '/spike.png'
      };
    case 'set':
      return {
        bg: 'bg-blue-500',
        bgHover: 'hover:bg-blue-600',
        border: 'border-blue-600',
        text: 'text-white',
        color: '#3b82f6',
        image: '/set.png'
      };
    case 'receive':
      return {
        bg: 'bg-emerald-500',
        bgHover: 'hover:bg-emerald-600',
        border: 'border-emerald-600',
        text: 'text-white',
        color: '#10b981',
        image: '/recieve.png'
      };
    case 'serve':
      return {
        bg: 'bg-amber-500',
        bgHover: 'hover:bg-amber-600',
        border: 'border-amber-600',
        text: 'text-white',
        color: '#f59e0b',
        image: '/serve.png'
      };
    case 'block':
      return {
        bg: 'bg-purple-500',
        bgHover: 'hover:bg-purple-600',
        border: 'border-purple-600',
        text: 'text-white',
        color: '#8b5cf6',
        image: '/block.png'
      };
    default:
      return {
        bg: 'bg-gray-400',
        bgHover: 'hover:bg-gray-500',
        border: 'border-gray-500',
        text: 'text-white',
        color: '#9ca3af',
        image: ''
      };
  }
};

// Action legend component
const ActionLegend: React.FC = () => {
  const actionTypes = ['serve', 'receive', 'set', 'spike', 'block'];

  return (
    <div className="flex flex-wrap gap-3 mb-2">
      {actionTypes.map(action => {
        const style = getActionStyle(action);
        return (
          <div key={action} className="flex items-center gap-1.5">
            {style.image ? (
              <img
                src={style.image}
                alt={action}
                className="w-5 h-5 object-contain"
              />
            ) : (
              <div
                className={`w-3 h-3 rounded ${style.bg}`}
                style={{ backgroundColor: style.color }}
              />
            )}
            <span className="text-xs text-gray-600 capitalize font-medium">{action}</span>
          </div>
        );
      })}
    </div>
  );
};

export const EventTimeline: React.FC<Props> = ({
  actions = [],
  scores = [],
  gameStates = [],
  duration,
  currentFrame = 0,
  onSeek,
  fps = 30,
  playerNames = {},
  playerTracks = [],
  jerseyMappings = {}
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // 創建 track_id 到 jersey_number 的映射（與 PlayerStats 相同的邏輯）
  const trackIdToJerseyMap = useMemo(() => {
    const jerseyCounts: Record<number, Record<number, number>> = {};

    playerTracks.forEach((track: any) => {
      if (track.players) {
        track.players.forEach((player: any) => {
          const trackId = player.id;
          const jerseyNumber = player.jersey_number;

          if (jerseyNumber !== undefined && jerseyNumber !== null && jerseyNumber !== trackId) {
            if (!jerseyCounts[trackId]) {
              jerseyCounts[trackId] = {};
            }
            jerseyCounts[trackId][jerseyNumber] = (jerseyCounts[trackId][jerseyNumber] || 0) + 1;
          }
        });
      }
    });

    const map: Record<number, number> = {};
    Object.keys(jerseyCounts).forEach(trackIdStr => {
      const trackId = Number(trackIdStr);
      const counts = jerseyCounts[trackId];

      let maxCount = 0;
      let mostCommonJersey: number | null = null;

      Object.keys(counts).forEach(jerseyStr => {
        const jersey = Number(jerseyStr);
        const count = counts[jersey];
        if (count > maxCount) {
          maxCount = count;
          mostCommonJersey = jersey;
        }
      });

      if (mostCommonJersey !== null) {
        map[trackId] = mostCommonJersey;
      }
    });

    // 合併手動標記的球衣號碼映射（優先級最高）
    Object.keys(jerseyMappings).forEach(trackIdStr => {
      const trackId = Number(trackIdStr);
      const mapping = jerseyMappings[trackIdStr];
      if (mapping && mapping.jersey_number !== undefined && mapping.jersey_number !== null) {
        map[trackId] = mapping.jersey_number;
      }
    });

    return map;
  }, [playerTracks, jerseyMappings]);

  // Calculate row assignments to prevent overlapping
  const actionsWithRows = useMemo((): ActionWithRow[] => {
    if (actions.length === 0) return [];

    // Sort actions by frame
    const sortedActions = [...actions].sort((a, b) => a.frame - b.frame);

    // Track the end position of markers in each row
    const rowEndPositions: number[] = [];

    return sortedActions.map((action) => {
      const position = (action.frame / duration) * 100;
      const endPosition = position + MARKER_MIN_WIDTH_PERCENT;

      // Find the first row where this action fits
      let assignedRow = 0;
      for (let i = 0; i < rowEndPositions.length; i++) {
        if (position >= rowEndPositions[i]) {
          assignedRow = i;
          break;
        }
        assignedRow = i + 1;
      }

      // Update the end position for this row
      rowEndPositions[assignedRow] = endPosition;

      return {
        ...action,
        row: assignedRow,
        position
      };
    });
  }, [actions, duration]);

  // Calculate the number of rows needed
  const numRows = useMemo(() => {
    if (actionsWithRows.length === 0) return 1;
    return Math.max(...actionsWithRows.map(a => a.row)) + 1;
  }, [actionsWithRows]);

  const getPlayerName = (playerId: number): string => {
    // 先檢查手動標記的映射（優先級最高）
    for (const trackIdStr of Object.keys(jerseyMappings)) {
      const trackId = Number(trackIdStr);
      const mapping = jerseyMappings[trackIdStr];
      if (mapping && mapping.jersey_number === playerId) {
        return `#${playerId}`;
      }
      if (trackId === playerId && mapping && mapping.jersey_number !== undefined && mapping.jersey_number !== null) {
        return `#${mapping.jersey_number}`;
      }
    }

    // 檢查 playerId 是否在 trackIdToJerseyMap 的值中（是 jersey_number）
    const isJerseyNumber = Object.values(trackIdToJerseyMap).includes(playerId);

    // 如果 playerId 是 jersey_number，顯示為 #X
    if (isJerseyNumber) {
      return `#${playerId}`;
    }

    // 如果這個 track_id 有對應的 jersey_number，使用 jersey_number
    if (trackIdToJerseyMap[playerId]) {
      return `#${trackIdToJerseyMap[playerId]}`;
    }

    // 否則顯示 Player #X 或自定義名稱
    return playerNames[playerId] || `Player #${playerId}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e);
  };

  const handleSeek = React.useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const targetFrame = Math.round(percentage * duration);
    const targetTime = targetFrame / fps;
    onSeek(targetTime);
  }, [duration, fps, onSeek]);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleSeek(e);
  }, [isDragging, handleSeek]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Row height for each action row
  const ROW_HEIGHT = 28;

  return (
    <div className="relative w-full space-y-3">
      {/* Game State Track */}
      {gameStates.length > 0 && (
        <div className="relative w-full">
          <div className="text-xs text-gray-500 mb-1 font-medium">Game State</div>
          <div
            ref={containerRef}
            className="relative w-full h-5 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
          >
            {gameStates.map((s: any, i: number) => (
              <div
                key={i}
                style={{
                  left: `${(s.start_frame / duration) * 100}%`,
                  width: `${((s.end_frame - s.start_frame) / duration) * 100}%`,
                }}
                className={`absolute h-full transition-colors ${s.state === 'Play'
                  ? 'bg-green-400 hover:bg-green-500'
                  : s.state === 'No-Play'
                    ? 'bg-gray-300 hover:bg-gray-400'
                    : 'bg-yellow-400 hover:bg-yellow-500'
                  }`}
                title={`${s.state}`}
              />
            ))}
            {/* Playhead on Game State bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-blue-600 z-10 pointer-events-none"
              style={{ left: `${(currentFrame / Math.max(1, duration)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Scores Track */}
      {scores.length > 0 && (
        <div className="relative w-full">
          <div className="text-xs text-gray-500 mb-1 font-medium">Scores ({scores.length})</div>
          <div className="relative w-full h-7 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200 overflow-visible">
            {scores.map((e: any, i: number) => (
              <button
                key={`score-${i}`}
                style={{ left: `${(e.frame / duration) * 100}%` }}
                className="absolute top-1 -translate-x-1/2 z-10 group"
                onClick={(evt) => {
                  evt.stopPropagation();
                  onSeek(e.timestamp);
                }}
                onMouseDown={(evt) => evt.stopPropagation()}
                title={`Score by ${getPlayerName(e.player_id)} @ ${e.timestamp?.toFixed(1)}s`}
              >
                <div className="bg-gradient-to-br from-yellow-400 to-amber-500 border border-amber-600 rounded-full p-1 shadow-sm group-hover:scale-110 transition-transform">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions Track - Redesigned */}
      {actions.length > 0 && (
        <div className="relative w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
              Actions
              <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                {actions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ActionLegend />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded hover:bg-gray-100"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    Expand
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className="relative w-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
            style={{
              height: isExpanded ? `${Math.max(numRows * ROW_HEIGHT + 8, 36)}px` : '36px'
            }}
          >
            {/* Timeline grid lines */}
            <div className="absolute inset-0 flex">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-gray-100 last:border-r-0"
                />
              ))}
            </div>

            {/* Action markers */}
            {actionsWithRows.map((a: ActionWithRow, i: number) => {
              const style = getActionStyle(a.action);
              const displayRow = isExpanded ? a.row : 0;

              return (
                <button
                  key={`act-${i}`}
                  style={{
                    left: `${a.position}%`,
                    top: `${4 + displayRow * ROW_HEIGHT}px`
                  }}
                  className={`absolute z-10 bg-white/90 hover:bg-white rounded-md px-1.5 py-1 flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-200 text-xs font-medium whitespace-nowrap border border-gray-200`}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    onSeek(a.timestamp);
                  }}
                  onMouseDown={(evt) => evt.stopPropagation()}
                  title={`${a.action?.charAt(0).toUpperCase() + a.action?.slice(1)}${a.player_id ? ` by ${getPlayerName(a.player_id)}` : ''} @ ${a.timestamp?.toFixed(1)}s`}
                >
                  {style.image ? (
                    <img
                      src={style.image}
                      alt={a.action}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <span className="uppercase tracking-wide text-[10px] font-bold text-gray-700">
                      {a.action?.substring(0, 3)}
                    </span>
                  )}
                  {a.player_id && (
                    <span className="text-[10px] text-gray-600">
                      {getPlayerName(a.player_id)}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Playhead Indicator */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-blue-600 shadow-lg z-20 pointer-events-none"
              style={{ left: `${(currentFrame / Math.max(1, duration)) * 100}%` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full border border-white shadow" />
            </div>
          </div>

          {/* Collapsed row indicator */}
          {!isExpanded && numRows > 1 && (
            <div className="text-xs text-gray-400 mt-1 text-center">
              {numRows} rows (click Expand to see all)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
