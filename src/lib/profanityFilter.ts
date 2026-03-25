const blocklist = [
  // 한국어 비속어
  '씨발', '씨빨', '시발', '시빨', 'ㅅㅂ', '개새끼', '개새', '새끼', 'ㅅㄲ',
  '지랄', 'ㅈㄹ', '병신', 'ㅂㅅ', '미친', '미친놈', '미친년', '꺼져',
  '존나', 'ㅈㄴ', '좆', 'ㅈ같', '보지', '자지', '섹스', '강간',
  '창녀', '매춘', '걸레', '년', '놈', '새끼야', '개같은',
  // 영어 비속어
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy',
  'nigger', 'faggot', 'whore', 'slut',
]

export function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().replace(/\s/g, '')
  return blocklist.some((word) => lower.includes(word))
}
