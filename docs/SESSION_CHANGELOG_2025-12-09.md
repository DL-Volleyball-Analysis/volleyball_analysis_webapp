# Volleyball AI Analysis System - Session Changelog

This document summarizes all the changes and improvements made during development sessions.

---

## 📅 December 10, 2025 Session

### 🎯 Summary

This session focused on:
1. **Action Icons Update** - Replaced emoji/SVG icons with custom PNG action icons
2. **Bug Fixes** - Fixed `ball_frame_buffer` initialization issue
3. **Code Quality** - Cleaned up unused imports

---

### 📦 Changes by Component

#### Frontend - Action Icons Update

**`EventTimeline.tsx`**
- **Changed** Action markers from text abbreviations ("SPI", "SET", etc.) to PNG icons
- **Updated** `getActionStyle()` to include `image` path for each action type
- **Updated** `ActionLegend` component to display PNG icons instead of colored squares
- **Changed** Marker styling to white/translucent background with border to showcase icons

**`PlayerStats.tsx`**
- **Changed** `getActionIcon()` from Lucide icons to PNG images
- **Removed** Unused imports: `Zap`, `Hand`, `Shield`, `Target`, `Box`

**New Files**
| File | Description |
|------|-------------|
| `frontend/public/block.png` | Block action icon |
| `frontend/public/recieve.png` | Receive action icon |
| `frontend/public/serve.png` | Serve action icon |
| `frontend/public/set.png` | Set action icon |
| `frontend/public/spike.png` | Spike action icon |
| `frontend/src/components/icons/VolleyballIcons.tsx` | Icon component utilities |

---

#### AI Core - Bug Fix

**`processor.py`**
- **Fixed** `ball_frame_buffer` not initialized in `__init__` method
  - Previously: Buffer was used in `detect_ball()` without initialization
  - Now: `self.ball_frame_buffer: List[np.ndarray] = []` added to `__init__`

---

#### Documentation

**Moved Files**
| From | To |
|------|-----|
| `JERSEY_NUMBER_DETECTION_COMPARISON.md` | `docs/JERSEY_NUMBER_DETECTION_COMPARISON.md` |
| `OCR_WORKFLOW.md` | `docs/OCR_WORKFLOW.md` |

**New Files**
| File | Description |
|------|-------------|
| `docs/SESSION_CHANGELOG_2025-12-09.md` | This changelog file |

---

### 📊 Git Commits (Dec 10)

1. `feat: replace emoji/SVG icons with PNG action icons for timeline and player stats`
2. `fix: initialize ball_frame_buffer in __init__ and update changelog`
3. `feat: add TypeScript interfaces and backend path resolution helpers`

---

#### TypeScript Type Definitions

**New File: `frontend/src/types/index.ts`**

Comprehensive type definitions including:
- `ActionType`, `ActionEvent`, `ActionDetection` - Action-related types
- `PlayerDetection`, `PlayerTrack`, `PlayerStats`, `JerseyMapping` - Player types
- `BallPosition`, `BallTrajectory` - Ball tracking types
- `GameState`, `ScoreEvent`, `Play` - Game state types
- `Video`, `VideoInfo`, `VideoStatus` - Video types
- `AnalysisTask`, `AnalysisResults` - Analysis types
- `ActionStyle`, `ActionWithRow` - UI component props
- `ProgressMessage` - WebSocket message types

---

#### Backend Path Resolution Helpers

**`main.py`** - Added helper functions:

| Function | Description |
|----------|-------------|
| `resolve_video_path(video: Dict)` | Unified video file path resolution with fallback locations |
| `resolve_results_path(video_id: str)` | Resolve analysis results file path |

**Benefits:**
- Reduces code duplication across endpoints
- Handles relative/absolute paths automatically
- Checks multiple fallback directories (legacy support)
- Returns `None` if file not found (explicit error handling)

---

#### Logging System Refactoring

**New File: `ai_core/logger.py`**

Structured logging module with:
- `setup_logger()` - Configure logger with console/file output
- `get_logger()` - Get or create logger instance
- `AILogger` - AI processing specialized logger
- `APILogger` - API service specialized logger

**Features:**
- Clean, professional log messages without emojis
- Structured methods: `device_detected()`, `model_loaded()`, `analysis_start()`, etc.
- Supports file logging with UTF-8 encoding

---

#### Unit Tests

**Backend Tests: `tests/test_backend.py`**

| Test Class | Tests | Status |
|------------|-------|--------|
| `TestPathResolution` | 3 tests | ✅ |
| `TestDatabase` | 5 tests | ✅ |
| `TestAPIEndpoints` | 3 tests | ✅ |
| `TestVolleyballAnalyzer` | 4 tests | ✅ |
| `TestLogger` | 4 tests | ✅ |

**Frontend Tests: `frontend/src/__tests__/utils.test.tsx`**

| Test Suite | Tests |
|------------|-------|
| Type Definitions | 2 tests |
| Action Styles | 8 tests |
| Utility Functions | 10 tests |
| Data Transformations | 4 tests |

