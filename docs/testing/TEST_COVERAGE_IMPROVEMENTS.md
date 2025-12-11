# 測試覆蓋率改進總結

## 目標
將整體測試覆蓋率從 ~32% 提升到 **70-80%**

## 已完成的改進

### 1. 添加測試依賴
- ✅ 在 `requirements.txt` 中添加：
  - `pytest>=7.4.0`
  - `pytest-cov>=4.1.0`
  - `pytest-asyncio>=0.21.0`

### 2. 擴展 test_main.py
新增測試類和測試方法：

#### TestEdgeCases (新增)
- `test_resolve_video_path_with_backend_dir` - 測試後端目錄路徑解析
- `test_resolve_results_path_backend_dir` - 測試結果路徑後端目錄回退
- `test_delete_video_with_multiple_paths` - 測試刪除多路徑視頻
- `test_get_results_backend_dir_fallback` - 測試結果文件後端目錄回退
- `test_play_video_alternative_paths` - 測試視頻播放替代路徑
- `test_set_jersey_mapping_error_handling` - 測試球衣映射錯誤處理
- `test_delete_jersey_mapping_invalid_track_id` - 測試無效 track_id
- `test_upload_large_file` - 測試大文件上傳
- `test_get_analysis_status_processing` - 測試處理中任務狀態
- `test_get_analysis_status_failed` - 測試失敗任務狀態

**新增覆蓋的端點和函數：**
- 路徑解析的邊界情況
- 錯誤處理路徑
- 多路徑回退機制
- 任務狀態查詢

### 3. 擴展 test_processor.py
新增測試類和測試方法：

#### TestAnalyzeVideo (新增)
- `test_analyze_video_success` - 測試成功分析視頻
- `test_analyze_video_cannot_open` - 測試無法打開視頻
- `test_analyze_video_with_progress_callback` - 測試帶進度回調的分析
- `test_analyze_video_with_output_path` - 測試帶輸出路徑的分析

#### TestProcessorEdgeCases (新增)
- `test_detect_ball_with_empty_buffer` - 測試空緩衝區球檢測
- `test_track_players_with_none_frame` - 測試無幀追蹤
- `test_assign_action_to_player_no_overlap` - 測試無重疊動作分配
- `test_merge_digit_detections_empty` - 測試空數字合併
- `test_merge_digit_detections_single_low_confidence` - 測試低置信度數字
- `test_preprocess_roi_small_image` - 測試小圖像預處理
- `test_preprocess_roi_large_image` - 測試大圖像預處理
- `test_physics_based_outlier_removal_short_trajectory` - 測試短軌跡異常移除
- `test_smooth_ball_trajectory_empty` - 測試空軌跡平滑
- `test_interpolate_missing_frames_empty` - 測試空軌跡插值
- `test_interpolate_missing_frames_single_point` - 測試單點軌跡插值

**新增覆蓋的方法：**
- `analyze_video` - 完整視頻分析流程
- 各種邊界情況和錯誤處理
- 空數據處理
- 極端輸入處理

### 4. 擴展 test_database.py
新增測試類：

#### TestDatabaseEdgeCases (新增)
- `test_add_video_duplicate_id` - 測試重複 ID
- `test_update_video_nonexistent` - 測試更新不存在的視頻
- `test_delete_video_nonexistent` - 測試刪除不存在的視頻
- `test_get_jersey_mappings_empty` - 測試空映射查詢
- `test_set_jersey_mapping_multiple_times` - 測試多次設置映射
- `test_delete_jersey_mapping_nonexistent` - 測試刪除不存在的映射
- `test_add_task_duplicate_id` - 測試重複任務 ID
- `test_update_task_nonexistent` - 測試更新不存在的任務
- `test_get_task_nonexistent` - 測試獲取不存在的任務
- `test_jersey_mapping_with_all_fields` - 測試完整字段映射

**新增覆蓋的數據庫操作：**
- 邊界情況處理
- 錯誤處理
- 數據完整性檢查

## 測試統計

### 新增測試數量
- **test_main.py**: +10 個測試方法
- **test_processor.py**: +14 個測試方法
- **test_database.py**: +10 個測試方法
- **總計**: +34 個新測試方法

### 預期覆蓋率提升
- **之前**: ~32% (後端)
- **預期**: **70-80%** (後端)

## 運行測試覆蓋率

### 安裝依賴
```bash
pip install -r requirements.txt
```

### 運行所有測試並查看覆蓋率
```bash
cd /Users/jesse/Documents/專題/volleyball_analysis_webapp
pytest tests/ --cov=backend --cov=ai_core --cov-report=term-missing --cov-report=html
```

### 查看 HTML 報告
```bash
open htmlcov/index.html  # macOS
# 或
xdg-open htmlcov/index.html  # Linux
```

### 運行特定模組測試
```bash
# 只測試 main.py
pytest tests/test_main.py --cov=backend/main --cov-report=term-missing

# 只測試 processor.py
pytest tests/test_processor.py --cov=ai_core/processor --cov-report=term-missing

# 只測試 database.py
pytest tests/test_database.py --cov=backend/database --cov-report=term-missing
```

## 覆蓋率目標分解

| 模組 | 目標覆蓋率 | 重點測試區域 |
|------|-----------|-------------|
| `backend/main.py` | 75-80% | 所有 API 端點、路徑解析、錯誤處理 |
| `ai_core/processor.py` | 70-75% | 檢測方法、軌跡過濾、視頻分析 |
| `backend/database.py` | 80-85% | CRUD 操作、邊界情況、錯誤處理 |
| `ai_core/logger.py` | 85-90% | 所有日誌方法 |

## 後續改進建議

1. **添加更多集成測試**
   - 完整的視頻上傳 → 分析 → 結果查詢流程
   - WebSocket 完整通信流程

2. **添加性能測試**
   - 大文件上傳性能
   - 並發請求處理

3. **添加壓力測試**
   - 多個視頻同時分析
   - 大量並發 WebSocket 連接

4. **代碼覆蓋率監控**
   - 在 CI/CD 中集成覆蓋率檢查
   - 設置覆蓋率閾值（不低於 70%）

## 注意事項

- 某些測試需要 mock 外部依賴（如 cv2.VideoCapture）
- 某些測試需要實際的模型文件（可以跳過或 mock）
- 確保測試環境有足夠的臨時存儲空間

## 測試文件結構

```
tests/
├── conftest.py              # 共享 fixtures
├── test_database.py         # 數據庫測試 (已擴展)
├── test_logger.py           # 日誌測試
├── test_main.py             # API 測試 (已擴展)
├── test_processor.py        # 處理器測試 (已擴展)
├── test_integration.py      # 集成測試
└── README.md                # 測試說明
```

## 總結

通過添加 **34+ 個新測試**，重點覆蓋：
- ✅ 邊界情況和錯誤處理
- ✅ 路徑解析的各種場景
- ✅ 數據庫操作的完整性
- ✅ 視頻分析的完整流程
- ✅ 各種輸入驗證

預期可以將測試覆蓋率從 **32%** 提升到 **70-80%**。

