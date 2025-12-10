"""
排球分析系統 - 日誌模組
Centralized logging configuration for the Volleyball Analysis System
"""

import logging
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional


def setup_logger(
    name: str = "volleyball_ai",
    level: int = logging.INFO,
    log_file: Optional[Path] = None,
    console_output: bool = True
) -> logging.Logger:
    """
    設置並返回配置好的 Logger 實例
    
    Args:
        name: Logger 名稱
        level: 日誌級別 (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_file: 可選的日誌文件路徑
        console_output: 是否輸出到控制台
        
    Returns:
        配置好的 Logger 實例
    """
    logger = logging.getLogger(name)
    
    # 避免重複添加 handler
    if logger.handlers:
        return logger
    
    logger.setLevel(level)
    
    # 定義格式
    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # 控制台輸出
    if console_output:
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(level)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
    
    # 文件輸出
    if log_file:
        log_file.parent.mkdir(parents=True, exist_ok=True)
        file_handler = logging.FileHandler(log_file, encoding="utf-8")
        file_handler.setLevel(level)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    
    return logger


# 預設的 Logger 實例
def get_logger(name: str = "volleyball_ai") -> logging.Logger:
    """獲取 Logger 實例（如果不存在則創建）"""
    logger = logging.getLogger(name)
    if not logger.handlers:
        return setup_logger(name)
    return logger


# AI 核心模組專用 Logger
class AILogger:
    """AI 處理模組專用的日誌類別，提供結構化日誌方法"""
    
    def __init__(self, name: str = "volleyball_ai.processor"):
        self.logger = get_logger(name)
    
    def device_detected(self, device: str, device_name: Optional[str] = None):
        """記錄設備檢測結果"""
        if device == "cuda" and device_name:
            self.logger.info(f"Detected NVIDIA GPU: {device_name}")
        elif device == "mps":
            self.logger.info("Detected Apple Silicon MPS acceleration")
        else:
            self.logger.info("Using CPU for computation")
    
    def model_loaded(self, model_type: str, model_path: str):
        """記錄模型載入"""
        self.logger.info(f"{model_type} model loaded: {Path(model_path).name}")
    
    def model_failed(self, model_type: str, error: str):
        """記錄模型載入失敗"""
        self.logger.error(f"{model_type} model load failed: {error}")
    
    def analysis_start(self, video_path: str, total_frames: int):
        """記錄分析開始"""
        self.logger.info(f"Starting analysis: {Path(video_path).name} ({total_frames} frames)")
    
    def analysis_progress(self, current: int, total: int, fps: float):
        """記錄分析進度"""
        percent = (current / total) * 100
        self.logger.debug(f"Progress: {current}/{total} ({percent:.1f}%) - {fps:.2f} FPS")
    
    def analysis_complete(self, duration: float, results_path: str):
        """記錄分析完成"""
        self.logger.info(f"Analysis complete in {duration:.2f}s, saved to: {Path(results_path).name}")
    
    def trajectory_stats(self, original: int, removed: int, interpolated: int, final: int):
        """記錄軌跡處理統計"""
        self.logger.info(f"Ball trajectory: {original} pts -> removed {removed} outliers -> interpolated {interpolated} -> final {final} pts")
    
    def detection(self, detection_type: str, count: int, frame: int):
        """記錄偵測結果"""
        self.logger.debug(f"Frame {frame}: detected {count} {detection_type}")
    
    def warning(self, message: str):
        """記錄警告"""
        self.logger.warning(message)
    
    def error(self, message: str, exc_info: bool = False):
        """記錄錯誤"""
        self.logger.error(message, exc_info=exc_info)


# 後端服務 Logger
class APILogger:
    """API 服務專用的日誌類別"""
    
    def __init__(self, name: str = "volleyball_ai.api"):
        self.logger = get_logger(name)
    
    def request(self, method: str, path: str, status: int = 200):
        """記錄 API 請求"""
        self.logger.info(f"{method} {path} -> {status}")
    
    def upload(self, filename: str, size_mb: float):
        """記錄文件上傳"""
        self.logger.info(f"File uploaded: {filename} ({size_mb:.2f} MB)")
    
    def analysis_started(self, video_id: str, task_id: str):
        """記錄分析任務啟動"""
        self.logger.info(f"Analysis started: video={video_id}, task={task_id}")
    
    def analysis_completed(self, video_id: str, duration: float):
        """記錄分析任務完成"""
        self.logger.info(f"Analysis completed: video={video_id}, duration={duration:.2f}s")
    
    def websocket_connected(self, video_id: str):
        """記錄 WebSocket 連接"""
        self.logger.info(f"WebSocket connected: {video_id}")
    
    def websocket_disconnected(self, video_id: str):
        """記錄 WebSocket 斷開"""
        self.logger.info(f"WebSocket disconnected: {video_id}")
    
    def error(self, message: str, exc_info: bool = False):
        """記錄錯誤"""
        self.logger.error(message, exc_info=exc_info)

