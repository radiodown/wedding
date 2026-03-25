import { useState, useEffect } from 'react'
import { themes } from '../styles/themes'
import { weddingConfig } from '../data/wedding'

// ── 개발 환경에서만 렌더링됩니다 (import.meta.env.DEV = false 시 null 반환)
export default function DevThemeSwitcher() {
  if (!import.meta.env.DEV) return null

  return <ThemeSwitcherUI />
}

function ThemeSwitcherUI() {
  const [current, setCurrent] = useState(weddingConfig.theme)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', current)
  }, [current])

  return (
    <div className="fixed bottom-20 right-4 z-[9999] flex flex-col items-end gap-2">
      {/* 패널 */}
      {open && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-56">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
            🎨 테마 선택 (DEV)
          </p>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setCurrent(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                  current === theme.id
                    ? 'ring-2 ring-offset-1 ring-gray-400 bg-gray-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* 색상 미리보기 스와치 */}
                <div className="flex gap-1 shrink-0">
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ background: theme.bg }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ background: theme.primary }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ background: theme.text }}
                  />
                </div>
                <span className="text-gray-700 text-left">{theme.label}</span>
                {current === theme.id && (
                  <span className="ml-auto text-gray-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-center">
            프로덕션 빌드에서는 숨겨집니다
          </p>
        </div>
      )}

      {/* 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-gray-800 text-white shadow-xl flex items-center justify-center text-lg hover:bg-gray-700 active:scale-95 transition-all"
        title="테마 스위처 (DEV only)"
      >
        🎨
      </button>
    </div>
  )
}
