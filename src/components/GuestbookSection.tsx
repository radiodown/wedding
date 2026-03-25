import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { weddingConfig } from '../data/wedding'

interface Message {
  id: string
  name: string
  text: string
  passwordHash: string
  createdAt: Date | null
}

async function hashPassword(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function GuestbookSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({
        id: d.id,
        name: d.data().name,
        text: d.data().text,
        passwordHash: d.data().passwordHash,
        createdAt: d.data().createdAt?.toDate() ?? null,
      })))
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2 || name.trim().length > 4) return
    if (password.trim().length < 4 || password.trim().length > 16) return
    if (!text.trim()) return
    setSubmitting(true)
    try {
      const passwordHash = await hashPassword(password)
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        text: text.trim(),
        passwordHash,
        createdAt: serverTimestamp(),
      })
      setText('')
      setPassword('')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const hash = await hashPassword(deletePassword)
    const adminHash = await hashPassword(import.meta.env.VITE_ADMIN_PASSWORD ?? '')
    if (hash !== deleteTarget.passwordHash && hash !== adminHash) {
      setDeleteError(true)
      setDeleting(false)
      return
    }
    await deleteDoc(doc(db, 'guestbook', deleteTarget.id))
    setDeleteTarget(null)
    setDeletePassword('')
    setDeleteError(false)
    setDeleting(false)
  }

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

          <h2 className="font-serif text-2xl text-text-main text-center mb-2 tracking-wide">방명록</h2>
          <p className="text-text-sub text-sm text-center mb-8">축하의 말씀을 남겨주세요</p>

          {/* 채팅 목록 */}
          <div className="space-y-3 mb-6 min-h-[80px] max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {messages.length === 0 && (
              <p className="text-center text-text-sub text-sm py-6">아직 메시지가 없습니다</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                {/* 아바타 */}
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary text-xs font-medium">{msg.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-text-main text-xs font-medium">{msg.name}</span>
                    {msg.createdAt && (
                      <span className="text-text-sub text-[10px]">
                        {msg.createdAt.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-1.5">
                    <div className="bg-bg rounded-2xl rounded-tl-none px-3.5 py-2.5 border border-border shadow-sm inline-block max-w-[80%]">
                      <p className="text-text-main text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <button
                      onClick={() => { setDeleteTarget(msg); setDeletePassword(''); setDeleteError(false) }}
                      className="mt-1 text-text-sub opacity-30 hover:opacity-60 transition-opacity flex-shrink-0"
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 3h9M5 3V2h3v1M4 3v7.5h5V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 작성 폼 */}
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border shadow-sm p-4 space-y-2.5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={4}
                className="flex-1 min-w-0 bg-bg rounded-xl px-3 py-2 text-sm text-text-main placeholder:text-text-sub outline-none border border-border focus:border-primary transition-colors"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={16}
                className="flex-1 min-w-0 bg-bg rounded-xl px-3 py-2 text-sm text-text-main placeholder:text-text-sub outline-none border border-border focus:border-primary transition-colors"
              />
            </div>
            <textarea
              placeholder="축하 메시지를 입력해주세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
              rows={2}
              className="w-full bg-bg rounded-xl px-3 py-2 text-sm text-text-main placeholder:text-text-sub outline-none border border-border focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={submitting || name.trim().length < 2 || name.trim().length > 4 || password.trim().length < 4 || password.trim().length > 16 || !text.trim()}
              className="w-full bg-primary text-bg py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-transform disabled:opacity-40"
            >
              {submitting ? '등록 중...' : '남기기'}
            </button>
          </form>

          {/* 하단 서명 */}
          <div className="mt-16 text-center">
            <p className="font-serif text-text-sub text-sm">
              {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
            </p>
            <p className="text-text-sub text-xs mt-1 opacity-60">
              {weddingConfig.date.year}.{String(weddingConfig.date.month).padStart(2, '0')}.{String(weddingConfig.date.day).padStart(2, '0')}
            </p>
            <p className="text-primary text-2xl mt-3">♥</p>
          </div>
        </motion.div>
      </section>

      {/* 삭제 확인 팝업 */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs bg-bg rounded-2xl p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-text-main text-sm font-medium mb-1">메시지 삭제</p>
              <p className="text-text-sub text-xs mb-4">작성 시 입력한 비밀번호를 입력해주세요</p>
              <input
                type="password"
                placeholder="비밀번호"
                value={deletePassword}
                onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false) }}
                className="w-full bg-surface rounded-xl px-3 py-2.5 text-sm text-text-main placeholder:text-text-sub outline-none border border-border focus:border-primary transition-colors mb-2"
                autoFocus
              />
              {deleteError && (
                <p className="text-red-400 text-xs mb-2">비밀번호가 일치하지 않습니다</p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-text-sub text-sm active:scale-95 transition-transform"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting || !deletePassword.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-red-400 text-white text-sm active:scale-95 transition-transform disabled:opacity-40"
                >
                  {deleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
