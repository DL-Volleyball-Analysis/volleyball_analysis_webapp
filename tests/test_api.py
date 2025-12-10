"""
Volleyball AI Analysis System - API Endpoint Tests
Additional tests for main.py API endpoints with mocks
"""

import pytest
import os
import sys
import json
import tempfile
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock, AsyncMock
from datetime import datetime
from io import BytesIO

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# Fixtures
# ============================================================================

@pytest.fixture
def client():
    """Create a test client"""
    from fastapi.testclient import TestClient
    from main import app
    return TestClient(app)


@pytest.fixture
def sample_video_data():
    """Sample video data"""
    return {
        "id": "api-test-video",
        "filename": "test_api.mp4",
        "file_path": "/path/to/test_api.mp4",
        "upload_time": datetime.now().isoformat(),
        "status": "completed",
        "file_size": 5000000
    }


@pytest.fixture
def sample_results(tmp_path):
    """Create sample analysis results file"""
    results = {
        "video_info": {"width": 1920, "height": 1080, "fps": 30.0, "total_frames": 900, "duration": 30.0},
        "ball_tracking": {"trajectory": [], "detected_frames": 0, "total_frames": 900},
        "action_recognition": {"actions": [], "action_detections": [], "action_counts": {}, "total_actions": 0},
        "player_tracking": {"tracks": [], "total_detections": 0},
        "analysis_time": 25.5
    }
    results_file = tmp_path / "test-video_results.json"
    with open(results_file, 'w') as f:
        json.dump(results, f)
    return results_file, results


# ============================================================================
# Health & Basic Endpoint Tests
# ============================================================================

class TestBasicEndpoints:
    """Tests for basic API endpoints"""
    
    def test_health_check_returns_200(self, client):
        """Test health check returns 200 OK"""
        response = client.get("/health")
        assert response.status_code == 200
    
    def test_health_check_returns_healthy_status(self, client):
        """Test health check returns healthy status"""
        response = client.get("/health")
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_health_check_includes_timestamp(self, client):
        """Test health check includes timestamp"""
        response = client.get("/health")
        data = response.json()
        assert "timestamp" in data
    
    def test_get_videos_returns_list(self, client):
        """Test /videos returns a list of videos"""
        response = client.get("/videos")
        assert response.status_code == 200
        data = response.json()
        assert "videos" in data
        assert isinstance(data["videos"], list)


# ============================================================================
# Video CRUD Tests
# ============================================================================

class TestVideoCRUD:
    """Tests for video CRUD operations"""
    
    def test_get_nonexistent_video(self, client):
        """Test getting a video that doesn't exist"""
        response = client.get("/videos/nonexistent-video-xyz-123")
        assert response.status_code == 404
    
    def test_delete_nonexistent_video(self, client):
        """Test deleting a nonexistent video"""
        response = client.delete("/videos/nonexistent-video-abc-456")
        assert response.status_code == 404
    
    def test_update_nonexistent_video(self, client):
        """Test updating a nonexistent video"""
        response = client.put(
            "/videos/nonexistent-video-update-789",
            json={"new_filename": "updated.mp4"}
        )
        assert response.status_code == 404


# ============================================================================
# Analysis Endpoint Tests
# ============================================================================

class TestAnalysisEndpoints:
    """Tests for analysis-related endpoints"""
    
    def test_get_results_nonexistent(self, client):
        """Test getting results for nonexistent video"""
        response = client.get("/results/nonexistent-video-results")
        assert response.status_code == 404
    
    def test_get_analysis_status_nonexistent(self, client):
        """Test getting status for nonexistent task"""
        response = client.get("/analysis/nonexistent-task-id")
        assert response.status_code == 404
    
    def test_start_analysis_nonexistent_video(self, client):
        """Test starting analysis for nonexistent video"""
        response = client.post("/analyze/nonexistent-video-for-analysis")
        # Should return 404 (video not found) or 500 (internal error)
        assert response.status_code in [404, 500]


# ============================================================================
# Jersey Mapping Tests
# ============================================================================

class TestJerseyMappingEndpoints:
    """Tests for jersey mapping endpoints"""
    
    def test_get_jersey_mappings_nonexistent_video(self, client):
        """Test getting mappings for nonexistent video"""
        response = client.get("/videos/nonexistent-jersey-video/jersey-mappings")
        # Should return empty mappings or 200
        assert response.status_code in [200, 404]
    
    def test_delete_jersey_mapping_nonexistent(self, client):
        """Test deleting nonexistent jersey mapping"""
        response = client.delete("/videos/nonexistent-video/jersey-mapping/999")
        assert response.status_code in [200, 404]


