import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'
import { useClipboard } from '../hooks/useClipboard'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { accounts, siteUrl } = weddingConfig
  const { copy: copyLink, copied: linkCopied } = useClipboard()

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: weddingConfig.siteTitle,
        text: weddingConfig.siteDescription,
        url: siteUrl,
      }).catch(() => {})
    } else {
      copyLink(siteUrl)
    }
  }

  return (
    <section ref={ref} className="py-20 px-6 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary-light" />
          <span className="text-primary text-xl">✦</span>
          <div className="w-12 h-px bg-primary-light" />
        </div>

        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">연락 및 안내</h2>

        {/* 계좌 정보 */}
        <div className="mb-8">
          <h3 className="text-sm text-text-sub font-medium mb-4 text-center">마음 전하기</h3>
          <div className="space-y-4">
            {(['신랑', '신부'] as const).map((side) => {
              const sideAccounts = accounts.filter((a) => a.label === side)
              if (!sideAccounts.length) return null
              return (
                <div key={side} className="bg-bg rounded-2xl border border-border overflow-hidden shadow-md">
                  <div className="px-4 py-2 bg-surface border-b border-border">
                    <p className="text-xs font-medium text-text-sub tracking-wide">{side}측</p>
                  </div>
                  <div className="divide-y divide-border">
                    {sideAccounts.map((acc) => (
                      <AccountCard key={acc.holder} account={acc} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 공유 */}
        <div>
          <h3 className="text-sm text-text-sub font-medium mb-3 text-center">청첩장 공유</h3>
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 bg-primary text-bg py-4 rounded-2xl font-medium text-sm active:scale-95 transition-transform shadow-md"
          >
            <span>🔗</span>
            <span>{linkCopied ? '링크 복사됨!' : '청첩장 공유하기'}</span>
          </button>
        </div>

      </motion.div>
    </section>
  )
}

function AccountCard({ account }: { account: { bank: string; number: string; holder: string; label: string } }) {
  const { copy, copied } = useClipboard()
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-xs text-text-sub mb-0.5">{account.holder} · {account.bank}</p>
        <p className="text-text-main text-sm font-medium font-mono">{account.number}</p>
      </div>
      <button
        onClick={() => copy(account.number)}
        className="bg-primary text-bg text-xs px-4 py-2 rounded-full whitespace-nowrap active:scale-95 transition-transform"
      >
        {copied ? '복사됨!' : '복사'}
      </button>
    </div>
  )
}
