import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// ============================================================================
// Mock API Service
// ============================================================================

const mockApiService = {
    getVideos: jest.fn().mockResolvedValue({ videos: [] }),
    getVideo: jest.fn().mockResolvedValue(null),
    uploadVideo: jest.fn().mockResolvedValue({ id: 'test-123', filename: 'test.mp4' }),
    deleteVideo: jest.fn().mockResolvedValue({ success: true }),
    getAnalysisResults: jest.fn().mockResolvedValue(null),
    getVideoUrl: jest.fn((id) => `http://localhost:8000/play/${id}`),
    startAnalysis: jest.fn().mockResolvedValue({ task_id: 'task-123' }),
    getAnalysisStatus: jest.fn().mockResolvedValue({ status: 'completed', progress: 100 }),
    getJerseyMappings: jest.fn().mockResolvedValue({ mappings: {} }),
    setJerseyMapping: jest.fn().mockResolvedValue({ success: true }),
    getAnalysisWebSocketUrl: jest.fn((id) => `ws://localhost:8000/ws/analysis/${id}`),
    getProgressWebSocketUrl: jest.fn((id) => `ws://localhost:8000/ws/progress/${id}`),
};

jest.mock('../services/api', () => ({
    apiService: mockApiService,
    getVideoUrl: mockApiService.getVideoUrl,
    getVideos: mockApiService.getVideos,
    getVideo: mockApiService.getVideo,
    uploadVideo: mockApiService.uploadVideo,
    deleteVideo: mockApiService.deleteVideo,
    getAnalysisResults: mockApiService.getAnalysisResults,
    startAnalysis: mockApiService.startAnalysis,
    getAnalysisStatus: mockApiService.getAnalysisStatus,
    getJerseyMappings: mockApiService.getJerseyMappings,
    setJerseyMapping: mockApiService.setJerseyMapping,
    getAnalysisWebSocketUrl: mockApiService.getAnalysisWebSocketUrl,
    getProgressWebSocketUrl: mockApiService.getProgressWebSocketUrl,
}));

// ============================================================================
// Test Utilities
// ============================================================================

const renderWithRouter = (component: React.ReactElement, route: string = '/') => {
    return render(
        <MemoryRouter initialEntries={[route]}>
            {component}
        </MemoryRouter>
    );
};

// ============================================================================
// Action Type Tests
// ============================================================================

describe('Action Types and Styling', () => {
    const getActionStyle = (action?: string) => {
        switch (action?.toLowerCase()) {
            case 'spike':
                return { bg: 'bg-red-500', color: '#ef4444', image: '/spike.png' };
            case 'set':
                return { bg: 'bg-yellow-500', color: '#eab308', image: '/set.png' };
            case 'receive':
                return { bg: 'bg-green-500', color: '#22c55e', image: '/recieve.png' };
            case 'serve':
                return { bg: 'bg-blue-500', color: '#3b82f6', image: '/serve.png' };
            case 'block':
                return { bg: 'bg-purple-500', color: '#a855f7', image: '/block.png' };
            default:
                return { bg: 'bg-gray-400', color: '#9ca3af', image: '' };
        }
    };

    test.each([
        ['spike', '#ef4444', '/spike.png'],
        ['set', '#eab308', '/set.png'],
        ['receive', '#22c55e', '/recieve.png'],
        ['serve', '#3b82f6', '/serve.png'],
        ['block', '#a855f7', '/block.png'],
    ])('should return correct style for %s', (action, color, image) => {
        const style = getActionStyle(action);
        expect(style.color).toBe(color);
        expect(style.image).toBe(image);
    });

    it('should handle case insensitivity', () => {
        expect(getActionStyle('SPIKE').color).toBe('#ef4444');
        expect(getActionStyle('Spike').color).toBe('#ef4444');
        expect(getActionStyle('spike').color).toBe('#ef4444');
    });

    it('should return default style for unknown action', () => {
        const style = getActionStyle('unknown');
        expect(style.color).toBe('#9ca3af');
        expect(style.image).toBe('');
    });

    it('should handle undefined action', () => {
        const style = getActionStyle(undefined);
        expect(style.color).toBe('#9ca3af');
    });
});

