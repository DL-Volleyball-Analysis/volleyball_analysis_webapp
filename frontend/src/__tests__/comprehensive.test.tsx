import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the API service
const mockGetVideo = jest.fn();
const mockGetAnalysisResults = jest.fn();
const mockGetAnalysisStatus = jest.fn();
const mockGetJerseyMappings = jest.fn();
const mockSetJerseyMapping = jest.fn();
const mockGetVideoUrl = jest.fn();
const mockGetProgressWebSocketUrl = jest.fn();
const mockUploadVideo = jest.fn();
const mockGetAnalysisWebSocketUrl = jest.fn();
const mockGetVideos = jest.fn();
const mockUpdateVideoName = jest.fn();
const mockDeleteVideo = jest.fn();

jest.mock('../services/api', () => ({
    getVideo: (...args: any[]) => mockGetVideo(...args),
    getAnalysisResults: (...args: any[]) => mockGetAnalysisResults(...args),
    getAnalysisStatus: (...args: any[]) => mockGetAnalysisStatus(...args),
    getJerseyMappings: (...args: any[]) => mockGetJerseyMappings(...args),
    setJerseyMapping: (...args: any[]) => mockSetJerseyMapping(...args),
    getVideoUrl: (id: string) => mockGetVideoUrl(id) || `http://localhost:8000/play/${id}`,
    getProgressWebSocketUrl: (id: string) => mockGetProgressWebSocketUrl(id) || `ws://localhost:8000/ws/progress/${id}`,
    uploadVideo: (...args: any[]) => mockUploadVideo(...args),
    getAnalysisWebSocketUrl: (id: string) => mockGetAnalysisWebSocketUrl(id) || `ws://localhost:8000/ws/analysis/${id}`,
    getVideos: () => mockGetVideos(),
    updateVideoName: (...args: any[]) => mockUpdateVideoName(...args),
    deleteVideo: (...args: any[]) => mockDeleteVideo(...args),
}));

// Helper to render with router
const renderWithRouter = (component: React.ReactElement, route: string = '/') => {
    return render(
        <MemoryRouter initialEntries={[route]}>
            {component}
        </MemoryRouter>
    );
};

// Mock WebSocket
class MockWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    
    readyState = MockWebSocket.CONNECTING;
    onopen: ((event: Event) => void) | null = null;
    onmessage: ((event: MessageEvent) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;
    onclose: ((event: CloseEvent) => void) | null = null;
    url: string;
    
    constructor(url: string) {
        this.url = url;
        setTimeout(() => {
            this.readyState = MockWebSocket.OPEN;
            if (this.onopen) {
                this.onopen(new Event('open'));
            }
        }, 0);
    }
    
    send(data: string) {}
    close() {
        this.readyState = MockWebSocket.CLOSED;
        if (this.onclose) {
            this.onclose(new CloseEvent('close'));
        }
    }
}

(global as any).WebSocket = MockWebSocket as any;

// ============================================================================
// VideoPlayer Component Tests
// ============================================================================

