import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoUrl, getAnalysisResults, getVideo, getAnalysisStatus, setJerseyMapping, getJerseyMappings, getProgressWebSocketUrl } from '../services/api';
import { EventTimeline } from './EventTimeline';
import { PlayerHeatmap } from './PlayerHeatmap';
import { BoundingBoxes } from './BoundingBoxes';
import { BallTracking } from './BallTracking';
import { PlayerStats } from './PlayerStats';
import { PlaySelector } from './PlaySelector';
import { PlayerTaggingDialog } from './PlayerTaggingDialog';
import { Loader2, AlertCircle, Clock, RefreshCw, ArrowLeft, PlayCircle, Users, Maximize2, Minimize2 } from 'lucide-react';

export const VideoPlayer: React.FC<{ videoId?: string }> = ({ videoId }) => {
  const params = useParams();
  // 優先使用 props 中的 videoId，如果沒有則使用路由參數
  const effectiveId = videoId || params.videoId || '';

  console.log('VideoPlayer render:', { videoId, paramsVideoId: params.videoId, effectiveId });
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'processing' | 'completed' | 'failed' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [showPlayerBoxes, setShowPlayerBoxes] = useState<boolean>(true);
  const [showActionBoxes, setShowActionBoxes] = useState<boolean>(true);
  const [showBallTracking, setShowBallTracking] = useState<boolean>(false);
  const [showPlayerStats, setShowPlayerStats] = useState<boolean>(false);
  const [showPlaySelector, setShowPlaySelector] = useState<boolean>(true);
  const [playerNames, setPlayerNames] = useState<Record<number, string>>({});
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);  // 選中的玩家（用於標記）
  const [jerseyMappings, setJerseyMappings] = useState<Record<string, any>>({});  // 球衣號碼映射
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Load player names from localStorage
  useEffect(() => {
    if (!effectiveId) return;
    const storedNames = localStorage.getItem(`playerNames_${effectiveId}`);
    if (storedNames) {
      try {
        setPlayerNames(JSON.parse(storedNames));
      } catch (e) {
        console.error('Failed to load player names:', e);
      }
    }
  }, [effectiveId]);

  // Save player names to localStorage
  const handlePlayerNameChange = (playerId: number, name: string) => {
    const newNames = { ...playerNames, [playerId]: name };
    setPlayerNames(newNames);
    if (effectiveId) {
      localStorage.setItem(`playerNames_${effectiveId}`, JSON.stringify(newNames));
    }
  };

  useEffect(() => {
    console.log('VideoPlayer useEffect triggered:', { videoId, paramsVideoId: params.videoId, effectiveId });

    if (!effectiveId) {
      console.error('VideoPlayer: No effectiveId, cannot load video');
      setStatus('error');
      setError('未提供視頻 ID');
      return;
    }

    console.log('VideoPlayer: Starting to load video:', effectiveId);
    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;

    const load = async () => {
      setStatus('loading');
      setError('');
      try {
        console.log('VideoPlayer: Fetching video metadata for:', effectiveId);
        const meta = await getVideo(effectiveId);
        console.log('VideoPlayer: Video metadata received:', meta);
        if (!isMounted) return;
        if (meta.status !== 'completed') {
          setStatus(meta.status as any);
          setResult(null);

          // 如果狀態是 processing，使用 WebSocket 平滑追蹤進度
          // 使用 /ws/progress 端點只監控進度，不會啟動新分析
          if (meta.status === 'processing') {
            setProgress(5); // 初始進度

            const wsUrl = getProgressWebSocketUrl(effectiveId);
            console.log('📊 VideoPlayer: Connecting to progress WebSocket:', wsUrl);

            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
              console.log('✅ VideoPlayer: Progress WebSocket connected');
            };

            ws.onmessage = async (event) => {
              try {
                const data = JSON.parse(event.data);
                console.log('📡 VideoPlayer: Progress update:', data);

                if (!isMounted) return;

                if (data.status === 'processing' || data.status === 'started') {
                  setProgress(data.progress || 0);
                } else if (data.status === 'completed') {
                  console.log('✅ VideoPlayer: Analysis completed');
                  ws.close();
                  // Load results
                  const res = await getAnalysisResults(effectiveId);
                  if (isMounted) {
                    setResult(res);
                    setStatus('completed');
                    setProgress(100);
                  }
                } else if (data.status === 'failed') {
                  console.log('❌ VideoPlayer: Analysis failed');
                  ws.close();
                  if (isMounted) {
                    setStatus('failed');
                    setError(data.error || 'Analysis failed');
                  }
                }
              } catch (e) {
                console.error('Failed to parse progress message:', e);
              }
            };

            ws.onerror = (error) => {
              console.error('⚠️ VideoPlayer: WebSocket error, falling back to polling:', error);
              ws.close();
              // Fallback to HTTP polling
              if (meta.task_id) {
                pollInterval = setInterval(async () => {
                  try {
                    const taskStatus = await getAnalysisStatus(meta.task_id);
                    if (!isMounted) return;
                    setProgress(taskStatus.progress || 0);
                    if (taskStatus.status === 'completed') {
                      clearInterval(pollInterval!);
                      const res = await getAnalysisResults(effectiveId);
                      if (isMounted) {
                        setResult(res);
                        setStatus('completed');
                        setProgress(100);
                      }
                    } else if (taskStatus.status === 'failed') {
                      clearInterval(pollInterval!);
                      if (isMounted) {
                        setStatus('failed');
                        setError(taskStatus.error || 'Analysis failed');
                      }
                    }
                  } catch (e) {
                    console.error('Poll error:', e);
                  }
                }, 2000);
              }
            };

            ws.onclose = () => {
              console.log('📊 VideoPlayer: Progress WebSocket closed');
              wsRef.current = null;
            };
          }
          return;
        }
        console.log('VideoPlayer: Fetching analysis results for:', effectiveId);
        const res = await getAnalysisResults(effectiveId);
        if (!isMounted) return;
        console.log('VideoPlayer: Analysis results received');
        setResult(res);
        setStatus('completed');
        setProgress(100);

        // 載入球衣號碼映射
        try {
          const mappingsRes = await getJerseyMappings(effectiveId);
          if (mappingsRes.mappings) {
            setJerseyMappings(mappingsRes.mappings);
          }
        } catch (e) {
          console.error('Failed to load jersey mappings:', e);
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load analysis results');
        setStatus('error');
      }
    };
    load();
    return () => {
      isMounted = false;
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveId]); // effectiveId 已經包含了 videoId 和 params.videoId 的邏輯

  const handleSeek = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      // Force update currentTime immediately
      setCurrentTime(sec);
    }
  };

  // 處理玩家框點擊
  const handlePlayerClick = (player: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedPlayer(player);
  };

  // 確認標記球衣號碼
  const handleConfirmJerseyNumber = async (jerseyNumber: number) => {
    if (!selectedPlayer || !effectiveId || !result) return;

    try {
      const trackId = selectedPlayer.id || selectedPlayer.stable_id;
      const video_info = result.video_info || {};
      const fps = video_info.fps || 30;
      const currentFrame = Math.round(currentTime * fps);

      await setJerseyMapping(
        effectiveId,
        trackId,
        jerseyNumber,
        currentFrame,
        selectedPlayer.bbox || []
      );

      // 更新本地映射狀態
      setJerseyMappings(prev => ({
        ...prev,
        [String(trackId)]: {
          jersey_number: jerseyNumber,
          frame: currentFrame,
          bbox: selectedPlayer.bbox
        }
      }));

      setSelectedPlayer(null);
    } catch (error) {
      console.error('Failed to set jersey mapping:', error);
      alert('標記失敗，請重試');
    }
  };

  // Update currentTime more frequently for smoother rendering
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let animationFrameId: number | null = null;
    let lastTime = 0;

    const onTimeUpdate = () => {
      const newTime = el.currentTime || 0;
      // Update more frequently for smoother rendering
      if (Math.abs(newTime - lastTime) > 0.033) { // ~30fps minimum update rate
        setCurrentTime(newTime);
        lastTime = newTime;
      }
    };

    const onSeeked = () => {
      const newTime = el.currentTime || 0;
      setCurrentTime(newTime);
      lastTime = newTime;
    };

    // Use requestAnimationFrame for smoother updates during playback
    const updateLoop = () => {
      if (el && !el.paused) {
        const newTime = el.currentTime || 0;
        if (Math.abs(newTime - lastTime) > 0.016) { // ~60fps update rate
          setCurrentTime(newTime);
          lastTime = newTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('seeked', onSeeked);

    const handlePlay = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    };

    const handlePause = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      onTimeUpdate(); // Update one last time on pause
    };

    el.addEventListener('play', handlePlay);
    el.addEventListener('pause', handlePause);

    // Start update loop if video is already playing
    if (!el.paused) {
      animationFrameId = requestAnimationFrame(updateLoop);
    }

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('seeked', onSeeked);
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('pause', handlePause);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [result]); // Re-setup when result changes (video loads)

  // Debug: Log ball tracking data when enabled (must be before any early returns)
  useEffect(() => {
    if (result && showBallTracking && result.ball_tracking) {
      console.log('Ball tracking data:', {
        hasTrajectory: !!result.ball_tracking.trajectory,
        trajectoryLength: result.ball_tracking.trajectory?.length || 0,
        ballTracking: result.ball_tracking
      });
    }
  }, [showBallTracking, result]);

  // Handle fullscreen mode - ensure UI stays visible
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFullscreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    const container = videoContainerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement &&
        !(document as any).mozFullScreenElement && !(document as any).msFullscreenElement) {
        // Enter fullscreen
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          await (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          await (container as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // All early returns must come after all Hooks
  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-600 font-medium">Loading video analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Analyzing Video
            </h1>
            <p className="text-blue-100 text-lg">
              AI is processing your volleyball match for ball tracking and action recognition
            </p>
          </div>

          <div className="p-8">
            {/* Progress Section */}
            <div className="relative border-2 border-dashed rounded-xl p-16 text-center border-blue-300 bg-blue-50">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                </div>

                <div className="space-y-3">
                  <p className="text-xl font-semibold text-gray-900">
                    Analyzing... {progress.toFixed(1)}%
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="w-80 mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Library Button */}
            <div className="mt-6 flex justify-center">
              <Link
                to="/library"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-red-900 font-semibold text-lg mb-2">Analysis Failed</h3>
              <p className="text-red-800 mb-4">The analysis could not be completed. Please try re-running the analysis from your library.</p>
              <Link to="/library" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-red-900 font-semibold text-lg mb-2">Failed to Load Results</h3>
              <p className="text-red-800 mb-4 text-sm">{error}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setStatus('idle'); setError(''); setResult(null); }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" /> Retry
                </button>
                <Link to="/library" className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
                  <ArrowLeft className="w-4 h-4" /> Back to Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    // 如果沒有結果，返回 null（前面的狀態檢查已經處理了所有情況）
    return null;
  }

  const { action_recognition, scores, players_tracking, game_states, video_info, ball_tracking, plays } = result;
  const fps = video_info?.fps || 30;
  const totalFrames = video_info?.total_frames || Math.round((video_info?.duration || 0) * fps) || 1000;
  const currentFrame = Math.max(0, Math.min(totalFrames, Math.round(currentTime * fps)));

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-[9999] bg-black overflow-auto' : ''}`}>
      {/* Back Button - Hide in fullscreen */}
      {!isFullscreen && (
        <Link
          to="/library"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>
      )}

      {/* Video Player Section */}
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${isFullscreen ? 'rounded-none shadow-none border-0 h-full flex flex-col' : ''}`}>
        {/* Header - Always visible, even in fullscreen */}
        <div className={`p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 ${isFullscreen ? 'bg-black/90 border-gray-700' : ''}`}>
          <h2 className={`text-xl font-semibold ${isFullscreen ? 'text-white' : 'text-gray-900'}`}>Video Analysis</h2>
          <p className={`text-sm mt-1 ${isFullscreen ? 'text-gray-300' : 'text-gray-600'}`}>Interactive timeline with event markers and player tracking</p>
        </div>

        <div className={`p-6 ${isFullscreen ? 'flex-1 overflow-auto' : ''}`}>
          {/* Controls - Always visible */}
          <div className={`flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 flex-wrap ${isFullscreen ? 'border-gray-700' : ''}`}>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showPlayerBoxes}
                onChange={(e) => setShowPlayerBoxes(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Player Boxes</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showActionBoxes}
                onChange={(e) => setShowActionBoxes(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Action Boxes</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showBallTracking}
                onChange={(e) => setShowBallTracking(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Ball Tracking</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Heatmap</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showPlaySelector}
                onChange={(e) => setShowPlaySelector(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Play Selector</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer ${isFullscreen ? 'text-white' : ''}`}>
              <input
                type="checkbox"
                checked={showPlayerStats}
                onChange={(e) => setShowPlayerStats(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>Show Player Stats</span>
            </label>
          </div>

          <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" ref={videoContainerRef}>
            <div className="relative w-full" style={{ position: 'relative', minHeight: '400px' }}>
              {effectiveId ? (
                <>
                  <video
                    key={effectiveId}  // 添加 key 確保重新渲染
                    ref={videoRef}
                    src={getVideoUrl(effectiveId)}
                    controls
                    className="w-full h-auto max-w-full"
                    style={{ display: 'block', zIndex: 1, width: '100%', height: 'auto', position: 'relative' }}
                    preload="auto"
                    playsInline
                    autoPlay={false}
                    muted={false}
                    onLoadedMetadata={(e) => {
                      console.log('Video metadata loaded, duration:', (e.target as HTMLVideoElement).duration);
                      const video = e.target as HTMLVideoElement;
                      setCurrentTime(video.currentTime || 0);
                    }}
                    onLoadedData={(e) => {
                      console.log('Video data loaded');
                      const video = e.target as HTMLVideoElement;
                      console.log('Video readyState:', video.readyState);
                      console.log('Video networkState:', video.networkState);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play');
                    }}
                    onCanPlayThrough={() => {
                      console.log('Video can play through');
                    }}
                    onPlay={() => {
                      console.log('Video started playing');
                    }}
                    onPause={() => {
                      console.log('Video paused');
                    }}
                    onWaiting={() => {
                      console.log('Video waiting for data');
                    }}
                    onStalled={() => {
                      console.log('Video stalled');
                    }}
                    onClick={(e) => {
                      console.log('Video clicked', e);
                      // 如果啟用了玩家框顯示，檢查是否點擊在玩家框內
                      if (showPlayerBoxes && result && handlePlayerClick) {
                        const video = e.currentTarget as HTMLVideoElement;
                        const rect = video.getBoundingClientRect();
                        const video_info = result.video_info || {};
                        const fps = video_info.fps || 30;
                        const videoWidth = video_info.width || video.videoWidth || rect.width;
                        const videoHeight = video_info.height || video.videoHeight || rect.height;
                        const scaleX = videoWidth / rect.width;
                        const scaleY = videoHeight / rect.height;

                        const clickX = (e.clientX - rect.left) * scaleX;
                        const clickY = (e.clientY - rect.top) * scaleY;

                        const currentFrame = Math.round(currentTime * fps);
                        const players_tracking = result.players_tracking || [];

                        const currentTrack = players_tracking.find(
                          (track: any) => track.frame === currentFrame
                        ) || players_tracking.reduce((closest: any, track: any) => {
                          if (!closest) return track;
                          const closestDiff = Math.abs(closest.frame - currentFrame);
                          const trackDiff = Math.abs(track.frame - currentFrame);
                          return trackDiff < closestDiff ? track : closest;
                        }, null as any);

                        // 檢查是否點擊在玩家框內
                        if (currentTrack && currentTrack.players && Math.abs(currentTrack.frame - currentFrame) <= 15) {
                          for (const player of currentTrack.players) {
                            if (!player.bbox || !Array.isArray(player.bbox) || player.bbox.length < 4) continue;
                            const [x1, y1, x2, y2] = player.bbox;
                            if (clickX >= x1 && clickX <= x2 && clickY >= y1 && clickY <= y2) {
                              // 點擊在玩家框內，處理玩家點擊事件
                              handlePlayerClick(player, e);
                              e.stopPropagation();
                              return;
                            }
                          }
                        }
                      }
                      // 如果沒有點擊在玩家框內，讓視頻控件正常處理點擊
                    }}
                    onError={(e) => {
                      console.error('Video load error:', e);
                      const video = e.target as HTMLVideoElement;
                      const errorMsg = video.error
                        ? `Code ${video.error.code}: ${video.error.message || 'Unknown error'}`
                        : 'Unknown error';
                      console.error('Video error details:', {
                        error: video.error,
                        code: video.error?.code,
                        message: video.error?.message,
                        src: video.src,
                        effectiveId: effectiveId,
                        networkState: video.networkState,
                        readyState: video.readyState
                      });
                      setError(`無法載入視頻: ${errorMsg}`);
                    }}
                  />
                  {error && (
                    <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-sm z-50">
                      {error}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-64 bg-gray-900 flex items-center justify-center text-white">
                  <p>無效的視頻 ID (effectiveId: {effectiveId || 'undefined'})</p>
                </div>
              )}
              {/* Fullscreen Toggle Button */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-all shadow-lg"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              {/* Bounding Boxes Overlay */}
              {(showPlayerBoxes || showActionBoxes) && result && (
                <BoundingBoxes
                  playerTracks={players_tracking || []}
                  actions={action_recognition?.action_detections || []}  // 使用 action_detections 來顯示每一幀的動態框
                  currentTime={currentTime}
                  fps={fps}
                  videoSize={{ width: video_info?.width || 640, height: video_info?.height || 360 }}
                  showPlayers={showPlayerBoxes}
                  showActions={showActionBoxes}
                  playerNames={playerNames}
                  onPlayerClick={handlePlayerClick}
                  jerseyMappings={jerseyMappings}
                />
              )}
              {/* Heatmap Overlay (optional, less intrusive) */}
              {showHeatmap && result && (
                <PlayerHeatmap
                  playerTracks={players_tracking || []}
                  videoSize={{ width: video_info?.width || 640, height: video_info?.height || 360 }}
                  enabled={showHeatmap}
                  currentTime={currentTime}
                  fps={fps}
                />
              )}
              {/* Ball Tracking Overlay */}
              {showBallTracking && result && (
                <BallTracking
                  ballTrajectory={ball_tracking?.trajectory || []}
                  currentTime={currentTime}
                  fps={fps}
                  videoSize={{ width: video_info?.width || 640, height: video_info?.height || 360 }}
                  enabled={showBallTracking}
                />
              )}
            </div>
          </div>
        </div>

        {/* Player Statistics Section */}
        {showPlayerStats && (
          <div className={`px-6 pb-6 border-t border-gray-200 pt-6 ${isFullscreen ? 'border-gray-700' : ''}`}>
            <div className={`rounded-xl p-4 border ${isFullscreen ? 'bg-black/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>
                <Users className="w-4 h-4" /> Player Statistics
              </h3>
              <PlayerStats
                actions={action_recognition?.actions || []}
                playerTracks={players_tracking || []}
                videoId={effectiveId}
                fps={fps}
                onSeek={handleSeek}
                onPlayerNameChange={handlePlayerNameChange}
                playerNames={playerNames}
                jerseyMappings={jerseyMappings}
              />
            </div>
          </div>
        )}

        {/* Play Selector */}
        {showPlaySelector && (
          <div className={`px-6 pb-6 ${isFullscreen ? '' : ''}`}>
            <PlaySelector
              plays={plays || []}
              currentTime={currentTime}
              fps={fps}
              onSeek={handleSeek}
            />
          </div>
        )}

        {/* Event Timeline */}
        <div className={`px-6 pb-6 ${isFullscreen ? '' : ''}`}>
          <div className={`rounded-xl p-4 border ${isFullscreen ? 'bg-black/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>
              <PlayCircle className="w-4 h-4" /> Event Timeline
            </h3>
            <EventTimeline
              actions={action_recognition?.actions || []}
              scores={scores || []}
              gameStates={game_states || []}
              duration={totalFrames}
              currentFrame={currentFrame}
              onSeek={handleSeek}
              fps={fps}
              playerNames={playerNames}
              playerTracks={players_tracking || []}
              jerseyMappings={jerseyMappings}
            />
          </div>
        </div>
      </div>

      {/* Player Tagging Dialog */}
      {selectedPlayer && (
        <PlayerTaggingDialog
          player={selectedPlayer}
          currentFrame={Math.round(currentTime * fps)}
          onClose={() => setSelectedPlayer(null)}
          onConfirm={handleConfirmJerseyNumber}
        />
      )}
    </div>
  );
};
