# Backend Test Coverage Improvements

## 概述

為了提高後端測試覆蓋率（從 32% 提升），我創建了兩個新的測試文件：

1. `tests/test_main_extended.py` - 擴展的 main.py 測試
2. `tests/test_processor_extended.py` - 擴展的 processor.py 測試

## 新增測試覆蓋

### test_main_extended.py (新增 ~200+ 測試用例)

#### 1. Root 和 Health 端點測試
- ✅ `test_root_endpoint` - 測試根路徑端點

#### 2. Upload 端點測試
- ✅ `test_upload_video_success` - 成功上傳視頻
- ✅ `test_upload_without_file` - 無文件上傳錯誤處理
- ✅ `test_upload_empty_file` - 空文件上傳處理

#### 3. Video CRUD 擴展測試
- ✅ `test_update_video_success` - 成功更新視頻文件名
- ✅ `test_update_video_nonexistent` - 更新不存在的視頻

#### 4. Analysis 端點擴展測試
- ✅ `test_start_analysis_success` - 成功開始分析
- ✅ `test_start_analysis_nonexistent_video` - 不存在的視頻分析
- ✅ `test_get_results_success` - 成功獲取結果
- ✅ `test_get_results_nonexistent` - 獲取不存在的結果

#### 5. Play Video 端點測試
- ✅ `test_play_video_success` - 成功播放視頻
- ✅ `test_play_video_nonexistent` - 播放不存在的視頻
- ✅ `test_play_video_with_range_header` - 帶 Range 頭的視頻播放（支持跳轉）

#### 6. Jersey Mapping 端點擴展測試
- ✅ `test_set_jersey_mapping_success` - 成功設置球衣映射
- ✅ `test_set_jersey_mapping_nonexistent_video` - 為不存在的視頻設置映射
- ✅ `test_get_jersey_mappings_success` - 成功獲取映射
- ✅ `test_delete_jersey_mapping_success` - 成功刪除映射
- ✅ `test_delete_jersey_mapping_nonexistent` - 刪除不存在的映射

#### 7. 路徑解析函數測試
- ✅ `test_resolve_video_path_relative` - 解析相對路徑
- ✅ `test_resolve_video_path_absolute` - 解析絕對路徑
- ✅ `test_resolve_video_path_alternative_locations` - 從備選位置解析
- ✅ `test_resolve_results_path_success` - 成功解析結果路徑
- ✅ `test_resolve_results_path_nonexistent` - 解析不存在的結果路徑

#### 8. 遷移和掃描函數測試
- ✅ `test_migrate_json_to_sqlite_already_migrated` - 已遷移的情況
- ✅ `test_save_videos_db_compatibility` - 兼容函數測試
- ✅ `test_load_videos_db_compatibility` - 兼容函數測試
- ✅ `test_scan_existing_videos` - 掃描現有視頻

#### 9. WebSocket 端點測試（Mocked）
- ✅ `test_websocket_analysis_nonexistent_video` - WebSocket 分析不存在的視頻
- ✅ `test_websocket_progress_completed` - WebSocket 進度（已完成）
- ✅ `test_websocket_progress_nonexistent_video` - WebSocket 進度（不存在的視頻）

#### 10. ConnectionManager 測試
- ✅ `test_connection_manager_connect` - 連接管理
- ✅ `test_connection_manager_disconnect` - 斷開連接
- ✅ `test_connection_manager_send_progress_success` - 成功發送進度
- ✅ `test_connection_manager_send_progress_not_connected` - 未連接時發送進度

#### 11. Process Video 函數測試
- ✅ `test_process_video_success` - 成功處理視頻
- ✅ `test_process_video_nonexistent_video` - 處理不存在的視頻

#### 12. 錯誤處理測試
- ✅ `test_upload_error_handling` - 上傳錯誤處理
- ✅ `test_delete_video_error_handling` - 刪除視頻錯誤處理

---

### test_processor_extended.py (新增 ~50+ 測試用例)

