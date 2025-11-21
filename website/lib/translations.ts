export type Language = 'en' | 'zh-TW';

export interface Translations {
  nav: {
    features: string;
    screenshots: string;
    tech: string;
    demo: string;
    github: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    watchDemo: string;
    learnMore: string;
    accuracyLabel: string;
    accuracyValue: string;
  };
  features: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  screenshots: {
    title: string;
    description: string;
  };
  tech: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      ai: string;
    };
  };
  demo: {
    title: string;
    description: string;
    placeholder: string;
  };
  footer: {
    description: string;
    rights: string;
    author: string;
    email: string;
    linkedin: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      features: 'Features',
      screenshots: 'Screenshots',
      tech: 'Tech Stack',
      demo: 'Demo',
      github: 'GitHub',
    },
    hero: {
      badge: 'AI-Powered Volleyball Analysis',
      title: 'Transform Your Volleyball Game with Advanced Video Analysis',
      subtitle: 'Leverage cutting-edge computer vision and AI to analyze player movements, track ball trajectories, and gain actionable insights from your volleyball matches.',
      watchDemo: 'Watch Demo',
      learnMore: 'Learn More',
      accuracyLabel: 'Accuracy Rate',
      accuracyValue: '98.5%',
    },
    features: {
      title: 'Powerful Features',
      items: [
        {
          title: 'Ball Tracking',
          description: 'Real-time ball trajectory detection using VballNet ONNX model with high precision',
        },
        {
          title: 'Action Recognition',
          description: 'Player action classification (spike, set, receive, serve, block) using YOLOv11',
        },
        {
          title: 'Player Detection & Tracking',
          description: 'YOLOv8 + Norfair for player tracking across frames with confidence filtering',
        },
        {
          title: 'Interactive Timeline',
          description: 'Drag-to-seek timeline with event markers and real-time bounding boxes',
        },
        {
          title: 'Player Heatmap',
          description: 'Visualize player movement patterns with time-based filtering',
        },
        {
          title: 'Analytics Dashboard',
          description: 'Comprehensive statistics cards and visual insights for performance analysis',
        },
      ],
    },
    screenshots: {
      title: 'System Screenshots',
      description: 'Take a look at our intuitive interface and powerful features',
    },
    tech: {
      title: 'Professional Tech Stack',
      subtitle: 'Built with cutting-edge technologies',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI/ML',
      },
    },
    demo: {
      title: 'See It In Action',
      description: 'Watch how our system analyzes volleyball matches in real-time',
      placeholder: 'Demo video will be displayed here',
    },
    footer: {
      description: 'Advanced volleyball video analysis system powered by deep learning and computer vision.',
      rights: 'All rights reserved.',
      author: 'Yu-Jia Liang',
      email: 'ch993115@gmail.com',
      linkedin: 'LinkedIn Profile',
    },
  },
  'zh-TW': {
    nav: {
      features: '功能特色',
      screenshots: '系統截圖',
      tech: '技術棧',
      demo: '演示',
      github: 'GitHub',
    },
    hero: {
      badge: 'AI 驅動的排球分析',
      title: '基於深度學習的排球比賽分析系統',
      subtitle: '使用電腦視覺和深度學習技術追蹤排球軌跡、分析球員動作、識別關鍵事件，為球隊提供科學的數據分析工具。',
      watchDemo: '查看演示',
      learnMore: '了解更多',
      accuracyLabel: '準確率',
      accuracyValue: '98.5%',
    },
    features: {
      title: '強大功能',
      items: [
        {
          title: '球體追蹤',
          description: '使用 VballNet ONNX 模型進行高精度的即時球體軌跡檢測',
        },
        {
          title: '動作識別',
          description: '使用 YOLOv11 進行球員動作分類（扣球、舉球、接球、發球、攔網）',
        },
        {
          title: '球員檢測與追蹤',
          description: '使用 YOLOv8 + Norfair 進行跨幀球員追蹤並過濾低信心度檢測',
        },
        {
          title: '互動時間軸',
          description: '拖曳式時間軸，帶有事件標記和即時邊界框',
        },
        {
          title: '球員熱力圖',
          description: '基於時間過濾的球員移動模式視覺化',
        },
        {
          title: '分析儀表板',
          description: '全面的統計卡片和視覺化洞察，用於效能分析',
        },
      ],
    },
    screenshots: {
      title: '系統截圖',
      description: '查看我們直觀的界面和強大的功能',
    },
    tech: {
      title: '專業技術棧',
      subtitle: '採用最先進的技術構建',
      categories: {
        frontend: '前端',
        backend: '後端',
        ai: 'AI/ML',
      },
    },
    demo: {
      title: '實際演示',
      description: '觀看我們的系統如何即時分析排球比賽',
      placeholder: '演示影片將顯示在此處',
    },
    footer: {
      description: '由深度學習和電腦視覺驅動的先進排球影片分析系統。',
      rights: '版權所有。',
      author: '梁祐嘉',
      email: 'ch993115@gmail.com',
      linkedin: 'LinkedIn 個人資料',
    },
  },
};
