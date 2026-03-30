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
  theme: 'modern-white' as string,

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
  ] as ContactPerson[],

  // ── 계좌 정보
  accounts: [
    { bank: '신한은행', number: '604-06-291814', holder: '진수연', label: '신랑' },
    { bank: '토스뱅크', number: '1000-6133-5941', holder: '진효준', label: '신랑' },
    { bank: '신한은행', number: '110-456-789012',   holder: '김민진', label: '신부' },
  ] as AccountInfo[],

  // ── 갤러리
  gallery: [
    { src: '/wedding/gallery/1.JPG',  thumb: '/wedding/gallery/1.JPG',  alt: '웨딩 사진 1' },
    { src: '/wedding/gallery/2.JPG',  thumb: '/wedding/gallery/2.JPG',  alt: '웨딩 사진 2' },
    { src: '/wedding/gallery/3.JPG',  thumb: '/wedding/gallery/3.JPG',  alt: '웨딩 사진 3' },
    { src: '/wedding/gallery/4.JPG',  thumb: '/wedding/gallery/4.JPG',  alt: '웨딩 사진 4' },
    { src: '/wedding/gallery/5.JPG',  thumb: '/wedding/gallery/5.JPG',  alt: '웨딩 사진 5' },
    { src: '/wedding/gallery/6.JPG',  thumb: '/wedding/gallery/6.JPG',  alt: '웨딩 사진 6' },
    { src: '/wedding/gallery/7.jpg',  thumb: '/wedding/gallery/7.jpg',  alt: '웨딩 사진 7' },
    { src: '/wedding/gallery/8.jpg',  thumb: '/wedding/gallery/8.jpg',  alt: '웨딩 사진 8' },
    { src: '/wedding/gallery/9.jpg',  thumb: '/wedding/gallery/9.jpg',  alt: '웨딩 사진 9' },
    { src: '/wedding/gallery/10.jpg', thumb: '/wedding/gallery/10.jpg', alt: '웨딩 사진 10' },
    { src: '/wedding/gallery/11.jpg', thumb: '/wedding/gallery/11.jpg', alt: '웨딩 사진 11' },
    { src: '/wedding/gallery/12.jpg', thumb: '/wedding/gallery/12.jpg', alt: '웨딩 사진 12' },
    { src: '/wedding/gallery/13.jpg', thumb: '/wedding/gallery/13.jpg', alt: '웨딩 사진 13' },
    { src: '/wedding/gallery/14.jpg', thumb: '/wedding/gallery/14.jpg', alt: '웨딩 사진 14' },
    { src: '/wedding/gallery/15.jpg', thumb: '/wedding/gallery/15.jpg', alt: '웨딩 사진 15' },
    { src: '/wedding/gallery/16.jpg', thumb: '/wedding/gallery/16.jpg', alt: '웨딩 사진 16' },
  ],

  // ── YouTube
  youtubeId: 'PiwnojgoSk0',

  // ── 인사말
  greeting: `저희 두 사람이 사랑을 맹세하고\n새로운 가정을 이루려 합니다.\n\n바쁘신 중에도 오셔서\n자리를 빛내 주시면 감사하겠습니다.`,

  // ── OG / SEO
  siteTitle: '진효준 ♥ 김민진 결혼합니다',
  siteDescription: '2026년 6월 14일 일요일, 가천컨벤션센터에서 결혼합니다.',
  siteUrl: 'https://radiodown.github.io/wedding/',
}
