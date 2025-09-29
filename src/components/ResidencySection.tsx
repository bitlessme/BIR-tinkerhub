const ResidencySection = () => {
  return (
    <section id="residency" className="py-20 bg-[#FCF9E8]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl text-charcoal leading-relaxed">
            <div className="font-thin pb-10">What is it?</div>
            an 11-week intensive program
            <span className="font-normal">
              an 11-week intensive program for builders across Kerala
            </span>
          </h2>

          {/* Description */}
          <div className="space-y-8 text-3xl lg:text-4xl text-soft-gray leading-relaxed">
            {/* What it is */}
            <div className="space-y-4">
              <div className="font-thin pb-10 ">What is it?</div>
              <p>
                An 11-week intensive program where builders from across Kerala
                come to TinkerSpace to create, refine, and ship their own
                products. Each participant works individually/team, focusing on
                taking their ideas all the way from concept to launch.
              </p>
            </div>

            {/* Why it matters */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-charcoal mb-4">
                Why it matters:
              </h3>
              <p>
                Often, people start building projects but lose momentum or get
                stuck midway. In this program, we emphasize building and
                shipping with high momentum participants are supported to keep
                moving fast and finish what they start.
              </p>
            </div>

            {/* Why TinkerSpace hosts it */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-charcoal mb-4">
                Why TinkerSpace hosts it:
              </h3>
              <p>
                The residency goes beyond building products by engaging
                participants with the community and sparking meaningful
                conversations around their work. It provides a space for
                builders to share their process, receive feedback, and connect
                with others, fostering a stronger, more collaborative community
                of makers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidencySection;
