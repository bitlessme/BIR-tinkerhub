"use client";
import React, { useMemo } from "react";

/** Seeded PRNG for deterministic layouts */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Helpers */
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

type NodeType = "mentor" | "mentee";
type Node = {
  id: number;
  type: NodeType;
  name: string;
  img: string;
  x: number; // % of container width
  y: number; // % of container height
  r: number; // effective radius in %
};

/** Build a dense, non-overlapping layout in RECTANGULAR % space */
function buildLayout(opts: {
  mentorCount: number;
  menteeCount: number;
  seed?: number;
  margin?: number; // % margin from edges
  mentorR?: number; // mentor radius in %
  menteeR?: number; // mentee radius in %
  padding?: number; // extra gap in %
  iterations?: number; // relaxation steps
}) {
  const {
    mentorCount,
    menteeCount,
    seed = 12345,
    margin = 3,
    mentorR = 3.6, // ~good for 84–100px visuals on common viewports
    menteeR = 2.2, // ~good for 44–62px visuals
    padding = 0.6, // extra spacing between nodes (in %)
    iterations = 45,
  } = opts;

  const rnd = mulberry32(seed);
  const total = mentorCount + menteeCount;

  const nodes: Node[] = [];
  const safe = (rad: number) => margin + rad;

  // 1) Grid-based collision detection for guaranteed no overlaps
  const φ = Math.PI * (3 - Math.sqrt(5)); // golden angle
  const gridSize = 0.8; // Ultra-small grid for maximum density
  const grid: Set<string> = new Set();

  const getGridKey = (x: number, y: number) => {
    const gx = Math.floor(x / gridSize);
    const gy = Math.floor(y / gridSize);
    return `${gx},${gy}`;
  };

  const getGridCells = (x: number, y: number, rad: number) => {
    const cells: string[] = [];
    const cellRadius = Math.ceil((rad + padding) / gridSize) + 1; // Extra cells for safety
    const centerX = Math.floor(x / gridSize);
    const centerY = Math.floor(y / gridSize);

    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        cells.push(`${centerX + dx},${centerY + dy}`);
      }
    }
    return cells;
  };

  const isPositionValid = (x: number, y: number, rad: number) => {
    // Check bounds
    const lo = safe(rad);
    const hi = 100 - safe(rad);
    if (x < lo || x > hi || y < lo || y > hi) return false;

    // Check grid cells for overlaps
    const cells = getGridCells(x, y, rad);
    for (const cell of cells) {
      if (grid.has(cell)) return false;
    }
    return true;
  };

  const markPosition = (x: number, y: number, rad: number) => {
    const cells = getGridCells(x, y, rad);
    for (const cell of cells) {
      grid.add(cell);
    }
  };

  // Create shuffled order for intermixing
  const order = Array.from({ length: total }, (_, i) => i);
  order.sort(() => rnd() - 0.5);

  for (let k = 0; k < total; k++) {
    const i = order[k];
    const type: NodeType = k < mentorCount ? "mentor" : "mentee";
    const rad = type === "mentor" ? mentorR : menteeR;

    let x, y;
    let valid = false;
    let attempts = 0;
    const maxAttempts = 50;

    // Try golden spiral first
    if (k < total * 0.9) {
      const t = (k + 0.5) / total;
      const r = Math.sqrt(t) * 49; // Maximum spiral radius for full coverage
      const θ = k * φ;

      x = 50 + r * Math.cos(θ);
      y = 50 + r * Math.sin(θ);

      // Add minimal jitter
      x += (rnd() - 0.5) * 1.5;
      y += (rnd() - 0.5) * 1.5;

      valid = isPositionValid(x, y, rad);
    }

    // If spiral fails, try random positions with many attempts
    if (!valid) {
      for (let j = 0; j < maxAttempts * 4; j++) {
        const lo = safe(rad);
        const hi = 100 - safe(rad);
        x = lo + rnd() * (hi - lo);
        y = lo + rnd() * (hi - lo);

        if (isPositionValid(x, y, rad)) {
          valid = true;
          break;
        }
        attempts++;
      }
    }

    if (valid) {
      // Clamp to safe bounds
      const lo = safe(rad);
      const hi = 100 - safe(rad);
      x = clamp(x, lo, hi);
      y = clamp(y, lo, hi);

      const imgId =
        type === "mentor" ? 1 + ((k * 7) % 70) : 10 + ((k * 5) % 70);

      nodes.push({
        id: k + 1,
        type,
        name: `${type === "mentor" ? "Mentor" : "Mentee"} ${k + 1}`,
        img: `https://i.pravatar.cc/${
          type === "mentor" ? 160 : 100
        }?img=${imgId}`,
        x,
        y,
        r: rad,
      });

      // Mark this position as used in grid
      markPosition(x, y, rad);
    }
  }

  // 2) Relaxation (repulsion) on the rectangle (no recentring)
  for (let it = 0; it < iterations; it++) {
    let moved = 0;

    // pairwise separation
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const aN = nodes[i];
        const bN = nodes[j];
        const dx = bN.x - aN.x;
        const dy = bN.y - aN.y;
        const dist = Math.hypot(dx, dy) || 0.0001;

        const minDist = aN.r + bN.r + padding;
        if (dist < minDist) {
          const overlap = (minDist - dist) * 1.0; // 100% overlap resolution
          const ux = dx / dist;
          const uy = dy / dist;

          const aW = aN.type === "mentor" ? 1.05 : 1.0; // Very minimal weight difference
          const bW = bN.type === "mentor" ? 1.05 : 1.0;
          const tot = aW + bW;

          aN.x -= overlap * ux * (bW / tot);
          aN.y -= overlap * uy * (bW / tot);
          bN.x += overlap * ux * (aW / tot);
          bN.y += overlap * uy * (aW / tot);

          // clamp after move
          const aLo = safe(aN.r),
            aHi = 100 - safe(aN.r);
          const bLo = safe(bN.r),
            bHi = 100 - safe(bN.r);
          aN.x = clamp(aN.x, aLo, aHi);
          aN.y = clamp(aN.y, aLo, aHi);
          bN.x = clamp(bN.x, bLo, bHi);
          bN.y = clamp(bN.y, bLo, bHi);
          moved++;
        }
      }
    }

    // soft wall repulsion (keeps fill rectangular without edge hugging)
    for (const n of nodes) {
      const lo = safe(n.r),
        hi = 100 - safe(n.r);
      const kEdge = 0.12;

      const dxL = n.x - lo;
      const dxR = hi - n.x;
      const dyT = n.y - lo;
      const dyB = hi - n.y;

      if (dxL < 4) n.x += (4 - dxL) * kEdge;
      if (dxR < 4) n.x -= (4 - dxR) * kEdge;
      if (dyT < 4) n.y += (4 - dyT) * kEdge;
      if (dyB < 4) n.y -= (4 - dyB) * kEdge;

      n.x = clamp(n.x, lo, hi);
      n.y = clamp(n.y, lo, hi);
    }

    if (moved === 0) break;
  }

  const mentors = nodes
    .filter((n) => n.type === "mentor")
    .map((n) => ({
      id: n.id,
      name: `Mentor ${n.id}`,
      image: n.img,
      position: { top: `${n.y}%`, left: `${n.x}%` },
    }));

  const mentees = nodes
    .filter((n) => n.type === "mentee")
    .map((n) => ({
      id: n.id,
      name: `Mentee ${n.id}`,
      image: n.img,
      position: { top: `${n.y}%`, left: `${n.x}%` },
    }));

  return { mentors, mentees };
}

