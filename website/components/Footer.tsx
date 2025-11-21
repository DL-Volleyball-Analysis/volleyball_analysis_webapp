export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">關於專題</h3>
            <p className="text-sm text-slate-400">
              國立臺灣海洋大學資訊工程學系專題報告
            </p>
            <p className="text-sm text-slate-400 mt-2">
              基於深度學習的排球比賽分析系統
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">技術支援</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="https://github.com/itsYoga" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  GitHub 儲存庫
                </a>
              </li>
              <li>
                <a href="https://github.com/itsYoga/volleyball-analysis/issues" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  問題回報
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">聯絡資訊</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>作者：梁祐嘉</li>
              <li>
                <a href="mailto:ch993115@gmail.com" className="hover:text-blue-400 transition">
                  ch993115@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-base text-slate-500">
            &copy; 2025 梁祐嘉. 本專題為國立臺灣海洋大學資訊工程學系專題報告。
          </p>
        </div>
      </div>
    </footer>
  );
}

