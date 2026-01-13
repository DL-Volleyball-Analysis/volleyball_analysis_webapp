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
    getStarted: string;
  };
    demo: {
      badge: string;
      title: string;
      subtitle: string;
      tabs: {
        tracking: string;
        ball: string;
        court: string;
        heatmap: string;
      };
      trackingTitle: string;
      trackingDesc: string;
      ballTitle: string;
      ballDesc: string;
      courtTitle: string;
      courtDesc: string;
      heatmapTitle: string;
      heatmapDesc: string;
      viewAnalysis: string;
      playersTracked: string;
      accuracy: string;
      processing: string;
      actionTypes: string;
      precision: string;
      coverage: string;
      zonesMapped: string;
      calibration: string;
      cameraAngle: string;
      perPlayer: string;
      analysis: string;
      team: string;
      timeBased: string;
    };
  stats: {
    accuracy: string;
    processing: string;
    events: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  screenshots: {
    badge: string;
    title: string;
    subtitle: string;
    clickToEnlarge: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
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
  footer: {
    description: string;
    product: string;
    resources: string;
    connect: string;
    rights: string;
    privacy: string;
    terms: string;
    contact: string;
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
      getStarted: 'Get Started',
    },
    demo: {
      badge: 'See It In Action',
      title: 'Experience the Power of AI Analysis',
      subtitle: 'Explore how our system analyzes every aspect of volleyball gameplay with precision and speed.',
      tabs: {
        tracking: 'Player Tracking',
        ball: 'Ball Analysis',
        court: 'Court Detection',
        heatmap: 'Heat Maps',
      },
      trackingTitle: 'Real-time Player Detection',
      trackingDesc: 'Our AI tracks each player\'s position, movement speed, and orientation throughout the match. Bounding boxes and IDs are maintained even during occlusions.',
      ballTitle: 'Action Recognition & Ball Tracking',
      ballDesc: 'Track the volleyball\'s path and identify key actions like serves, spikes, and blocks. Analyze velocities and predict landing zones with our advanced physics engine.',
      courtTitle: 'Automatic Court Detection',
      courtDesc: 'Our system automatically identifies court boundaries, zones, and lines regardless of camera angle. This enables accurate spatial analysis and positioning metrics.',
      heatmapTitle: 'Advanced Statistics & Heat Maps',
      heatmapDesc: 'Visualize player coverage areas and movement patterns throughout the match. Identify hot zones, defensive gaps, and optimize positioning strategies.',
      viewAnalysis: 'View Analysis',
      playersTracked: 'Players Tracked',
      accuracy: 'Accuracy',
      processing: 'Processing',
      actionTypes: 'Action Types',
      precision: 'Precision',
      coverage: 'Coverage',
      zonesMapped: 'Zones Mapped',
      calibration: 'Calibration',
      cameraAngle: 'Camera Angle',
      perPlayer: 'Per Player',
      analysis: 'Analysis',
      team: 'Team',
      timeBased: 'Time Based',
    },
    stats: {
      accuracy: 'Accuracy Rate',
      processing: 'Processing Speed',
      events: 'Events Detected',
    },
    features: {
      badge: 'Powerful Features',
      title: 'Everything You Need for Match Analysis',
      subtitle: 'Our comprehensive suite of AI-powered tools helps coaches and players gain deep insights into every aspect of the game.',
      items: [
        { title: 'Ball Tracking', description: 'Real-time ball trajectory detection using VballNet ONNX model with high precision' },
        { title: 'Action Recognition', description: 'Player action classification (spike, set, receive, serve, block) using YOLOv11' },
        { title: 'Player Detection', description: 'YOLOv8 + Norfair for player tracking across frames with confidence filtering' },
        { title: 'Interactive Timeline', description: 'Drag-to-seek timeline with event markers and real-time bounding boxes' },
        { title: 'Player Heatmap', description: 'Visualize player movement patterns with time-based filtering' },
        { title: 'Analytics Dashboard', description: 'Comprehensive statistics cards and visual insights for performance analysis' },
      ],
    },
    screenshots: {
      badge: 'Screenshots',
      title: 'System Interface',
      subtitle: 'Take a look at our intuitive interface and powerful features',
      clickToEnlarge: 'Click to enlarge',
      items: [
        { title: 'Dashboard Interface', description: 'System dashboard showing all videos and analysis status' },
        { title: 'Video Playback & Analysis', description: 'Interactive player with drag-to-seek timeline and event markers' },
        { title: 'Player Detection & Tracking', description: 'Real-time player bounding boxes and tracking IDs' },
        { title: 'Action Recognition', description: 'Automatic identification and annotation of five key actions' },
        { title: 'Player Statistics', description: 'Detailed player action statistics and analysis' },
      ],
    },
    howItWorks: {
      badge: 'How It Works',
      title: 'Simple Three-Step Process',
      subtitle: 'Get started with VolleyVision AI in minutes',
      steps: [
        { title: 'Upload Video', description: 'Upload your volleyball match video in any common format (MP4, MOV, AVI)' },
        { title: 'AI Processing', description: 'Our AI models analyze player movements, ball trajectories, and game events' },
        { title: 'View Insights', description: 'Access detailed statistics, heatmaps, and actionable coaching insights' },
      ],
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
    footer: {
      description: 'Advanced AI-powered volleyball analysis for teams and coaches.',
      product: 'Product',
      resources: 'Resources',
      connect: 'Connect',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
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
      getStarted: '開始使用',
    },
    demo: {
      badge: '實際演示',
      title: '體驗 AI 分析的強大功能',
      subtitle: '探索我們的系統如何精準且快速地分析排球比賽的各個面向。',
      tabs: {
        tracking: '球員追蹤',
        ball: '球體分析',
        court: '場地檢測',
        heatmap: '熱力圖',
      },
      trackingTitle: '即時球員檢測',
      trackingDesc: '我們的 AI 追蹤每位球員的位置、移動速度和方向。即使在遮擋情況下也能保持邊界框和 ID。',
      ballTitle: '動作識別與球體追蹤',
      ballDesc: '追蹤排球的路徑並識別關鍵動作，如發球、扣球和攔網。使用進階物理引擎分析速度並預測落點。',
      courtTitle: '自動場地檢測',
      courtDesc: '我們的系統自動識別場地邊界、區域和線條，不受攝影機角度影響。這使得精確的空間分析和定位指標成為可能。',
      heatmapTitle: '進階統計與熱力圖',
      heatmapDesc: '視覺化比賽中球員的覆蓋範圍和移動模式。識別熱區、防守缺口，優化位置策略。',
      viewAnalysis: '查看分析',
      playersTracked: '追蹤球員數',
      accuracy: '準確率',
      processing: '處理速度',
      actionTypes: '動作類型',
      precision: '精確度',
      coverage: '覆蓋率',
      zonesMapped: '區域映射',
      calibration: '校準',
      cameraAngle: '攝影機角度',
      perPlayer: '個人',
      analysis: '分析',
      team: '團隊',
      timeBased: '時間軸',
    },
    stats: {
      accuracy: '準確率',
      processing: '處理速度',
      events: '事件檢測',
    },
    features: {
      badge: '強大功能',
      title: '比賽分析所需的一切',
      subtitle: '我們全面的 AI 工具套件幫助教練和球員深入了解比賽的每個面向。',
      items: [
        { title: '球體追蹤', description: '使用 VballNet ONNX 模型進行高精度的即時球體軌跡檢測' },
        { title: '動作識別', description: '使用 YOLOv11 進行球員動作分類（扣球、舉球、接球、發球、攔網）' },
        { title: '球員檢測', description: '使用 YOLOv8 + Norfair 進行跨幀球員追蹤並過濾低信心度檢測' },
        { title: '互動時間軸', description: '拖曳式時間軸，帶有事件標記和即時邊界框' },
        { title: '球員熱力圖', description: '視覺化球員移動模式，支援時間過濾' },
        { title: '分析儀表板', description: '全面的統計卡片和視覺化洞察，用於效能分析' },
      ],
    },
    screenshots: {
      badge: '系統截圖',
      title: '系統介面',
      subtitle: '查看我們直觀的介面和強大的功能',
      clickToEnlarge: '點擊放大',
      items: [
        { title: '儀表板介面', description: '系統儀表板顯示所有影片和分析狀態' },
        { title: '影片播放與分析', description: '互動式播放器，支援拖曳時間軸和事件標記' },
        { title: '球員檢測與追蹤', description: '即時球員邊界框和追蹤 ID' },
        { title: '動作識別', description: '自動識別和標註五種關鍵動作' },
        { title: '球員統計', description: '詳細的球員動作統計和分析' },
      ],
    },
    howItWorks: {
      badge: '使用方式',
      title: '簡單三步驟流程',
      subtitle: '幾分鐘內開始使用 VolleyVision AI',
      steps: [
        { title: '上傳影片', description: '上傳任何常見格式（MP4、MOV、AVI）的排球比賽影片' },
        { title: 'AI 處理', description: '我們的 AI 模型分析球員動作、球體軌跡和比賽事件' },
        { title: '查看洞察', description: '存取詳細統計、熱力圖和可操作的教練洞察' },
      ],
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
    footer: {
      description: '為球隊和教練提供的先進 AI 排球分析系統。',
      product: '產品',
      resources: '資源',
      connect: '聯繫',
      rights: '版權所有。',
      privacy: '隱私政策',
      terms: '服務條款',
      contact: '聯絡我們',
    },
  },
};