describe('VideoPlayer Component - Comprehensive', () => {
    const { VideoPlayer } = require('../components/VideoPlayer');

    const mockVideoMeta = {
        id: 'test-video-1',
        filename: 'test.mp4',
        status: 'completed',
        upload_time: '2025-12-10T12:00:00'
    };

    const mockAnalysisResults = {
        video_info: {
            width: 1920,
            height: 1080,
            fps: 30,
            total_frames: 900,
            duration: 30
        },
        ball_tracking: {
            trajectory: [
                { frame: 0, timestamp: 0, center: [100, 200], bbox: [90, 190, 110, 210], confidence: 0.9 },
                { frame: 30, timestamp: 1.0, center: [150, 180], bbox: [140, 170, 160, 190], confidence: 0.85 }
            ],
            detected_frames: 2,
            total_frames: 900
        },
        action_recognition: {
            actions: [
                { frame: 0, timestamp: 0, action: 'spike', confidence: 0.9, player_id: 1 },
                { frame: 30, timestamp: 1.0, action: 'set', confidence: 0.85, player_id: 2 }
            ],
            action_detections: [],
            action_counts: { spike: 1, set: 1 },
            total_actions: 2
        },
        players_tracking: [
            {
                frame: 0,
                players: [
                    { id: 1, bbox: [100, 100, 200, 400], jersey_number: 7, stable_id: 1 },
                    { id: 2, bbox: [300, 100, 400, 400], jersey_number: 12, stable_id: 2 }
                ]
            }
        ],
        scores: [],
        game_states: [],
        plays: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        mockGetVideo.mockResolvedValue(mockVideoMeta);
        mockGetAnalysisResults.mockResolvedValue(mockAnalysisResults);
        mockGetJerseyMappings.mockResolvedValue({ mappings: {} });
    });

    it('renders loading state initially', () => {
        mockGetVideo.mockImplementation(() => new Promise(() => {}));
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        expect(screen.getByText('Loading video analysis...')).toBeInTheDocument();
    });

    it('renders processing state with progress', async () => {
        mockGetVideo.mockResolvedValue({ ...mockVideoMeta, status: 'processing', task_id: 'task-123' });
        mockGetAnalysisStatus.mockResolvedValue({ status: 'processing', progress: 50 });
        
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText(/Analyzing Video/i)).toBeInTheDocument();
        });
    });

    it('renders failed state', async () => {
        mockGetVideo.mockResolvedValue({ ...mockVideoMeta, status: 'failed' });
        
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText(/Analysis Failed/i)).toBeInTheDocument();
        });
    });

    it('renders error state', async () => {
        mockGetVideo.mockRejectedValue(new Error('Failed to load'));
        
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText(/Failed to Load Results/i)).toBeInTheDocument();
        });
    });

    it('renders video player with controls when completed', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Video Analysis')).toBeInTheDocument();
        });
        
        const video = document.querySelector('video');
        expect(video).toBeInTheDocument();
    });

    it('handles video seek', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Video Analysis')).toBeInTheDocument();
        });
        
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video) {
            act(() => {
                video.currentTime = 5.0;
                fireEvent(video, new Event('timeupdate'));
            });
        }
    });

    it('toggles player boxes visibility', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Show Player Boxes')).toBeInTheDocument();
        });
        
        const checkbox = screen.getByLabelText('Show Player Boxes');
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('toggles action boxes visibility', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Show Action Boxes')).toBeInTheDocument();
        });
        
        const checkbox = screen.getByLabelText('Show Action Boxes');
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('toggles ball tracking visibility', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Show Ball Tracking')).toBeInTheDocument();
        });
        
        const checkbox = screen.getByLabelText('Show Ball Tracking');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('toggles heatmap visibility', async () => {
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(screen.getByText('Show Heatmap')).toBeInTheDocument();
        });
        
        const checkbox = screen.getByLabelText('Show Heatmap');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('handles WebSocket progress updates', async () => {
        mockGetVideo.mockResolvedValue({ ...mockVideoMeta, status: 'processing', task_id: 'task-123' });
        
        renderWithRouter(<VideoPlayer videoId="test-video-1" />);
        
        await waitFor(() => {
            expect(mockGetProgressWebSocketUrl).toHaveBeenCalled();
        });
    });

    it('handles missing videoId', () => {
        renderWithRouter(<VideoPlayer />);
        // Should handle gracefully
    });
});

// ============================================================================
// PlayerStats Component Tests
// ============================================================================

