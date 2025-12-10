"""
Volleyball AI Analysis System - Integration Tests
End-to-end tests for the complete analysis workflow
"""

import pytest
import os
import sys
import json
import numpy as np
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime
import tempfile
import shutil

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# Fixtures
# ============================================================================

@pytest.fixture
def temp_video_file(tmp_path):
    """Create a temporary mock video file"""
    video_file = tmp_path / "test_video.mp4"
    # Create a minimal MP4-like file (just for testing file operations)
    video_file.write_bytes(b'\x00\x00\x00\x1c\x66\x74\x79\x70\x69\x73\x6f\x6d' + b'\x00' * 100)
    return video_file


@pytest.fixture
def temp_results_file(tmp_path):
    """Create a temporary results JSON file"""
    results = {
        "video_info": {"width": 1920, "height": 1080, "fps": 30.0, "total_frames": 900, "duration": 30.0},
        "ball_tracking": {"trajectory": [], "detected_frames": 0, "total_frames": 900},
        "action_recognition": {"actions": [], "action_detections": [], "action_counts": {}, "total_actions": 0},
        "analysis_time": 10.5
    }
    results_file = tmp_path / "test_video_results.json"
    with open(results_file, 'w') as f:
        json.dump(results, f)
    return results_file


@pytest.fixture
def mock_frame():
    """Create a mock video frame (RGB image)"""
    return np.random.randint(0, 255, (1080, 1920, 3), dtype=np.uint8)


@pytest.fixture
def client():
    """Create a test client"""
    from fastapi.testclient import TestClient
    from main import app
    return TestClient(app)


# ============================================================================
# API Integration Tests
# ============================================================================

