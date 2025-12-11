# 測試文件結構說明

## 組織原則

測試文件按**模組**分類，每個模組有獨立的測試文件，避免分散和重複。

## 文件結構

```
tests/
├── conftest.py              # 共享的 fixtures 和配置
├── test_database.py         # 數據庫模組測試 (database.py)
├── test_logger.py           # 日誌模組測試 (logger.py)
├── test_main.py             # API 端點測試 (main.py)
├── test_processor.py        # AI 處理器測試 (processor.py)
├── test_integration.py      # 端到端集成測試
└── README.md                # 本文件
```

## 各文件說明

### conftest.py
- **用途**: 共享的 pytest fixtures
- **內容**: 
  - `client`: FastAPI 測試客戶端
  - `sample_video_dict`: 示例視頻數據
  - `sample_frame`: 示例視頻幀
  - `sample_trajectory`: 示例軌跡數據
  - `sample_players`: 示例球員檢測數據
  - 其他通用 fixtures

### test_database.py
- **用途**: 測試 `backend/database.py` 模組
- **測試類**:
  - `TestDatabaseCRUD`: 數據庫 CRUD 操作
  - `TestJerseyMapping`: 球衣映射操作
  - `TestTaskManagement`: 任務管理操作
  - `TestDatabaseIntegration`: 數據庫集成測試

### test_logger.py
- **用途**: 測試 `ai_core/logger.py` 模組
- **測試類**:
  - `TestLoggerSetup`: 日誌設置測試
  - `TestAILogger`: AI 日誌器測試
  - `TestAPILogger`: API 日誌器測試
  - `TestLoggerIntegration`: 日誌集成測試

### test_main.py
- **用途**: 測試 `backend/main.py` 的所有 API 端點和函數
- **測試類**:
  - `TestRootAndHealth`: 根路徑和健康檢查
  - `TestUploadEndpoint`: 視頻上傳端點
  - `TestVideoCRUD`: 視頻 CRUD 操作
  - `TestAnalysisEndpoints`: 分析相關端點
  - `TestPlayVideoEndpoint`: 視頻播放端點
  - `TestJerseyMappingEndpoints`: 球衣映射端點
  - `TestPathResolution`: 路徑解析函數
  - `TestMigrationFunctions`: 遷移和掃描函數
  - `TestWebSocketEndpoints`: WebSocket 端點
  - `TestConnectionManager`: 連接管理器
  - `TestProcessVideo`: 視頻處理函數
  - `TestInputValidation`: 輸入驗證
  - `TestErrorResponses`: 錯誤響應
  - `TestCORS`: CORS 配置

### test_processor.py
- **用途**: 測試 `ai_core/processor.py` 模組
- **測試類**:
  - `TestAnalyzerInitialization`: 分析器初始化
  - `TestBallDetection`: 球檢測
  - `TestPlayerDetection`: 球員檢測
  - `TestActionDetection`: 動作檢測
  - `TestBallTrajectoryFiltering`: 球軌跡過濾
  - `TestPlayerTracking`: 球員追蹤
  - `TestIOUCalculation`: IOU 計算
  - `TestModelLoading`: 模型加載
  - `TestJerseyNumberDetection`: 球衣號碼檢測
  - `TestStablePlayerID`: 穩定球員 ID

### test_integration.py
- **用途**: 端到端集成測試
- **測試類**:
  - `TestAPIIntegration`: API 集成測試
  - `TestProcessorPreprocessing`: 處理器預處理集成
  - `TestProcessorDetection`: 處理器檢測集成
  - `TestProcessorPostprocessing`: 處理器後處理集成
  - `TestEndToEndWorkflow`: 端到端工作流測試

## 運行測試

### 運行所有測試
```bash
pytest tests/
```

### 運行特定模組測試
```bash
# 數據庫測試
pytest tests/test_database.py

# API 測試
pytest tests/test_main.py

# 處理器測試
pytest tests/test_processor.py

# 日誌測試
pytest tests/test_logger.py

# 集成測試
pytest tests/test_integration.py
```

### 運行特定測試類
```bash
pytest tests/test_main.py::TestUploadEndpoint
```

### 運行特定測試
```bash
pytest tests/test_main.py::TestUploadEndpoint::test_upload_video_success
```

### 查看覆蓋率
```bash
pytest tests/ --cov=backend --cov=ai_core --cov-report=html
```

## 測試命名規範

- **文件命名**: `test_<module_name>.py`
- **測試類命名**: `Test<FeatureName>`
- **測試方法命名**: `test_<what_is_being_tested>`

## 注意事項

1. **不要重複測試**: 每個功能只應該在一個地方測試
2. **使用 fixtures**: 共享的測試數據應該放在 `conftest.py`
3. **模組化**: 每個測試文件專注於一個模組
4. **集成測試**: 端到端測試應該放在 `test_integration.py`

