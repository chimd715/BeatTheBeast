/**
 * 호보당 메인 페이지 - T-Score 0.9 (실험적 창작형)
 *
 * 디자인 철학: 3D 공간감 + 키네틱 타이포그래피 + 파티클 시스템
 * - CSS 3D Transform으로 깊이감 연출
 * - 스크롤 기반 시차 효과 (Parallax)
 * - 인터랙티브 파티클 배경
 * - 극단적 타이포그래피 스케일 활용
 */

import React, { useState, useEffect, useRef } from 'react';

const MainPageExperimental = () => {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // 파티클 생성
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);

    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
        const sections = Math.floor(containerRef.current.scrollTop / window.innerHeight);
        setActiveSection(sections);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'ChosunCentennial';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/ChosunCentennial.woff2')
            format('woff2');
        }
        @import url('//fonts.googleapis.com/earlyaccess/nanumbrushscript.css');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .experimental-container {
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          background: #000;
          font-family: 'ChosunCentennial', serif;
          perspective: 1000px;
        }

        /* 파티클 배경 */
        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: #f48457;
          border-radius: 50%;
          animation: drift linear infinite;
        }

        @keyframes drift {
          from { transform: translateY(100vh) rotate(0deg); }
          to { transform: translateY(-100px) rotate(360deg); }
        }

        /* 스크롤 인디케이터 */
        .scroll-indicator {
          position: fixed;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 100;
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s;
          cursor: pointer;
        }

        .indicator-dot.active {
          background: #f48457;
          border-color: #f48457;
          transform: scale(1.3);
        }

        /* 섹션 공통 */
        .section {
          min-height: 100vh;
          scroll-snap-align: start;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        /* 히어로 섹션 - 극단적 타이포그래피 */
        .hero-section {
          flex-direction: column;
          background: radial-gradient(
            ellipse at center,
            rgba(244, 132, 87, 0.1) 0%,
            transparent 50%
          );
        }

        .hero-title-wrapper {
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(${-scrollY * 0.05}deg) translateZ(${scrollY * 0.5}px);
          transition: transform 0.1s ease-out;
        }

        .hero-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(120px, 25vw, 300px);
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
          line-height: 0.85;
          position: relative;
        }

        .hero-title-fill {
          position: absolute;
          top: 0;
          left: 0;
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(120px, 25vw, 300px);
          background: linear-gradient(
            180deg,
            #f48457 0%,
            #e66b3e 50%,
            #2a4546 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          clip-path: inset(0 0 ${Math.max(0, 100 - scrollY / 3)}% 0);
          transition: clip-path 0.1s ease-out;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.5em;
          margin-top: 40px;
          transform: translateY(${Math.min(scrollY / 3, 100)}px);
          opacity: ${Math.max(0, 1 - scrollY / 300)};
          transition: all 0.1s ease-out;
        }

        .scroll-hint {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          border-left: 2px solid rgba(255, 255, 255, 0.4);
          border-bottom: 2px solid rgba(255, 255, 255, 0.4);
          transform: rotate(-45deg);
        }

        /* 메뉴 섹션 - 3D 카드 */
        .menu-section {
          perspective: 2000px;
        }

        .menu-3d-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 900px;
          transform-style: preserve-3d;
          transform: rotateX(${(scrollY - window.innerHeight) * 0.02}deg);
        }

        .menu-card-3d {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px 40px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
          position: relative;
        }

        .menu-card-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(244, 132, 87, 0.3) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        .menu-card-3d:hover {
          transform: translateZ(60px) rotateX(-5deg) rotateY(5deg);
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.4),
            0 0 80px rgba(244, 132, 87, 0.2);
        }

        .menu-card-3d:hover::before {
          opacity: 1;
        }

        .card-3d-icon {
          font-size: 64px;
          margin-bottom: 24px;
          transform: translateZ(40px);
          display: block;
        }

        .card-3d-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 40px;
          color: white;
          margin-bottom: 12px;
          transform: translateZ(30px);
        }

        .card-3d-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
          transform: translateZ(20px);
        }

        /* CTA 섹션 */
        .cta-section {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(244, 132, 87, 0.05) 50%,
            transparent 100%
          );
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
        }

        .cta-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(48px, 8vw, 80px);
          color: white;
          margin-bottom: 24px;
        }

        .cta-desc {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.8;
          margin-bottom: 48px;
        }

        .cta-button {
          background: transparent;
          border: 2px solid #f48457;
          color: #f48457;
          padding: 20px 60px;
          font-family: 'ChosunCentennial', serif;
          font-size: 18px;
          border-radius: 100px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f48457;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: -1;
        }

        .cta-button:hover {
          color: white;
        }

        .cta-button:hover::before {
          transform: scaleX(1);
        }

        /* 플로팅 요소들 */
        .floating-element {
          position: fixed;
          pointer-events: none;
          z-index: 0;
        }

        .floating-ring {
          width: 400px;
          height: 400px;
          border: 1px solid rgba(244, 132, 87, 0.1);
          border-radius: 50%;
          top: 10%;
          left: -200px;
          animation: rotate 30s linear infinite;
        }

        .floating-ring-2 {
          width: 300px;
          height: 300px;
          border: 1px dashed rgba(70, 94, 115, 0.2);
          border-radius: 50%;
          bottom: 20%;
          right: -100px;
          animation: rotate 25s linear infinite reverse;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .floating-text {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 200px;
          color: rgba(255, 255, 255, 0.02);
          top: 30%;
          right: -10%;
          transform: rotate(-90deg);
          white-space: nowrap;
        }

        /* 반응형 */
        @media (max-width: 768px) {
          .menu-3d-container {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }

          .scroll-indicator {
            right: 16px;
          }

          .floating-element {
            display: none;
          }
        }
      `}</style>

      <div className="experimental-container" ref={containerRef}>
        {/* 파티클 배경 */}
        <div className="particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: `${20 / p.speed}s`,
                animationDelay: `${-p.y / 5}s`,
              }}
            />
          ))}
        </div>

        {/* 플로팅 장식 요소 */}
        <div className="floating-element floating-ring" />
        <div className="floating-element floating-ring-2" />
        <div className="floating-element floating-text">괴물토벌</div>

        {/* 스크롤 인디케이터 */}
        <div className="scroll-indicator">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`indicator-dot ${activeSection === i ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* 섹션 1: 히어로 */}
        <section className="section hero-section">
          <div className="hero-title-wrapper">
            <h1 className="hero-title">호보당</h1>
            <span className="hero-title-fill">호보당</span>
          </div>
          <p className="hero-subtitle">괴 물 토 벌 의 전 당</p>

          <div className="scroll-hint">
            <span>스크롤하세요</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* 섹션 2: 메뉴 */}
        <section className="section menu-section">
          <div className="menu-3d-container">
            <div className="menu-card-3d">
              <span className="card-3d-icon">⚔️</span>
              <h3 className="card-3d-title">토벌 시작</h3>
              <p className="card-3d-desc">
                룰렛을 돌려 괴물에게<br />
                피해를 입히세요
              </p>
            </div>

            <div className="menu-card-3d">
              <span className="card-3d-icon">📜</span>
              <h3 className="card-3d-title">괴물 도감</h3>
              <p className="card-3d-desc">
                토벌한 괴물들의<br />
                기록을 확인하세요
              </p>
            </div>

            <div className="menu-card-3d">
              <span className="card-3d-icon">👥</span>
              <h3 className="card-3d-title">팀 구성</h3>
              <p className="card-3d-desc">
                함께할 동료를<br />
                모집하세요
              </p>
            </div>

            <div className="menu-card-3d">
              <span className="card-3d-icon">⚙️</span>
              <h3 className="card-3d-title">설정</h3>
              <p className="card-3d-desc">
                게임 환경을<br />
                조절하세요
              </p>
            </div>
          </div>
        </section>

        {/* 섹션 3: CTA */}
        <section className="section cta-section">
          <div className="cta-content">
            <h2 className="cta-title">
              함께 모여<br />
              괴물을 물리치세요
            </h2>
            <p className="cta-desc">
              협동의 힘으로 강력한 괴물을 물리치고,<br />
              전설의 용사가 되어보세요.
            </p>
            <button className="cta-button">지금 시작하기</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPageExperimental;
