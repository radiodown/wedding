import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const storyPhoto = '' // public/images/ 경로 또는 import로 교체
const interview = [
  {
    q: '처음 만났을 때 어땠나요?',
    a: '인터뷰 답변을 여기에 입력해주세요.',
  },
  {
    q: '프로포즈는 어떻게 했나요?',
    a: '인터뷰 답변을 여기에 입력해주세요.',
  },
  {
    q: '앞으로 어떻게 살고 싶으신가요?',
    a: '인터뷰 답변을 여기에 입력해주세요.',
  },
]

export default function StorySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState(false)

  return (
    <>
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

          <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">두 사람의 이야기</h2>

          {/* 가로형 사진 */}
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border bg-bg mb-6">
            {storyPhoto ? (
              <img src={storyPhoto} alt="두 사람의 이야기" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-sub text-sm">
                사진을 등록해주세요
              </div>
            )}
          </div>

          {/* 인터뷰 읽기 버튼 */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 mx-auto text-text-sub text-sm active:scale-95 transition-transform"
          >
            인터뷰 읽기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* 팝업 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-sm bg-bg rounded-t-3xl px-6 pt-6 pb-10 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6" />
              <h3 className="font-serif text-xl text-text-main text-center mb-6 tracking-wide">두 사람의 이야기</h3>
              <div className="space-y-6">
                {interview.map((item, i) => (
                  <div key={i}>
                    <p className="text-text-main text-sm font-medium mb-1.5">Q. {item.q}</p>
                    <p className="text-text-sub text-sm leading-relaxed">A. {item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
