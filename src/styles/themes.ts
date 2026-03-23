export interface Theme {
  id: string
  label: string
  bg: string
  primary: string
  text: string
}

export const themes: Theme[] = [
  { id: 'warm-ivory',   label: '웜 아이보리',   bg: '#FDFAF6', primary: '#C9A97A', text: '#3D2B1F' },
  { id: 'modern-white', label: '모던 화이트', bg: '#FFFFFF',  primary: '#4A7C59', text: '#1A1A1A' },
  { id: 'soft-blush',   label: '소프트 블러쉬',   bg: '#FFF0F0', primary: '#C4788A', text: '#3D1F2B' },
  { id: 'deep-navy',    label: '딥 네이비',    bg: '#0F1F3D', primary: '#C9A73A', text: '#F5F0E8' },
]
