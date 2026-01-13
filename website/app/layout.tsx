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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-[#0A0E1A] text-slate-100">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

