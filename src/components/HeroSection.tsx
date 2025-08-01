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

      <div className="container mx-auto px-6 py-20 mt-20 relative z-10">
        <div className="flex flex-col items-center text-center ">
          <img src={"/buildertext.svg"} alt="Builder in Residence" className="-mb-16 z-10" />
          <span className="text-9xl font-clash font-bold text-charcoal">
            -In-Residence
          </span>
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up max-w-4xl">
            {/* Logo */}
      

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl leading-tight text-charcoal">
                <span className="font-serif italic">build and grow</span>{" "}
                <span className="font-normal">with</span>
              </h1>
              <h1 className="text-5xl lg:text-7xl font-normal text-charcoal">
                aspiring builders
              </h1>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Button
                variant="elegant"
                size="lg"
                className="font-serif text-lg px-12"
              >
                tune in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
