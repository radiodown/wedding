import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { weddingConfig } from '../data/wedding'

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [index, setIndex] = useState(-1)

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

        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">갤러리</h2>

        {/* Masonry-style 2-column grid */}
        <div className="columns-2 gap-3 space-y-3">
          {gallery.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.5 }}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow"
              onClick={() => setIndex(i)}
            >
              <img
                src={photo.thumb}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

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
