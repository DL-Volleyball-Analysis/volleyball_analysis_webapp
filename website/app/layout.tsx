import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'VolleyVision AI - Advanced Volleyball Analysis System | 基於深度學習的排球比賽分析系統',
  description: 'AI-powered volleyball video analysis using computer vision and deep learning | 使用電腦視覺和深度學習技術追蹤排球軌跡、分析球員動作、優化團隊策略',
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${basePath}/icon.svg`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-900 text-slate-100">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

