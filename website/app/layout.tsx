import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VolleyVision AI - 基於深度學習的排球比賽分析系統',
  description: '使用電腦視覺和深度學習技術追蹤排球軌跡、分析球員動作、優化團隊策略',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">{children}</body>
    </html>
  )
}

