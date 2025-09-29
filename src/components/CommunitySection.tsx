const CommunitySection = () => {
  const testimonials = [
    {
      name: "Abdul Kader",
      quote:
        "I’m really happy to have been part of the Builder in Residence program. It opened the door to new dimensions beyond just a cohort experience. The team provided excellent resources and created opportunities to connect with real mentors and the market, which helped me understand, build, and grow. Overall, it has been one of the best experiences.",
      project: "Making feedback fuel your growth.",
    },
    {
      name: "Shibil",
      quote:
        "When I started building Unzolo, my focus was mostly on the product itself. But through the builder-in-residence program, I not only got to connect with amazing people who have already built successful products but also gained a deeper understanding of what it takes to run and scale a company. I discovered valuable resources like startup missions, found a great mentor, and learned to validate ideas with the market before building the entire product , ensuring I create what customers actually need.",
      project: "Making solo travel social.",
    },
    {
      name: "Johan Biju Paul",
      quote:
        'Builder in Residence was one of those so-called "canon events" in my life, a turning point that completely shifted my path. I came in with no clear idea and weak tech skills, pivoted twice, but on the third try built something real-presenting it at Demo Day got 40 people on the waitlist. More than that, BiR gave me friendships with people who believed in me even when I didn\'t believe in myself, and that made all the difference.',
      project: "Block distractions not websites",
    },
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
                className="group bg-[#F4F1E6] p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 border border-black transform hover:-translate-y-3"
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
                  <p className="text-gray-600 text-sm font-thin mt-1">
                    {testimonial.project}
                  </p>
                </div>
                <p className="text-sm text-soft-gray italic leading-relaxed group-hover:not-italic group-hover:text-black transition-all duration-300">
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
