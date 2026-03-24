import { useRef, useEffect } from 'react'
import type React from 'react'
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
  const tmapUrl = `tmap://route?goalx=${venue.lng}&goaly=${venue.lat}&goalname=${encodeURIComponent(venueSearchKeyword)}`;
  // const tmapUrl = `https://tmap.life/map?name=${encodeURIComponent(venueSearchKeyword)}&lat=${venue.lat}&lon=${venue.lng}`

  return (
    <section ref={ref} className="py-20 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto"
      >
        {/* 헤더 */}
        <p className="text-center text-xs tracking-[0.3em] text-text-sub mb-3">LOCATION</p>
        <h2 className="font-serif text-2xl text-text-main text-center mb-8 tracking-wide">오시는 길</h2>

        {/* 장소 정보 */}
        <div className="text-center px-6 mb-6">
          <p className="font-serif text-xl text-text-main mb-1">{venue.name}, {venue.hall}</p>
          <p className="text-text-sub text-sm mb-2">{venue.address}</p>
          <p className="text-text-sub text-sm">Tel. {venue.tel}</p>
        </div>

        {/* 지도 */}
        <div className="overflow-hidden shadow-md rounded-md mb-4 aspect-[4/3] bg-surface relative">
          {KAKAO_KEY ? (
            <KakaoMapEmbed lat={venue.lat} lng={venue.lng} name={venue.name} apiKey={KAKAO_KEY} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-sub p-6 text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm">카카오지도 API 키를 설정하면<br />지도가 여기 표시됩니다.</p>
            </div>
          )}
        </div>

        <div className="px-6 space-y-3 mb-8">
          {/* 내비게이션 */}
          <div className="pt-2">
            <p className="text-text-main font-medium text-sm mb-1">내비게이션</p>
            <p className="text-text-sub text-xs mb-3">원하시는 앱을 선택하시면 길안내가 시작됩니다.</p>
            <div className="grid grid-cols-3 gap-2">
              <NavBtn href={naverUrl} label="네이버지도" icon={<img src={`${import.meta.env.BASE_URL}icons/naver.png`} alt="네이버지도" className="w-5 h-5" />} />
              <NavBtn href={tmapUrl} label="티맵" icon={<img src={`${import.meta.env.BASE_URL}icons/tmap.png`} alt="티맵" className="w-5 h-5" />} />
              <NavBtn href={kakaoNaviUrl} label="카카오내비" icon={<img src={`${import.meta.env.BASE_URL}icons/kakao.png`} alt="카카오내비" className="w-5 h-5" />} />
            </div>
          </div>
        </div>

        {/* 교통 안내 */}
        <div className="px-6 space-y-0 divide-y divide-border border-t border-border">
          {/* 지하철 */}
          <div className="py-5">
            <p className="text-text-main font-medium text-sm mb-3">지하철</p>
            <div className="space-y-2 mb-3">
              {venue.subwayLines.map((s) => (
                <div key={s.line} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-text-sub text-sm">{s.line} {s.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 셔틀버스 */}
          {venue.shuttle && (
            <div className="py-5">
              <p className="text-text-main font-medium text-sm mb-2">셔틀버스</p>
              <p className="text-text-sub text-sm">{venue.shuttle}</p>
            </div>
          )}

          {/* 버스 */}
          {(venue.busTrunk || venue.busBranch) && (
            <div className="py-5">
              <p className="text-text-main font-medium text-sm mb-3">버스</p>
              <div className="space-y-2">
                {venue.busTrunk && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0 bg-blue-600" />
                    <span className="text-text-sub text-sm">간선버스 : {venue.busTrunk}</span>
                  </div>
                )}
                {venue.busBranch && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0 bg-green-600" />
                    <span className="text-text-sub text-sm">지선버스 : {venue.busBranch}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 주차 */}
          {venue.parking && (
            <div className="py-5">
              <p className="text-text-main font-medium text-sm mb-2">주차</p>
              <p className="text-text-sub text-sm">{venue.parking}</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function NavBtn({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 border border-border rounded-lg py-3 text-text-sub text-xs font-medium active:scale-95 transition-transform bg-bg"
    >
      {icon} {label}
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
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'center'
  wrapper.style.pointerEvents = 'none'
  wrapper.style.transform = 'translateY(-10px)'

  const bubble = document.createElement('div')
  bubble.textContent = name
  bubble.style.padding = '9px 14px'
  bubble.style.borderRadius = '999px'
  bubble.style.background = 'rgba(255, 255, 255, 0.96)'
  bubble.style.border = '1px solid rgba(201, 169, 122, 0.4)'
  bubble.style.boxShadow = '0 10px 24px rgba(35, 24, 12, 0.12)'
  bubble.style.color = '#4f4035'
  bubble.style.fontSize = '12px'
  bubble.style.fontWeight = '600'
  bubble.style.letterSpacing = '0.02em'
  bubble.style.whiteSpace = 'nowrap'

  const pointer = document.createElement('div')
  pointer.style.width = '10px'
  pointer.style.height = '10px'
  pointer.style.marginTop = '-1px'
  pointer.style.background = 'rgba(255, 255, 255, 0.96)'
  pointer.style.borderRight = '1px solid rgba(201, 169, 122, 0.4)'
  pointer.style.borderBottom = '1px solid rgba(201, 169, 122, 0.4)'
  pointer.style.transform = 'rotate(45deg)'

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

  return <div ref={mapRef} className="absolute inset-0" />
}