**New Config: `pytest.ini`** - Pytest configuration

## 📅 December 7-9, 2025 Session

### 🎯 Summary

This session focused on three major areas:
1. **Real-time WebSocket Analysis** - Replaced HTTP polling with WebSocket for live progress updates
2. **UI/UX Improvements** - Added new pages, mobile navigation, and enhanced design
3. **Ball Tracking Algorithm** - Implemented physics-based trajectory filtering and interpolation

---

### 📦 Changes by Component

#### Backend (`backend/main.py`)

**WebSocket Real-time Analysis**
- **Added** `/ws/analysis/{video_id}` endpoint - Starts analysis and streams progress in real-time
- **Added** `/ws/progress/{video_id}` endpoint - Monitors existing analysis progress (doesn't start new analysis)
- **Added** `ConnectionManager` class for WebSocket connection management
- **Fixed** Model paths in WebSocket endpoint to match correct file names
- **Changed** Progress messages from Chinese to English

**Database**
- **Added** `backend/database.py` - SQLite database module with full CRUD operations
- **Migrated** from JSON file storage to SQLite database
- **Added** Auto-migration logic from JSON to SQLite

---

#### AI Core (`ai_core/processor.py`)

**Ball Tracking Algorithm Improvements**
| Function | Changes |
|----------|---------|
| `_filter_ball_trajectory()` | Complete rewrite with physics-based approach |
| `_basic_velocity_filter()` | **NEW** - Basic velocity filtering with relaxed thresholds (3000 px/s) |
| `_physics_based_outlier_removal()` | **NEW** - Parabolic motion model for outlier detection |
| `_smooth_ball_trajectory()` | Enhanced Gaussian-weighted smoothing |
| `_interpolate_missing_frames()` | **Improved** - Quadratic (parabolic) interpolation instead of linear |

**Key Improvements:**
- **Outlier Detection**: Uses sliding window polynomial fitting (linear for X, quadratic for Y)
- **Dynamic Threshold**: Automatically adjusts based on median deviation scores
- **Parabolic Interpolation**: Predicts missing ball positions using physics model
- **Statistics Logging**: Detailed output of removed/interpolated points

---

#### Frontend (`frontend/src/`)

**New Pages**
| File | Description |
|------|-------------|
| `components/Privacy.tsx` | Privacy policy page |
| `components/Terms.tsx` | Terms of service page |
| `components/Support.tsx` | Support page with FAQ and contact info |

**Updated Components**

**`App.tsx`**
- Added routes for `/privacy`, `/terms`, `/support`
- Added mobile navigation menu with slide-out panel
- Enhanced footer with logo, GitHub link, "Made with ❤️ AI"
- Changed footer buttons to `<Link>` components

**`VideoPlayer.tsx`**
- Changed from HTTP polling to WebSocket for progress updates
- Uses new `/ws/progress/{video_id}` endpoint (monitoring only)
- Fallback to HTTP polling on WebSocket error
- Updated progress UI to match VideoUpload design style
- Removed unused `Clock` import (CI fix)

**`VideoUpload.tsx`**
- Uses `/ws/analysis/{video_id}` WebSocket for real-time progress
- Progress updates every 0.5 seconds

**`api.ts`**
- Added `getAnalysisWebSocketUrl()` function
- Added `getProgressWebSocketUrl()` function

---

### 🔧 Technical Details

#### WebSocket Architecture

```
VideoUpload Component
    ↓
/ws/analysis/{video_id}  ←── Starts analysis + streams progress
    ↓
Backend runs AI analysis in thread pool
    ↓
Progress updates sent every 0.5s

VideoPlayer Component
    ↓
/ws/progress/{video_id}  ←── Monitors existing analysis only
    ↓
Reads progress from analysis_tasks dict
```

#### Ball Tracking Pipeline

```
Raw Detections
    ↓
_basic_velocity_filter()     ←── Remove obviously wrong points (speed > 3000 px/s)
    ↓
_physics_based_outlier_removal()  ←── Parabolic motion model fitting
    ↓
_smooth_ball_trajectory()    ←── Gaussian-weighted smoothing
    ↓
_interpolate_missing_frames() ←── Quadratic interpolation for gaps
    ↓
Final Trajectory
```

---

### 📊 Git Commits (Dec 7-9)

1. `feat: Add WebSocket real-time analysis, footer pages, and UI improvements`
2. `fix: Remove unused Clock import to fix CI build`
3. `feat: Improve ball tracking algorithm`

---

## 🧪 Testing Notes

To test the changes:

1. **Action Icons**: Check EventTimeline and PlayerStats for PNG icons
2. **WebSocket Progress**: Upload a video and watch the real-time progress bar
3. **Ball Tracking**: Check backend logs for trajectory processing statistics:
   ```
   🎯 球軌跡處理: 原始 X 點 → 移除 Y 異常點 → 插值 Z 點 → 最終 W 點
   ```
4. **New Pages**: Navigate to `/privacy`, `/terms`, `/support`
5. **Mobile Menu**: Resize browser to mobile width and click hamburger menu

