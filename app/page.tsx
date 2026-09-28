import DemoOne from "@/components/ui/demo";
import TempleGateReveal from "@/components/ui/temple-gate-reveal";
import BadaImambara360 from "@/components/ui/bada-imambara-360";
import GhantaGharShowcase from "@/components/ui/ghanta-ghar-showcase";
import Hazratganj3D from "@/components/ui/hazratganj-3d";
import SmartHeader from "@/components/ui/smart-header";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d]">
      <SmartHeader />
      <DemoOne />
      <TempleGateReveal />
      <BadaImambara360 />
      <GhantaGharShowcase />
      <Hazratganj3D />
      <Footer />
    </main>
  );
}
