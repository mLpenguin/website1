import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Technology from './components/Technology';
import Team from './components/Team';
import DemoPanel from './components/DemoPanel';
import Metrics from './components/Metrics';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Technology />
        <Metrics />
        <DemoPanel />
        <Team />
        <Footer />
      </main>
    </div>
  );
}
