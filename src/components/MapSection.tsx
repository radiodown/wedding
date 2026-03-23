import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingConfig } from '../data/wedding'

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as string | undefined

export default function MapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { venue } = weddingConfig

  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venue.address)}`
  const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venue.name)}`
  const tmapUrl = `https://tmap.life/map?name=${encodeURIComponent(venue.name)}&lat=${venue.lat}&lon=${venue.lng}`

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

        <h2 className="font-serif text-2xl text-text-main text-center mb-2 tracking-wide">오시는 길</h2>
        <p className="text-text-sub text-sm text-center mb-8">{venue.name} {venue.hall}</p>

        {/* 지도 영역 */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md mb-6 aspect-[4/3] bg-surface flex items-center justify-center">
          {KAKAO_KEY ? (
            <KakaoMapEmbed lat={venue.lat} lng={venue.lng} name={venue.name} apiKey={KAKAO_KEY} />
          ) : (
            <div className="flex flex-col items-center gap-3 text-text-sub p-6 text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm">카카오지도 API 키를 설정하면<br />지도가 여기 표시됩니다.</p>
              <a
                href={kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs bg-primary text-bg px-5 py-2 rounded-full"
              >
                카카오맵에서 보기
              </a>
            </div>
          )}
        </div>

        {/* 주소 */}
        <div className="bg-surface rounded-2xl px-5 py-4 border border-border mb-4">
          <p className="text-xs text-text-sub mb-1">도로명 주소</p>
          <p className="text-text-main text-sm font-medium">{venue.address}</p>
        </div>

        {/* 교통 안내 */}
        <div className="space-y-3 mb-6">
          <InfoRow icon="🚇" label="지하철" value={venue.subway} />
          <InfoRow icon="🚌" label="버스" value={venue.bus} />
          <InfoRow icon="🅿️" label="주차" value={venue.parking} />
        </div>

        {/* 길찾기 버튼 */}
        <div className="grid grid-cols-3 gap-2">
          <NavBtn href={kakaoUrl} color="bg-[#FAE300] text-[#3C1E1E]" label="카카오맵" />
          <NavBtn href={naverUrl} color="bg-[#03C75A] text-white" label="네이버지도" />
          <NavBtn href={tmapUrl} color="bg-[#E4002B] text-white" label="티맵" />
        </div>
      </motion.div>
    </section>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-surface rounded-xl px-4 py-3 border border-border">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-xs text-text-sub mb-0.5">{label}</p>
        <p className="text-text-main text-sm">{value}</p>
      </div>
    </div>
  )
}

function NavBtn({ href, color, label }: { href: string; color: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} text-xs font-medium py-3 rounded-xl text-center block shadow-sm active:scale-95 transition-transform`}
    >
      {label}
    </a>
  )
}

function KakaoMapEmbed({ lat, lng, name, apiKey }: { lat: number; lng: number; name: string; apiKey: string }) {
  // Kakao Maps JavaScript API를 동적으로 로드하여 지도 렌더링
  const mapRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  const initMap = () => {
    if (!mapRef.current || loadedRef.current) return
    loadedRef.current = true
    const kakao = (window as any).kakao
    const center = new kakao.maps.LatLng(lat, lng)
    const map = new kakao.maps.Map(mapRef.current, { center, level: 4 })
    const marker = new kakao.maps.Marker({ position: center, map })
    const info = new kakao.maps.InfoWindow({ content: `<div style="padding:6px 12px;font-size:13px;">${name}</div>` })
    info.open(map, marker)
  }

  if (!(window as any).kakao) {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.onload = () => (window as any).kakao.maps.load(initMap)
    document.head.appendChild(script)
  } else {
    (window as any).kakao.maps.load(initMap)
  }

  return <div ref={mapRef} className="w-full h-full" />
}
