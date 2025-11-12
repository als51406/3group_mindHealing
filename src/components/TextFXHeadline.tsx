"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * 커서 따라다니는 라이트 + 글자별 스프링 + 호버 샤인 효과를 가진 인터랙티브 타이틀
 *
 * 사용처에서 Tailwind로 색/여백만 다듬으면 됨.
 */
export default function TextFXHeadline({
  text,
  sub,
  align = "center",
  sizeClamp = "clamp(34px, 7.2vw, 112px)",
  weight = "800",
  tracking = "-0.02em",
  glow = true,
  highlightColor = "#ffffff",
  darkGlowColor = "rgba(255,255,255,0.08)",
}: {
  text: string;
  sub?: string;
  align?: "left" | "center" | "right";
  sizeClamp?: string;
  weight?: string;
  tracking?: string;
  glow?: boolean;
  highlightColor?: string;
  darkGlowColor?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const controls = useAnimationControls();

  // 마우스 위치 → 엘리먼트 로컬 좌표(0~1)
  const [uv, setUv] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setUv({ x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // 텍스트 → 글자 단위 분해(연속 공백 유지)
  const chars = useMemo(() => {
    const a: { ch: string; key: string }[] = [];
    Array.from(text).forEach((ch, i) => {
      a.push({ ch, key: `${ch}-${i}` });
    });
    return a;
  }, [text]);

  // 마운트 시 지속적인 웨이브 애니메이션 시작
  useEffect(() => {
    const startContinuousAnimation = () => {
      controls.start((i) => ({
        y: [0, -8, 0, -4, 0],
        transition: {
          duration: 3,
          delay: i * 0.1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }));
    };
    
    startContinuousAnimation();
  }, [controls]);

  // hover 시작/종료 시 살짝 점프 애니메이션
  useEffect(() => {
    if (!hover) return;
    controls.start((i) => ({
      y: [0, -12, 0],
      transition: { duration: 0.4, delay: i * 0.008, ease: "easeOut" },
    }));
  }, [hover, controls]);

  // 커서 라이트(원형 그라디언트) 스타일
  const lightStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(300px 300px at ${uv.x * 100}% ${uv.y * 100}%, ${highlightColor}22, transparent 60%)`,
    mixBlendMode: "screen",
    opacity: hover ? 1 : 0.65,
    transition: "opacity .25s ease",
  };

  return (
    <div
      ref={rootRef}
      className="relative select-none"
      style={{
        textAlign: align,
        filter: glow ? `drop-shadow(0 6px 26px ${darkGlowColor})` : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 커서 라이트 */}
      <div style={lightStyle} />

      {/* 메인 타이틀: 글자별 모션 */}
      <div
        style={{
          fontSize: sizeClamp,
          letterSpacing: tracking,
          fontWeight: weight as any,
          lineHeight: 1.02,
        }}
      >
        {chars.map(({ ch, key }, i) => {
          const isSpace = ch === " ";
          if (isSpace) return <span key={key}>&nbsp;</span>;
          // 커서에서의 거리 → 약한 파랄락스
          const dx = (i / Math.max(1, chars.length - 1)) - uv.x; // -0.5~0.5 근처
          const parallax = Math.max(-1.8, Math.min(1.8, -dx * 6));
          return (
            <motion.span
              key={key}
              custom={i}
              animate={controls}
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                display: "inline-block",
                transform: `translate3d(0,0,0)`,
                // 마우스 위치에 따른 미세 회전/밝기
                textShadow: hover
                  ? `0 0 18px ${highlightColor}11, 0 0 32px ${highlightColor}0A`
                  : "none",
                filter: hover ? "brightness(1.05)" : "none",
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                animate={{
                  rotateZ: [parallax * 0.4, parallax * 0.4 + 2, parallax * 0.4 - 2, parallax * 0.4],
                  y: parallax * 0.8,
                }}
                transition={{ 
                  rotateZ: {
                    duration: 2 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  y: { type: "spring", stiffness: 240, damping: 26 }
                }}
              >
                {ch}
              </motion.span>
            </motion.span>
          );
        })}
      </div>

      {/* 서브 카피 */}
      {sub ? (
        <div style={{ marginTop: '0.75rem', opacity: 0.7, fontSize: "clamp(13px,1.8vw,20px)" }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}