#### 1. Ball Detection 測試
- ✅ `test_detect_ball_no_model` - 無模型時的檢測
- ✅ `test_detect_ball_with_yolo_fallback` - YOLO 備選檢測
- ✅ `test_preprocess_ball_frame` - 球幀預處理
- ✅ `test_postprocess_ball_output_valid` - 有效輸出後處理
- ✅ `test_postprocess_ball_output_invalid` - 無效輸出後處理
- ✅ `test_ball_frame_buffer_management` - 緩衝區管理

#### 2. Player Detection 測試
- ✅ `test_detect_players_no_model` - 無模型時的檢測
- ✅ `test_detect_players_with_model` - 有模型時的檢測
- ✅ `test_detect_players_low_confidence_filter` - 低置信度過濾

#### 3. Action Detection 測試
- ✅ `test_detect_actions_no_model` - 無模型時的檢測
- ✅ `test_detect_actions_with_model` - 有模型時的檢測
- ✅ `test_detect_actions_low_confidence_filter` - 低置信度過濾

#### 4. Ball Trajectory Filtering 測試
- ✅ `test_filter_ball_trajectory_short` - 短軌跡過濾
- ✅ `test_basic_velocity_filter` - 基本速度過濾
- ✅ `test_basic_velocity_filter_low_confidence` - 低置信度速度過濾
- ✅ `test_physics_based_outlier_removal` - 物理模型異常點移除
- ✅ `test_smooth_ball_trajectory` - 軌跡平滑
- ✅ `test_interpolate_missing_frames` - 缺失幀插值
- ✅ `test_interpolate_missing_frames_large_gap` - 大間隔插值（不應插值）

#### 5. Player Tracking 測試
- ✅ `test_track_players_empty` - 空列表追蹤
- ✅ `test_track_players_with_detections` - 有檢測時的追蹤
- ✅ `test_assign_action_to_player` - 動作分配給球員
- ✅ `test_assign_action_to_player_no_players` - 無球員時的動作分配
- ✅ `test_assign_action_to_player_distance_match` - 距離匹配

#### 6. IOU Calculation 測試
- ✅ `test_iou_overlapping_boxes` - 重疊框的 IOU
- ✅ `test_iou_identical_boxes` - 相同框的 IOU
- ✅ `test_iou_non_overlapping_boxes` - 不重疊框的 IOU
- ✅ `test_iou_edge_case_zero_area` - 零面積邊界情況

#### 7. Model Loading 測試
- ✅ `test_load_ball_model_nonexistent` - 載入不存在的球模型
- ✅ `test_load_action_model_nonexistent` - 載入不存在的動作模型
- ✅ `test_load_player_model_nonexistent` - 載入不存在的球員模型
- ✅ `test_load_jersey_number_model_nonexistent` - 載入不存在的球衣號碼模型

#### 8. Jersey Number Detection 測試
- ✅ `test_detect_jersey_number_no_models` - 無模型時的檢測
- ✅ `test_preprocess_roi` - ROI 預處理
- ✅ `test_preprocess_roi_grayscale` - 灰度 ROI 預處理
- ✅ `test_merge_digit_detections_single_digit` - 單數字合併
- ✅ `test_merge_digit_detections_two_digits` - 兩位數合併
- ✅ `test_merge_digit_detections_low_confidence` - 低置信度數字合併
- ✅ `test_merge_digit_detections_far_apart` - 距離較遠的數字合併

#### 9. Stable Player ID 測試
- ✅ `test_get_stable_player_id_no_jersey` - 無球衣號碼時的穩定 ID
- ✅ `test_set_jersey_number_mapping` - 設置球衣號碼映射

---

## 預期覆蓋率提升

### Before (當前)
- Backend 總體: **32%**
- `main.py`: **36%**
- `processor.py`: **18%**

### After (預期)
- Backend 總體: **50-60%+** (目標)
- `main.py`: **60-70%+**
- `processor.py`: **40-50%+**

