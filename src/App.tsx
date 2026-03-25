import { useEffect } from 'react'
import { weddingConfig } from './data/wedding'
import HeroSection from './components/HeroSection'
import GreetingSection from './components/GreetingSection'
import EventInfoSection from './components/EventInfoSection'
import MapSection from './components/MapSection'
import GallerySection from './components/GallerySection'
import VideoSection from './components/VideoSection'
import StorySection from './components/StorySection'
import ContactSection from './components/ContactSection'
import DevThemeSwitcher from './components/DevThemeSwitcher'
import BgmPlayer from './components/BgmPlayer'

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', weddingConfig.theme)
  }, [])

  return (
    <main className="min-h-screen bg-bg">
      <HeroSection />
      <GreetingSection />
      <EventInfoSection />
      <MapSection />
      <GallerySection />
      <VideoSection />
      <StorySection />
      <ContactSection />
      <DevThemeSwitcher />
      <BgmPlayer />
    </main>
  )
}
