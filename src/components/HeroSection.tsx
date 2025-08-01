import { Button } from "@/components/ui/button";
import heroStatue from "@/assets/hero-statue.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warm-beige rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-gentle-bounce"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
                <span className="text-warm-cream text-lg font-bold">R</span>
              </div>
              <span className="text-2xl font-serif text-charcoal">the residency</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl leading-tight text-charcoal">
                <span className="font-serif italic">live and grow</span>{" "}
                <span className="font-normal">with</span>
              </h1>
              <h1 className="text-5xl lg:text-7xl font-normal text-charcoal">
                ambitious builders
              </h1>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Button variant="elegant" size="lg" className="font-serif text-lg px-12">
                tune in
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center animate-fade-in-scale">
            <div className="relative">
              <img 
                src={heroStatue} 
                alt="Classical statue representing ambitious builders"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-gentle-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-warm-beige rounded-full animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;