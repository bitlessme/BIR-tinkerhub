"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ================== Utils ================== */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/* ================== Types ================== */
type NodeType = "mentor" | "mentee";
type Mentor = {
  id: number;
  name: string;
  image: string;
  position: { top: string; left: string }; // % strings
};
type Mentee = Mentor;

/* ================== Layout (your existing logic, trimmed) ================== */
function buildLayoutPx(opts: {
  mentorCount: number;
  menteeCount: number;
  width: number;
  height: number;
  mentorRpx: number;
  menteeRpx: number;
  marginPx?: number;
  jitterPx?: number;
  seed?: number;
}) {
  const {
    mentorCount,
    menteeCount,
    width,
    height,
    mentorRpx,
    menteeRpx,
    marginPx = 8,
    jitterPx = 0.1,
    seed = 777,
  } = opts;

  const rnd = mulberry32(seed);

  // Use the maximum mentor size for grid spacing to accommodate all sizes
  const maxMentorRpx = Math.max(mentorRpx, 50); // 50px is the radius for the largest mentor (100px diameter)
  const stepX = 2 * maxMentorRpx;
  const stepY = Math.sqrt(3) * maxMentorRpx;

  const minX = marginPx,
    minY = marginPx;
  const maxX = width - marginPx,
    maxY = height - marginPx;

  type Cell = { x: number; y: number };
  const cells: Cell[] = [];
  for (let row = 0; ; row++) {
    const y = minY + maxMentorRpx + row * stepY;
    if (y > maxY - maxMentorRpx) break;
    const odd = row % 2 === 1;
    const phase = (rnd() * 0.5 - 0.25) * stepX * 0.4;
    let x = minX + maxMentorRpx + (odd ? stepX / 2 : 0) + phase;
    for (; x <= maxX - maxMentorRpx + 0.5; x += stepX) cells.push({ x, y });
  }
  // shuffle
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const MM = (maxMentorRpx + maxMentorRpx) ** 2;
  const MN = (maxMentorRpx + menteeRpx) ** 2;
  const NN = (menteeRpx + menteeRpx) ** 2;

  type P = { id: number; x: number; y: number; r: number; type: NodeType };
  const mentorsPlaced: P[] = [];
  const menteesPlaced: P[] = [];

  const within = (x: number, y: number, r: number) =>
    x >= minX + r && x <= maxX - r && y >= minY + r && y <= maxY - r;
  const okAgainst = (x: number, y: number, others: P[], minD2: number) => {
    for (let i = 0; i < others.length; i++) {
      const o = others[i];
      const dx = x - o.x,
        dy = y - o.y;
      if (dx * dx + dy * dy < minD2) return false;
    }
    return true;
  };

  let needM = mentorCount,
    needN = menteeCount;
  let acc = 0;

  for (let i = 0; i < cells.length && (needM > 0 || needN > 0); i++) {
    let { x, y } = cells[i];
    x += (rnd() * 2 - 1) * jitterPx;
    y += (rnd() * 2 - 1) * jitterPx;

    const shareM = needM / (needM + needN);
    acc += shareM;
    let tryMentorFirst = acc >= 0.5;
    if (acc >= 1) acc -= 1;

    const tryPlace = (type: NodeType): boolean => {
      if (type === "mentor" && needM > 0) {
        // Use the actual mentor radius for this specific mentor
        const actualMentorRpx = mentorRpx; // This will be the base radius, actual size comes from the image
        const px = clamp(x, minX + actualMentorRpx, maxX - actualMentorRpx);
        const py = clamp(y, minY + actualMentorRpx, maxY - actualMentorRpx);
        if (!within(px, py, actualMentorRpx)) return false;
        if (!okAgainst(px, py, mentorsPlaced, MM)) return false;
        if (!okAgainst(px, py, menteesPlaced, MN)) return false;
        mentorsPlaced.push({
          id: mentorsPlaced.length + 1,
          x: px,
          y: py,
          r: actualMentorRpx,
          type: "mentor",
        });
        needM--;
        return true;
      } else if (type === "mentee" && needN > 0) {
        const px = clamp(x, minX + menteeRpx, maxX - menteeRpx);
        const py = clamp(y, minY + menteeRpx, maxY - menteeRpx);
        if (!within(px, py, menteeRpx)) return false;
        if (!okAgainst(px, py, mentorsPlaced, MN)) return false;
        if (!okAgainst(px, py, menteesPlaced, NN)) return false;
        menteesPlaced.push({
          id: mentorsPlaced.length + menteesPlaced.length + 1,
          x: px,
          y: py,
          r: menteeRpx,
          type: "mentee",
        });
        needN--;
        return true;
      }
      return false;
    };
    if (tryMentorFirst) {
      if (!tryPlace("mentor")) tryPlace("mentee");
    } else {
      if (!tryPlace("mentee")) tryPlace("mentor");
    }
  }

  const mentors: Mentor[] = mentorsPlaced.map((n) => {
    // Create size variations for hexagons
    const sizes = [60, 70, 80, 90, 100];
    const size = sizes[n.id % sizes.length];
    const radius = size / 2;

    return {
      id: n.id,
      name: `Mentor ${n.id}`,
      image: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="%23${(
        n.id * 7
      )
        .toString(16)
        .padStart(6, "0")}"/></svg>`,
      position: {
        top: `${(n.y / height) * 100}%`,
        left: `${(n.x / width) * 100}%`,
      },
    };
  });
  const mentees: Mentee[] = menteesPlaced.map((n, i) => ({
    id: n.id,
    name: `Mentee ${i + 1}`,
    image: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"><circle cx="35" cy="35" r="35" fill="%23${(
      (n.id + 1000) *
      5
    )
      .toString(16)
      .padStart(6, "0")}"/></svg>`,
    position: {
      top: `${(n.y / height) * 100}%`,
      left: `${(n.x / width) * 100}%`,
    },
  }));

  return {
    mentors,
    mentees,
  };
}

