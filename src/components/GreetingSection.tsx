import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { weddingConfig } from '../data/wedding'

export default function GreetingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const lines = weddingConfig.greeting.split('\n')

  return (
    <section ref={ref} className="py-20 px-6 bg-bg text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* 장식 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary-light" />
          <span className="text-primary text-xl">✦</span>
          <div className="w-12 h-px bg-primary-light" />
        </div>

        <h2 className="font-serif text-2xl text-text-main mb-8 tracking-wide">인사말</h2>

        <div className="max-w-sm mx-auto">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`font-serif text-base leading-loose text-text-sub ${
                line === '' ? 'h-4' : ''
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* 서명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-6 text-text-main font-serif text-sm"
        >
          <div className="text-center">
            <p className="text-xs text-text-sub mb-1">신랑</p>
            <p>{weddingConfig.groom.name}</p>
          </div>
          <span className="text-primary text-lg">♥</span>
          <div className="text-center">
            <p className="text-xs text-text-sub mb-1">신부</p>
            <p>{weddingConfig.bride.name}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