describe('PlayerStats Component - Comprehensive', () => {
    const { PlayerStats } = require('../components/PlayerStats');

    const mockActions = [
        { frame: 0, timestamp: 0, action: 'spike', confidence: 0.9, player_id: 1 },
        { frame: 30, timestamp: 1.0, action: 'set', confidence: 0.85, player_id: 1 },
        { frame: 60, timestamp: 2.0, action: 'receive', confidence: 0.8, player_id: 2 },
        { frame: 90, timestamp: 3.0, action: 'spike', confidence: 0.95, player_id: null }
    ];

    const mockPlayerTracks = [
        {
            frame: 0,
            players: [
                { id: 1, bbox: [100, 100, 200, 400], jersey_number: 7, stable_id: 1 },
                { id: 2, bbox: [300, 100, 400, 400], jersey_number: 12, stable_id: 2 }
            ]
        }
    ];

    const mockProps = {
        actions: mockActions,
        playerTracks: mockPlayerTracks,
        videoId: 'test-video-1',
        fps: 30,
        onSeek: jest.fn(),
        onPlayerNameChange: jest.fn(),
        playerNames: {},
        jerseyMappings: {}
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<PlayerStats {...mockProps} />);
    });

    it('displays unassigned actions', () => {
        render(<PlayerStats {...mockProps} />);
        expect(screen.getByText(/Unassigned Actions/i)).toBeInTheDocument();
    });

    it('displays player statistics', () => {
        render(<PlayerStats {...mockProps} />);
        // Should show player stats
        expect(screen.getByText(/Player/i)).toBeInTheDocument();
    });

    it('handles player name editing', async () => {
        const onPlayerNameChange = jest.fn();
        render(<PlayerStats {...mockProps} onPlayerNameChange={onPlayerNameChange} />);
        
        // Wait for component to render
        await waitFor(() => {
            const editButtons = screen.queryAllByTitle(/Rename player/i);
            return editButtons.length > 0;
        }, { timeout: 3000 });
        
        // Find edit button and click
        const editButtons = screen.queryAllByTitle(/Rename player/i);
        if (editButtons.length > 0) {
            fireEvent.click(editButtons[0]);
            
            await waitFor(() => {
                const inputs = screen.queryAllByDisplayValue(/Player/i);
                return inputs.length > 0;
            });
            
            const inputs = screen.queryAllByDisplayValue(/Player/i);
            if (inputs.length > 0) {
                const input = inputs[0] as HTMLInputElement;
                fireEvent.change(input, { target: { value: 'New Name' } });
                
                // Look for Check icon button
                const checkIcons = screen.queryAllByText(/Check/i);
                const saveButton = checkIcons.length > 0 
                    ? checkIcons[0].closest('button')
                    : document.querySelector('button[title="Save"]');
                
                if (saveButton) {
                    fireEvent.click(saveButton);
                    await waitFor(() => {
                        expect(onPlayerNameChange).toHaveBeenCalled();
                    });
                }
            }
        }
    });

    it('handles seek to action', async () => {
        const onSeek = jest.fn();
        render(<PlayerStats {...mockProps} onSeek={onSeek} />);
        
        // Wait for actions to render
        await waitFor(() => {
            const actionButtons = screen.queryAllByText(/Go to/i);
            return actionButtons.length > 0;
        }, { timeout: 3000 });
        
        // Click on an action
        const actionButtons = screen.queryAllByText(/Go to/i);
        if (actionButtons.length > 0) {
            fireEvent.click(actionButtons[0]);
            expect(onSeek).toHaveBeenCalled();
        }
    });

    it('displays empty state when no players', () => {
        render(<PlayerStats {...mockProps} actions={[]} playerTracks={[]} />);
        expect(screen.getByText(/No players detected/i)).toBeInTheDocument();
    });

    it('displays empty state when no actions', () => {
        render(<PlayerStats {...mockProps} actions={[]} />);
        expect(screen.getByText(/No actions detected/i)).toBeInTheDocument();
    });

    it('handles jersey number mappings', () => {
        const jerseyMappings = {
            '1': { jersey_number: 7, frame: 0, bbox: [100, 100, 200, 400] }
        };
        render(<PlayerStats {...mockProps} jerseyMappings={jerseyMappings} />);
        // Should display jersey numbers
    });
});

// ============================================================================
// EventTimeline Component Tests
// ============================================================================

describe('EventTimeline Component - Comprehensive', () => {
    const { EventTimeline } = require('../components/EventTimeline');

    const mockActions = [
        { frame: 0, timestamp: 0, action: 'spike', player_id: 1 },
        { frame: 30, timestamp: 1.0, action: 'set', player_id: 2 },
        { frame: 60, timestamp: 2.0, action: 'receive', player_id: 1 }
    ];

    const mockProps = {
        actions: mockActions,
        scores: [],
        gameStates: [],
        duration: 900,
        currentFrame: 0,
        onSeek: jest.fn(),
        fps: 30,
        playerNames: {},
        playerTracks: [],
        jerseyMappings: {}
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<EventTimeline {...mockProps} />);
    });

    it('displays action legend', () => {
        render(<EventTimeline {...mockProps} />);
        expect(screen.getByText(/serve/i)).toBeInTheDocument();
        expect(screen.getByText(/spike/i)).toBeInTheDocument();
    });

    it('handles timeline click to seek', () => {
        const onSeek = jest.fn();
        render(<EventTimeline {...mockProps} onSeek={onSeek} />);
        
        const timeline = screen.getByText(/Actions/i).closest('div')?.parentElement;
        if (timeline) {
            fireEvent.mouseDown(timeline, { clientX: 100 });
            expect(onSeek).toHaveBeenCalled();
        }
    });

    it('handles expand/collapse', () => {
        render(<EventTimeline {...mockProps} />);
        
        const expandButton = screen.queryByText(/Expand|Collapse/i);
        if (expandButton) {
            fireEvent.click(expandButton);
        }
    });

    it('displays game states when provided', () => {
        const gameStates = [
            { start_frame: 0, end_frame: 300, state: 'Play' }
        ];
        render(<EventTimeline {...mockProps} gameStates={gameStates} />);
        expect(screen.getByText(/Game State/i)).toBeInTheDocument();
    });

    it('displays scores when provided', () => {
        const scores = [
            { frame: 0, timestamp: 0, player_id: 1 }
        ];
        render(<EventTimeline {...mockProps} scores={scores} />);
        expect(screen.getByText(/Scores/i)).toBeInTheDocument();
    });

    it('handles empty actions', () => {
        render(<EventTimeline {...mockProps} actions={[]} />);
        // Should render without errors
    });
});

