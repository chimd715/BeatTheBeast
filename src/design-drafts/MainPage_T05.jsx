/**
 * 호보당 메인 페이지 - T-Score 0.5 (균형 혁신형)
 *
 * 디자인 철학: 모던 그리드 시스템 + 전통 타이포그래피의 조화
 * - CSS Grid 기반 카드 레이아웃
 * - 전통 서체 + 모던 UI 패턴
 * - 미니멀한 색상 팔레트 유지
 * - 부드러운 마이크로 인터랙션
 */

import React, { useState, useEffect } from 'react';

const MainPageBalanced = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const menuItems = [
    {
      id: 'battle',
      icon: '⚔️',
      title: '토벌 시작',
      desc: '룰렛을 돌려 괴물을 물리치세요',
      accent: '#f48457',
    },
    {
      id: 'archive',
      icon: '📖',
      title: '괴물 도감',
      desc: '토벌한 기록을 확인하세요',
      accent: '#465e73',
    },
    {
      id: 'team',
      icon: '👥',
      title: '팀 구성',
      desc: '함께할 동료를 모으세요',
      accent: '#2a4546',
    },
    {
      id: 'settings',
      icon: '⚙️',
      title: '설정',
      desc: '게임 환경을 설정하세요',
      accent: '#8b4513',
    },
  ];

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

        .page-container {
          min-height: 100vh;
          background: #faf8f5;
          font-family: 'ChosunCentennial', serif;
        }

        /* 네비게이션 */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          background: rgba(250, 248, 245, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          z-index: 100;
          border-bottom: 1px solid rgba(42, 69, 70, 0.1);
        }

        .nav-logo {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 32px;
          color: #2a4546;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          font-size: 15px;
          color: #465e73;
          text-decoration: none;
          padding: 8px 0;
          position: relative;
          cursor: pointer;
          transition: color 0.3s;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #f48457;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #2a4546;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* 히어로 섹션 */
        .hero-section {
          padding: 160px 48px 80px;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? 0 : 30}px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-content {
          max-width: 560px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(244, 132, 87, 0.15);
          color: #f48457;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: clamp(64px, 10vw, 120px);
          color: #2a4546;
          line-height: 1;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #465e73;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .btn-primary {
          background: #2a4546;
          color: white;
          border: none;
          padding: 16px 32px;
          font-family: 'ChosunCentennial', serif;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #1a3536;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(42, 69, 70, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #465e73;
          border: 2px solid #465e73;
          padding: 14px 32px;
          font-family: 'ChosunCentennial', serif;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #465e73;
          color: white;
        }

        /* 히어로 비주얼 */
        .hero-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-circle {
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f48457 0%, #e66b3e 100%);
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .visual-monster {
          position: absolute;
          font-size: 180px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
        }

        .visual-ring {
          position: absolute;
          width: 480px;
          height: 480px;
          border: 2px dashed rgba(42, 69, 70, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate 30s linear infinite;
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* 메뉴 카드 섹션 */
        .menu-section {
          padding: 80px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-label {
          font-size: 14px;
          color: #f48457;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 48px;
          color: #2a4546;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .menu-card {
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid rgba(42, 69, 70, 0.08);
          position: relative;
          overflow: hidden;
        }

        .menu-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-accent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(42, 69, 70, 0.12);
        }

        .menu-card:hover::before {
          transform: scaleX(1);
        }

        .card-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          background: rgba(42, 69, 70, 0.05);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          transition: all 0.3s ease;
        }

        .menu-card:hover .card-icon {
          background: var(--card-accent);
          transform: scale(1.1);
        }

        .card-title {
          font-family: 'ChosunCentennial', serif;
          font-size: 20px;
          color: #2a4546;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .card-desc {
          font-size: 14px;
          color: #6a737b;
          line-height: 1.5;
        }

        /* 통계 섹션 */
        .stats-section {
          padding: 60px 48px;
          background: #2a4546;
        }

        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .stat-item {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 64px;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.7;
          letter-spacing: 0.1em;
        }

        .stat-divider {
          width: 1px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* 푸터 */
        .footer {
          padding: 48px;
          text-align: center;
          background: #faf8f5;
          border-top: 1px solid rgba(42, 69, 70, 0.1);
        }

        .footer-brand {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 36px;
          color: #2a4546;
          margin-bottom: 16px;
        }

        .footer-text {
          font-size: 14px;
          color: #6a737b;
        }

        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-visual {
            height: 400px;
          }

          .visual-circle {
            width: 300px;
            height: 300px;
          }

          .visual-monster {
            font-size: 120px;
          }

          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }

          .hero-section {
            padding: 120px 24px 60px;
          }

          .menu-section {
            padding: 60px 24px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .stats-container {
            flex-direction: column;
            gap: 40px;
          }

          .stat-divider {
            width: 60px;
            height: 1px;
          }
        }
      `}</style>

      <div className="page-container">
        <nav className="nav-bar">
          <div className="nav-logo">호보당</div>
          <div className="nav-links">
            <span className="nav-link">토벌하기</span>
            <span className="nav-link">괴물도감</span>
            <span className="nav-link">팀구성</span>
            <span className="nav-link">설정</span>
          </div>
        </nav>

        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">🎮 협동 게이미피케이션</span>
            <h1 className="hero-title">호보당</h1>
            <p className="hero-subtitle">
              함께 모여 괴물을 물리치는 협동 게임.<br />
              룰렛을 돌려 괴물에게 피해를 입히고,<br />
              팀원들과 협력하여 승리를 쟁취하세요.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">토벌 시작하기</button>
              <button className="btn-secondary">자세히 보기</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-ring" />
            <div className="visual-circle">
              <span className="visual-monster">🐉</span>
            </div>
          </div>
        </section>

        <section className="menu-section">
          <div className="section-header">
            <p className="section-label">메뉴</p>
            <h2 className="section-title">무엇을 하시겠습니까?</h2>
          </div>

          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="menu-card"
                style={{
                  '--card-accent': item.accent,
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="card-icon">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">1,234</div>
              <div className="stat-label">토벌된 괴물</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">567</div>
              <div className="stat-label">참여한 용사</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">89</div>
              <div className="stat-label">전설의 토벌</div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-brand">호보당</div>
          <p className="footer-text">함께하면 더 강해집니다</p>
        </footer>
      </div>
    </>
  );
};

export default MainPageBalanced;
