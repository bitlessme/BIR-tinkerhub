const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-[#FCF9E8]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl text-charcoal leading-relaxed">
            <span className="font-serif italic">
              the residency exists to support and connect
            </span>{" "}
            <span className="font-normal">ambitious builders</span>
          </h2>

          {/* Description */}
          <div className="space-y-8 text-lg lg:text-xl text-soft-gray leading-relaxed">
            <p>
              traditionally, ambitious builders like yourself have been
              constrained by the time requirements of school and work.
            </p>

            <p>
              we run 3 to 6-month-long cohorts so you can go full time on your
              ambitions. we provide housing and co-working space so you can live
              and work with equally ambitious peers.
            </p>

            <p className="font-medium text-charcoal">
              you can think of us as{" "}
              <span className="font-serif italic">"college"</span> meets{" "}
              <span className="font-serif italic">"accelerator"</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