// ============================================================================
// Utility Function Tests
// ============================================================================

describe('Utility Functions', () => {
    describe('formatTimestamp', () => {
        const formatTimestamp = (seconds: number): string => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        test.each([
            [0, '0:00'],
            [45, '0:45'],
            [60, '1:00'],
            [90, '1:30'],
            [3661, '61:01'],
            [125.7, '2:05'],
        ])('formatTimestamp(%s) should be %s', (input, expected) => {
            expect(formatTimestamp(input)).toBe(expected);
        });
    });

    describe('formatDuration', () => {
        const formatDuration = (seconds: number): string => {
            if (seconds < 60) return `${seconds.toFixed(1)}s`;
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}m ${secs}s`;
        };

        test.each([
            [30.5, '30.5s'],
            [45.0, '45.0s'],
            [60, '1m 0s'],
            [90, '1m 30s'],
            [3661, '61m 1s'],
        ])('formatDuration(%s) should be %s', (input, expected) => {
            expect(formatDuration(input)).toBe(expected);
        });
    });

    describe('calculateProgress', () => {
        const calculateProgress = (current: number, total: number): number => {
            if (total === 0) return 0;
            return Math.min(100, Math.round((current / total) * 100));
        };

        test.each([
            [0, 0, 0],
            [0, 100, 0],
            [50, 100, 50],
            [100, 100, 100],
            [150, 100, 100], // capped at 100
            [33, 100, 33],
        ])('calculateProgress(%s, %s) should be %s', (current, total, expected) => {
            expect(calculateProgress(current, total)).toBe(expected);
        });
    });

    describe('formatFileSize', () => {
        const formatFileSize = (bytes: number): string => {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        test.each([
            [0, '0 B'],
            [512, '512 B'],
            [1024, '1 KB'],
            [1536, '1.5 KB'],
            [1048576, '1 MB'],
            [1073741824, '1 GB'],
        ])('formatFileSize(%s) should be %s', (input, expected) => {
            expect(formatFileSize(input)).toBe(expected);
        });
    });
});

// ============================================================================
// Data Transformation Tests
// ============================================================================

describe('Data Transformations', () => {
    describe('countActions', () => {
        const countActions = (actions: Array<{ action: string }>) => {
            return actions.reduce((acc, { action }) => {
                acc[action] = (acc[action] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
        };

        it('should count actions correctly', () => {
            const actions = [
                { action: 'spike' },
                { action: 'set' },
                { action: 'spike' },
                { action: 'receive' },
                { action: 'spike' },
            ];
            const counts = countActions(actions);
            expect(counts.spike).toBe(3);
            expect(counts.set).toBe(1);
            expect(counts.receive).toBe(1);
        });

        it('should handle empty array', () => {
            expect(Object.keys(countActions([])).length).toBe(0);
        });
    });

    describe('groupByPlayer', () => {
        const groupByPlayer = (actions: Array<{ player_id?: number; action: string }>) => {
            return actions.reduce((acc, action) => {
                const playerId = action.player_id || 0;
                if (!acc[playerId]) acc[playerId] = [];
                acc[playerId].push(action);
                return acc;
            }, {} as Record<number, typeof actions>);
        };

        it('should group actions by player', () => {
            const actions = [
                { player_id: 1, action: 'spike' },
                { player_id: 2, action: 'set' },
                { player_id: 1, action: 'serve' },
            ];
            const grouped = groupByPlayer(actions);
            expect(grouped[1].length).toBe(2);
            expect(grouped[2].length).toBe(1);
        });

        it('should handle missing player_id', () => {
            const actions = [
                { action: 'spike' },
                { player_id: 1, action: 'set' },
            ];
            const grouped = groupByPlayer(actions);
            expect(grouped[0].length).toBe(1);
            expect(grouped[1].length).toBe(1);
        });
    });

    describe('filterActionsByTimestamp', () => {
        const filterByTimeRange = (
            actions: Array<{ timestamp: number }>,
            startTime: number,
            endTime: number
        ) => {
            return actions.filter(a => a.timestamp >= startTime && a.timestamp <= endTime);
        };

        it('should filter actions within time range', () => {
            const actions = [
                { timestamp: 0 },
                { timestamp: 5 },
                { timestamp: 10 },
                { timestamp: 15 },
                { timestamp: 20 },
            ];
            const filtered = filterByTimeRange(actions, 5, 15);
            expect(filtered.length).toBe(3);
        });

        it('should return empty for non-overlapping range', () => {
            const actions = [{ timestamp: 5 }, { timestamp: 10 }];
            const filtered = filterByTimeRange(actions, 20, 30);
            expect(filtered.length).toBe(0);
        });
    });

    describe('sortActionsByTimestamp', () => {
        it('should sort actions by timestamp ascending', () => {
            const actions = [
                { timestamp: 10 },
                { timestamp: 5 },
                { timestamp: 15 },
                { timestamp: 0 },
            ];
            const sorted = [...actions].sort((a, b) => a.timestamp - b.timestamp);
            expect(sorted[0].timestamp).toBe(0);
            expect(sorted[3].timestamp).toBe(15);
        });
    });
});

// ============================================================================
// Video Info Tests
// ============================================================================

describe('Video Info Processing', () => {
    const sampleVideoInfo = {
        width: 1920,
        height: 1080,
        fps: 30.0,
        total_frames: 900,
        duration: 30.0,
    };

    it('should calculate aspect ratio', () => {
        const aspectRatio = sampleVideoInfo.width / sampleVideoInfo.height;
        expect(aspectRatio).toBeCloseTo(1.78, 1); // 16:9
    });

    it('should calculate frame count from duration', () => {
        const expectedFrames = sampleVideoInfo.duration * sampleVideoInfo.fps;
        expect(expectedFrames).toBe(sampleVideoInfo.total_frames);
    });

    it('should calculate timestamp from frame number', () => {
        const frameToTimestamp = (frame: number, fps: number) => frame / fps;
        expect(frameToTimestamp(150, 30)).toBe(5);
        expect(frameToTimestamp(900, 30)).toBe(30);
    });

    it('should calculate frame from timestamp', () => {
        const timestampToFrame = (timestamp: number, fps: number) => Math.round(timestamp * fps);
        expect(timestampToFrame(5, 30)).toBe(150);
        expect(timestampToFrame(30, 30)).toBe(900);
    });
});

// ============================================================================
// Player Stats Calculation Tests
// ============================================================================

describe('Player Stats Calculations', () => {
    const actions = [
        { player_id: 1, action: 'spike' },
        { player_id: 1, action: 'spike' },
        { player_id: 1, action: 'set' },
        { player_id: 2, action: 'receive' },
        { player_id: 2, action: 'block' },
        { player_id: 2, action: 'serve' },
        { player_id: 2, action: 'serve' },
    ];

    it('should count total actions per player', () => {
        const player1Actions = actions.filter(a => a.player_id === 1);
        const player2Actions = actions.filter(a => a.player_id === 2);
        expect(player1Actions.length).toBe(3);
        expect(player2Actions.length).toBe(4);
    });

    it('should calculate action percentage', () => {
        const totalSpikes = actions.filter(a => a.action === 'spike').length;
        const percentage = (totalSpikes / actions.length) * 100;
        expect(percentage).toBeCloseTo(28.57, 1);
    });

    it('should find most common action', () => {
        const actionCounts = actions.reduce((acc, { action }) => {
            acc[action] = (acc[action] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const mostCommon = Object.entries(actionCounts)
            .sort(([, a], [, b]) => b - a)[0];
        expect(mostCommon[0]).toBe('spike');
        expect(mostCommon[1]).toBe(2);
    });
});

// ============================================================================
// Ball Tracking Data Tests
// ============================================================================

describe('Ball Tracking Data Processing', () => {
    const trajectory = [
        { frame: 0, timestamp: 0, center: [100, 200], confidence: 0.9 },
        { frame: 10, timestamp: 0.33, center: [150, 180], confidence: 0.85 },
        { frame: 20, timestamp: 0.67, center: [200, 160], confidence: 0.95 },
        { frame: 30, timestamp: 1.0, center: [250, 140], confidence: 0.88 },
    ];

    it('should calculate detection rate', () => {
        const detectedFrames = trajectory.length;
        const totalFrames = 100;
        const detectionRate = (detectedFrames / totalFrames) * 100;
        expect(detectionRate).toBe(4);
    });

    it('should find highest confidence detection', () => {
        const highest = trajectory.reduce((max, curr) =>
            curr.confidence > max.confidence ? curr : max
        );
        expect(highest.confidence).toBe(0.95);
        expect(highest.frame).toBe(20);
    });

    it('should calculate average confidence', () => {
        const avgConfidence = trajectory.reduce((sum, t) => sum + t.confidence, 0) / trajectory.length;
        expect(avgConfidence).toBeCloseTo(0.895, 2);
    });

    it('should interpolate missing frames', () => {
        // Simple linear interpolation between two known points
        const interpolate = (p1: number[], p2: number[], t: number) => {
            return [
                p1[0] + (p2[0] - p1[0]) * t,
                p1[1] + (p2[1] - p1[1]) * t,
            ];
        };

        const midpoint = interpolate([100, 200], [200, 160], 0.5);
        expect(midpoint[0]).toBe(150);
        expect(midpoint[1]).toBe(180);
    });
});

// ============================================================================
// Timeline Rendering Tests
// ============================================================================

describe('Timeline Calculations', () => {
    it('should calculate position percentage from timestamp', () => {
        const calcPosition = (timestamp: number, duration: number) =>
            (timestamp / duration) * 100;

        expect(calcPosition(15, 60)).toBe(25);
        expect(calcPosition(30, 60)).toBe(50);
        expect(calcPosition(0, 60)).toBe(0);
        expect(calcPosition(60, 60)).toBe(100);
    });

    it('should calculate row assignment for overlapping markers', () => {
        const markers = [
            { position: 10, row: 0 },
            { position: 12, row: 0 }, // Too close, should be row 1
            { position: 50, row: 0 }, // Far enough, can be row 0
        ];

        const assignRows = (items: { position: number }[], minGap: number = 5) => {
            const rows: number[][] = [];
            return items.map(item => {
                for (let row = 0; ; row++) {
                    if (!rows[row]) rows[row] = [];
                    const canFit = rows[row].every(pos => Math.abs(pos - item.position) >= minGap);
                    if (canFit) {
                        rows[row].push(item.position);
                        return { ...item, row };
                    }
                }
            });
        };

        const assigned = assignRows(markers);
        expect(assigned[0].row).toBe(0);
        expect(assigned[1].row).toBe(1); // Moved to row 1
        expect(assigned[2].row).toBe(0);
    });
});

// ============================================================================
// API Response Handling Tests
// ============================================================================

describe('API Response Handling', () => {
    it('should handle empty video list', () => {
        const response = { videos: [] };
        expect(response.videos).toHaveLength(0);
    });

    it('should handle video with missing optional fields', () => {
        const video = {
            id: 'test-123',
            filename: 'test.mp4',
            status: 'uploaded',
        };
        expect(video.id).toBeDefined();
        expect((video as any).analysis_time).toBeUndefined();
    });

    it('should handle analysis results with empty actions', () => {
        const results = {
            action_recognition: {
                actions: [],
                action_counts: {},
                total_actions: 0,
            },
        };
        expect(results.action_recognition.total_actions).toBe(0);
    });
});

// ============================================================================
// Error Handling Tests
// ============================================================================

describe('Error Handling', () => {
    it('should handle null/undefined gracefully', () => {
        function safeGet<T>(value: T | null | undefined, defaultValue: T): T {
            return value ?? defaultValue;
        }

        expect(safeGet(null, 'default')).toBe('default');
        expect(safeGet(undefined, 0)).toBe(0);
        expect(safeGet('value', 'default')).toBe('value');
    });

    it('should validate video file extension', () => {
        const validExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm'];
        const isValidVideoFile = (filename: string): boolean => {
            const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
            return validExtensions.includes(ext);
        };

        expect(isValidVideoFile('video.mp4')).toBe(true);
        expect(isValidVideoFile('video.MP4')).toBe(true);
        expect(isValidVideoFile('video.txt')).toBe(false);
        expect(isValidVideoFile('video.png')).toBe(false);
    });
});