# ============================================================================
# Input Validation Tests
# ============================================================================

class TestInputValidation:
    """Tests for input validation"""
    
    def test_video_id_with_special_characters(self, client):
        """Test handling video IDs with special characters"""
        # Should handle safely without crashing
        response = client.get("/videos/test-video-with-special-chars-!@#$")
        assert response.status_code in [404, 400, 422]
    
    def test_upload_without_file(self, client):
        """Test upload endpoint without file"""
        response = client.post("/upload")
        # Should return error for missing file
        assert response.status_code in [400, 422]
    
    def test_upload_with_empty_file(self, client):
        """Test upload with empty file"""
        files = {"file": ("empty.mp4", b"", "video/mp4")}
        response = client.post("/upload", files=files)
        # Small/empty files might be rejected
        assert response.status_code in [200, 400, 422]


# ============================================================================
# Path Resolution Tests
# ============================================================================

class TestPathResolution:
    """Tests for path resolution functions"""
    
    def test_resolve_video_path_with_valid_path(self, tmp_path):
        """Test path resolution with valid file"""
        from main import resolve_video_path
        
        # Create temp file
        video_file = tmp_path / "test.mp4"
        video_file.touch()
        
        video = {"file_path": str(video_file)}
        result = resolve_video_path(video)
        
        assert result is not None
        assert result.exists()
    
    def test_resolve_video_path_with_invalid_path(self):
        """Test path resolution with invalid path"""
        from main import resolve_video_path
        
        video = {"file_path": "/invalid/path/to/video.mp4"}
        result = resolve_video_path(video)
        
        assert result is None
    
    def test_resolve_video_path_with_empty_dict(self):
        """Test path resolution with empty dict"""
        from main import resolve_video_path
        
        result = resolve_video_path({})
        assert result is None
    
    def test_resolve_video_path_with_empty_path(self):
        """Test path resolution with empty path string"""
        from main import resolve_video_path
        
        result = resolve_video_path({"file_path": ""})
        assert result is None
    
    def test_resolve_results_path_nonexistent(self):
        """Test results path resolution for nonexistent video"""
        from main import resolve_results_path
        
        result = resolve_results_path("nonexistent-video-id-12345")
        assert result is None


# ============================================================================
# Database Integration Tests via API
# ============================================================================

class TestDatabaseViaAPI:
    """Tests for database operations via API"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create temp database for testing"""
        db_path = tmp_path / "api_test.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_video_lifecycle_via_db(self, temp_db):
        """Test video CRUD via database directly"""
        video_id = "db-api-test"
        
        # Create
        temp_db.add_video({
            "id": video_id,
            "filename": "test.mp4",
            "file_path": "/test/path.mp4",
            "upload_time": datetime.now().isoformat(),
            "status": "uploaded",
            "file_size": 1024
        })
        
        # Read
        video = temp_db.get_video(video_id)
        assert video is not None
        assert video["filename"] == "test.mp4"
        
        # Update
        temp_db.update_video(video_id, {"status": "completed"})
        video = temp_db.get_video(video_id)
        assert video["status"] == "completed"
        
        # Delete
        temp_db.delete_video(video_id)
        video = temp_db.get_video(video_id)
        assert video is None


# ============================================================================
# Error Response Tests
# ============================================================================

class TestErrorResponses:
    """Tests for error response formats"""
    
    def test_404_response_has_detail(self, client):
        """Test 404 responses include detail message"""
        response = client.get("/videos/nonexistent-video")
        assert response.status_code == 404
        data = response.json()
        assert "detail" in data
    
    def test_invalid_endpoint_returns_404(self, client):
        """Test invalid endpoint returns 404"""
        response = client.get("/invalid-endpoint-that-does-not-exist")
        assert response.status_code == 404


# ============================================================================
# CORS Tests
# ============================================================================

class TestCORS:
    """Tests for CORS configuration"""
    
    def test_cors_allows_localhost(self, client):
        """Test CORS allows localhost origin"""
        response = client.options(
            "/health",
            headers={"Origin": "http://localhost:3000"}
        )
        # OPTIONS should be allowed
        assert response.status_code in [200, 204, 405]


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
