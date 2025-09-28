const CommunitySection = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "AI Researcher",
      quote: "The Residency gave me the space and community I needed to focus entirely on my startup. The connections I made here are invaluable.",
      project: "Building next-gen AI tools"
    },
    {
      name: "Sarah Rodriguez", 
      role: "Biotech Founder",
      quote: "Living with other ambitious builders created an environment of constant inspiration and accountability.",
      project: "Developing sustainable materials"
    },
    {
      name: "Marcus Kim",
      role: "Web3 Developer",
      quote: "The mentorship and network access through The Residency accelerated my growth by years, not months.",
      project: "Decentralized finance platform"
    }
  ];

  return (
    <section className="py-20 bg-[#FCF9E8]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-6">
              Meet the <span className="italic">community</span>
            </h2>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto">
              Our residents are building the future across diverse fields - from
              AI and biotech to web3 and beyond.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#F4F1E6] p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 border border-black"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-[#EAE6D9] rounded-full flex items-center justify-center mb-4 border border-black">
                    <span className="text-charcoal font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-charcoal">
                    {testimonial.name}
                  </h4>
                  <p className="text-soft-gray text-sm ">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm font-medium mt-1">
                    {testimonial.project}
                  </p>
                </div>
                <p className="text-soft-gray italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-serif text-charcoal">100+</div>
              <div className="text-soft-gray">Alumni builders</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-serif text-charcoal">$50M+</div>
              <div className="text-soft-gray">Total funding raised</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-serif text-charcoal">15+</div>
              <div className="text-soft-gray">Successful exits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;