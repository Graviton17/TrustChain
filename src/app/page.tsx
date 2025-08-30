import Header from "@/components/Header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import FeaturesSection from "@/components/features-section"
import TrustSection from "@/components/trust-section"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TrustSection />
      <Footer />
    </main>
  )
}