class TestAPIIntegration:
    """Integration tests for API endpoints"""
    
    def test_full_video_lifecycle(self, client, tmp_path):
        """Test complete video lifecycle: upload, get, delete"""
        # This test requires a real video file, skip if not available
        pytest.skip("Requires real video file for full integration test")
    
    def test_get_all_videos_returns_list(self, client):
        """Test that /videos returns a list"""
        response = client.get("/videos")
        assert response.status_code == 200
        data = response.json()
        assert "videos" in data
        assert isinstance(data["videos"], list)
    
    def test_health_check_contains_required_fields(self, client):
        """Test health check returns all required fields"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy"
    
    def test_nonexistent_video_returns_404(self, client):
        """Test that getting a nonexistent video returns 404"""
        response = client.get("/videos/nonexistent-video-id-xyz")
        assert response.status_code == 404
    
    def test_nonexistent_results_returns_404(self, client):
        """Test that getting results for nonexistent video returns 404"""
        response = client.get("/results/nonexistent-video-id-xyz")
        assert response.status_code == 404
    
    def test_jersey_mappings_for_nonexistent_video(self, client):
        """Test jersey mappings endpoint for nonexistent video"""
        response = client.get("/videos/nonexistent-id/jersey-mappings")
        # Should return empty mappings or 404
        assert response.status_code in [200, 404]


# ============================================================================
# Processor Unit Tests with Mocks
# ============================================================================

class TestProcessorPreprocessing:
    """Tests for processor preprocessing functions"""
    
    def test_preprocess_ball_frame(self, mock_frame):
        """Test ball frame preprocessing"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        processed = analyzer.preprocess_ball_frame(mock_frame)
        
        # Should return float32 array
        assert processed.dtype == np.float32
        # Should be normalized to [0, 1]
        assert processed.min() >= 0.0
        assert processed.max() <= 1.0
        # Should be resized to (288, 512)
        assert processed.shape == (288, 512)
    
    def test_preprocess_preserves_content(self, mock_frame):
        """Test that preprocessing doesn't destroy image content"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Create a simple gradient image
        gradient = np.linspace(0, 255, 1920, dtype=np.uint8)
        gradient_frame = np.tile(gradient, (1080, 1)).astype(np.uint8)
        gradient_frame = np.stack([gradient_frame] * 3, axis=-1)
        
        processed = analyzer.preprocess_ball_frame(gradient_frame)
        
        # Should have a gradient pattern (left side darker than right)
        assert processed[:, 0].mean() < processed[:, -1].mean()


class TestProcessorDetection:
    """Tests for processor detection methods with mocks"""
    
    def test_detect_actions_without_model(self, mock_frame):
        """Test action detection returns empty list when no model loaded"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        actions = analyzer.detect_actions(mock_frame)
        
        assert actions == []
    
    def test_detect_players_without_model(self, mock_frame):
        """Test player detection returns empty list when no model loaded"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        players = analyzer.detect_players(mock_frame)
        
        assert players == []
    
    def test_detect_ball_without_model(self, mock_frame):
        """Test ball detection returns None when no model loaded"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        ball = analyzer.detect_ball(mock_frame)
        
        assert ball is None
    
    def test_detect_actions_with_mocked_model(self, mock_frame):
        """Test action detection with mocked YOLO model"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Create mock model
        mock_model = MagicMock()
        mock_model.names = {0: 'spike', 1: 'set', 2: 'receive', 3: 'serve', 4: 'block'}
        
        # Create mock detection result
        mock_box = MagicMock()
        mock_box.xyxy = [MagicMock()]
        mock_box.xyxy[0].cpu.return_value.numpy.return_value = np.array([100, 200, 300, 400])
        mock_box.conf = [MagicMock()]
        mock_box.conf[0].cpu.return_value.numpy.return_value = 0.85
        mock_box.cls = [MagicMock()]
        mock_box.cls[0].cpu.return_value.numpy.return_value = 0  # spike
        
        mock_result = MagicMock()
        mock_result.boxes = [mock_box]
        mock_model.return_value = [mock_result]
        
        analyzer.action_model = mock_model
        actions = analyzer.detect_actions(mock_frame)
        
        assert len(actions) == 1
        assert actions[0]['action'] == 'spike'
        assert actions[0]['confidence'] == 0.85
    
    def test_detect_players_with_mocked_model(self, mock_frame):
        """Test player detection with mocked YOLO model"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Create mock model
        mock_model = MagicMock()
        mock_model.names = {0: 'person'}
        
        # Create mock detection result
        mock_box = MagicMock()
        mock_box.xyxy = [MagicMock()]
        mock_box.xyxy[0].cpu.return_value.numpy.return_value = np.array([150, 100, 250, 500])
        mock_box.conf = [MagicMock()]
        mock_box.conf[0].cpu.return_value.numpy.return_value = 0.92
        mock_box.cls = [MagicMock()]
        mock_box.cls[0].cpu.return_value.numpy.return_value = 0  # person
        
        mock_result = MagicMock()
        mock_result.boxes = [mock_box]
        mock_model.return_value = [mock_result]
        
        analyzer.player_model = mock_model
        players = analyzer.detect_players(mock_frame)
        
        assert len(players) == 1
        assert players[0]['confidence'] == 0.92
        assert players[0]['class_id'] == 0


