import { NavBar } from "@/components/mini-navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResidencySection from "@/components/ResidencySection";
import ExpectSection from "@/components/ExpectSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import BuildersCarousel from "@/components/BuildersCarousel";
import { Home, User, Briefcase, FileText } from "lucide-react";
import HorizontalEventTimelineCarousel from "@/components/timeline";
import { TimelineTabs } from "@/components/tabs";

const Index = () => {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "About", url: "#", icon: User },
    { name: "Projects", url: "#", icon: Briefcase },
    { name: "Resume", url: "#", icon: FileText },
  ];
  return (
    <div className="min-h-screen bg-background">
      <NavBar items={navItems} />
      <HeroSection />
      <AboutSection />
      <ResidencySection />
      <TimelineTabs />
      <ExpectSection />
      <CommunitySection />
      <BuildersCarousel />
      <Footer />
    </div>
  );
};

export default Index;
