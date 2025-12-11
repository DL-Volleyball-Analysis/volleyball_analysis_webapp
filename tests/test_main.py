"""
Volleyball AI Analysis System - Main API Tests
All tests for main.py API endpoints and functions
"""

import pytest
import sys
import json
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock, AsyncMock
from datetime import datetime
from io import BytesIO

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# Root and Health Endpoint Tests
# ============================================================================

class TestRootAndHealth:
    """Tests for root and health endpoints"""
    
    def test_root_endpoint(self, client):
        """Test root endpoint returns message"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "API" in data["message"]
    
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


# ============================================================================
# Upload Endpoint Tests
# ============================================================================

class TestUploadEndpoint:
    """Tests for upload endpoint"""
    
    def test_upload_video_success(self, client, tmp_path):
        """Test successful video upload"""
        upload_dir = tmp_path / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        with patch('main.UPLOAD_DIR', upload_dir):
            with patch('main.PROJECT_ROOT', tmp_path):
                video_content = b'\x00' * 1000
                files = {"file": ("test_upload.mp4", BytesIO(video_content), "video/mp4")}
                
                response = client.post("/upload", files=files)
                assert response.status_code == 200
                data = response.json()
                assert "video_id" in data
                assert "message" in data
                assert data["message"] == "影片上傳成功"
    
    def test_upload_without_file(self, client):
        """Test upload without file"""
        response = client.post("/upload")
        assert response.status_code == 422
    
    def test_upload_empty_file(self, client):
        """Test upload with empty file"""
        files = {"file": ("empty.mp4", BytesIO(b""), "video/mp4")}
        response = client.post("/upload", files=files)
        assert response.status_code in [200, 400]
    
    def test_upload_error_handling(self, client):
        """Test upload error handling"""
        with patch('main.UPLOAD_DIR') as mock_dir:
            mock_dir.__truediv__ = Mock(side_effect=Exception("Disk full"))
            
            files = {"file": ("test.mp4", BytesIO(b'\x00' * 100), "video/mp4")}
            response = client.post("/upload", files=files)
            assert response.status_code == 500


# ============================================================================
# Video CRUD Tests
# ============================================================================

class TestVideoCRUD:
    """Tests for video CRUD operations"""
    
    def test_get_videos_returns_list(self, client):
        """Test /videos returns a list of videos"""
        response = client.get("/videos")
        assert response.status_code == 200
        data = response.json()
        assert "videos" in data
        assert isinstance(data["videos"], list)
    
    def test_get_nonexistent_video(self, client):
        """Test getting a video that doesn't exist"""
        response = client.get("/videos/nonexistent-id-12345")
        assert response.status_code == 404
    
    def test_delete_nonexistent_video(self, client):
        """Test deleting a nonexistent video"""
        response = client.delete("/videos/nonexistent-id-99999")
        assert response.status_code == 404
    
    def test_update_video_success(self, client, sample_video_in_db):
        """Test updating video filename"""
        video_id, _ = sample_video_in_db
        
        response = client.put(
            f"/videos/{video_id}",
            json={"new_filename": "updated_name.mp4"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "video" in data
    
    def test_update_video_nonexistent(self, client):
        """Test updating nonexistent video"""
        response = client.put(
            "/videos/nonexistent-update-999",
            json={"new_filename": "new_name.mp4"}
        )
        assert response.status_code == 404
    
    def test_delete_video_error_handling(self, client, sample_video_in_db):
        """Test delete video error handling"""
        video_id, _ = sample_video_in_db
        
        with patch('main.db') as mock_db:
            mock_db.get_video.return_value = {"id": video_id, "file_path": "/nonexistent/path.mp4"}
            mock_db.delete_video.side_effect = Exception("Database error")
            
            response = client.delete(f"/videos/{video_id}")
            assert response.status_code in [500, 404]


# ============================================================================
# Analysis Endpoint Tests
# ============================================================================

class TestAnalysisEndpoints:
    """Tests for analysis-related endpoints"""
    
    @patch('main.process_video')
    def test_start_analysis_success(self, mock_process, client, sample_video_in_db):
        """Test starting analysis successfully"""
        video_id, _ = sample_video_in_db
        mock_process.return_value = None
        
        response = client.post(f"/analyze/{video_id}")
        assert response.status_code == 200
        data = response.json()
        assert "task_id" in data
        assert "message" in data
    
    def test_start_analysis_nonexistent_video(self, client):
        """Test starting analysis for nonexistent video"""
        # Need to patch db at module level
        import main
        original_db = main.db
        try:
            mock_db = Mock()
            mock_db.get_video.return_value = None
            main.db = mock_db
            
            response = client.post("/analyze/nonexistent-video-analysis")
            assert response.status_code == 404
        finally:
            main.db = original_db
    
    def test_get_results_success(self, client, sample_video_in_db, tmp_path):
        """Test getting analysis results successfully"""
        video_id, _ = sample_video_in_db
        
        results_file = tmp_path / f"{video_id}_results.json"
        results_data = {
            "video_info": {"width": 1920, "height": 1080},
            "ball_tracking": {"trajectory": []},
            "action_recognition": {"actions": []}
        }
        with open(results_file, 'w') as f:
            json.dump(results_data, f)
        
        with patch('main.RESULTS_DIR', tmp_path):
            response = client.get(f"/results/{video_id}")
            assert response.status_code == 200
            data = response.json()
            assert "video_info" in data
    
    def test_get_results_nonexistent(self, client):
        """Test getting results for nonexistent video"""
        response = client.get("/results/nonexistent-results-999")
        assert response.status_code == 404
    
    def test_get_analysis_status_nonexistent(self, client):
        """Test getting status for nonexistent task"""
        response = client.get("/analysis/nonexistent-task-id")
        assert response.status_code == 404


# ============================================================================
# Play Video Endpoint Tests
# ============================================================================

class TestPlayVideoEndpoint:
    """Tests for play video endpoint"""
    
    def test_play_video_success(self, client, sample_video_in_db, tmp_path):
        """Test playing video successfully"""
        video_id, video_data = sample_video_in_db
        
        video_path = Path(video_data["file_path"])
        if not video_path.exists():
            video_path.touch()
        
        response = client.get(f"/play/{video_id}")
        assert response.status_code in [200, 206]
    
    def test_play_video_nonexistent(self, client):
        """Test playing nonexistent video"""
        response = client.get("/play/nonexistent-play-999")
        assert response.status_code == 404
    
    def test_play_video_with_range_header(self, client, sample_video_in_db, tmp_path):
        """Test playing video with Range header"""
        video_id, video_data = sample_video_in_db
        
        video_path = Path(video_data["file_path"])
        if not video_path.exists():
            video_path.write_bytes(b'\x00' * 10000)
        
        headers = {"Range": "bytes=0-1000"}
        response = client.get(f"/play/{video_id}", headers=headers)
        assert response.status_code == 206


# ============================================================================
# Jersey Mapping Endpoint Tests
# ============================================================================

class TestJerseyMappingEndpoints:
    """Tests for jersey mapping endpoints"""
    
    def test_set_jersey_mapping_success(self, client, sample_video_in_db):
        """Test setting jersey mapping successfully"""
        video_id, _ = sample_video_in_db
        
        mapping_data = {
            "video_id": video_id,
            "track_id": 1,
            "jersey_number": 10,
            "frame": 100,
            "bbox": [100, 200, 150, 250]
        }
        
        response = client.post(
            f"/videos/{video_id}/jersey-mapping",
            json=mapping_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "mapping" in data
    
    def test_set_jersey_mapping_nonexistent_video(self, client):
        """Test setting mapping for nonexistent video"""
        mapping_data = {
            "video_id": "nonexistent",
            "track_id": 1,
            "jersey_number": 10,
            "frame": 100,
            "bbox": [100, 200, 150, 250]
        }
        
        response = client.post(
            "/videos/nonexistent/jersey-mapping",
            json=mapping_data
        )
        assert response.status_code == 404
    
    def test_get_jersey_mappings_success(self, client, sample_video_in_db):
        """Test getting jersey mappings successfully"""
        video_id, _ = sample_video_in_db
        
        response = client.get(f"/videos/{video_id}/jersey-mappings")
        assert response.status_code == 200
        data = response.json()
        assert "mappings" in data
    
    def test_get_jersey_mappings_nonexistent_video(self, client):
        """Test getting mappings for nonexistent video"""
        response = client.get("/videos/nonexistent-jersey-video/jersey-mappings")
        assert response.status_code in [200, 404]
    
    def test_delete_jersey_mapping_success(self, client, sample_video_in_db):
        """Test deleting jersey mapping successfully"""
        video_id, _ = sample_video_in_db
        
        mapping_data = {
            "video_id": video_id,
            "track_id": 2,
            "jersey_number": 20,
            "frame": 200,
            "bbox": [200, 300, 250, 350]
        }
        client.post(f"/videos/{video_id}/jersey-mapping", json=mapping_data)
        
        response = client.delete(f"/videos/{video_id}/jersey-mapping/2")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
    
    def test_delete_jersey_mapping_nonexistent(self, client, sample_video_in_db):
        """Test deleting nonexistent mapping"""
        video_id, _ = sample_video_in_db
        
        response = client.delete(f"/videos/{video_id}/jersey-mapping/999")
        assert response.status_code in [200, 404]


# ============================================================================
# Path Resolution Tests
# ============================================================================

class TestPathResolution:
    """Tests for path resolution helper functions"""
    
    def test_resolve_video_path_absolute(self, tmp_path):
        """Test resolving absolute video path"""
        from main import resolve_video_path
        
        video_file = tmp_path / "test_video.mp4"
        video_file.touch()
        
        video = {"file_path": str(video_file)}
        result = resolve_video_path(video)
        assert result is not None
        assert result.exists()
    
    def test_resolve_video_path_missing(self):
        """Test resolving non-existent video path"""
        from main import resolve_video_path
        
        video = {"file_path": "/nonexistent/path/video.mp4"}
        result = resolve_video_path(video)
        assert result is None
    
    def test_resolve_video_path_empty(self):
        """Test resolving empty file path"""
        from main import resolve_video_path
        
        result = resolve_video_path({})
        assert result is None
        
        result = resolve_video_path({"file_path": ""})
        assert result is None
    
    def test_resolve_video_path_relative(self, tmp_path):
        """Test resolving relative video path"""
        from main import resolve_video_path
        
        video_file = tmp_path / "test_video.mp4"
        video_file.touch()
        
        with patch('main.PROJECT_ROOT', tmp_path):
            video = {"file_path": "test_video.mp4"}
            result = resolve_video_path(video)
            assert result is not None
            assert result.exists()
    
    def test_resolve_results_path_success(self, tmp_path):
        """Test resolving results path successfully"""
        from main import resolve_results_path
        
        results_file = tmp_path / "test-video_results.json"
        results_file.touch()
        
        with patch('main.RESULTS_DIR', tmp_path):
            result = resolve_results_path("test-video")
            assert result is not None
            assert result.exists()
    
    def test_resolve_results_path_nonexistent(self):
        """Test resolving nonexistent results path"""
        from main import resolve_results_path
        
        result = resolve_results_path("nonexistent-video-999")
        assert result is None


# ============================================================================
# Migration and Scan Functions Tests
# ============================================================================

class TestMigrationFunctions:
    """Tests for migration and scan functions"""
    
    def test_migrate_json_to_sqlite_already_migrated(self, tmp_path):
        """Test migration when already migrated"""
        from main import migrate_json_to_sqlite
        
        # Create data directory
        data_dir = tmp_path / "data"
        data_dir.mkdir(parents=True, exist_ok=True)
        migration_flag = data_dir / ".sqlite_migrated"
        migration_flag.touch()
        
        with patch('main.PROJECT_ROOT', tmp_path):
            migrate_json_to_sqlite()
    
    def test_save_videos_db_compatibility(self):
        """Test save_videos_db compatibility function"""
        from main import save_videos_db
        save_videos_db()
    
    def test_load_videos_db_compatibility(self):
        """Test load_videos_db compatibility function"""
        from main import load_videos_db
        load_videos_db()
    
    @patch('main.db')
    def test_scan_existing_videos(self, mock_db, tmp_path):
        """Test scanning existing videos"""
        from main import scan_existing_videos
        
        upload_dir = tmp_path / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        video_file = upload_dir / "test-video-id.mp4"
        video_file.write_bytes(b'\x00' * 1000)
        
        mock_db.get_all_videos.return_value = []
        mock_db.get_video.return_value = None
        
        with patch('main.UPLOAD_DIR', upload_dir):
            with patch('main.PROJECT_ROOT', tmp_path):
                scan_existing_videos()
        
        assert mock_db.add_video.called


# ============================================================================
# WebSocket Tests
# ============================================================================

class TestWebSocketEndpoints:
    """Tests for WebSocket endpoints"""
    
    @pytest.mark.asyncio
    async def test_websocket_analysis_nonexistent_video(self):
        """Test WebSocket analysis with nonexistent video"""
        from main import websocket_analysis
        from fastapi import WebSocket
        
        mock_websocket = AsyncMock(spec=WebSocket)
        mock_websocket.accept = AsyncMock()
        mock_websocket.send_json = AsyncMock()
        
        with patch('main.ws_manager') as mock_manager:
            mock_manager.connect = AsyncMock()
            mock_manager.disconnect = Mock()
            
            with patch('main.db') as mock_db:
                mock_db.get_video.return_value = None
                
                await websocket_analysis(mock_websocket, "nonexistent-video")
                assert mock_websocket.send_json.called
    
    @pytest.mark.asyncio
    async def test_websocket_progress_completed(self):
        """Test WebSocket progress for completed video"""
        from main import websocket_progress
        from fastapi import WebSocket
        
        mock_websocket = AsyncMock(spec=WebSocket)
        mock_websocket.accept = AsyncMock()
        mock_websocket.send_json = AsyncMock()
        
        with patch('main.db') as mock_db:
            mock_db.get_video.return_value = {
                "id": "test-video",
                "status": "completed",
                "task_id": None
            }
            
            await websocket_progress(mock_websocket, "test-video")
            assert mock_websocket.send_json.called
    
    @pytest.mark.asyncio
    async def test_websocket_progress_nonexistent_video(self):
        """Test WebSocket progress for nonexistent video"""
        from main import websocket_progress
        from fastapi import WebSocket
        
        mock_websocket = AsyncMock(spec=WebSocket)
        mock_websocket.accept = AsyncMock()
        mock_websocket.send_json = AsyncMock()
        
        with patch('main.db') as mock_db:
            mock_db.get_video.return_value = None
            
            await websocket_progress(mock_websocket, "nonexistent-video")
            assert mock_websocket.send_json.called


# ============================================================================
# ConnectionManager Tests
# ============================================================================

class TestConnectionManager:
    """Tests for ConnectionManager class"""
    
    @pytest.mark.asyncio
    async def test_connection_manager_connect(self):
        """Test ConnectionManager connect method"""
        from main import ConnectionManager
        from fastapi import WebSocket
        
        manager = ConnectionManager()
        mock_websocket = AsyncMock(spec=WebSocket)
        mock_websocket.accept = AsyncMock()
        
        await manager.connect("test-video", mock_websocket)
        
        assert "test-video" in manager.active_connections
        assert manager.active_connections["test-video"] == mock_websocket
    
    def test_connection_manager_disconnect(self):
        """Test ConnectionManager disconnect method"""
        from main import ConnectionManager
        
        manager = ConnectionManager()
        manager.active_connections["test-video"] = Mock()
        
        manager.disconnect("test-video")
        assert "test-video" not in manager.active_connections
    
    @pytest.mark.asyncio
    async def test_connection_manager_send_progress_success(self):
        """Test ConnectionManager send_progress successfully"""
        from main import ConnectionManager
        
        manager = ConnectionManager()
        mock_websocket = AsyncMock()
        mock_websocket.send_json = AsyncMock()
        manager.active_connections["test-video"] = mock_websocket
        
        await manager.send_progress("test-video", {"progress": 50})
        assert mock_websocket.send_json.called
    
    @pytest.mark.asyncio
    async def test_connection_manager_send_progress_not_connected(self):
        """Test ConnectionManager send_progress when not connected"""
        from main import ConnectionManager
        
        manager = ConnectionManager()
        await manager.send_progress("nonexistent-video", {"progress": 50})


# ============================================================================
# Process Video Function Tests
# ============================================================================

class TestProcessVideo:
    """Tests for process_video function"""
    
    @pytest.mark.asyncio
    @patch('main.VolleyballAnalyzer')
    @patch('main.asyncio.get_running_loop')
    async def test_process_video_success(self, mock_loop, mock_analyzer_class, sample_video_in_db, tmp_path):
        """Test process_video function successfully"""
        from main import process_video, analysis_tasks
        
        video_id, video_data = sample_video_in_db
        task_id = "test-task-123"
        
        # Initialize task first
        analysis_tasks[task_id] = {
            "video_id": video_id,
            "status": "processing",
            "progress": 0
        }
        
        mock_analyzer = Mock()
        mock_analyzer.analyze_video.return_value = {
            "video_info": {"width": 1920, "height": 1080},
            "ball_tracking": {"trajectory": []},
            "action_recognition": {"actions": []}
        }
        mock_analyzer_class.return_value = mock_analyzer
        
        mock_executor_loop = Mock()
        mock_executor_loop.run_in_executor = AsyncMock(return_value=mock_analyzer.analyze_video.return_value)
        mock_loop.return_value = mock_executor_loop
        
        with patch('main.RESULTS_DIR', tmp_path):
            with patch('main.db') as mock_db:
                mock_db.get_video.return_value = video_data
                mock_db.update_video = Mock()
                
                await process_video(video_id, task_id)
                
                assert analysis_tasks[task_id]["status"] == "completed"
                assert analysis_tasks[task_id]["progress"] == 100
        
        # Cleanup
        if task_id in analysis_tasks:
            del analysis_tasks[task_id]
    
    @pytest.mark.asyncio
    async def test_process_video_nonexistent_video(self):
        """Test process_video with nonexistent video"""
        from main import process_video, analysis_tasks
        
        task_id = "test-task-456"
        analysis_tasks[task_id] = {"status": "processing", "progress": 0}
        
        with patch('main.db') as mock_db:
            mock_db.get_video.return_value = None
            
            await process_video("nonexistent-video", task_id)
            assert analysis_tasks[task_id]["status"] == "failed"


# ============================================================================
# Input Validation Tests
# ============================================================================

class TestInputValidation:
    """Tests for input validation"""
    
    def test_video_id_with_special_characters(self, client):
        """Test handling video IDs with special characters"""
        response = client.get("/videos/test-video-with-special-chars-!@#$")
        assert response.status_code in [404, 400, 422]
    
    def test_upload_without_file(self, client):
        """Test upload endpoint without file"""
        response = client.post("/upload")
        assert response.status_code in [400, 422]


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
        assert response.status_code in [200, 204, 405]


# ============================================================================
# Additional Edge Cases and Error Handling
# ============================================================================

class TestEdgeCases:
    """Tests for edge cases and error handling"""
    
    def test_resolve_video_path_with_backend_dir(self, tmp_path):
        """Test resolving video path from backend directory"""
        from main import resolve_video_path
        
        backend_dir = tmp_path / "backend" / "data" / "uploads"
        backend_dir.mkdir(parents=True, exist_ok=True)
        video_file = backend_dir / "test.mp4"
        video_file.touch()
        
        with patch('main.BACKEND_UPLOAD_DIR', backend_dir):
            video = {"file_path": "test.mp4"}
            result = resolve_video_path(video)
            assert result is not None
    
    def test_resolve_results_path_backend_dir(self, tmp_path):
        """Test resolving results path from backend directory"""
        from main import resolve_results_path
        
        backend_results_dir = tmp_path / "backend" / "data" / "results"
        backend_results_dir.mkdir(parents=True, exist_ok=True)
        results_file = backend_results_dir / "test-video_results.json"
        results_file.touch()
        
        with patch('main.BACKEND_RESULTS_DIR', backend_results_dir):
            result = resolve_results_path("test-video")
            assert result is not None
    
    def test_delete_video_with_multiple_paths(self, client, sample_video_in_db, tmp_path):
        """Test deleting video that exists in multiple locations"""
        video_id, video_data = sample_video_in_db
        
        # Create files in multiple locations
        video_path = Path(video_data["file_path"])
        video_path.touch()
        
        backend_path = tmp_path / "backend" / "data" / "uploads" / video_path.name
        backend_path.parent.mkdir(parents=True, exist_ok=True)
        backend_path.touch()
        
        with patch('main.BACKEND_UPLOAD_DIR', backend_path.parent):
            response = client.delete(f"/videos/{video_id}")
            assert response.status_code == 200
    
    def test_get_results_backend_dir_fallback(self, client, sample_video_in_db, tmp_path):
        """Test getting results from backend directory fallback"""
        video_id, _ = sample_video_in_db
        
        backend_results_dir = tmp_path / "backend" / "data" / "results"
        backend_results_dir.mkdir(parents=True, exist_ok=True)
        results_file = backend_results_dir / f"{video_id}_results.json"
        
        results_data = {"video_info": {"width": 1920}}
        with open(results_file, 'w') as f:
            json.dump(results_data, f)
        
        with patch('main.BACKEND_RESULTS_DIR', backend_results_dir):
            with patch('main.RESULTS_DIR', tmp_path / "nonexistent"):
                response = client.get(f"/results/{video_id}")
                assert response.status_code == 200
    
    def test_play_video_alternative_paths(self, client, sample_video_in_db, tmp_path):
        """Test playing video with alternative path resolution"""
        video_id, video_data = sample_video_in_db
        
        # Create video in alternative location
        alt_path = tmp_path / "data" / "uploads" / Path(video_data["file_path"]).name
        alt_path.parent.mkdir(parents=True, exist_ok=True)
        alt_path.write_bytes(b'\x00' * 10000)
        
        with patch('main.UPLOAD_DIR', alt_path.parent):
            response = client.get(f"/play/{video_id}")
            assert response.status_code in [200, 206]
    
    def test_set_jersey_mapping_error_handling(self, client, sample_video_in_db):
        """Test jersey mapping error handling"""
        video_id, _ = sample_video_in_db
        
        with patch('main.db') as mock_db:
            mock_db.get_video.return_value = {"id": video_id}
            mock_db.set_jersey_mapping.side_effect = Exception("Database error")
            
            mapping_data = {
                "video_id": video_id,
                "track_id": 1,
                "jersey_number": 10,
                "frame": 100,
                "bbox": [100, 200, 150, 250]
            }
            
            response = client.post(
                f"/videos/{video_id}/jersey-mapping",
                json=mapping_data
            )
            assert response.status_code == 500
    
    def test_delete_jersey_mapping_invalid_track_id(self, client, sample_video_in_db):
        """Test deleting jersey mapping with invalid track_id"""
        video_id, _ = sample_video_in_db
        
        response = client.delete(f"/videos/{video_id}/jersey-mapping/invalid")
        assert response.status_code in [400, 422, 500]
    
    def test_upload_large_file(self, client, tmp_path):
        """Test uploading a large file"""
        upload_dir = tmp_path / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        with patch('main.UPLOAD_DIR', upload_dir):
            with patch('main.PROJECT_ROOT', tmp_path):
                # Create a large file (simulate)
                large_content = b'\x00' * (10 * 1024 * 1024)  # 10MB
                files = {"file": ("large_video.mp4", BytesIO(large_content), "video/mp4")}
                
                response = client.post("/upload", files=files)
                assert response.status_code == 200
    
    def test_get_analysis_status_processing(self, client):
        """Test getting analysis status for processing task"""
        from main import analysis_tasks
        
        task_id = "test-task-status"
        analysis_tasks[task_id] = {
            "status": "processing",
            "progress": 50,
            "video_id": "test-video"
        }
        
        response = client.get(f"/analysis/{task_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "processing"
        assert data["progress"] == 50
        
        # Cleanup
        del analysis_tasks[task_id]
    
    def test_get_analysis_status_failed(self, client):
        """Test getting analysis status for failed task"""
        from main import analysis_tasks
        
        task_id = "test-task-failed"
        analysis_tasks[task_id] = {
            "status": "failed",
            "error": "Test error",
            "video_id": "test-video"
        }
        
        response = client.get(f"/analysis/{task_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "failed"
        assert "error" in data
        
        # Cleanup
        del analysis_tasks[task_id]


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

