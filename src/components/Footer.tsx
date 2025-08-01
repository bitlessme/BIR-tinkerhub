import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-cream py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center space-y-8 mb-12">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-warm-cream rounded-full flex items-center justify-center">
                <span className="text-charcoal text-lg font-bold">R</span>
              </div>
              <span className="text-2xl font-serif">the residency</span>
            </div>

            {/* Mission Statement */}
            <p className="text-xl font-serif italic opacity-90 max-w-2xl mx-auto">
              empowering ambitious builders to create the future
            </p>

            {/* Final CTA */}
            <div className="space-y-4">
              <p className="text-lg opacity-80">
                Ready to join the next cohort of builders?
              </p>
              <Button variant="minimal" size="lg" className="bg-transparent border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-charcoal">
                Apply Today
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left border-t border-warm-cream/20 pt-8">
            <div>
              <h4 className="font-medium mb-4">Program</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Application</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Curriculum</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Housing</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Alumni</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Community</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Events</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Mentors</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Partners</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Twitter</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Discord</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-warm-cream/20">
            <p className="text-sm opacity-60">
              © 2024 The Residency. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;