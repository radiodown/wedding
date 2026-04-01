import { weddingConfig } from '../data/wedding'

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: object) => void
      }
    }
  }
}

export default function KakaoShareButton() {
  const handleShare = () => {
    const { Kakao } = window
    if (!Kakao) return
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_KAKAO_MAP_KEY)
    }
    const { siteTitle, siteDescription, siteUrl } = weddingConfig
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: siteTitle,
        description: siteDescription,
        imageUrl: `${siteUrl}og-image.jpg`,
        link: {
          mobileWebUrl: siteUrl,
          webUrl: siteUrl,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
      ],
    })
  }

  return (
    <div className="px-6 pb-10 bg-bg max-w-sm mx-auto">
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 bg-primary text-bg py-4 rounded-2xl font-medium text-sm active:scale-95 transition-transform shadow-md"
      >
        <span>💬</span>
        <span>카카오톡으로 공유하기</span>
      </button>
    </div>
  )
}
