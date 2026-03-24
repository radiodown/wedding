import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(): TimeLeft {
  const { year, month, day, hour, minute } = weddingConfig.date
  const wedding = new Date(year, month - 1, day, hour, minute, 0)
  const now = new Date()
  const diff = wedding.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const lastDate = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= lastDate; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function EventInfoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const { date, groom, bride } = weddingConfig
  const cells = buildCalendar(date.year, date.month)
  const pad = (n: number) => String(n).padStart(2, '0')

  const ampm = date.hour >= 12 ? '오후' : '오전'
  const hour12 = date.hour > 12 ? date.hour - 12 : date.hour
  const timeStr = date.minute === 0 ? `${ampm} ${hour12}시` : `${ampm} ${hour12}시 ${date.minute}분`

  return (
    <section ref={ref} className="py-20 px-6 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto"
      >
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary-light" />
          <span className="text-primary text-xl">✦</span>
          <div className="w-12 h-px bg-primary-light" />
        </div>
        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">예식 안내</h2>

        {/* 날짜 헤더 */}
        <p className="text-center font-serif text-2xl text-text-main tracking-widest mb-1">
          {date.year}.{pad(date.month)}.{pad(date.day)}
        </p>
        <p className="text-center text-text-sub text-sm mb-8">{date.dayOfWeek} {timeStr}</p>

        {/* 캘린더 */}
        <div className="bg-bg rounded-xl p-5 mb-6 shadow-sm">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
              <div
                key={d}
                className={`text-center text-xs font-medium py-1 ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-primary' : 'text-text-sub'}`}
              >
                {d}
              </div>
            ))}
          </div>
          {/* 날짜 셀 */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((d, i) => {
              const isWedding = d === date.day
              const col = i % 7
              const isSun = col === 0
              const isSat = col === 6
              return (
                <div key={i} className="flex items-center justify-center h-9">
                  {d !== null && (
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
                        ${isWedding ? 'bg-primary text-bg font-bold' : ''}
                        ${!isWedding && isSun ? 'text-rose-400' : ''}
                        ${!isWedding && isSat ? 'text-primary' : ''}
                        ${!isWedding && !isSun && !isSat ? 'text-text-main' : ''}
                      `}
                    >
                      {d}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 카운트다운 */}
        <div className="bg-bg rounded-xl p-5 shadow-sm text-center">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: 'DAYS',  value: timeLeft.days },
              { label: 'HOUR',  value: timeLeft.hours },
              { label: 'MIN',   value: timeLeft.minutes },
              { label: 'SEC',   value: timeLeft.seconds },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex-1">
                  <p className="text-text-sub text-[10px] tracking-widest mb-1">{label}</p>
                  <p className="text-text-main text-2xl font-serif font-bold">{pad(value)}</p>
                </div>
                {i < 3 && <span className="text-primary text-xl font-bold pb-1 ml-1">:</span>}
              </div>
            ))}
          </div>
          <p className="text-text-sub text-xs">
            {groom.lastName}, {bride.lastName}의 결혼식이&nbsp;
            <span className="text-text-main font-medium">{timeLeft.days}</span>일 남았습니다.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