## 測試統計

### test_main_extended.py
- **總測試數**: ~30+ 個測試用例
- **覆蓋端點**: 
  - `/` (root)
  - `/upload`
  - `/analyze/{video_id}`
  - `/results/{video_id}`
  - `/play/{video_id}`
  - `/videos/{video_id}` (PUT)
  - `/videos/{video_id}/jersey-mapping` (POST, GET, DELETE)
  - WebSocket endpoints (`/ws/analysis/{video_id}`, `/ws/progress/{video_id}`)
- **覆蓋函數**:
  - `resolve_video_path()`
  - `resolve_results_path()`
  - `migrate_json_to_sqlite()`
  - `scan_existing_videos()`
  - `process_video()`
  - `ConnectionManager` 類

### test_processor_extended.py
- **總測試數**: ~50+ 個測試用例
- **覆蓋方法**:
  - `detect_ball()`
  - `detect_players()`
  - `detect_actions()`
  - `preprocess_ball_frame()`
  - `postprocess_ball_output()`
  - `_filter_ball_trajectory()`
  - `_basic_velocity_filter()`
  - `_physics_based_outlier_removal()`
  - `_smooth_ball_trajectory()`
  - `_interpolate_missing_frames()`
  - `track_players()`
  - `assign_action_to_player()`
  - `_iou()`
  - `_detect_jersey_number()`
  - `_preprocess_roi()`
  - `_merge_digit_detections()`
  - `_get_stable_player_id()`
  - Model loading methods

## 運行測試

### 運行所有新測試
```bash
cd /Users/jesse/Documents/專題/volleyball_analysis_webapp
python3 -m pytest tests/test_main_extended.py tests/test_processor_extended.py -v
```

### 運行並查看覆蓋率
```bash
python3 -m pytest tests/ --cov=backend --cov=ai_core --cov-report=term-missing
```

### 運行特定測試類
```bash
python3 -m pytest tests/test_main_extended.py::TestUploadEndpoint -v
python3 -m pytest tests/test_processor_extended.py::TestBallTrajectoryFiltering -v
```

## 測試特點

### 1. 使用 Mock 和 Patch
- Mock 外部依賴（數據庫、文件系統、模型）
- Patch 全局變量和模組級變量
- 使用 AsyncMock 測試異步函數

### 2. 邊界條件測試
- 空輸入
- 無效輸入
- 不存在的資源
- 錯誤情況

### 3. 集成測試
- 測試函數之間的交互
- 測試端到端流程
- 測試錯誤傳播

### 4. 覆蓋率重點
- **main.py**: 重點測試 API 端點和輔助函數
- **processor.py**: 重點測試核心算法和檢測方法

## 下一步改進建議

### 短期（立即）
1. ✅ 運行測試確保所有測試通過
2. ✅ 檢查覆蓋率報告，找出未覆蓋的代碼路徑
3. ✅ 修復任何測試失敗

### 中期（1-2週）
1. 添加更多邊界條件測試
2. 測試異常情況和錯誤處理
3. 增加集成測試覆蓋率

### 長期（1個月）
1. 目標達到 70%+ 總體覆蓋率
2. 添加性能測試
3. 添加負載測試

## 注意事項

1. **依賴項**: 確保安裝了所有測試依賴（pytest, pytest-cov, pytest-asyncio）
2. **數據庫**: 測試使用臨時數據庫，不會影響生產數據
3. **文件系統**: 測試使用臨時目錄，不會影響實際文件
4. **Mock**: 某些測試需要 Mock 外部依賴（如 AI 模型）

## 文件位置

- `tests/test_main_extended.py` - main.py 擴展測試
- `tests/test_processor_extended.py` - processor.py 擴展測試
- `tests/test_backend.py` - 現有後端測試
- `tests/test_api.py` - 現有 API 測試
- `tests/test_integration.py` - 現有集成測試

## 更新記錄

- 2025-12-10: 創建初始版本，添加 ~80+ 新測試用例

