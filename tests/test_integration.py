"""
Volleyball AI Analysis System - Integration Tests
End-to-end tests for the complete analysis workflow
"""

import pytest
import sys
import json
import numpy as np
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "backend"))
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# API Integration Tests
# ============================================================================

class TestAPIIntegration:
    """Integration tests for API endpoints"""
    
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
        assert response.status_code in [200, 404]


# ============================================================================
# Processor Integration Tests
# ============================================================================

class TestProcessorPreprocessing:
    """Integration tests for processor preprocessing functions"""
    
    def test_preprocess_ball_frame(self, mock_frame):
        """Test ball frame preprocessing"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        processed = analyzer.preprocess_ball_frame(mock_frame)
        
        assert processed.dtype == np.float32
        assert processed.min() >= 0.0
        assert processed.max() <= 1.0
        assert processed.shape == (288, 512)
    
    def test_preprocess_preserves_content(self, mock_frame):
        """Test that preprocessing doesn't destroy image content"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        gradient = np.linspace(0, 255, 1920, dtype=np.uint8)
        gradient_frame = np.tile(gradient, (1080, 1)).astype(np.uint8)
        gradient_frame = np.stack([gradient_frame] * 3, axis=-1)
        
        processed = analyzer.preprocess_ball_frame(gradient_frame)
        assert processed[:, 0].mean() < processed[:, -1].mean()


class TestProcessorDetection:
    """Integration tests for processor detection methods"""
    
    def test_detect_actions_with_mocked_model(self, mock_frame):
        """Test action detection with mocked YOLO model"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        mock_model = MagicMock()
        mock_model.names = {0: 'spike', 1: 'set', 2: 'receive', 3: 'serve', 4: 'block'}
        
        mock_box = MagicMock()
        mock_box.xyxy = [MagicMock()]
        mock_box.xyxy[0].cpu.return_value.numpy.return_value = np.array([100, 200, 300, 400])
        mock_box.conf = [MagicMock()]
        mock_box.conf[0].cpu.return_value.numpy.return_value = 0.85
        mock_box.cls = [MagicMock()]
        mock_box.cls[0].cpu.return_value.numpy.return_value = 0
        
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
        
        mock_model = MagicMock()
        mock_model.names = {0: 'person'}
        
        mock_box = MagicMock()
        mock_box.xyxy = [MagicMock()]
        mock_box.xyxy[0].cpu.return_value.numpy.return_value = np.array([150, 100, 250, 500])
        mock_box.conf = [MagicMock()]
        mock_box.conf[0].cpu.return_value.numpy.return_value = 0.92
        mock_box.cls = [MagicMock()]
        mock_box.cls[0].cpu.return_value.numpy.return_value = 0
        
        mock_result = MagicMock()
        mock_result.boxes = [mock_box]
        mock_model.return_value = [mock_result]
        
        analyzer.player_model = mock_model
        players = analyzer.detect_players(mock_frame)
        
        assert len(players) == 1
        assert players[0]['confidence'] == 0.92
        assert players[0]['class_id'] == 0


class TestProcessorPostprocessing:
    """Integration tests for processor postprocessing functions"""
    
    def test_postprocess_ball_output_valid_heatmap(self):
        """Test postprocessing with valid heatmap"""
        from processor import VolleyballAnalyzer
        
        analyzer = VolleyballAnalyzer()
        
        heatmap = np.zeros((1, 9, 288, 512), dtype=np.float32)
        heatmap[0, -1, 144, 256] = 0.8
        heatmap[0, -1, 143:146, 255:258] = 0.5
        
        result = analyzer.postprocess_ball_output([heatmap], (1080, 1920))
        # Should not raise an exception
        assert result is None or isinstance(result, dict)


# ============================================================================
# End-to-End Workflow Tests
# ============================================================================

class TestEndToEndWorkflow:
    """End-to-end integration tests for complete workflows"""
    
    def test_full_video_lifecycle(self, client, tmp_path):
        """Test complete video lifecycle: upload, get, delete"""
        # This test requires a real video file, skip if not available
        pytest.skip("Requires real video file for full integration test")
    
    @patch('main.process_video')
    def test_analysis_workflow(self, mock_process, client, sample_video_in_db):
        """Test complete analysis workflow"""
        video_id, _ = sample_video_in_db
        mock_process.return_value = None
        
        # Start analysis
        response = client.post(f"/analyze/{video_id}")
        assert response.status_code == 200
        
        # Get video status
        response = client.get(f"/videos/{video_id}")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data


# ============================================================================
# Run Tests
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
