"""
排球分析系統 - SQLite 資料庫模組
提供視頻和分析任務的持久化存儲
"""

import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Optional
from pathlib import Path
import threading

# 線程本地存儲，確保每個線程使用自己的連接
_local = threading.local()

class Database:
    """SQLite 資料庫管理類"""
    
    def __init__(self, db_path: str = None):
        """
        初始化資料庫
        
        Args:
            db_path: 資料庫檔案路徑，預設為 data/volleyball.db
        """
        if db_path is None:
            db_path = str(Path(__file__).parent.parent / "data" / "volleyball.db")
        
        self.db_path = db_path
        
        # 確保目錄存在
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        
        # 初始化資料表
        self._init_tables()
        print(f"✅ SQLite 資料庫已初始化: {db_path}")
    
    def _get_connection(self) -> sqlite3.Connection:
        """獲取當前線程的資料庫連接"""
        if not hasattr(_local, 'connection') or _local.connection is None:
            _local.connection = sqlite3.connect(self.db_path, check_same_thread=False)
            _local.connection.row_factory = sqlite3.Row
        return _local.connection
    
    def _init_tables(self):
        """初始化資料表"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        # 視頻資料表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS videos (
                id TEXT PRIMARY KEY,
                filename TEXT NOT NULL,
                original_filename TEXT,
                file_path TEXT NOT NULL,
                upload_time TEXT NOT NULL,
                status TEXT DEFAULT 'uploaded',
                file_size INTEGER DEFAULT 0,
                task_id TEXT,
                analysis_time TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 分析任務資料表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS analysis_tasks (
                task_id TEXT PRIMARY KEY,
                video_id TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                progress REAL DEFAULT 0,
                start_time TEXT,
                end_time TEXT,
                error TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (video_id) REFERENCES videos(id)
            )
        ''')
        
        # 球衣號碼映射資料表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS jersey_mappings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                video_id TEXT NOT NULL,
                track_id INTEGER NOT NULL,
                jersey_number INTEGER NOT NULL,
                frame INTEGER,
                bbox TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (video_id) REFERENCES videos(id),
                UNIQUE(video_id, track_id)
            )
        ''')
        
        conn.commit()
    
    # ========== 視頻操作 ==========
    
    def add_video(self, video_data: Dict) -> bool:
        """添加視頻記錄"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO videos (id, filename, original_filename, file_path, upload_time, status, file_size)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                video_data['id'],
                video_data.get('filename', ''),
                video_data.get('original_filename', video_data.get('filename', '')),
                video_data.get('file_path', ''),
                video_data.get('upload_time', datetime.now().isoformat()),
                video_data.get('status', 'uploaded'),
                video_data.get('file_size', 0)
            ))
            
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            # 記錄已存在，更新
            return self.update_video(video_data['id'], video_data)
        except Exception as e:
            print(f"❌ 添加視頻失敗: {e}")
            return False
    
    def get_video(self, video_id: str) -> Optional[Dict]:
        """獲取單個視頻記錄"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM videos WHERE id = ?', (video_id,))
        row = cursor.fetchone()
        
        if row:
            return dict(row)
        return None
    
    def get_all_videos(self) -> List[Dict]:
        """獲取所有視頻記錄"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM videos ORDER BY upload_time DESC')
        rows = cursor.fetchall()
        
        return [dict(row) for row in rows]
    
    def update_video(self, video_id: str, data: Dict) -> bool:
        """更新視頻記錄"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            # 構建動態更新語句
            updates = []
            values = []
            
            for key, value in data.items():
                if key != 'id':
                    updates.append(f"{key} = ?")
                    values.append(value)
            
            if not updates:
                return True
            
            values.append(video_id)
            updates.append("updated_at = ?")
            values.insert(-1, datetime.now().isoformat())
            
            query = f"UPDATE videos SET {', '.join(updates)} WHERE id = ?"
            cursor.execute(query, values)
            
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"❌ 更新視頻失敗: {e}")
            return False
    
    def delete_video(self, video_id: str) -> bool:
        """刪除視頻記錄"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            # 先刪除相關的球衣映射
            cursor.execute('DELETE FROM jersey_mappings WHERE video_id = ?', (video_id,))
            
            # 刪除相關的任務
            cursor.execute('DELETE FROM analysis_tasks WHERE video_id = ?', (video_id,))
            
            # 刪除視頻
            cursor.execute('DELETE FROM videos WHERE id = ?', (video_id,))
            
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"❌ 刪除視頻失敗: {e}")
            return False
    
    # ========== 分析任務操作 ==========
    
    def add_task(self, task_data: Dict) -> bool:
        """添加分析任務"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO analysis_tasks (task_id, video_id, status, progress, start_time)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                task_data['task_id'],
                task_data['video_id'],
                task_data.get('status', 'processing'),
                task_data.get('progress', 0),
                task_data.get('start_time', datetime.now().isoformat())
            ))
            
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ 添加任務失敗: {e}")
            return False
    
    def get_task(self, task_id: str) -> Optional[Dict]:
        """獲取任務狀態"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM analysis_tasks WHERE task_id = ?', (task_id,))
        row = cursor.fetchone()
        
        if row:
            return dict(row)
        return None
    
    def update_task(self, task_id: str, data: Dict) -> bool:
        """更新任務狀態"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            updates = []
            values = []
            
            for key, value in data.items():
                if key != 'task_id':
                    updates.append(f"{key} = ?")
                    values.append(value)
            
            if not updates:
                return True
            
            values.append(task_id)
            query = f"UPDATE analysis_tasks SET {', '.join(updates)} WHERE task_id = ?"
            cursor.execute(query, values)
            
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"❌ 更新任務失敗: {e}")
            return False
    
    # ========== 球衣映射操作 ==========
    
    def set_jersey_mapping(self, video_id: str, track_id: int, jersey_number: int, 
                           frame: int = None, bbox: List[float] = None) -> bool:
        """設置球衣號碼映射"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            bbox_json = json.dumps(bbox) if bbox else None
            
            cursor.execute('''
                INSERT OR REPLACE INTO jersey_mappings (video_id, track_id, jersey_number, frame, bbox)
                VALUES (?, ?, ?, ?, ?)
            ''', (video_id, track_id, jersey_number, frame, bbox_json))
            
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ 設置球衣映射失敗: {e}")
            return False
    
    def get_jersey_mappings(self, video_id: str) -> Dict:
        """獲取視頻的所有球衣映射"""
        conn = self._get_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM jersey_mappings WHERE video_id = ?', (video_id,))
        rows = cursor.fetchall()
        
        mappings = {}
        for row in rows:
            mappings[str(row['track_id'])] = {
                'jersey_number': row['jersey_number'],
                'frame': row['frame'],
                'bbox': json.loads(row['bbox']) if row['bbox'] else None,
                'timestamp': row['created_at']
            }
        
        return mappings
    
    def delete_jersey_mapping(self, video_id: str, track_id: int) -> bool:
        """刪除球衣映射"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('DELETE FROM jersey_mappings WHERE video_id = ? AND track_id = ?', 
                          (video_id, track_id))
            
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"❌ 刪除球衣映射失敗: {e}")
            return False
    
    # ========== 資料遷移 ==========
    
    def migrate_from_json(self, videos_db: List[Dict], jersey_mappings: Dict):
        """從 JSON 遷移資料到 SQLite"""
        print("📦 開始從 JSON 遷移資料到 SQLite...")
        
        # 遷移視頻資料
        for video in videos_db:
            self.add_video(video)
        
        # 遷移球衣映射
        for video_id, mappings in jersey_mappings.items():
            for track_id, data in mappings.items():
                self.set_jersey_mapping(
                    video_id=video_id,
                    track_id=int(track_id),
                    jersey_number=data.get('jersey_number', 0),
                    frame=data.get('frame'),
                    bbox=data.get('bbox')
                )
        
        print(f"✅ 遷移完成: {len(videos_db)} 個視頻, {sum(len(m) for m in jersey_mappings.values())} 個映射")
    
    def close(self):
        """關閉資料庫連接"""
        if hasattr(_local, 'connection') and _local.connection:
            _local.connection.close()
            _local.connection = None


# 全局資料庫實例
_db_instance: Optional[Database] = None

def get_database() -> Database:
    """獲取資料庫單例"""
    global _db_instance
    if _db_instance is None:
        _db_instance = Database()
    return _db_instance
