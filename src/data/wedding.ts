export interface ContactPerson {
  role: string
  name: string
  phone: string
}

export interface AccountInfo {
  bank: string
  number: string
  holder: string
  label: string
}

export const weddingConfig = {
  // ── 테마 (warm-ivory | modern-white | soft-blush | deep-navy)
  theme: 'warm-ivory' as string,

  // ── 신랑 / 신부
  groom: {
    name: 'JINHYOJOON',
    lastName: '진효준',
    phone: '010-1234-5678',
  },
  bride: {
    name: 'KIMMINJIN',
    lastName: '김민진',
    phone: '010-8765-4321',
  },

  // ── 예식 일시
  date: {
    year: 2026,
    month: 6,
    day: 14,
    hour: 13,
    minute: 40,
    /** 일요일 등 요일 문자열 */
    dayOfWeek: '일요일',
  },

  // ── 예식장
  venue: {
    name: '가천컨벤션센터',
    hall: '5층 웨딩홀',
    address: '경기도 성남시 수정구 성남대로 1342 (복정동 620-2)',
    tel: '031-755-3000',
    lat: 37.4497253,
    lng: 127.127107,
    // 지하철 노선별
    subwayLines: [
      { line: '수인분당선', color: '#F5A623', detail: '가천대역 1번 출구 또는 연결통로' },
    ],
    // 버스
    busTrunk: '302, 303, 462',
    busBranch: '4419',
    // 주차
    parking: '전일 무료 주차 가능',
  },

  // ── 연락처
  contacts: [
    { role: '신랑', name: '진효준', phone: '010-4812-6459' },
    { role: '신부', name: '김민진', phone: '010-0483-5633' },
    { role: '신랑 아버지', name: '진수연', phone: '010-3674-6459' },
    { role: '신랑 어머니', name: '고은경', phone: '010-8680-6459' },
    { role: '신부 아버지', name: '김종표', phone: '010-5555-6666' },
    { role: '신부 어머니', name: '김규자', phone: '010-7777-8888' },
  ] as ContactPerson[],

  // ── 계좌 정보
  accounts: [
    { bank: '국민은행', number: '123-456-78901234', holder: '진수연', label: '신랑' },
    { bank: '국민은행', number: '123-456-78901234', holder: '진효준', label: '신랑' },
    { bank: '신한은행', number: '110-456-789012',   holder: '김민진', label: '신부' },
  ] as AccountInfo[],

  // ── 갤러리 (더미 — Picsum Photos 사용)
  gallery: Array.from({ length: 9 }, (_, i) => ({
    src: `https://picsum.photos/seed/wedding${i + 1}/600/800`,
    thumb: `https://picsum.photos/seed/wedding${i + 1}/300/400`,
    alt: `웨딩 사진 ${i + 1}`,
  })),

  // ── YouTube
  youtubeId: 'bADR5QowGXc',

  // ── 인사말
  greeting: `저희 두 사람이 사랑을 맹세하고\n새로운 가정을 이루려 합니다.\n\n바쁘신 중에도 오셔서\n자리를 빛내 주시면 감사하겠습니다.`,

  // ── OG / SEO
  siteTitle: '진효준 ♥ 김민진 결혼합니다',
  siteDescription: '2026년 6월 14일 일요일, 가천컨벤션센터에서 결혼합니다.',
  siteUrl: 'https://yourusername.github.io/wedding/',
}
