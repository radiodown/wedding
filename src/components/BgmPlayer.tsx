import { useEffect, useRef, useState } from 'react'

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
    audio.loop = true

    const stopForVideo = () => {
      audio.pause()
      setPlaying(false)
    }
    window.addEventListener('youtube-playing', stopForVideo)
    return () => window.removeEventListener('youtube-playing', stopForVideo)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music/bgm.mp3`} />
      <button
        onClick={toggle}
        aria-label={playing ? '음악 끄기' : '음악 켜기'}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-bg border border-border shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <rect x="5" y="4" width="4" height="16" rx="1" />
            <rect x="15" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        )}
      </button>
    </>
  )
}
