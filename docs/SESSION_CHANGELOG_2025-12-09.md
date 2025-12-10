# Volleyball AI Analysis System - Session Changelog

This document summarizes all the changes and improvements made during the development session on **December 7-9, 2025**.

---

## 🎯 Summary

This session focused on three major areas:
1. **Real-time WebSocket Analysis** - Replaced HTTP polling with WebSocket for live progress updates
2. **UI/UX Improvements** - Added new pages, mobile navigation, and enhanced design
3. **Ball Tracking Algorithm** - Implemented physics-based trajectory filtering and interpolation

---

## 📦 Changes by Component

### Backend (`backend/main.py`)

#### WebSocket Real-time Analysis
- **Added** `/ws/analysis/{video_id}` endpoint - Starts analysis and streams progress in real-time
- **Added** `/ws/progress/{video_id}` endpoint - Monitors existing analysis progress (doesn't start new analysis)
- **Added** `ConnectionManager` class for WebSocket connection management
- **Fixed** Model paths in WebSocket endpoint to match correct file names
- **Changed** Progress messages from Chinese to English

#### Database
- **Added** `backend/database.py` - SQLite database module with full CRUD operations
- **Migrated** from JSON file storage to SQLite database
- **Added** Auto-migration logic from JSON to SQLite

---

### AI Core (`ai_core/processor.py`)

#### Ball Tracking Algorithm Improvements
| Function | Changes |
|----------|---------|
| `_filter_ball_trajectory()` | Complete rewrite with physics-based approach |
| `_basic_velocity_filter()` | **NEW** - Basic velocity filtering with relaxed thresholds (3000 px/s) |
| `_physics_based_outlier_removal()` | **NEW** - Parabolic motion model for outlier detection |
| `_smooth_ball_trajectory()` | Enhanced Gaussian-weighted smoothing |
| `_interpolate_missing_frames()` | **Improved** - Quadratic (parabolic) interpolation instead of linear |

#### Key Improvements:
- **Outlier Detection**: Uses sliding window polynomial fitting (linear for X, quadratic for Y)
- **Dynamic Threshold**: Automatically adjusts based on median deviation scores
- **Parabolic Interpolation**: Predicts missing ball positions using physics model
- **Statistics Logging**: Detailed output of removed/interpolated points

---

### Frontend (`frontend/src/`)

#### New Pages
| File | Description |
|------|-------------|
| `components/Privacy.tsx` | Privacy policy page |
| `components/Terms.tsx` | Terms of service page |
| `components/Support.tsx` | Support page with FAQ and contact info |

#### Updated Components

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

### Website (`website/`)

**`app/contact/page.tsx`**
- Fixed text colors (added `text-white` to headings)
- Added `text-slate-200` to form labels

---

## 🗂️ File Operations

| Action | Path |
|--------|------|
| **Created** | `backend/database.py` |
| **Created** | `frontend/src/components/Privacy.tsx` |
| **Created** | `frontend/src/components/Terms.tsx` |
| **Created** | `frontend/src/components/Support.tsx` |
| **Deleted** | `backend/data/` (empty duplicate folder) |

---

## 🔧 Technical Details

### WebSocket Architecture

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

### Ball Tracking Pipeline

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

## 📊 Git Commits

1. `feat: Add WebSocket real-time analysis, footer pages, and UI improvements`
2. `fix: Remove unused Clock import to fix CI build`
3. `feat: Improve ball tracking algorithm`

---

## 🧪 Testing Notes

To test the changes:

1. **WebSocket Progress**: Upload a video and watch the real-time progress bar
2. **Ball Tracking**: Check backend logs for trajectory processing statistics:
   ```
   🎯 球軌跡處理: 原始 X 點 → 移除 Y 異常點 → 插值 Z 點 → 最終 W 點
   ```
3. **New Pages**: Navigate to `/privacy`, `/terms`, `/support`
4. **Mobile Menu**: Resize browser to mobile width and click hamburger menu