/* ================== Hook: build a seamless tile as dataURL ================== */
function useAvatarTile(
  dims: { w: number; h: number },
  mentors: Mentor[],
  mentees: Mentee[],
  mentorSize = 80,
  menteeSize = 70
) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!dims.w || !dims.h) return;

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const cw = Math.max(1, Math.round(dims.w));
    const ch = Math.max(1, Math.round(dims.h));

    const canvas = document.createElement("canvas");
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cw, ch);

    // optional: very subtle grid (comment out if not needed)
    // drawGrid(ctx, cw, ch, 50, "#e5e7eb", 0.15);

    // helpers
    const drawHexImage = (
      img: CanvasImageSource,
      x: number,
      y: number,
      size: number
    ) => {
      const r = size / 2;
      const angle = Math.PI / 6; // 30deg
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = angle + (i * Math.PI) / 3;
        return [x + r * Math.cos(a), y + r * Math.sin(a)];
      });
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - r, y - r, size, size);
      ctx.restore();
    };

    const drawCircleImage = (
      img: CanvasImageSource,
      x: number,
      y: number,
      size: number
    ) => {
      const r = size / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - r, y - r, size, size);
      ctx.restore();
    };

    const all = [
      ...mentors.map((m) => ({
        kind: "mentor" as const,
        ...m,
        size: mentorSize, // Use the passed mentorSize for consistency
      })),
      ...mentees.map((m) => ({
        kind: "mentee" as const,
        ...m,
        size: menteeSize, // Use the passed menteeSize for consistency
      })),
    ];

    // load all images first
    Promise.all(
      all.map(
        (n) =>
          new Promise<{ n: typeof n; el: HTMLImageElement | null }>(
            (resolve) => {
              const img = new Image();
              img.crossOrigin = "anonymous"; // needed for pravatar/same-origin-friendly sources
              img.src = n.image;
              img.onload = () => resolve({ n, el: img });
              img.onerror = () => resolve({ n, el: null }); // skip broken
            }
          )
      )
    ).then((loaded) => {
      loaded.forEach(({ n, el }) => {
        if (!el) return;
        const x = (parseFloat(n.position.left) / 100) * cw;
        const y = (parseFloat(n.position.top) / 100) * ch;
        if (n.kind === "mentor") drawHexImage(el, x, y, n.size);
        else drawCircleImage(el, x, y, n.size);
      });
      try {
        const dataUrl = canvas.toDataURL("image/png");
        setUrl(dataUrl);
      } catch {
        // Fallback: if tainted, don't set (shouldn't happen with crossOrigin above)
        setUrl("");
      }
    });

    // optional cleanup
    return () => setUrl("");
  }, [dims.w, dims.h, mentors, mentees, mentorSize, menteeSize]);

  return url;
}

