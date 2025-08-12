import { useEffect, useMemo, useState } from "react";

interface Builder {
  id: number;
  name: string;
  image: string;
  type: "builder" | "mentor";
  details: {
    role: string;
    experience: string;
    skills: string[];
    location: string;
    projects?: number;
    mentees?: number;
  };
}

function Tooltip({ person }: { person: Builder }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={person.image}
          alt={person.name}
          className={`w-12 h-12 object-cover border-2 border-orange-200 ${
            person.type === "mentor" ? "hexagon" : "rounded-full"
          }`}
        />
        <div>
          <h3 className="font-semibold text-gray-800">{person.name}</h3>
          <p className="text-sm text-orange-600 capitalize">{person.type}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Role:</span>
          <span className="text-gray-600 ml-1">{person.details.role}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Experience:</span>
          <span className="text-gray-600 ml-1">
            {person.details.experience}
          </span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Location:</span>
          <span className="text-gray-600 ml-1">{person.details.location}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Skills:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {person.details.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {person.details.projects && (
          <div>
            <span className="font-medium text-gray-700">Projects:</span>
            <span className="text-gray-600 ml-1">
              {person.details.projects}
            </span>
          </div>
        )}

        {person.details.mentees && (
          <div>
            <span className="font-medium text-gray-700">Mentees:</span>
            <span className="text-gray-600 ml-1">{person.details.mentees}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const BuildersCarousel = () => {
  const [hoveredPerson, setHoveredPerson] = useState<Builder | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);

  // Helper function to generate dummy details
  const generateDetails = (id: number, type: "builder" | "mentor") => {
    const builderRoles = [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Mobile Developer",
      "DevOps Engineer",
      "Data Scientist",
    ];
    const mentorRoles = [
      "Senior Engineering Manager",
      "Tech Lead",
      "Principal Engineer",
      "VP of Engineering",
      "CTO",
      "Senior Architect",
    ];
    const skills = {
      builder: [
        ["React", "Node.js", "TypeScript", "Python"],
        ["Vue.js", "Express", "JavaScript", "MongoDB"],
        ["Angular", "Spring", "Java", "PostgreSQL"],
        ["React Native", "Swift", "Kotlin", "Firebase"],
        ["Docker", "AWS", "Kubernetes", "CI/CD"],
        ["Python", "TensorFlow", "Pandas", "SQL"],
      ],
      mentor: [
        ["Leadership", "System Design", "Mentoring", "Strategy"],
        ["Architecture", "Team Building", "Product Strategy", "Scaling"],
        ["Technical Leadership", "Code Review", "Best Practices", "Agile"],
        ["Engineering Management", "Hiring", "Performance", "Culture"],
      ],
    };
    const locations = [
      "San Francisco, CA",
      "New York, NY",
      "Austin, TX",
      "Seattle, WA",
      "Boston, MA",
      "Chicago, IL",
      "Los Angeles, CA",
      "Denver, CO",
    ];

    const role =
      type === "builder"
        ? builderRoles[id % builderRoles.length]
        : mentorRoles[id % mentorRoles.length];

    const skillSet =
      type === "builder"
        ? skills.builder[id % skills.builder.length]
        : skills.mentor[id % skills.mentor.length];

    const experience =
      type === "builder"
        ? `${Math.floor(id % 5) + 1} years`
        : `${Math.floor(id % 10) + 5} years`;

    const location = locations[id % locations.length];

    const details: any = {
      role,
      experience,
      skills: skillSet,
      location,
    };

    if (type === "builder") {
      details.projects = Math.floor(id % 20) + 5;
    } else {
      details.mentees = Math.floor(id % 25) + 8;
    }

    return details;
  };

  // Organize builders and mentors into 5 distinct rows with more images
  const builderRows = useMemo<Builder[][]>(
    () => [
      // Row 1
      [
        {
          id: 1,
          name: "Builder Alex",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(1, "builder"),
        },
        {
          id: 2,
          name: "Mentor Sarah",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(2, "mentor"),
        },
        {
          id: 3,
          name: "Builder Mike",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(3, "builder"),
        },
        {
          id: 4,
          name: "Mentor Lisa",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(4, "mentor"),
        },
        {
          id: 5,
          name: "Builder Tom",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(5, "builder"),
        },
        {
          id: 6,
          name: "Mentor Emma",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(6, "mentor"),
        },
        {
          id: 7,
          name: "Builder Jake",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(7, "builder"),
        },
        {
          id: 8,
          name: "Builder Sam",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(8, "builder"),
        },
        {
          id: 9,
          name: "Mentor John",
          image:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(9, "mentor"),
        },
        {
          id: 10,
          name: "Builder Kate",
          image:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(10, "builder"),
        },
      ],
      // Row 2
      [
        {
          id: 11,
          name: "Mentor David",
          image:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(11, "mentor"),
        },
        {
          id: 12,
          name: "Builder Anna",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(12, "builder"),
        },
        {
          id: 13,
          name: "Builder Chris",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(13, "builder"),
        },
        {
          id: 14,
          name: "Mentor Rachel",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(14, "mentor"),
        },
        {
          id: 15,
          name: "Builder Max",
          image:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(15, "builder"),
        },
        {
          id: 16,
          name: "Builder Zoe",
          image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(16, "builder"),
        },
        {
          id: 17,
          name: "Mentor Paul",
          image:
            "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(17, "mentor"),
        },
        {
          id: 18,
          name: "Builder Leo",
          image:
            "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(18, "builder"),
        },
        {
          id: 19,
          name: "Builder Maya",
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(19, "builder"),
        },
        {
          id: 20,
          name: "Mentor Grace",
          image:
            "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(20, "mentor"),
        },
      ],
      // Row 3
      [
        {
          id: 21,
          name: "Builder Ryan",
          image:
            "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(21, "builder"),
        },
        {
          id: 22,
          name: "Mentor Sofia",
          image:
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(22, "mentor"),
        },
        {
          id: 23,
          name: "Builder Noah",
          image:
            "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(23, "builder"),
        },
        {
          id: 24,
          name: "Builder Mia",
          image:
            "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(24, "builder"),
        },
        {
          id: 25,
          name: "Mentor James",
          image:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(25, "mentor"),
        },
        {
          id: 26,
          name: "Builder Lily",
          image:
            "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(26, "builder"),
        },
        {
          id: 27,
          name: "Builder Ben",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(27, "builder"),
        },
        {
          id: 28,
          name: "Mentor Amy",
          image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(28, "mentor"),
        },
        {
          id: 29,
          name: "Builder Ethan",
          image:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(29, "builder"),
        },
        {
          id: 30,
          name: "Builder Ava",
          image:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(30, "builder"),
        },
      ],
      // Row 4
      [
        {
          id: 31,
          name: "Mentor Kevin",
          image:
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(31, "mentor"),
        },
        {
          id: 32,
          name: "Builder Chloe",
          image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(32, "builder"),
        },
        {
          id: 33,
          name: "Builder Owen",
          image:
            "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(33, "builder"),
        },
        {
          id: 34,
          name: "Mentor Nina",
          image:
            "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(34, "mentor"),
        },
        {
          id: 35,
          name: "Builder Luke",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(35, "builder"),
        },
        {
          id: 36,
          name: "Builder Ella",
          image:
            "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(36, "builder"),
        },
        {
          id: 37,
          name: "Mentor Mark",
          image:
            "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(37, "mentor"),
        },
        {
          id: 38,
          name: "Builder Ivy",
          image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(38, "builder"),
        },
        {
          id: 39,
          name: "Builder Jack",
          image:
            "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(39, "builder"),
        },
        {
          id: 40,
          name: "Mentor Rose",
          image:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(40, "mentor"),
        },
      ],
      // Row 5
      [
        {
          id: 41,
          name: "Builder Finn",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(41, "builder"),
        },
        {
          id: 42,
          name: "Mentor Claire",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(42, "mentor"),
        },
        {
          id: 43,
          name: "Builder Zara",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(43, "builder"),
        },
        {
          id: 44,
          name: "Builder Cole",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(44, "builder"),
        },
        {
          id: 45,
          name: "Mentor Dan",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(45, "mentor"),
        },
        {
          id: 46,
          name: "Builder Ruby",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(46, "builder"),
        },
        {
          id: 47,
          name: "Builder Kai",
          image:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(47, "builder"),
        },
        {
          id: 48,
          name: "Mentor Vera",
          image:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
          type: "mentor",
          details: generateDetails(48, "mentor"),
        },
        {
          id: 49,
          name: "Builder Nora",
          image:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(49, "builder"),
        },
        {
          id: 50,
          name: "Builder Dean",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
          type: "builder",
          details: generateDetails(50, "builder"),
        },
      ],
    ],
    [generateDetails]
  );

  // Memoize animation speeds to prevent recalculation
  const animationSpeeds = useMemo(() => [10, 7, 13, 8, 11], []);

  // Memoize repeated rows for seamless scrolling
  const repeatedRows = useMemo(
    () => builderRows.map((row) => [...row, ...row, ...row, ...row]),
    [builderRows]
  );

  useEffect(() => {
    // Add CSS animation and hexagonal clip-path to the document
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-25%);
        }
      }
      .animate-scroll-left {
        animation: scroll-left linear infinite;
      }
      .animate-scroll-left.paused {
        animation-play-state: paused !important;
      }
      .hexagon {
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleMouseEnter = (person: Builder, event: React.MouseEvent) => {
    setHoveredPerson(person);
    setMousePosition({ x: event.clientX, y: event.clientY });
    setIsPaused(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredPerson) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPerson(null);
    setIsPaused(false);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Multiple horizontal rows of builders and mentors */}
      <div className="absolute inset-0 py-16">
        <div className="h-full flex flex-col justify-between">
          {builderRows.map((row, rowIndex) => {
            const duration = animationSpeeds[rowIndex];

            return (
              <div key={rowIndex} className="relative h-20 overflow-hidden">
                <div
                  className={`flex items-center h-full animate-scroll-left ${
                    isPaused ? "paused" : ""
                  }`}
                  style={{
                    animationDuration: `${duration}s`,
                    width: "max-content",
                  }}
                  onMouseMove={handleMouseMove}
                >
                  {/* Repeat the row multiple times for seamless loop */}
                  {repeatedRows[rowIndex].map((person, index) => (
                    <div
                      key={`${rowIndex}-${person.id}-${index}`}
                      className="flex-shrink-0 px-16 relative z-[60]"
                      onMouseEnter={(e) => handleMouseEnter(person, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative group cursor-pointer">
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 ${
                            person.type === "mentor"
                              ? "hexagon"
                              : "rounded-full"
                          } opacity-0 group-hover:opacity-75 blur transition duration-300`}
                        ></div>
                        <img
                          src={person.image}
                          alt={person.name}
                          className={`relative w-16 h-16 object-cover border-2 border-white ${
                            person.type === "mentor"
                              ? "hexagon"
                              : "rounded-full"
                          } shadow-lg transition-transform duration-300 group-hover:scale-110`}
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 ${
                            person.type === "mentor"
                              ? "hexagon"
                              : "rounded-full"
                          } bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredPerson && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: Math.min(mousePosition.x + 10, window.innerWidth - 320),
            top: Math.max(10, mousePosition.y - 200),
          }}
        >
          <Tooltip person={hoveredPerson} />
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="text-center space-y-6 bg-white/50 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-orange-100">
          <h2 className="text-5xl lg:text-6xl font-serif italic text-gray-800">
            meet our builders & mentors
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            talented individuals from diverse backgrounds, united by their
            passion to build and create, guided by experienced mentors
          </p>
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-full font-medium hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuildersCarousel;
