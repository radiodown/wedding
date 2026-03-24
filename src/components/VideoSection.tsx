import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

export default function VideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { youtubeId } = weddingConfig

  return (
    <section ref={ref} className="py-20 px-6 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary-light" />
          <span className="text-primary text-xl">✦</span>
          <div className="w-12 h-px bg-primary-light" />
        </div>

        <h2 className="font-serif text-2xl text-text-main text-center mb-3 tracking-wide">웨딩 영상</h2>
        <p className="text-text-sub text-sm text-center mb-8">소중한 순간을 영상으로 담았습니다</p>

        {/* 21:9 반응형 YouTube embed */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-border" style={{ paddingTop: 'calc(9 / 21 * 100%)' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title="웨딩 영상"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  )
}
