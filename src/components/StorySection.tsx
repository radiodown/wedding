import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const storyPhoto = `${import.meta.env.BASE_URL}interview.webp`
const messages = [
  {
    name: '👰🏻‍♀️김민진',
    text: '어색함만 감돌던 화곡역 3번 출구 신호등이 잊히지 않습니다. 첫 만남에 낡은 갈빗집에서 아기 새처럼 고기를 받아먹다가 순간 아차 했습니다.\n\n조금 머쓱한 마음으로 그리 길지도 않던 역 주변을 몇 바퀴고 걸으며 서로의 과거를 나눴습니다. 일상의 소중함을 알고 차곡차곡 소중하게 쌓아 올린 것들을 꺼내 보이던 효준이가 사랑스러웠고 닮고 싶었습니다.\n\n이후 도수가 높은 위스키, 망고스틴, 높은 심박수의 애플워치로 채워진 첫 만남 밤이었습니다.',
  },
  {
    name: '🤵🏻진효준',
    text: ' 5월의 화곡동 거리를 두서없이 걸으며 나눈 이야기들이 기억납니다.\n\n 이야기를 들을수록 정말 보석 같은 생각과 경험을 갖고 있다고 느꼈습니다. 정작 본인은 보석인지 모르는 모양이었습니다. 그래서 더 오래 듣고 싶었습니다.\n\n 물론 첫만남의 갈비집도 잊을 수 없습니다. 당황했었지만, 자타공인하는 고기굽기 실력으로 적당히 태운 양념갈비 맛에 넘어오지 않을 수 없었을겁니다☺️  \n\n 시간이 지날수록 그 사람의 시간과 선택, 그리고 그 안에 담긴 고민들이 조용히 빛을 내고 있다는 걸 느꼈습니다. 어쩌면 그 빛은 화려하지 않아서 더 오래 바라보게 되는 종류였는지도 모르겠습니다. 서로는 서로의 다름에 끌렸지만 이제는 서로 닮아가는 무렵인거같습니다.',
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
          <div className="w-full aspect-[9/6] rounded-2xl overflow-hidden shadow-md border border-border bg-bg mb-6">
            {storyPhoto ? (
              <img src={storyPhoto} alt="두 사람의 이야기" className="w-full h-full object-cover" onContextMenu={e => e.preventDefault()} />
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
              className="w-full max-w-sm bg-bg rounded-t-3xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto scrollbar-thin h-full max-h-[85vh] px-6 pt-6 pb-10">
                <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6" />
                <h3 className="font-serif text-xl text-text-main text-center mb-6 tracking-wide">두 사람의 이야기</h3>
                <div className="space-y-6">
                  {messages.map((item, i) => (
                    <div key={i}>
                      <p className="text-text-main text-sm font-medium mb-1.5">{item.name}</p>
                      <p className="text-text-sub text-sm leading-relaxed whitespace-pre-line">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
