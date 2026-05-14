import Hero from '@/components/Hero';
// import ProjectShowcase from '@/components/ProjectShowcase';
// import CircularGallery from '@/components/CircularGallery';
// import About from '@/components/About';
// import Playground from '@/components/Playground';
// import CoreCapabilities from '@/components/CoreCapabilities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <div className="relative z-10">
        <Hero />
        {/* <ProjectShowcase /> */}
        {/* <section className="circular-gallery-section" aria-label="Circular gallery">
          <CircularGallery
            height={700}
            bend={120}
            textColor="#ffffff"
            borderRadius={0.1}
            scrollSpeed={2}
            scrollEase={0.2}
            imageGap={10}
          />
        </section> */}
        {/* <About /> */}
        {/* <Playground /> */}
        {/* <CoreCapabilities /> */}
        <Footer />
      </div>
    </main>
  );
}
