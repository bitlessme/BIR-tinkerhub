"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

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
  };
}

const generateBuilders = (): Builder[] => {
  const builderRoles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "UI/UX Designer",
  ];
  const mentorRoles = [
    "Tech Lead",
    "CTO",
    "Engineering Manager",
    "Senior Architect",
    "Product Manager",
    "VP Engineering",
  ];
  const skills = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
  ];
  const locations = [
    "San Francisco",
    "New York",
    "London",
    "Berlin",
    "Tokyo",
    "Sydney",
    "Toronto",
    "Amsterdam",
  ];
  const experiences = [
    "2-3 years",
    "3-5 years",
    "5-8 years",
    "8+ years",
    "10+ years",
  ];

  const builders: Builder[] = [];

  for (let i = 1; i <= 60; i++) {
    const isBuilder = Math.random() > 0.3;
    const roles = isBuilder ? builderRoles : mentorRoles;

    builders.push({
      id: i,
      name: `${
        [
          "Alex",
          "Jordan",
          "Casey",
          "Morgan",
          "Riley",
          "Avery",
          "Quinn",
          "Sage",
        ][Math.floor(Math.random() * 8)]
      } ${
        [
          "Smith",
          "Johnson",
          "Brown",
          "Davis",
          "Wilson",
          "Miller",
          "Moore",
          "Taylor",
        ][Math.floor(Math.random() * 8)]
      }`,
      image: `https://images.unsplash.com/photo-${
        1500000000000 + Math.floor(Math.random() * 100000000)
      }?w=100&h=100&fit=crop&crop=face`,
      type: isBuilder ? "builder" : "mentor",
      details: {
        role: roles[Math.floor(Math.random() * roles.length)],
        experience: experiences[Math.floor(Math.random() * experiences.length)],
        skills: skills
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 + Math.floor(Math.random() * 3)),
        location: locations[Math.floor(Math.random() * locations.length)],
      },
    });
  }

  return builders;
};

const FloatingAvatar: React.FC<{ builder: Builder; delay: number }> = ({
  builder,
  delay,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const size = 40 + Math.random() * 30;
  const speed = 8 + Math.random() * 5;

  return (
    <motion.div
      className="absolute flex items-center"
      initial={{ x: "100vw", y: Math.random() * window.innerHeight }}
      animate={{
        x: "-200px",
        y: Math.random() * window.innerHeight,
      }}
      transition={{
        duration: speed,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      onMouseEnter={() => setHoveredIndex(builder.id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence mode="popLayout">
        {hoveredIndex === builder.id && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-32 -left-1/2 translate-x-1/2 flex text-xs flex-col items-start justify-center rounded-lg bg-white/90 backdrop-blur-sm z-50 shadow-xl px-4 py-3 border border-orange-200"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px" />
            <div className="font-bold text-gray-900 relative z-30 text-sm mb-1">
              {builder.name}
            </div>
            <div className="text-orange-600 text-xs font-medium mb-1">
              {builder.details.role}
            </div>
            <div className="text-gray-600 text-xs mb-1">
              📍 {builder.details.location}
            </div>
            <div className="text-gray-600 text-xs mb-1">
              ⏱️ {builder.details.experience}
            </div>
            <div className="text-gray-600 text-xs">
              🛠️ {builder.details.skills.slice(0, 2).join(", ")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onMouseMove={handleMouseMove}
        className={cn(
          "relative transition-transform duration-300 hover:scale-110 hover:z-30",
          builder.type === "builder" ? "rounded-full" : "rounded-lg rotate-45"
        )}
        style={{ width: size, height: size }}
      >
        <img
          src={builder.image}
          alt={builder.name}
          className={cn(
            "object-cover border-2 border-orange-300/50 shadow-lg",
            builder.type === "builder"
              ? "rounded-full w-full h-full"
              : "rounded-lg w-full h-full -rotate-45"
          )}
          style={{ width: size, height: size }}
        />
        {builder.type === "mentor" && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">★</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-orange-600 text-white shadow-sm hover:bg-orange-700",
    outline:
      "border border-orange-300 bg-white/80 backdrop-blur-sm hover:bg-orange-50 hover:text-orange-700",
    ghost: "hover:bg-orange-100 hover:text-orange-700",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-lg px-3 text-xs",
    lg: "h-12 rounded-lg px-8 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

const BuildersSwarm: React.FC = () => {
  const [builders] = useState<Builder[]>(generateBuilders());
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100"
    >
      {/* Floating Avatars */}
      {builders.map((builder, index) => (
        <FloatingAvatar
          key={builder.id}
          builder={builder}
          delay={index * 0.5}
        />
      ))}

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center px-8 py-12 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            meet our{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              builders
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              mentors
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
          >
            Join a thriving community of passionate developers and experienced
            mentors building the future together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="shadow-lg">
              Join the Swarm
            </Button>
            <Button variant="outline" size="lg" className="shadow-lg">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-sm"></div>
              <span>Builders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-amber-500 border-2 border-white shadow-sm rotate-45 flex items-center justify-center">
                <span className="text-white text-xs -rotate-45">★</span>
              </div>
              <span>Mentors</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Component() {
  return <BuildersSwarm />;
}
