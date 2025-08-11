export interface Event {
  title: string;
  isChecked: boolean;
}

export interface TimelineItem {
  year: number;
  periodType: "Q" | "H";
  periodNumber: number;
  isChecked: boolean;
  events: Event[];
}

export const events: TimelineItem[] = [
  {
    year: 2024,
    periodType: "Q",
    periodNumber: 1,
    isChecked: true,
    events: [
      {
        title: "Project inception and planning",
        isChecked: true
      },
      {
        title: "Team formation and role assignment",
        isChecked: true
      },
      {
        title: "Initial market research and competitor analysis",
        isChecked: true
      },
      {
        title: "Technology stack selection",
        isChecked: true
      },
      {
        title: "UI/UX design mockups creation",
        isChecked: true
      }
    ]
  },
  {
    year: 2024,
    periodType: "Q",
    periodNumber: 2,
    isChecked: true,
    events: [
      {
        title: "Development environment setup",
        isChecked: true
      },
      {
        title: "Database design and architecture",
        isChecked: true
      },
      {
        title: "Authentication system implementation",
        isChecked: true
      },
      {
        title: "Core API development",
        isChecked: true
      },
      {
        title: "Frontend component library creation",
        isChecked: true
      },
      {
        title: "Basic user interface development",
        isChecked: true
      }
    ]
  },
  {
    year: 2024,
    periodType: "Q",
    periodNumber: 3,
    isChecked: true,
    events: [
      {
        title: "Real-time communication features",
        isChecked: true
      },
      {
        title: "Live streaming integration",
        isChecked: true
      },
      {
        title: "User profile management",
        isChecked: true
      },
      {
        title: "Content management system",
        isChecked: true
      },
      {
        title: "Initial beta testing",
        isChecked: true
      },
      {
        title: "Performance optimization",
        isChecked: true
      }
    ]
  },
  {
    year: 2024,
    periodType: "Q",
    periodNumber: 4,
    isChecked: false,
    events: [
      {
        title: "Advanced matching algorithms",
        isChecked: false
      },
      {
        title: "Payment system integration",
        isChecked: false
      },
      {
        title: "Mobile app development",
        isChecked: false
      },
      {
        title: "Security audit and testing",
        isChecked: false
      },
      {
        title: "Load testing and scalability",
        isChecked: false
      },
      {
        title: "Legal compliance and terms of service",
        isChecked: false
      }
    ]
  },
  {
    year: 2025,
    periodType: "H",
    periodNumber: 1,
    isChecked: false,
    events: [
      {
        title: "Public beta launch",
        isChecked: false
      },
      {
        title: "Community building and engagement",
        isChecked: false
      },
      {
        title: "User feedback collection and analysis",
        isChecked: false
      },
      {
        title: "Marketing campaign launch",
        isChecked: false
      },
      {
        title: "Partnership negotiations",
        isChecked: false
      },
      {
        title: "Platform refinements based on feedback",
        isChecked: false
      }
    ]
  },
  {
    year: 2025,
    periodType: "H",
    periodNumber: 2,
    isChecked: false,
    events: [
      {
        title: "Official platform launch",
        isChecked: false
      },
      {
        title: "Advanced features rollout",
        isChecked: false
      },
      {
        title: "International expansion planning",
        isChecked: false
      },
      {
        title: "Enterprise partnerships",
        isChecked: false
      },
      {
        title: "AI-powered recommendation system",
        isChecked: false
      },
      {
        title: "Analytics and reporting dashboard",
        isChecked: false
      }
    ]
  }
]; 