import React from 'react';
import './index.css';

const HomeButton = ({ onClick, floating = false }) => {
  return (
    <button
      type="button"
      className={`home-btn${floating ? ' home-btn--floating' : ''}`}
      onClick={onClick}
    >
      ← 처음으로
    </button>
  );
};

export default HomeButton;