type Mentor = {
  id: number;
  name: string;
  image: string;
  position: { top: string; left: string };
};
type Mentee = {
  id: number;
  name: string;
  image: string;
  position: { top: string; left: string };
};

const FloatingAvatars: React.FC = () => {
  // Tune these to change density
  const MENTOR_COUNT = 25;
  const MENTEE_COUNT = 260;

  const { mentors, mentees } = useMemo(() => {
    return buildLayout({
      mentorCount: MENTOR_COUNT,
      menteeCount: MENTEE_COUNT,
      seed: 777, // change to reshuffle deterministically
      margin: 3, // keep away from edges
      mentorR: 3.6,
      menteeR: 2.2,
      padding: 0.4, // Ultra-minimal padding for maximum density
      iterations: 180, // More iterations for convergence with ultra-high density
    });
  }, []);

  const HexagonAvatar: React.FC<{ mentor: Mentor; index: number }> = ({
    mentor,
    index,
  }) => {
    const size = 84; // Fixed size for all mentors

    return (
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        style={mentor.position}
        aria-label={mentor.name}
        title={mentor.name}
      >
        <div className="relative" style={{ width: size, height: size }}>
          <div
            className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
            style={{
              transform: "rotate(30deg)",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            }}
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                clipPath:
                  "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const CircleAvatar: React.FC<{ mentee: Mentee; index: number }> = ({
    mentee,
    index,
  }) => {
    const size = 60; // Bigger size for all mentees

    return (
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        style={mentee.position}
        aria-label={mentee.name}
        title={mentee.name}
      >
        <div
          className="rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-[2px] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
          style={{ width: size, height: size }}
        >
          <img
            src={mentee.image}
            alt={mentee.name}
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">
      {/* Optional soft background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-16 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply blur-xl" />
        <div className="absolute top-36 right-16 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply blur-xl" />
        <div className="absolute bottom-16 left-40 w-44 h-44 bg-pink-300 rounded-full mix-blend-multiply blur-xl" />
      </div>

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line
          x1="20%"
          y1="20%"
          x2="60%"
          y2="18%"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="80%"
          y1="50%"
          x2="30%"
          y2="60%"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="25%"
          y1="75%"
          x2="70%"
          y2="80%"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>

      {mentors.map((m, i) => (
        <HexagonAvatar key={`mentor-${m.id}`} mentor={m} index={i} />
      ))}
      {mentees.map((m, i) => (
        <CircleAvatar key={`mentee-${m.id}`} mentee={m} index={i} />
      ))}
    </div>
  );
};

export default FloatingAvatars;
