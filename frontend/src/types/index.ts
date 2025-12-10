/**
 * Volleyball AI Analysis System - TypeScript Type Definitions
 * 
 * This file contains all shared type definitions for the frontend application.
 * Import types from this file to ensure type safety across components.
 */

// ============================================================================
// Action Types
// ============================================================================

/** Valid volleyball action types */
export type ActionType = 'spike' | 'set' | 'receive' | 'serve' | 'block';

/** Action event from analysis results */
export interface ActionEvent {
    frame: number;
    timestamp: number;
    end_frame?: number;
    end_timestamp?: number;
    bbox: [number, number, number, number];
    confidence: number;
    action: ActionType | string;
    player_id?: number;
    duration?: number;
}

/** Raw action detection (before merging) */
export interface ActionDetection {
    frame: number;
    timestamp: number;
    bbox: [number, number, number, number];
    confidence: number;
    action: ActionType | string;
    player_id?: number;
}

// ============================================================================
// Player Types
// ============================================================================

/** Player detection from YOLOv8 */
export interface PlayerDetection {
    id: number;
    stable_id?: number;
    bbox: [number, number, number, number];
    confidence: number;
    jersey_number?: number | null;
    label?: string;
}

/** Player track data (per frame) */
export interface PlayerTrack {
    frame: number;
    timestamp: number;
    players: PlayerDetection[];
}

/** Player statistics summary */
export interface PlayerStats {
    total: number;
    actions: Record<string, number>;
}

/** Jersey number mapping (user-defined) */
export interface JerseyMapping {
    jersey_number: number;
    frame: number;
    bbox: [number, number, number, number];
    created_at?: string;
}

// ============================================================================
// Ball Tracking Types
// ============================================================================

/** Ball position from VballNet */
export interface BallPosition {
    frame: number;
    timestamp: number;
    center: [number, number];
    bbox: [number, number, number, number];
    confidence: number;
}

/** Ball trajectory data */
export interface BallTrajectory {
    trajectory: BallPosition[];
    detected_frames: number;
    total_frames: number;
}

// ============================================================================
// Game State Types
// ============================================================================

/** Game state segment */
export interface GameState {
    start_frame: number;
    end_frame: number;
    state: 'Play' | 'No-Play' | 'Unknown';
}

/** Score event */
export interface ScoreEvent {
    frame: number;
    timestamp: number;
    player_id?: number;
    team?: string;
}

/** Play segment (rally) */
export interface Play {
    play_id: number;
    start_frame: number;
    start_timestamp: number;
    end_frame: number;
    end_timestamp: number;
    duration: number;
    actions: ActionEvent[];
    scores: ScoreEvent[];
}

// ============================================================================
// Video Types
// ============================================================================

/** Video status */
export type VideoStatus = 'uploaded' | 'processing' | 'completed' | 'failed';

/** Video metadata */
export interface Video {
    id: string;
    filename: string;
    original_filename?: string;
    file_path: string;
    upload_time: string;
    status: VideoStatus;
    file_size: number;
    task_id?: string;
    analysis_time?: string;
}

/** Video info from analysis */
export interface VideoInfo {
    width: number;
    height: number;
    fps: number;
    total_frames: number;
    duration: number;
}

// ============================================================================
// Analysis Types
// ============================================================================

/** Analysis task status */
export interface AnalysisTask {
    video_id: string;
    status: 'processing' | 'completed' | 'failed';
    start_time: string;
    progress: number;
    end_time?: string;
    error?: string;
}

/** Complete analysis results */
export interface AnalysisResults {
    video_info: VideoInfo;
    ball_tracking: BallTrajectory;
    action_recognition: {
        actions: ActionEvent[];
        action_detections: ActionDetection[];
        action_counts: Record<string, number>;
        total_actions: number;
    };
    player_tracking?: {
        tracks: PlayerTrack[];
        total_detections: number;
    };
    game_states?: GameState[];
    plays?: Play[];
    scores?: ScoreEvent[];
    analysis_time: number;
}

// ============================================================================
// UI Component Props Types
// ============================================================================

/** Action style configuration */
export interface ActionStyle {
    bg: string;
    bgHover: string;
    border: string;
    text: string;
    color: string;
    image: string;
}

/** Timeline action with row assignment */
export interface ActionWithRow extends ActionEvent {
    row: number;
    position: number;
}

// ============================================================================
// API Response Types
// ============================================================================

/** Videos list response */
export interface VideosResponse {
    videos: Video[];
}

/** Jersey mappings response */
export interface JerseyMappingsResponse {
    mappings: Record<string, JerseyMapping>;
}

/** WebSocket progress message */
export interface ProgressMessage {
    status: 'started' | 'processing' | 'completed' | 'failed';
    progress: number;
    message?: string;
    error?: string;
}
