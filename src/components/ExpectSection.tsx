import { Button } from "@/components/ui/button";

const ExpectSection = () => {
  const expectations = [
    {
      title: "Demo Day Excellence",
      description: "use demo day to prove your skills to potential collaborators, employees, and investors - like a16z, 1517 fund, and ZFellows."
    },
    {
      title: "Clear Accountability", 
      description: "stay clear minded and accountable with weekly syncs and coaching sessions."
    },
    {
      title: "Network & Mentorship",
      description: "connect with someone who will 10x your trajectory through intros and fireside chats - with people like sam altman, alex blania, and danielle strachman."
    },
    {
      title: "Human Connection",
      description: "most of all, expect spontaneous adventures and late night conversations with your fellow residents... living the joy of human connection is what really makes the residency ❤"
    }
  ];

  return (
    <section className="py-20 bg-[#FCF9E8]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif italic text-charcoal mb-6">
              What to{" "}
              <span className="underline decoration-accent decoration-2 underline-offset-8">
                expect
              </span>
            </h2>
          </div>

          {/* Expectations Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {expectations.map((expectation, index) => (
              <div
                key={index}
                className="bg-[#F4F1E6] border border-black p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-medium text-charcoal mb-4">
                  {expectation.title}
                </h3>
                <p className="text-soft-gray leading-relaxed">
                  {expectation.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-[#F4F1E6] p-12 rounded-3xl shadow-elegant border border-black">
              <h3 className="text-2xl lg:text-3xl font-serif text-charcoal mb-6">
                Ready to <span className="italic">transform</span> your
                trajectory?
              </h3>
              <p className="text-soft-gray mb-8 max-w-2xl mx-auto">
                Join a community of ambitious builders who are making their mark
                on the world.
              </p>
              <Button
                variant="elegant"
                size="lg"
                className="font-serif text-lg px-12"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectSection;