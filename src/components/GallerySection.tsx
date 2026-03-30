import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { weddingConfig } from '../data/wedding'

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [index, setIndex] = useState(-1)
  const [showAll, setShowAll] = useState(false)

  const { gallery } = weddingConfig
  const slides = gallery.map((g) => ({ src: g.src }))

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

        <h2 className="font-serif text-2xl text-text-main text-center mb-2 tracking-wide">갤러리</h2>
        <p className="text-center text-text-sub text-xs mb-8">직접 기록한 순간들</p>

        {/* Masonry-style 2-column grid */}
        {(() => {
          const visible = showAll ? gallery : gallery.slice(0, 6)
          const left = visible.filter((_, i) => i % 2 === 0)
          const right = visible.filter((_, i) => i % 2 === 1)
          const renderItem = (photo: typeof gallery[0], realIndex: number, colIndex: number) => (
            <motion.div
              key={realIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 * colIndex, duration: 0.5 }}
              className="cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3"
              onClick={() => setIndex(realIndex)}
            >
              <img src={photo.thumb} alt={photo.alt} loading={realIndex < 6 ? 'lazy' : 'eager'} className="w-full object-cover transition-transform duration-300 hover:scale-105" />
            </motion.div>
          )
          return (
            <div className="flex gap-3">
              <div className="flex-1">{left.map((photo, i) => renderItem(photo, i * 2, i))}</div>
              <div className="flex-1">{right.map((photo, i) => renderItem(photo, i * 2 + 1, i))}</div>
            </div>
          )
        })()}

        {!showAll && gallery.length > 6 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 flex items-center gap-1.5 mx-auto text-text-sub text-sm active:scale-95 transition-transform"
          >
            더보기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <p className="text-center text-text-sub text-xs mt-6">사진을 클릭하면 크게 볼 수 있습니다</p>
      </motion.div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </section>
  )
}
