/**
 * 호보당 메인 페이지 - T-Score 0.3 (전통 계승형)
 *
 * 디자인 철학: 두루마리와 서예의 미학을 디지털로 계승
 * - 수직 스크롤 = 두루마리 펼치기
 * - 붓글씨 애니메이션으로 전통 서예 감성
 * - 양피지 텍스처 + 먹물 번짐 효과
 */

import React, { useState, useEffect } from 'react';

const MainPageTraditional = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'ChosunCentennial';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/ChosunCentennial.woff2')
            format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        @import url('//fonts.googleapis.com/earlyaccess/nanumbrushscript.css');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .scroll-container {
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #f5f0e6 0%,
            #ebe4d4 30%,
            #e6dcc8 60%,
            #dfd3bc 100%
          );
          position: relative;
          overflow-x: hidden;
        }

        /* 두루마리 상단 장식 */
        .scroll-top-ornament {
          height: 80px;
          background: linear-gradient(90deg,
            #8b4513 0%,
            #a0522d 20%,
            #cd853f 50%,
            #a0522d 80%,
            #8b4513 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .scroll-top-ornament::before,
        .scroll-top-ornament::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, #8b4513 60%, #5c3317 100%);
          border-radius: 50%;
          top: -10px;
        }

        .scroll-top-ornament::before { left: -30px; }
        .scroll-top-ornament::after { right: -30px; }

        /* 양피지 본문 영역 */
        .parchment-body {
          position: relative;
          padding: 80px 60px;
          min-height: calc(100vh - 160px);
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* 세로 먹물 번짐 경계 */
        .ink-border-left,
        .ink-border-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(42, 69, 70, 0.1) 20%,
            rgba(42, 69, 70, 0.2) 50%,
            rgba(42, 69, 70, 0.1) 80%,
            transparent 100%
          );
        }

        .ink-border-left { left: 20px; }
        .ink-border-right { right: 20px; }

        /* 메인 타이틀 - 붓글씨 */
        .main-title-container {
          text-align: center;
          margin-bottom: 80px;
          padding-top: 40px;
        }

        .main-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(80px, 15vw, 200px);
          color: #2a4546;
          letter-spacing: -0.05em;
          position: relative;
          display: inline-block;
          opacity: ${titleVisible ? 1 : 0};
          transform: ${titleVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .main-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: ${titleVisible ? '80%' : '0'};
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #2a4546 20%,
            #2a4546 80%,
            transparent 100%
          );
          transition: width 1s ease-out 0.5s;
        }

        .sub-title {
          font-family: 'ChosunCentennial', serif;
          font-size: clamp(18px, 3vw, 28px);
          color: #465e73;
          margin-top: 20px;
          letter-spacing: 0.3em;
          opacity: ${titleVisible ? 1 : 0};
          transition: opacity 1s ease-out 0.8s;
        }

        /* 전통 문양 구분선 */
        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin: 60px 0;
        }

        .ornament-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #8b4513 50%,
            transparent 100%
          );
        }

        .ornament-symbol {
          font-family: 'ChosunCentennial', serif;
          font-size: 24px;
          color: #8b4513;
        }

        /* 메뉴 카드 그리드 */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-card {
          background: linear-gradient(
            135deg,
            rgba(245, 240, 230, 0.9) 0%,
            rgba(235, 228, 212, 0.95) 100%
          );
          border: 2px solid #8b4513;
          border-radius: 0;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 4px 4px 0 rgba(139, 69, 19, 0.3);
        }

        .menu-card::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 1px solid rgba(139, 69, 19, 0.3);
          pointer-events: none;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 8px 12px 0 rgba(139, 69, 19, 0.2);
        }

        .menu-card-icon {
          font-size: 64px;
          margin-bottom: 20px;
          filter: grayscale(20%);
        }

        .menu-card-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 36px;
          color: #2a4546;
          margin-bottom: 12px;
        }

        .menu-card-desc {
          font-family: 'ChosunCentennial', serif;
          font-size: 16px;
          color: #465e73;
          line-height: 1.6;
        }

        /* 하단 정보 영역 */
        .footer-section {
          margin-top: 80px;
          padding: 60px;
          text-align: center;
          border-top: 1px solid rgba(139, 69, 19, 0.3);
        }

        .footer-quote {
          font-family: 'ChosunCentennial', serif;
          font-size: 20px;
          color: #465e73;
          font-style: italic;
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.8;
        }

        .footer-brand {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 48px;
          color: #2a4546;
        }

        /* 두루마리 하단 장식 */
        .scroll-bottom-ornament {
          height: 80px;
          background: linear-gradient(90deg,
            #8b4513 0%,
            #a0522d 20%,
            #cd853f 50%,
            #a0522d 80%,
            #8b4513 100%
          );
          position: relative;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
        }

        .scroll-bottom-ornament::before,
        .scroll-bottom-ornament::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, #8b4513 60%, #5c3317 100%);
          border-radius: 50%;
          bottom: -10px;
        }

        .scroll-bottom-ornament::before { left: -30px; }
        .scroll-bottom-ornament::after { right: -30px; }

        /* 장식적 코너 */
        .corner-ornament {
          position: absolute;
          width: 60px;
          height: 60px;
          opacity: 0.4;
        }

        .corner-ornament::before,
        .corner-ornament::after {
          content: '';
          position: absolute;
          background: #8b4513;
        }

        .corner-ornament.top-left { top: 40px; left: 40px; }
        .corner-ornament.top-right { top: 40px; right: 40px; transform: scaleX(-1); }
        .corner-ornament.bottom-left { bottom: 40px; left: 40px; transform: scaleY(-1); }
        .corner-ornament.bottom-right { bottom: 40px; right: 40px; transform: scale(-1); }

        .corner-ornament::before {
          width: 100%;
          height: 2px;
          top: 0;
        }

        .corner-ornament::after {
          width: 2px;
          height: 100%;
          left: 0;
        }
      `}</style>

      <div className="scroll-container">
        <div className="scroll-top-ornament" />

        <div className="parchment-body">
          <div className="ink-border-left" />
          <div className="ink-border-right" />

          <div className="corner-ornament top-left" />
          <div className="corner-ornament top-right" />
          <div className="corner-ornament bottom-left" />
          <div className="corner-ornament bottom-right" />

          <div className="main-title-container">
            <h1 className="main-title">호보당</h1>
            <p className="sub-title">괴 물 토 벌 의  전 당</p>
          </div>

          <div className="ornament-divider">
            <div className="ornament-line" />
            <span className="ornament-symbol">⚔</span>
            <div className="ornament-line" />
          </div>

          <div className="menu-grid">
            <div className="menu-card">
              <div className="menu-card-icon">🐉</div>
              <h3 className="menu-card-title">괴물 토벌</h3>
              <p className="menu-card-desc">
                룰렛을 돌려 괴물에게 피해를 입히세요.<br/>
                협동하여 괴물을 물리치세요!
              </p>
            </div>

            <div className="menu-card">
              <div className="menu-card-icon">📜</div>
              <h3 className="menu-card-title">괴물 도감</h3>
              <p className="menu-card-desc">
                지금까지 토벌한 괴물들의<br/>
                기록을 확인하세요.
              </p>
            </div>

            <div className="menu-card">
              <div className="menu-card-icon">⚙️</div>
              <h3 className="menu-card-title">설정</h3>
              <p className="menu-card-desc">
                게임 설정과 사운드를<br/>
                조절할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-quote">
              "함께 모여 괴물을 물리치고,<br/>
              협동의 즐거움을 경험하세요."
            </p>
            <div className="footer-brand">호보당</div>
          </div>
        </div>

        <div className="scroll-bottom-ornament" />
      </div>
    </>
  );
};

export default MainPageTraditional;
