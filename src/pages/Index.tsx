import { NavBar } from "@/components/mini-navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpectSection from "@/components/ExpectSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import { Home, User, Briefcase, FileText } from "lucide-react";
import HorizontalEventTimelineCarousel from "@/components/timeline";
import { TimelineTabs } from "@/components/tabs";

const Index = () => {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]
  return (
    <div className="min-h-screen bg-background">
      <NavBar items={navItems} />
      <HeroSection />
      <AboutSection />
      <TimelineTabs />
      <ExpectSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
