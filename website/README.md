# VolleyVision AI 展示網站

這是基於深度學習的排球比賽分析系統的展示網站，使用 Next.js 14 和 Tailwind CSS 構建。

## 功能特色

- 🎨 現代化的設計風格
- 📱 響應式設計，支持移動設備
- 🎯 技術棧展示（使用網格佈局）
- 📸 系統截圖展示
- 🎬 演示影片區域（預留）
- ✨ 流暢的動畫效果

## 技術棧

- **Next.js 14** - React 框架
- **TypeScript** - 類型安全
- **Tailwind CSS** - 樣式框架
- **React Icons** - 圖標庫

## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看網站。

### 構建生產版本

```bash
npm run build
npm start
```

## 專案結構

```
website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根佈局
│   ├── page.tsx          # 首頁
│   └── globals.css        # 全局樣式
├── components/            # React 組件
│   ├── Navigation.tsx     # 導航欄
│   ├── Hero.tsx           # 首頁 Hero 區域
│   ├── Features.tsx       # 功能特色
│   ├── SystemScreenshots.tsx  # 系統截圖
│   ├── ProfessionalAt.tsx # 技術棧展示
│   ├── DemoSection.tsx    # 演示區域
│   ├── Footer.tsx         # 頁腳
│   ├── MouseFollow.tsx    # 滑鼠跟隨效果
│   └── Copy.tsx           # 動畫包裝組件
├── public/                 # 靜態資源
│   └── images/            # 圖片資源
└── package.json           # 依賴配置
```

## 添加演示影片

要添加演示影片，請編輯 `components/DemoSection.tsx` 文件，將佔位符替換為實際的影片元素：

```tsx
<video controls className="w-full h-full">
  <source src="/videos/demo.mp4" type="video/mp4" />
</video>
```

## 自定義

### 修改顏色主題

編輯 `app/globals.css` 中的 CSS 變數：

```css
:root {
  --background: #0f172a;
  --foreground: #e2e8f0;
  --border: #1e293b;
}
```

### 更新技術棧

編輯 `components/ProfessionalAt.tsx` 中的 `techStack` 數組。

## 部署

### Vercel（推薦）

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# 將 out/ 目錄部署到 GitHub Pages
```

## 授權

本專題為國立臺灣海洋大學資訊工程學系專題報告。

## 聯絡資訊

- **作者**: 梁祐嘉
- **Email**: ch993115@gmail.com
- **GitHub**: [@itsYoga](https://github.com/itsYoga)