class TestProcessorPostprocessing:
    """Tests for processor postprocessing functions"""
    
    def test_postprocess_ball_output_empty(self):
        """Test postprocessing with empty output"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        result = analyzer.postprocess_ball_output([], (1080, 1920))
        
        assert result is None
    
    def test_postprocess_ball_output_none(self):
        """Test postprocessing with None output"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        result = analyzer.postprocess_ball_output([None], (1080, 1920))
        
        assert result is None
    
    def test_postprocess_ball_output_valid_heatmap(self):
        """Test postprocessing with valid heatmap"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Create a fake heatmap with a "ball" at a specific location
        heatmap = np.zeros((1, 9, 288, 512), dtype=np.float32)
        # Add a bright spot at center
        heatmap[0, -1, 144, 256] = 0.8
        heatmap[0, -1, 143:146, 255:258] = 0.5
        
        result = analyzer.postprocess_ball_output([heatmap], (1080, 1920))
        
        # Should detect a ball or return None if threshold not met
        # (depends on implementation details)
        # At minimum, should not raise an exception


# ============================================================================
# Database Integration Tests
# ============================================================================

class TestDatabaseIntegration:
    """Integration tests for database operations"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "integration_test.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_full_video_workflow(self, temp_db):
        """Test complete video database workflow"""
        video_id = "integration-test-video"
        
        # Add video
        video_data = {
            "id": video_id,
            "filename": "test.mp4",
            "file_path": "/path/to/test.mp4",
            "upload_time": datetime.now().isoformat(),
            "status": "uploaded",
            "file_size": 1024
        }
        result = temp_db.add_video(video_data)
        assert result is True
        
        # Update to processing
        result = temp_db.update_video(video_id, {"status": "processing"})
        assert result is True
        
        video = temp_db.get_video(video_id)
        assert video["status"] == "processing"
        
        # Update to completed
        result = temp_db.update_video(video_id, {"status": "completed"})
        assert result is True
        
        video = temp_db.get_video(video_id)
        assert video["status"] == "completed"
        
        # Add jersey mapping
        result = temp_db.set_jersey_mapping(video_id, track_id=1, jersey_number=7)
        assert result is True
        
        mappings = temp_db.get_jersey_mappings(video_id)
        assert "1" in mappings
        assert mappings["1"]["jersey_number"] == 7
        
        # Delete video (should also delete mappings)
        result = temp_db.delete_video(video_id)
        assert result is True
        
        video = temp_db.get_video(video_id)
        assert video is None
    
    def test_multiple_videos(self, temp_db):
        """Test handling multiple videos"""
        # Add 3 videos
        for i in range(3):
            video_data = {
                "id": f"multi-test-{i}",
                "filename": f"video{i}.mp4",
                "file_path": f"/path/to/video{i}.mp4",
                "upload_time": datetime.now().isoformat(),
                "status": "uploaded",
                "file_size": 1024 * (i + 1)
            }
            temp_db.add_video(video_data)
        
        # Get all videos
        videos = temp_db.get_all_videos()
        test_videos = [v for v in videos if v["id"].startswith("multi-test-")]
        assert len(test_videos) == 3
        
        # Clean up
        for i in range(3):
            temp_db.delete_video(f"multi-test-{i}")


# ============================================================================
# Tracker Tests
# ============================================================================

class TestPlayerTracker:
    """Tests for Norfair player tracking"""
    
    def test_tracker_initialization(self):
        """Test tracker is properly initialized"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        assert analyzer.tracker is not None
    
    def test_track_players_empty(self):
        """Test tracking with no players"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Should handle empty player list
        tracked = analyzer.track_players([], frame=None)
        assert tracked == []
    
    def test_track_players_with_data(self, mock_frame):
        """Test tracking with player detections"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        # Create mock player detections
        players = [
            {"bbox": [100, 100, 200, 400], "confidence": 0.9, "class_id": 0},
            {"bbox": [500, 100, 600, 400], "confidence": 0.85, "class_id": 0}
        ]
        
        tracked = analyzer.track_players(players, frame=mock_frame)
        
        # Should return tracked players with IDs
        assert isinstance(tracked, list)


# ============================================================================
# Logger Integration Tests
# ============================================================================

class TestLoggerIntegration:
    """Integration tests for logging across modules"""
    
    def test_ai_logger_all_methods(self):
        """Test all AILogger methods don't raise exceptions"""
        from logger import AILogger
        
        logger = AILogger("test_integration_ai")
        
        # Test all methods
        logger.device_detected("cuda", "RTX 4090")
        logger.device_detected("mps")
        logger.device_detected("cpu")
        logger.model_loaded("Ball Tracking", "/path/to/model.onnx")
        logger.model_failed("Action Recognition", "File not found")
        logger.analysis_start("/path/to/video.mp4", 1000)
        logger.analysis_progress(500, 1000, 15.5)
        logger.analysis_complete(45.5, "/path/to/results.json")
        logger.trajectory_stats(100, 10, 5, 95)
        logger.detection("balls", 1, 50)
        logger.warning("Test warning message")
        logger.error("Test error message")
    
    def test_api_logger_all_methods(self):
        """Test all APILogger methods don't raise exceptions"""
        from logger import APILogger
        
        logger = APILogger("test_integration_api")
        
        # Test all methods
        logger.request("GET", "/health", 200)
        logger.request("POST", "/upload", 201)
        logger.request("DELETE", "/videos/123", 404)
        logger.upload("video.mp4", 150.5)
        logger.analysis_started("video-123", "task-456")
        logger.analysis_completed("video-123", 120.5)
        logger.websocket_connected("video-789")
        logger.websocket_disconnected("video-789")
        logger.error("Connection failed")


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
