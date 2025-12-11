"""
Volleyball AI Analysis System - Logger Tests
All tests for logger.py module
"""

import pytest
import sys
import logging
from pathlib import Path

# Add project root to path
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "ai_core"))


# ============================================================================
# Logger Setup Tests
# ============================================================================

class TestLoggerSetup:
    """Tests for logger setup and configuration"""
    
    def test_setup_logger(self):
        """Test logger setup"""
        from logger import setup_logger
        
        # Clear existing handlers for test
        logging.getLogger("test_setup").handlers = []
        
        logger = setup_logger("test_setup")
        assert logger.name == "test_setup"
        assert len(logger.handlers) > 0
    
    def test_get_logger(self):
        """Test getting existing logger (singleton pattern)"""
        from logger import get_logger
        
        logger1 = get_logger("test_singleton")
        logger2 = get_logger("test_singleton")
        assert logger1 is logger2


# ============================================================================
# AILogger Tests
# ============================================================================

class TestAILogger:
    """Tests for AILogger class"""
    
    def test_ai_logger_device_detection(self):
        """Test AILogger device detection methods"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai_logger")
        
        # These should not raise exceptions
        ai_logger.device_detected("cpu")
        ai_logger.device_detected("cuda", "RTX 3080")
        ai_logger.device_detected("mps")
    
    def test_ai_logger_model_operations(self):
        """Test AILogger model loading methods"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai_logger")
        
        ai_logger.model_loaded("Ball Tracking", "/path/to/model.onnx")
        ai_logger.model_failed("Action Recognition", "File not found")
    
    def test_ai_logger_analysis_operations(self):
        """Test AILogger analysis methods"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai_logger")
        
        ai_logger.analysis_start("/path/to/video.mp4", 1000)
        ai_logger.analysis_progress(500, 1000, 15.5)
        ai_logger.analysis_complete(45.5, "/path/to/results.json")
    
    def test_ai_logger_stats_and_detection(self):
        """Test AILogger stats and detection methods"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai_logger")
        
        ai_logger.trajectory_stats(100, 10, 5, 95)
        ai_logger.detection("balls", 1, 50)
    
    def test_ai_logger_error_handling(self):
        """Test AILogger error handling methods"""
        from logger import AILogger
        
        ai_logger = AILogger("test_ai_logger")
        
        ai_logger.warning("Test warning message")
        ai_logger.error("Test error message")


# ============================================================================
# APILogger Tests
# ============================================================================

class TestAPILogger:
    """Tests for APILogger class"""
    
    def test_api_logger_request(self):
        """Test APILogger request logging"""
        from logger import APILogger
        
        api_logger = APILogger("test_api_logger")
        
        api_logger.request("GET", "/health", 200)
        api_logger.request("POST", "/upload", 201)
        api_logger.request("DELETE", "/videos/123", 404)
    
    def test_api_logger_upload(self):
        """Test APILogger upload logging"""
        from logger import APILogger
        
        api_logger = APILogger("test_api_logger")
        
        api_logger.upload("test.mp4", 10.5)
    
    def test_api_logger_analysis(self):
        """Test APILogger analysis logging"""
        from logger import APILogger
        
        api_logger = APILogger("test_api_logger")
        
        api_logger.analysis_started("video-123", "task-456")
        api_logger.analysis_completed("video-123", 30.5)
    
    def test_api_logger_websocket(self):
        """Test APILogger WebSocket logging"""
        from logger import APILogger
        
        api_logger = APILogger("test_api_logger")
        
        api_logger.websocket_connected("video-123")
        api_logger.websocket_disconnected("video-123")
    
    def test_api_logger_error(self):
        """Test APILogger error logging"""
        from logger import APILogger
        
        api_logger = APILogger("test_api_logger")
        
        api_logger.error("Connection failed")


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