/* ================== Optional: subtle grid painter ================== */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  step = 50,
  color = "#e5e7eb",
  alpha = 0.15
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
  ctx.restore();
}

/* ================== Infinite Carousel Logic ================== */
const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 3,
  COPY_HEADROOM: 3,
};

const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement>[],
  dependencies: any[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current =
        ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        // Ensure seamless looping by resetting offset when it exceeds sequence width
        if (nextOffset >= seqWidth) {
          nextOffset = nextOffset % seqWidth;
        }
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

/* ================== Component ================== */
const FloatingAvatarsCanvasMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  // track size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setDims({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // sizes & counts (tweak as needed)
  const MENTOR_DIAM = 80;
  const MENTEE_DIAM = 70;
  const MENTOR_COUNT = 100; // Reduced for better performance
  const MENTEE_COUNT = 500;

  // build a fresh layout for the current rect
  const { mentors, mentees } = useMemo(() => {
    if (!dims.w || !dims.h)
      return { mentors: [] as Mentor[], mentees: [] as Mentee[] };
    return buildLayoutPx({
      mentorCount: MENTOR_COUNT,
      menteeCount: MENTEE_COUNT,
      width: dims.w,
      height: dims.h,
      mentorRpx: MENTOR_DIAM / 2,
      menteeRpx: MENTEE_DIAM / 2,
      marginPx: 1,
      jitterPx: 0.05,
      seed: 913,
    });
  }, [dims]);

  // render once → tile as background
  const tileUrl = useAvatarTile(
    dims,
    mentors,
    mentees,
    MENTOR_DIAM,
    MENTEE_DIAM
  );

  const speed = 60; // pixels per second
  const direction = "left";
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      // Ensure we have enough copies to cover the container plus extra buffer
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(
    updateDimensions,
    [containerRef, seqRef],
    [mentors, mentees]
  );

  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, true);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const renderAvatarTile = useCallback(
    (copyIndex: number) => (
      <div
        key={`copy-${copyIndex}`}
        className="flex-shrink-0"
        style={{
          width: `${dims.w}px`,
          height: `${dims.h}px`,
          backgroundImage: tileUrl ? `url(${tileUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginRight: "-80px", // Negative margin to create overlap
        }}
        ref={copyIndex === 0 ? seqRef : undefined}
      />
    ),
    [dims.w, dims.h, tileUrl]
  );

  const avatarTiles = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) =>
        renderAvatarTile(copyIndex)
      ),
    [copyCount, renderAvatarTile]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* optional shared decorative background */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply blur-xl" />
        <div className="absolute top-36 right-16 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply blur-xl" />
        <div className="absolute bottom-16 left-40 w-44 h-44 bg-pink-300 rounded-full mix-blend-multiply blur-xl" />
      </div>

      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: "max-content" }}
      >
        {avatarTiles}
      </div>
    </div>
  );
};

export default FloatingAvatarsCanvasMarquee;
