import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

function calcDday(): number {
  const { year, month, day } = weddingConfig.date
  const wedding = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export default function EventInfoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [dday, setDday] = useState(calcDday)

  useEffect(() => {
    const id = setInterval(() => setDday(calcDday()), 60_000)
    return () => clearInterval(id)
  }, [])

  const { date, venue } = weddingConfig
  const ddayLabel = dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `D+${Math.abs(dday)}`

  const infoItems = [
    {
      icon: '📅',
      label: '날짜',
      value: `${date.year}년 ${date.month}월 ${date.day}일 ${date.dayOfWeek}`,
    },
    {
      icon: '🕛',
      label: '시간',
      value: `오후 ${date.hour}시 ${date.minute > 0 ? date.minute + '분' : ''}`,
    },
    {
      icon: '📍',
      label: '장소',
      value: venue.name,
      sub: venue.hall,
    },
    {
      icon: '🏠',
      label: '주소',
      value: venue.address,
    },
  ]

  return (
    <section ref={ref} className="py-20 px-6 bg-surface">
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

        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">예식 안내</h2>

        {/* D-Day 배지 */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary text-bg px-8 py-3 rounded-full text-2xl font-serif tracking-widest shadow-md">
            {ddayLabel}
          </div>
        </div>

        {/* 정보 카드들 */}
        <div className="space-y-3">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="flex items-start gap-4 bg-bg rounded-2xl px-5 py-4 shadow-sm border border-border"
            >
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-xs text-text-sub mb-0.5">{item.label}</p>
                <p className="text-text-main font-medium text-sm">{item.value}</p>
                {item.sub && <p className="text-text-sub text-xs mt-0.5">{item.sub}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
