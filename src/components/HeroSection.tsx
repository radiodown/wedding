import { motion } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

export default function HeroSection() {
  const { groom, bride, date } = weddingConfig

  const dateStr = `${date.year}년 ${date.month}월 ${date.day}일 ${date.dayOfWeek} 낮 ${date.hour}시`

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary blur-3xl" />
      </div>

      {/* 커버 이미지 */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full max-w-sm mx-auto aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl"
      >
        <img
          src="https://picsum.photos/seed/wedding-cover/600/800"
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* 텍스트 영역 */}
      <div className="mt-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-text-sub text-sm tracking-[0.2em] uppercase mb-4"
        >
          Wedding Invitation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-4xl text-text-main tracking-wide"
        >
          {groom.lastName} <span className="text-primary">♥</span> {bride.lastName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-1 text-lg text-text-sub font-serif tracking-widest"
        >
          {groom.name} &amp; {bride.name}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 flex flex-col items-center gap-1"
        >
          <div className="w-8 h-px bg-primary mx-auto" />
          <p className="text-text-sub text-sm mt-3 tracking-wide">{dateStr}</p>
          <p className="text-text-sub text-sm">{weddingConfig.venue.name}</p>
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 flex flex-col items-center gap-2 text-text-sub"
      >
        <p className="text-xs tracking-widest">SCROLL</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
            <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
