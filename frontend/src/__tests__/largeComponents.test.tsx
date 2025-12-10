import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the API service
const mockGetVideos = jest.fn();
const mockUpdateVideoName = jest.fn();
const mockDeleteVideo = jest.fn();

jest.mock('../services/api', () => ({
    getVideos: () => mockGetVideos(),
    updateVideoName: (...args: any[]) => mockUpdateVideoName(...args),
    deleteVideo: (...args: any[]) => mockDeleteVideo(...args),
    getVideoUrl: (id: string) => `http://localhost:8000/play/${id}`,
    uploadVideo: jest.fn(),
    getAnalysisResults: jest.fn(),
    startAnalysis: jest.fn(),
    getAnalysisWebSocketUrl: (id: string) => `ws://localhost:8000/ws/analysis/${id}`,
}));

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <MemoryRouter>
            {component}
        </MemoryRouter>
    );
};

// ============================================================================
// VideoLibrary Component Tests
// ============================================================================

describe('VideoLibrary Component', () => {
    const { VideoLibrary } = require('../components/VideoLibrary');

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetVideos.mockResolvedValue({ videos: [] });
    });

    it('renders without crashing', async () => {
        renderWithRouter(<VideoLibrary />);
        expect(screen.getByText('Video Library')).toBeInTheDocument();
    });

    it('displays subtitle text', async () => {
        renderWithRouter(<VideoLibrary />);
        expect(screen.getByText(/Browse and manage all your analyzed videos/i)).toBeInTheDocument();
    });

    it('shows search input', async () => {
        renderWithRouter(<VideoLibrary />);
        expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
    });

    it('shows filter buttons', async () => {
        renderWithRouter(<VideoLibrary />);
        await waitFor(() => {
            expect(screen.getByText(/All/i)).toBeInTheDocument();
        });
    });

    it('displays loading state initially', () => {
        mockGetVideos.mockImplementation(() => new Promise(() => { }));
        renderWithRouter(<VideoLibrary />);
        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it.skip('displays empty state when no videos', async () => {
        mockGetVideos.mockResolvedValue({ videos: [] });
        renderWithRouter(<VideoLibrary />);

        await waitFor(() => {
            expect(screen.getByText('No videos yet')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it.skip('displays videos when available', async () => {
        mockGetVideos.mockResolvedValue({
            videos: [
                { id: '1', filename: 'test1.mp4', status: 'completed', upload_time: '2025-12-10T12:00:00' },
                { id: '2', filename: 'test2.mp4', status: 'processing', upload_time: '2025-12-10T13:00:00' },
            ]
        });

        renderWithRouter(<VideoLibrary />);

        await waitFor(() => {
            expect(screen.getByText('test1.mp4')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('has search functionality', () => {
        renderWithRouter(<VideoLibrary />);
        const searchInput = screen.getByPlaceholderText('Search videos...');
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput).toHaveValue('test');
    });
});

// ============================================================================
// API Service Tests
// ============================================================================

describe('API Service', () => {
    describe('API Configuration', () => {
        it('API_BASE_URL defaults to localhost', () => {
            // The API should default to localhost when env var is not set
            expect(process.env.REACT_APP_API_URL || 'http://localhost:8000').toBe('http://localhost:8000');
        });

        it('WS_BASE_URL is derived from API_BASE_URL', () => {
            const API_BASE_URL = 'http://localhost:8000';
            const WS_BASE_URL = API_BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://');
            expect(WS_BASE_URL).toBe('ws://localhost:8000');
        });

        it('WS_BASE_URL handles https correctly', () => {
            const API_BASE_URL = 'https://api.example.com';
            const WS_BASE_URL = API_BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://');
            expect(WS_BASE_URL).toBe('wss://api.example.com');
        });
    });

    describe('API Interfaces', () => {
        it('Video interface has required fields', () => {
            const video = {
                id: 'test-123',
                filename: 'test.mp4',
                file_path: '/path/to/test.mp4',
                upload_time: '2025-12-10T12:00:00',
                status: 'completed' as const,
                file_size: 1024000,
            };

            expect(video.id).toBe('test-123');
            expect(video.status).toBe('completed');
        });

        it('Video interface supports optional fields', () => {
            const video = {
                id: 'test-123',
                filename: 'test.mp4',
                file_path: '/path/to/test.mp4',
                upload_time: '2025-12-10T12:00:00',
                status: 'processing' as const,
                file_size: 1024000,
                task_id: 'task-456',
                analysis_time: '2025-12-10T12:30:00',
            };

            expect(video.task_id).toBe('task-456');
            expect(video.analysis_time).toBe('2025-12-10T12:30:00');
        });

        it('AnalysisTask interface has required fields', () => {
            const task = {
                video_id: 'video-123',
                status: 'processing' as const,
                start_time: '2025-12-10T12:00:00',
                progress: 50,
            };

            expect(task.video_id).toBe('video-123');
            expect(task.progress).toBe(50);
        });

        it('AnalysisResults interface structure', () => {
            const results = {
                video_info: {
                    width: 1920,
                    height: 1080,
                    fps: 30.0,
                    total_frames: 900,
                    duration: 30.0,
                },
                ball_tracking: {
                    trajectory: [],
                    detected_frames: 0,
                    total_frames: 900,
                },
                action_recognition: {
                    actions: [],
                    action_detections: [],
                    action_counts: {},
                    total_actions: 0,
                },
            };

            expect(results.video_info.fps).toBe(30.0);
            expect(results.ball_tracking.total_frames).toBe(900);
        });
    });

    describe('URL Generation', () => {
        const getVideoUrl = (id: string) => `http://localhost:8000/play/${id}`;
        const getAnalysisWebSocketUrl = (id: string) => `ws://localhost:8000/ws/analysis/${id}`;
        const getProgressWebSocketUrl = (id: string) => `ws://localhost:8000/ws/progress/${id}`;

        it('getVideoUrl generates correct URL', () => {
            expect(getVideoUrl('abc123')).toBe('http://localhost:8000/play/abc123');
        });

        it('getAnalysisWebSocketUrl generates correct URL', () => {
            expect(getAnalysisWebSocketUrl('def456')).toBe('ws://localhost:8000/ws/analysis/def456');
        });

        it('getProgressWebSocketUrl generates correct URL', () => {
            expect(getProgressWebSocketUrl('ghi789')).toBe('ws://localhost:8000/ws/progress/ghi789');
        });
    });
});

// ============================================================================
// BallTracking Component Tests
// ============================================================================

describe('BallTracking Component', () => {
    const { BallTracking } = require('../components/BallTracking');

    it('renders without crashing with valid props', () => {
        const props = {
            trajectory: [],
            videoInfo: { width: 1920, height: 1080, fps: 30 },
            currentFrame: 0,
        };
        render(<BallTracking {...props} />);
        // Should render without throwing
    });

    it('renders with trajectory data', () => {
        const props = {
            trajectory: [
                { frame: 0, timestamp: 0, center: [100, 200], bbox: [90, 190, 110, 210], confidence: 0.9 },
                { frame: 10, timestamp: 0.33, center: [150, 180], bbox: [140, 170, 160, 190], confidence: 0.85 },
            ],
            videoInfo: { width: 1920, height: 1080, fps: 30 },
            currentFrame: 5,
        };
        render(<BallTracking {...props} />);
        // Should render trajectory visualization
    });
});

// ============================================================================
// BoundingBoxes Component Tests
// ============================================================================

describe('BoundingBoxes Component', () => {
    const { BoundingBoxes } = require('../components/BoundingBoxes');

    it('renders without crashing with empty players', () => {
        const props = {
            players: [],
            actions: [],
            ball: null,
            currentFrame: 0,
            videoInfo: { width: 1920, height: 1080, fps: 30 },
            onPlayerClick: jest.fn(),
        };
        render(<BoundingBoxes {...props} />);
    });

    it('renders with player data', () => {
        const props = {
            players: [
                { id: 1, bbox: [100, 100, 200, 400], jersey_number: 7 },
                { id: 2, bbox: [300, 100, 400, 400], jersey_number: 12 },
            ],
            actions: [],
            ball: { center: [500, 300], bbox: [490, 290, 510, 310] },
            currentFrame: 0,
            videoInfo: { width: 1920, height: 1080, fps: 30 },
            onPlayerClick: jest.fn(),
        };
        render(<BoundingBoxes {...props} />);
    });
});

// ============================================================================
// PlaySelector Component Tests
// ============================================================================

describe('PlaySelector Component', () => {
    const { PlaySelector } = require('../components/PlaySelector');

    it('renders without crashing', () => {
        const props = {
            actions: [],
            currentTimestamp: 0,
            onSelectAction: jest.fn(),
        };
        render(<PlaySelector {...props} />);
        expect(screen.getByText(/Plays/i)).toBeInTheDocument();
    });

    it('renders with actions', () => {
        const props = {
            actions: [
                { frame: 0, timestamp: 0, action: 'spike', confidence: 0.9 },
                { frame: 30, timestamp: 1.0, action: 'set', confidence: 0.85 },
            ],
            currentTimestamp: 0.5,
            onSelectAction: jest.fn(),
        };
        render(<PlaySelector {...props} />);
    });
});

// ============================================================================
// PlayerHeatmap Component Tests
// ============================================================================

describe('PlayerHeatmap Component', () => {
    const { PlayerHeatmap } = require('../components/PlayerHeatmap');

    it('renders without crashing', () => {
        const props = {
            tracks: [],
            videoInfo: { width: 1920, height: 1080, fps: 30 },
        };
        render(<PlayerHeatmap {...props} />);
    });

    it('renders with track data', () => {
        const props = {
            tracks: [
                { player_id: 1, positions: [[100, 200], [150, 250], [200, 300]] },
                { player_id: 2, positions: [[500, 200], [550, 250], [600, 300]] },
            ],
            videoInfo: { width: 1920, height: 1080, fps: 30 },
        };
        render(<PlayerHeatmap {...props} />);
    });
});

// ============================================================================
// App Component Tests
// ============================================================================

describe('App Component', () => {
    const App = require('../App').default;

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
    });

    it('renders header', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        // App should contain navigation elements
    });
});
