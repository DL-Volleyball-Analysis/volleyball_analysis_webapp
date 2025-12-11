"""
Volleyball AI Analysis System - Database Tests
All tests for database.py module
"""

import pytest
import sys
from pathlib import Path
from datetime import datetime

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))


# ============================================================================
# Database CRUD Tests
# ============================================================================

class TestDatabaseCRUD:
    """Tests for SQLite database CRUD operations"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "test_volleyball.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_add_video(self, temp_db, sample_video_dict):
        """Test adding a video to database"""
        result = temp_db.add_video(sample_video_dict)
        assert result is True
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video is not None
        assert video["filename"] == sample_video_dict["filename"]
    
    def test_get_nonexistent_video(self, temp_db):
        """Test getting a video that doesn't exist"""
        video = temp_db.get_video("nonexistent-id")
        assert video is None
    
    def test_get_all_videos(self, temp_db, sample_video_dict):
        """Test listing all videos"""
        temp_db.add_video(sample_video_dict)
        
        videos = temp_db.get_all_videos()
        assert len(videos) >= 1
        assert any(v["id"] == sample_video_dict["id"] for v in videos)
    
    def test_update_video_status(self, temp_db, sample_video_dict):
        """Test updating video status"""
        temp_db.add_video(sample_video_dict)
        result = temp_db.update_video(sample_video_dict["id"], {"status": "completed"})
        assert result is True
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video["status"] == "completed"
    
    def test_delete_video(self, temp_db, sample_video_dict):
        """Test deleting a video"""
        temp_db.add_video(sample_video_dict)
        result = temp_db.delete_video(sample_video_dict["id"])
        assert result is True
        
        video = temp_db.get_video(sample_video_dict["id"])
        assert video is None


# ============================================================================
# Jersey Mapping Tests
# ============================================================================

class TestJerseyMapping:
    """Tests for jersey mapping operations"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "test_jersey.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_jersey_mapping_operations(self, temp_db, sample_video_dict):
        """Test jersey mapping CRUD operations"""
        # First add a video
        temp_db.add_video(sample_video_dict)
        video_id = sample_video_dict["id"]
        
        # Add jersey mapping
        result = temp_db.set_jersey_mapping(video_id, track_id=1, jersey_number=10, frame=100)
        assert result is True
        
        # Get jersey mappings
        mappings = temp_db.get_jersey_mappings(video_id)
        assert "1" in mappings
        assert mappings["1"]["jersey_number"] == 10
        
        # Delete jersey mapping
        result = temp_db.delete_jersey_mapping(video_id, track_id=1)
        assert result is True
        
        # Verify deletion
        mappings = temp_db.get_jersey_mappings(video_id)
        assert "1" not in mappings


# ============================================================================
# Task Management Tests
# ============================================================================

class TestTaskManagement:
    """Tests for analysis task operations"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "test_tasks.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_add_and_get_task(self, temp_db, sample_video_dict):
        """Test analysis task operations"""
        temp_db.add_video(sample_video_dict)
        
        task_data = {
            "task_id": "task-123",
            "video_id": sample_video_dict["id"],
            "status": "processing",
            "progress": 0
        }
        
        result = temp_db.add_task(task_data)
        assert result is True
        
        task = temp_db.get_task("task-123")
        assert task is not None
        assert task["video_id"] == sample_video_dict["id"]
    
    def test_update_task(self, temp_db, sample_video_dict):
        """Test updating task status"""
        temp_db.add_video(sample_video_dict)
        
        task_data = {
            "task_id": "task-456",
            "video_id": sample_video_dict["id"],
            "status": "processing"
        }
        temp_db.add_task(task_data)
        
        result = temp_db.update_task("task-456", {"status": "completed", "progress": 100})
        assert result is True
        
        task = temp_db.get_task("task-456")
        assert task["status"] == "completed"


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
# Edge Cases and Error Handling
# ============================================================================

class TestDatabaseEdgeCases:
    """Tests for database edge cases and error handling"""
    
    @pytest.fixture
    def temp_db(self, tmp_path):
        """Create a temporary database"""
        db_path = tmp_path / "test_edge_cases.db"
        from database import Database
        db = Database(str(db_path))
        yield db
        db.close()
    
    def test_add_video_duplicate_id(self, temp_db, sample_video_dict):
        """Test adding video with duplicate ID"""
        temp_db.add_video(sample_video_dict)
        # Should handle duplicate gracefully (may update or ignore)
        result = temp_db.add_video(sample_video_dict)
        assert result is True or result is False
    
    def test_update_video_nonexistent(self, temp_db):
        """Test updating nonexistent video"""
        result = temp_db.update_video("nonexistent-id", {"status": "completed"})
        assert result is False
    
    def test_delete_video_nonexistent(self, temp_db):
        """Test deleting nonexistent video"""
        result = temp_db.delete_video("nonexistent-id")
        assert result is False
    
    def test_get_jersey_mappings_empty(self, temp_db, sample_video_dict):
        """Test getting jersey mappings for video with no mappings"""
        temp_db.add_video(sample_video_dict)
        mappings = temp_db.get_jersey_mappings(sample_video_dict["id"])
        assert isinstance(mappings, dict)
    
    def test_set_jersey_mapping_multiple_times(self, temp_db, sample_video_dict):
        """Test setting jersey mapping multiple times (update)"""
        temp_db.add_video(sample_video_dict)
        video_id = sample_video_dict["id"]
        
        # Set mapping first time
        temp_db.set_jersey_mapping(video_id, track_id=1, jersey_number=10)
        
        # Update mapping
        temp_db.set_jersey_mapping(video_id, track_id=1, jersey_number=20)
        
        mappings = temp_db.get_jersey_mappings(video_id)
        assert mappings["1"]["jersey_number"] == 20
    
    def test_delete_jersey_mapping_nonexistent(self, temp_db, sample_video_dict):
        """Test deleting nonexistent jersey mapping"""
        temp_db.add_video(sample_video_dict)
        result = temp_db.delete_jersey_mapping(sample_video_dict["id"], track_id=999)
        assert result is False
    
    def test_add_task_duplicate_id(self, temp_db, sample_video_dict):
        """Test adding task with duplicate ID"""
        temp_db.add_video(sample_video_dict)
        
        task_data = {
            "task_id": "task-123",
            "video_id": sample_video_dict["id"],
            "status": "processing"
        }
        
        temp_db.add_task(task_data)
        # Add again (should handle gracefully)
        result = temp_db.add_task(task_data)
        assert result is True or result is False
    
    def test_update_task_nonexistent(self, temp_db):
        """Test updating nonexistent task"""
        result = temp_db.update_task("nonexistent-task", {"status": "completed"})
        assert result is False
    
    def test_get_task_nonexistent(self, temp_db):
        """Test getting nonexistent task"""
        task = temp_db.get_task("nonexistent-task")
        assert task is None
    
    def test_jersey_mapping_with_all_fields(self, temp_db, sample_video_dict):
        """Test jersey mapping with all optional fields"""
        temp_db.add_video(sample_video_dict)
        video_id = sample_video_dict["id"]
        
        result = temp_db.set_jersey_mapping(
            video_id,
            track_id=1,
            jersey_number=10,
            frame=100,
            bbox=[100, 200, 150, 250]
        )
        assert result is True
        
        mappings = temp_db.get_jersey_mappings(video_id)
        assert "1" in mappings
        assert mappings["1"]["frame"] == 100
        assert mappings["1"]["bbox"] == [100, 200, 150, 250]


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

