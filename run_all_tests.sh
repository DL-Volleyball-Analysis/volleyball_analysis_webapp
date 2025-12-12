#!/bin/bash

# 排球分析系統 - 完整測試套件（後端 + 前端）

echo "🧪 排球分析系統完整測試套件"
echo "=============================="
echo ""

# 檢查參數
BACKEND=true
FRONTEND=true
COVERAGE=false
HTML_REPORT=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --backend-only|-b)
            FRONTEND=false
            shift
            ;;
        --frontend-only|-f)
            BACKEND=false
            shift
            ;;
        --coverage|-c)
            COVERAGE=true
            shift
            ;;
        --html|-h)
            HTML_REPORT=true
            COVERAGE=true
            shift
            ;;
        *)
            echo "未知參數: $1"
            echo "用法: $0 [--backend-only|-b] [--frontend-only|-f] [--coverage|-c] [--html|-h]"
            exit 1
            ;;
    esac
done

EXIT_CODE=0

# ============================================
# 後端測試
# ============================================
if [ "$BACKEND" = true ]; then
    echo "📦 運行後端測試..."
    echo "-------------------"
    
    # 檢查虛擬環境
    if [ -z "$VIRTUAL_ENV" ]; then
        echo "⚠️  警告: 未檢測到虛擬環境"
        echo "   建議先激活虛擬環境: source venv/bin/activate"
        echo ""
    fi
    
    # 檢查 pytest
    if ! command -v pytest &> /dev/null; then
        echo "❌ pytest 未安裝"
        echo "   請運行: pip install -r requirements.txt"
        EXIT_CODE=1
    else
        PYTEST_CMD="pytest tests/"
        
        if [ "$COVERAGE" = true ]; then
            PYTEST_CMD="$PYTEST_CMD --cov=backend --cov=ai_core --cov-report=term-missing"
            
            if [ "$HTML_REPORT" = true ]; then
                PYTEST_CMD="$PYTEST_CMD --cov-report=html:htmlcov/backend"
            fi
        fi
        
        eval $PYTEST_CMD
        BACKEND_EXIT=$?
        
        if [ $BACKEND_EXIT -ne 0 ]; then
            EXIT_CODE=$BACKEND_EXIT
        fi
        
        echo ""
    fi
fi

# ============================================
# 前端測試
# ============================================
if [ "$FRONTEND" = true ]; then
    echo "🎨 運行前端測試..."
    echo "-------------------"
    
    # 檢查 Node.js
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安裝"
        echo "   請先安裝 Node.js"
        EXIT_CODE=1
    else
        cd frontend
        
        # 檢查 node_modules
        if [ ! -d "node_modules" ]; then
            echo "📦 安裝前端依賴..."
            npm install
        fi
        
        # 運行測試
        if [ "$COVERAGE" = true ]; then
            echo "運行前端測試並生成覆蓋率報告..."
            CI=true npm test -- --coverage --watchAll=false
        else
            echo "運行前端測試..."
            CI=true npm test -- --watchAll=false
        fi
        
        FRONTEND_EXIT=$?
        cd ..
        
        if [ $FRONTEND_EXIT -ne 0 ]; then
            EXIT_CODE=$FRONTEND_EXIT
        fi
        
        echo ""
    fi
fi

# ============================================
# 總結
# ============================================
echo "=============================="
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ 所有測試完成！"
else
    echo "❌ 部分測試失敗（退出碼: $EXIT_CODE）"
fi

if [ "$HTML_REPORT" = true ]; then
    echo ""
    echo "📊 查看覆蓋率報告:"
    if [ "$BACKEND" = true ]; then
        echo "   後端: open htmlcov/backend/index.html"
    fi
    if [ "$FRONTEND" = true ]; then
        echo "   前端: open frontend/coverage/lcov-report/index.html"
    fi
fi

exit $EXIT_CODE