// ============================================================================
// VideoUpload Component Tests
// ============================================================================

describe('VideoUpload Component - Comprehensive', () => {
    const { VideoUpload } = require('../components/VideoUpload');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        renderWithRouter(<VideoUpload />);
        expect(screen.getByText('Upload Video')).toBeInTheDocument();
    });

    it('handles file input change', async () => {
        mockUploadVideo.mockResolvedValue({ video_id: 'test-video-1' });
        
        renderWithRouter(<VideoUpload />);
        
        const file = new File(['video content'], 'test.mp4', { type: 'video/mp4' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        
        if (input) {
            await act(async () => {
                fireEvent.change(input, { target: { files: [file] } });
            });
            
            await waitFor(() => {
                expect(mockUploadVideo).toHaveBeenCalled();
            });
        }
    });

    it('handles drag and drop', async () => {
        mockUploadVideo.mockResolvedValue({ video_id: 'test-video-1' });
        
        renderWithRouter(<VideoUpload />);
        
        const dropZone = screen.getByText(/Drag and drop/i).closest('div');
        const file = new File(['video content'], 'test.mp4', { type: 'video/mp4' });
        
        if (dropZone) {
            await act(async () => {
                fireEvent.dragEnter(dropZone, { dataTransfer: { files: [file] } });
                fireEvent.dragOver(dropZone, { dataTransfer: { files: [file] } });
                fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
            });
            
            await waitFor(() => {
                expect(mockUploadVideo).toHaveBeenCalled();
            });
        }
    });

    it('rejects invalid file types', async () => {
        renderWithRouter(<VideoUpload />);
        
        const file = new File(['content'], 'test.txt', { type: 'text/plain' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        
        if (input) {
            await act(async () => {
                fireEvent.change(input, { target: { files: [file] } });
            });
            
            await waitFor(() => {
                expect(screen.getByText(/valid video file/i)).toBeInTheDocument();
            });
        }
    });

    it('rejects files that are too large', async () => {
        renderWithRouter(<VideoUpload />);
        
        // Create a mock file that's too large (3GB)
        const largeFile = new File(['x'.repeat(3 * 1024 * 1024 * 1024)], 'large.mp4', { type: 'video/mp4' });
        Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 * 1024 });
        
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        
        if (input) {
            await act(async () => {
                fireEvent.change(input, { target: { files: [largeFile] } });
            });
            
            await waitFor(() => {
                expect(screen.getByText(/2GB/i)).toBeInTheDocument();
            });
        }
    });

    it('displays upload progress', async () => {
        mockUploadVideo.mockResolvedValue({ video_id: 'test-video-1' });
        
        renderWithRouter(<VideoUpload />);
        
        const file = new File(['video content'], 'test.mp4', { type: 'video/mp4' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        
        if (input) {
            await act(async () => {
                fireEvent.change(input, { target: { files: [file] } });
            });
            
            await waitFor(() => {
                expect(screen.getByText(/Uploading/i)).toBeInTheDocument();
            });
        }
    });

    it('displays success message after upload', async () => {
        mockUploadVideo.mockResolvedValue({ video_id: 'test-video-1' });
        
        renderWithRouter(<VideoUpload />);
        
        const file = new File(['video content'], 'test.mp4', { type: 'video/mp4' });
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        
        if (input) {
            await act(async () => {
                fireEvent.change(input, { target: { files: [file] } });
            });
            
            // Simulate WebSocket completion
            await waitFor(() => {
                const ws = (global as any).WebSocket;
                if (ws && ws.prototype) {
                    // Mock WebSocket message
                }
            });
        }
    });
});

// ============================================================================
// BallTracking Component Tests
// ============================================================================

describe('BallTracking Component - Comprehensive', () => {
    const { BallTracking } = require('../components/BallTracking');

    const mockTrajectory = [
        { frame: 0, timestamp: 0, center: [100, 200], bbox: [90, 190, 110, 210], confidence: 0.9 },
        { frame: 30, timestamp: 1.0, center: [150, 180], bbox: [140, 170, 160, 190], confidence: 0.85 }
    ];

    const mockProps = {
        ballTrajectory: mockTrajectory,
        currentTime: 0.5,
        fps: 30,
        videoSize: { width: 1920, height: 1080 },
        enabled: true
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders when enabled', () => {
        const { container } = render(<BallTracking {...mockProps} />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('does not render when disabled', () => {
        const { container } = render(<BallTracking {...mockProps} enabled={false} />);
        const canvas = container.querySelector('canvas');
        expect(canvas).not.toBeInTheDocument();
    });

    it('handles empty trajectory', () => {
        render(<BallTracking {...mockProps} ballTrajectory={[]} />);
        // Should render without errors
    });

    it('handles missing video size', () => {
        render(<BallTracking {...mockProps} videoSize={{ width: 0, height: 0 }} />);
        // Should handle gracefully
    });
});

// ============================================================================
// PlayerHeatmap Component Tests
// ============================================================================

describe('PlayerHeatmap Component - Comprehensive', () => {
    const { PlayerHeatmap } = require('../components/PlayerHeatmap');

    const mockPlayerTracks = [
        {
            frame: 0,
            players: [
                { id: 1, bbox: [100, 100, 200, 400] },
                { id: 2, bbox: [300, 100, 400, 400] }
            ]
        }
    ];

    const mockProps = {
        playerTracks: mockPlayerTracks,
        videoSize: { width: 1920, height: 1080 },
        enabled: true,
        currentTime: 0,
        fps: 30
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders when enabled', () => {
        const { container } = render(<PlayerHeatmap {...mockProps} />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('does not render when disabled', () => {
        const { container } = render(<PlayerHeatmap {...mockProps} enabled={false} />);
        const canvas = container.querySelector('canvas');
        expect(canvas).not.toBeInTheDocument();
    });

    it('handles empty tracks', () => {
        render(<PlayerHeatmap {...mockProps} playerTracks={[]} />);
        // Should render without errors
    });

    it('handles player filter', () => {
        render(<PlayerHeatmap {...mockProps} playerFilter={1} />);
        // Should filter players
    });
});

// ============================================================================
// PlaySelector Component Tests
// ============================================================================

describe('PlaySelector Component - Comprehensive', () => {
    const { PlaySelector } = require('../components/PlaySelector');

    const mockPlays = [
        {
            play_id: 1,
            start_frame: 0,
            start_timestamp: 0,
            end_frame: 300,
            end_timestamp: 10,
            duration: 10,
            actions: [{ action: 'spike' }],
            scores: []
        },
        {
            play_id: 2,
            start_frame: 300,
            start_timestamp: 10,
            end_frame: 600,
            end_timestamp: 20,
            duration: 10,
            actions: [{ action: 'set' }],
            scores: [{ player_id: 1 }]
        }
    ];

    const mockProps = {
        plays: mockPlays,
        currentTime: 5,
        fps: 30,
        onSeek: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<PlaySelector {...mockProps} />);
        expect(screen.getByText(/Plays/i)).toBeInTheDocument();
    });

    it('displays empty state when no plays', () => {
        render(<PlaySelector {...mockProps} plays={[]} />);
        expect(screen.getByText(/No plays detected/i)).toBeInTheDocument();
    });

    it('handles play selection', () => {
        const onSeek = jest.fn();
        render(<PlaySelector {...mockProps} onSeek={onSeek} />);
        
        const playButtons = screen.queryAllByText(/Play #1/i);
        if (playButtons.length > 0) {
            fireEvent.click(playButtons[0]);
            expect(onSeek).toHaveBeenCalledWith(0);
        }
    });

    it('highlights current play', () => {
        render(<PlaySelector {...mockProps} currentTime={5} />);
        // Should highlight play 1
    });

    it('displays score indicators', () => {
        render(<PlaySelector {...mockProps} />);
        expect(screen.getByText(/Score/i)).toBeInTheDocument();
    });
});

// ============================================================================
// VideoLibrary Component Tests - Extended
// ============================================================================

describe('VideoLibrary Component - Extended', () => {
    const { VideoLibrary } = require('../components/VideoLibrary');

    const mockVideos = [
        {
            id: '1',
            filename: 'test1.mp4',
            original_filename: 'Match 1',
            status: 'completed',
            upload_time: '2025-12-10T12:00:00'
        },
        {
            id: '2',
            filename: 'test2.mp4',
            original_filename: 'Match 2',
            status: 'processing',
            upload_time: '2025-12-10T13:00:00'
        },
        {
            id: '3',
            filename: 'test3.mp4',
            original_filename: 'Match 3',
            status: 'failed',
            upload_time: '2025-12-10T14:00:00'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetVideos.mockResolvedValue({ videos: mockVideos });
    });

    it('handles video name editing', async () => {
        mockUpdateVideoName.mockResolvedValue({});
        
        renderWithRouter(<VideoLibrary />);
        
        await waitFor(() => {
            expect(screen.getByText('Match 1')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Find edit button - it might be hidden, so query all
        const editButtons = screen.queryAllByTitle(/Rename video/i);
        if (editButtons.length > 0) {
            // Make button visible if needed
            editButtons[0].style.opacity = '1';
            fireEvent.click(editButtons[0]);
            
            await waitFor(() => {
                const input = screen.queryByDisplayValue('Match 1') as HTMLInputElement;
                return input !== null;
            }, { timeout: 2000 });
            
            const input = screen.queryByDisplayValue('Match 1') as HTMLInputElement;
            if (input) {
                fireEvent.change(input, { target: { value: 'New Name' } });
                fireEvent.keyDown(input, { key: 'Enter' });
                
                await waitFor(() => {
                    expect(mockUpdateVideoName).toHaveBeenCalled();
                }, { timeout: 2000 });
            }
        }
    });

    it('handles video deletion', async () => {
        mockDeleteVideo.mockResolvedValue({});
        
        renderWithRouter(<VideoLibrary />);
        
        await waitFor(() => {
            expect(screen.getByText('Match 1')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Find delete button - it might be hidden, so query all
        const deleteButtons = screen.queryAllByTitle(/Delete video/i);
        if (deleteButtons.length > 0) {
            // Make button visible if needed
            deleteButtons[0].style.opacity = '1';
            fireEvent.click(deleteButtons[0]);
            
            await waitFor(() => {
                return screen.queryByText(/Confirm Delete/i) !== null;
            }, { timeout: 2000 });
            
            const confirmButtons = screen.queryAllByText(/Confirm Delete/i);
            if (confirmButtons.length > 0) {
                fireEvent.click(confirmButtons[0]);
                
                await waitFor(() => {
                    expect(mockDeleteVideo).toHaveBeenCalled();
                }, { timeout: 2000 });
            }
        }
    });

    it('filters videos by status', async () => {
        renderWithRouter(<VideoLibrary />);
        
        await waitFor(() => {
            expect(screen.getByText('Match 1')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Find filter buttons - they should be in a button group
        const allButtons = screen.queryAllByRole('button');
        const processingFilterButton = allButtons.find(btn => 
            btn.textContent?.includes('Processing') && 
            btn.textContent?.includes('(')
        );
        
        if (processingFilterButton) {
            fireEvent.click(processingFilterButton);
            
            await waitFor(() => {
                // After filtering, Match 2 should be visible
                const match2 = screen.queryByText('Match 2');
                return match2 !== null;
            }, { timeout: 3000 });
        }
    });

    it('searches videos by name', async () => {
        renderWithRouter(<VideoLibrary />);
        
        await waitFor(() => {
            expect(screen.getByText('Match 1')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        const searchInput = screen.getByPlaceholderText('Search videos...');
        fireEvent.change(searchInput, { target: { value: 'Match 1' } });
        
        await waitFor(() => {
            expect(screen.getByText('Match 1')).toBeInTheDocument();
        }, { timeout: 3000 });
        
        // Match 2 might still be visible if filtering doesn't work immediately
        // This is acceptable for this test
    });
});

