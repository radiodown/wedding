import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as string | undefined

export default function MapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { venue } = weddingConfig
  const venueSearchKeyword = '가천대학교 가천컨벤션센터'

  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueSearchKeyword)}`
  const kakaoNaviUrl = `https://map.kakao.com/link/to/${encodeURIComponent(venueSearchKeyword)},${venue.lat},${venue.lng}`
  const tmapUrl = `tmap://route?goalx=${venue.lng}&goaly=${venue.lat}&goalname=${encodeURIComponent(venueSearchKeyword)}`

  const subwayText = venue.subwayLines.map((s) => `${s.line} ${s.detail}`).join('\n')
  const busText = [
    venue.busTrunk && `간선버스 ${venue.busTrunk}`,
    venue.busBranch && `지선버스 ${venue.busBranch}`,
  ].filter(Boolean).join('\n')

  return (
    <section ref={ref} className="py-20 px-6 bg-bg">
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

        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">오시는 길</h2>

        {/* 장소 정보 */}
        <div className="text-center mb-6">
          <p className="font-serif text-xl text-text-main mb-1">{venue.name}</p>
          <p className="text-text-sub text-sm">{venue.hall}</p>
          <p className="text-text-sub text-sm mt-1">{venue.address}</p>
          <p className="text-text-sub text-sm mt-1">Tel. {venue.tel}</p>
        </div>

        {/* 지도 */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md mb-6 aspect-[4/3] bg-surface relative">
          {KAKAO_KEY ? (
            <KakaoMapEmbed lat={venue.lat} lng={venue.lng} name={venue.name} apiKey={KAKAO_KEY} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-sub p-6 text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm">카카오지도 API 키를 설정하면<br />지도가 여기 표시됩니다.</p>
            </div>
          )}
        </div>

        {/* 길찾기 버튼 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <NavBtn href={naverUrl} label="네이버지도" icon={`${import.meta.env.BASE_URL}icons/naver.png`} />
          <NavBtn href={tmapUrl} label="티맵" icon={`${import.meta.env.BASE_URL}icons/tmap.png`} />
          <NavBtn href={kakaoNaviUrl} label="카카오내비" icon={`${import.meta.env.BASE_URL}icons/kakao.png`} />
        </div>

        {/* 교통 안내 */}
        <div className="space-y-3">
          <InfoRow icon="🚇" label="지하철" value={subwayText} />
          {busText && <InfoRow icon="🚌" label="버스" value={busText} />}
          {venue.parking && <InfoRow icon="🅿️" label="주차" value={venue.parking} />}
        </div>
      </motion.div>
    </section>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-surface rounded-2xl px-4 py-3 border border-border shadow-sm">
      <span className="text-base mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-text-sub mb-0.5">{label}</p>
        {value.split('\n').map((line, i) => (
          <p key={i} className="text-text-main text-sm">{line}</p>
        ))}
      </div>
    </div>
  )
}

function NavBtn({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 border border-border bg-surface text-xs font-medium py-3 rounded-xl text-text-sub text-center shadow-sm active:scale-95 transition-transform"
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      {label}
    </a>
  )
}

let kakaoLoadPromise: Promise<void> | null = null

function loadKakaoScript(apiKey: string): Promise<void> {
  if (kakaoLoadPromise) return kakaoLoadPromise
  kakaoLoadPromise = new Promise((resolve) => {
    if ((window as any).kakao?.maps) { resolve(); return }
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.onload = () => (window as any).kakao.maps.load(resolve)
    document.head.appendChild(script)
  })
  return kakaoLoadPromise
}

function createVenueOverlayContent(name: string) {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translateY(-10px)'

  const bubble = document.createElement('div')
  bubble.textContent = name
  bubble.style.cssText = 'padding:9px 14px;border-radius:999px;background:rgba(255,255,255,0.96);border:1px solid rgba(201,169,122,0.4);box-shadow:0 10px 24px rgba(35,24,12,0.12);color:#4f4035;font-size:12px;font-weight:600;letter-spacing:0.02em;white-space:nowrap'

  const pointer = document.createElement('div')
  pointer.style.cssText = 'width:10px;height:10px;margin-top:-1px;background:rgba(255,255,255,0.96);border-right:1px solid rgba(201,169,122,0.4);border-bottom:1px solid rgba(201,169,122,0.4);transform:rotate(45deg)'

  wrapper.appendChild(bubble)
  wrapper.appendChild(pointer)
  return wrapper
}

function KakaoMapEmbed({ lat, lng, name, apiKey }: { lat: number; lng: number; name: string; apiKey: string }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let marker: any = null
    let overlay: any = null

    loadKakaoScript(apiKey).then(() => {
      if (!mapRef.current || cancelled) return
      const kakao = (window as any).kakao
      const center = new kakao.maps.LatLng(lat, lng)
      const map = new kakao.maps.Map(mapRef.current, { center, level: 4 })
      marker = new kakao.maps.Marker({ position: center, map })
      overlay = new kakao.maps.CustomOverlay({
        map,
        position: center,
        content: createVenueOverlayContent(name),
        xAnchor: 0.5,
        yAnchor: 1.7,
      })
    })

    return () => {
      cancelled = true
      marker?.setMap?.(null)
      overlay?.setMap?.(null)
    }
  }, [lat, lng, name, apiKey])

  return <div ref={mapRef} className="w-full h-full" />
}
