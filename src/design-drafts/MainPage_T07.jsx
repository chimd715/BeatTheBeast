/**
 * 호보당 메인 페이지 - T-Score 0.7 (현대 재해석형)
 *
 * 디자인 철학: 글래스모피즘 + 한국 미학의 현대적 융합
 * - Frosted glass 효과 + 전통 색상
 * - Bento grid 레이아웃 (일본 도시락 스타일)
 * - 유기적 블롭 형태와 전통 직선의 대비
 * - 다크 모드 기반 + 포인트 컬러 강조
 */

import React, { useState, useEffect } from 'react';

const MainPageModern = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

        .page-wrapper {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'ChosunCentennial', serif;
          position: relative;
          overflow: hidden;
        }

        /* 동적 그라디언트 배경 */
        .gradient-orb {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          pointer-events: none;
          transition: transform 0.3s ease-out;
        }

        .orb-1 {
          background: radial-gradient(circle, #f48457 0%, transparent 70%);
          top: -200px;
          right: -200px;
        }

        .orb-2 {
          background: radial-gradient(circle, #465e73 0%, transparent 70%);
          bottom: -200px;
          left: -200px;
        }

        .orb-3 {
          background: radial-gradient(circle, #2a4546 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
        }

        /* 네비게이션 */
        .nav {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-brand {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 24px;
          color: #f48457;
        }

        .nav-items {
          display: flex;
          gap: 24px;
        }

        .nav-item {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          cursor: pointer;
          transition: color 0.3s;
          position: relative;
        }

        .nav-item:hover {
          color: white;
        }

        .nav-cta {
          background: linear-gradient(135deg, #f48457 0%, #e66b3e 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'ChosunCentennial', serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(244, 132, 87, 0.4);
        }

        /* 메인 컨텐츠 */
        .main-content {
          min-height: 100vh;
          padding: 120px 48px 48px;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          opacity: ${isReady ? 1 : 0};
          transform: translateY(${isReady ? 0 : 40}px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-content {
          z-index: 1;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(244, 132, 87, 0.15);
          border: 1px solid rgba(244, 132, 87, 0.3);
          padding: 8px 16px;
          border-radius: 100px;
          color: #f48457;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .hero-tag-dot {
          width: 6px;
          height: 6px;
          background: #f48457;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(72px, 12vw, 140px);
          color: white;
          line-height: 0.95;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 460px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f48457 0%, #e66b3e 100%);
          color: white;
          border: none;
          padding: 18px 36px;
          border-radius: 12px;
          font-family: 'ChosunCentennial', serif;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(244, 132, 87, 0.4);
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 18px 36px;
          border-radius: 12px;
          font-family: 'ChosunCentennial', serif;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(3, 160px);
          gap: 16px;
        }

        .bento-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        .bento-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(244, 132, 87, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .bento-card:hover::before {
          opacity: 1;
        }

        .bento-large {
          grid-column: span 2;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(244, 132, 87, 0.1) 0%,
            rgba(42, 69, 70, 0.1) 100%
          );
        }

        .bento-large-content {
          text-align: center;
        }

        .bento-monster {
          font-size: 80px;
          margin-bottom: 16px;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .bento-large-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 32px;
          color: white;
        }

        .bento-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .bento-title {
          color: white;
          font-size: 16px;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .bento-desc {
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
        }

        .bento-accent {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 8px;
          height: 8px;
          background: #f48457;
          border-radius: 50%;
        }

        /* 하단 통계 */
        .stats-row {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 48px;
          display: flex;
          justify-content: center;
          gap: 80px;
          z-index: 50;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 36px;
          color: #f48457;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.1em;
          margin-top: 4px;
        }

        /* 마우스 팔로워 */
        .cursor-glow {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(244, 132, 87, 0.15) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out;
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
            padding-bottom: 200px;
          }

          .bento-grid {
            grid-template-rows: auto;
          }

          .nav-items {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }

          .bento-large {
            grid-column: span 1;
          }

          .nav {
            padding: 10px 20px;
          }

          .stats-row {
            gap: 32px;
            padding: 20px 24px;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <div
          className="cursor-glow"
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />

        <nav className="nav">
          <span className="nav-brand">호보당</span>
          <div className="nav-items">
            <span className="nav-item">게임</span>
            <span className="nav-item">도감</span>
            <span className="nav-item">팀</span>
            <span className="nav-item">소개</span>
          </div>
          <button className="nav-cta">시작하기</button>
        </nav>

        <main className="main-content">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              협동 게이미피케이션 플랫폼
            </div>
            <h1 className="hero-title">호보당</h1>
            <p className="hero-desc">
              함께 모여 괴물을 물리치세요. 룰렛을 돌려 피해를 입히고,
              팀원들과 협력하여 전설의 토벌을 완수하세요.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">⚔️ 토벌 시작</button>
              <button className="btn-glass">자세히 보기</button>
            </div>
          </div>

          <div className="bento-grid">
            <div className="bento-card bento-large">
              <div className="bento-large-content">
                <div className="bento-monster">🐉</div>
                <div className="bento-large-title">다음 토벌 대상</div>
              </div>
            </div>

            <div className="bento-card">
              <div className="bento-icon">📜</div>
              <div className="bento-title">괴물 도감</div>
              <div className="bento-desc">토벌 기록 확인</div>
              <div className="bento-accent" />
            </div>

            <div className="bento-card">
              <div className="bento-icon">👥</div>
              <div className="bento-title">팀 구성</div>
              <div className="bento-desc">동료 모집하기</div>
              <div className="bento-accent" />
            </div>

            <div className="bento-card">
              <div className="bento-icon">🎯</div>
              <div className="bento-title">룰렛</div>
              <div className="bento-desc">공격력 결정</div>
              <div className="bento-accent" />
            </div>

            <div className="bento-card">
              <div className="bento-icon">⚙️</div>
              <div className="bento-title">설정</div>
              <div className="bento-desc">환경 설정</div>
              <div className="bento-accent" />
            </div>
          </div>
        </main>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-value">1,234</div>
            <div className="stat-label">토벌 완료</div>
          </div>
          <div className="stat">
            <div className="stat-value">567</div>
            <div className="stat-label">활성 용사</div>
          </div>
          <div className="stat">
            <div className="stat-value">89%</div>
            <div className="stat-label">승률</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPageModern;
