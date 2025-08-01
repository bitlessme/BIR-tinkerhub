import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
              <span className="text-warm-cream text-sm font-bold">R</span>
            </div>
            <span className="text-xl font-serif text-charcoal">builder in residence</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-charcoal hover:text-soft-gray transition-colors">main</a>
            <a href="#about" className="text-charcoal hover:text-soft-gray transition-colors">about us</a>
            <a href="#homes" className="text-charcoal hover:text-soft-gray transition-colors">homes</a>
            <a href="#inspire" className="text-charcoal hover:text-soft-gray transition-colors">inspire</a>
            <a href="#delta" className="text-charcoal hover:text-soft-gray transition-colors">delta</a>
            <a href="#investors" className="text-charcoal hover:text-soft-gray transition-colors">investors</a>
          </div>

          {/* CTA Button */}
          <Button variant="elegant" size="sm" className="font-normal">
            tune in
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;