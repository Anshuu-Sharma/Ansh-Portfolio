import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
