"""
Volleyball AI Analysis System - Backend Unit Tests
Tests for the FastAPI backend and database module
"""

import pytest
import os
import sys
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# Fixtures
# ============================================================================

@pytest.fixture
def sample_video_dict():
    """Sample video data dictionary"""
    return {
        "id": "test-video-123",
        "filename": "test_match.mp4",
        "file_path": "data/uploads/test_match.mp4",
        "upload_time": "2025-12-10T12:00:00",
        "status": "uploaded",
        "file_size": 1024000
    }


@pytest.fixture
def sample_analysis_results():
    """Sample analysis results"""
    return {
        "video_info": {
            "width": 1920,
            "height": 1080,
            "fps": 30.0,
            "total_frames": 900,
            "duration": 30.0
        },
        "ball_tracking": {
            "trajectory": [
                {"frame": 0, "timestamp": 0.0, "center": [100, 200], "bbox": [90, 190, 110, 210], "confidence": 0.95}
            ],
            "detected_frames": 1,
            "total_frames": 900
        },
        "action_recognition": {
            "actions": [],
            "action_detections": [],
            "action_counts": {"spike": 5, "set": 10},
            "total_actions": 15
        },
        "analysis_time": 45.5
    }


# ============================================================================
# Path Resolution Tests
# ============================================================================

class TestPathResolution:
    """Tests for path resolution helper functions"""
    
    def test_resolve_video_path_absolute(self, sample_video_dict, tmp_path):
        """Test resolving absolute video path"""
        # Create a temporary video file
        video_file = tmp_path / "test_video.mp4"
        video_file.touch()
        
        sample_video_dict["file_path"] = str(video_file)
        
        # Import after setting up paths
        from main import resolve_video_path
        
        result = resolve_video_path(sample_video_dict)
        assert result is not None
        assert result.exists()
    
    def test_resolve_video_path_missing(self, sample_video_dict):
        """Test resolving non-existent video path"""
        sample_video_dict["file_path"] = "/nonexistent/path/video.mp4"
        
        from main import resolve_video_path
        
        result = resolve_video_path(sample_video_dict)
        assert result is None
    
    def test_resolve_video_path_empty(self):
        """Test resolving empty file path"""
        from main import resolve_video_path
        
        result = resolve_video_path({})
        assert result is None
        
        result = resolve_video_path({"file_path": ""})
        assert result is None


# ============================================================================
# Database Tests
# ============================================================================

class TestDatabase:
    """Tests for SQLite database operations"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "test_volleyball.db"
        
        # Mock the database module to use temp path
        with patch.dict(os.environ, {"TEST_DB_PATH": str(db_path)}):
            from database import Database
            db = Database(str(db_path))
            yield db
    
    def test_add_video(self, temp_db, sample_video_dict):
        """Test adding a video to database"""
        temp_db.add_video(sample_video_dict)
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video is not None
        assert video["filename"] == sample_video_dict["filename"]
    
    def test_get_nonexistent_video(self, temp_db):
        """Test getting a video that doesn't exist"""
        video = temp_db.get_video("nonexistent-id")
        assert video is None
    
    def test_list_videos(self, temp_db, sample_video_dict):
        """Test listing all videos"""
        temp_db.add_video(sample_video_dict)
        
        videos = temp_db.list_videos()
        assert len(videos) >= 1
        assert any(v["id"] == sample_video_dict["id"] for v in videos)
    
    def test_update_video_status(self, temp_db, sample_video_dict):
        """Test updating video status"""
        temp_db.add_video(sample_video_dict)
        temp_db.update_video(sample_video_dict["id"], {"status": "completed"})
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video["status"] == "completed"
    
    def test_delete_video(self, temp_db, sample_video_dict):
        """Test deleting a video"""
        temp_db.add_video(sample_video_dict)
        temp_db.delete_video(sample_video_dict["id"])
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video is None


# ============================================================================
# API Endpoint Tests
# ============================================================================

class TestAPIEndpoints:
    """Tests for FastAPI endpoints"""
    
    @pytest.fixture
    def client(self):
        """Create a test client"""
        from fastapi.testclient import TestClient
        from main import app
        return TestClient(app)
    
    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_get_videos_empty(self, client):
        """Test getting videos when empty (may have some from other tests)"""
        response = client.get("/videos")
        assert response.status_code == 200
        assert "videos" in response.json()
    
    def test_get_nonexistent_video(self, client):
        """Test getting a video that doesn't exist"""
        response = client.get("/videos/nonexistent-id-12345")
        assert response.status_code == 404


# ============================================================================
# AI Processor Tests
# ============================================================================

class TestVolleyballAnalyzer:
    """Tests for the VolleyballAnalyzer class"""
    
    def test_get_optimal_device(self):
        """Test device detection"""
        from processor import VolleyballAnalyzer
        
        device = VolleyballAnalyzer.get_optimal_device()
        assert device in ["cuda", "mps", "cpu"]
    
    def test_analyzer_init_without_models(self):
        """Test initializing analyzer without models"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        assert analyzer.ball_model is None
        assert analyzer.action_model is None
        assert analyzer.player_model is None
    
    def test_analyzer_device_override(self):
        """Test overriding device selection"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer(device="cpu")
        assert analyzer.device == "cpu"
    
    def test_ball_frame_buffer_initialized(self):
        """Test that ball_frame_buffer is properly initialized"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        assert hasattr(analyzer, "ball_frame_buffer")
        assert isinstance(analyzer.ball_frame_buffer, list)
        assert len(analyzer.ball_frame_buffer) == 0


# ============================================================================
# Logger Tests
# ============================================================================

class TestLogger:
    """Tests for the logging module"""
    
    def test_setup_logger(self):
        """Test logger setup"""
        from logger import setup_logger
        
        logger = setup_logger("test_logger")
        assert logger.name == "test_logger"
        assert len(logger.handlers) > 0
    
    def test_get_logger(self):
        """Test getting existing logger"""
        from logger import get_logger
        
        logger1 = get_logger("test_get_logger")
        logger2 = get_logger("test_get_logger")
        assert logger1 is logger2
    
    def test_ai_logger(self):
        """Test AILogger class"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai")
        
        # These should not raise exceptions
        ai_logger.device_detected("cpu")
        ai_logger.device_detected("cuda", "RTX 3080")
        ai_logger.device_detected("mps")
        ai_logger.warning("Test warning")
    
    def test_api_logger(self):
        """Test APILogger class"""
        from logger import APILogger
        
        api_logger = APILogger("test_api")
        
        # These should not raise exceptions
        api_logger.request("GET", "/health", 200)
        api_logger.upload("test.mp4", 10.5)
        api_logger.websocket_connected("video-123")


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
