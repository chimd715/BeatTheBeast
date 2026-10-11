import React from 'react';
import './index.css';

import logoAsset from '../../img/굴리는_선생님_로고.png';
import { assetUrl } from '../../assetUrl';

const logo = assetUrl(logoAsset);

const MENUS = [
  { view: 'battle', label: '전투' },
  { view: 'stats', label: '능력치' },
  { view: 'board', label: '게시판' },
];

const Landing = ({ onNavigate }) => {
  return (
    <div className="landing">
      <header className="landing-header">
        <h1 className="landing-title">호보당</h1>
        <p className="landing-subtitle">괴물을 무찌르자!</p>
      </header>
      <nav className="landing-menu">
        {MENUS.map(({ view, label }) => (
          <button
            key={view}
            type="button"
            className="default"
            onClick={() => onNavigate(view)}
          >
            {label}
          </button>
        ))}
      </nav>
      <p className="landing-credit">도움을 준 인물: 은멍이, 지멍이</p>
      <img className="landing-logo" src={logo} alt="굴리는 선생님 로고" />
    </div>
  );
};

export default Landing;
